import  { useState } from "react";
import Image from 'next/image';
import InfoIcon from "../../public/assets/InfoIcon.svg"
import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";

// import {InputOTP} from "@/components/ui/input-otp"

import { Switch } from "@/components/ui/switch"


import {Input} from "@/components/ui/input";

import { useRouter } from "next/navigation";

type FormValues = {
  emailAddress: string;
  newEmail: string;
  password: string;
  newPassword: string;
  otp: string;
};


const SettingsAuthenticationSection = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      emailAddress: "",
      newEmail: "",
      password: "",
      newPassword: "",
      otp: "",
    },
  });

  const { handleSubmit, setValue, getValues } = methods;
  const router = useRouter();

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEmailOverlayOpen, setIsEmailOverlayOpen] = useState(false);
  const [isPasswordOverlayOpen, setIsPasswordOverlayOpen] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value; // Update the specific input field
    setOtp(newOtp);
  };

  const handleVerifyEmail = () => {
    setIsEmailOverlayOpen(true);
  };

  const handleVerifyPassword = () => {
    setIsPasswordOverlayOpen(true);
  };

  const handleUpdateEmail = () => {
    setValue("emailAddress", getValues("newEmail"));
    setIsEditingEmail(false);
    setIsEmailOverlayOpen(false);
  };

  const handleUpdatePassword = () => {
    setValue("password", getValues("newPassword"));
    setIsEditingPassword(false);
    setIsPasswordOverlayOpen(false);
    router.push("/account"); // Navigate to the account page
  };


  return (
    <div>
      <div>
        <h1 className="text-[#101828] text-[24px] leading-[36px] font-bold">Authentication</h1>

        <p className="text-[#41404B] text-[16px] leading-[22.4px]">You can change your Email and Password here</p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(() => {})} className="space-y-6 pt-10">
          {/* Email Update Section */}
          <div className="flex gap-4 items-end">
            <FormField
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                    {isEditingEmail ? "Current Email" : "Email Address"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter current email"
                      disabled={!isEditingEmail}
                      className="w-[323px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEditingEmail ? (
              <p
                onClick={() => setIsEditingEmail(true)}
                className="text-[#5B52B6] text-sm cursor-pointer underline"
              >
                Change Email?
              </p>
            ) : (
              <FormField
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                      New Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter new email" className="w-[323px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isEditingEmail && (
              <Button
                type="button"
                onClick={handleVerifyEmail}
                className="bg-[#5B52B6] text-white"
              >
                Verify
              </Button>
            )}
          </div>

          {/* Password Update Section */}
          <div className="flex gap-4 items-end">
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                    {isEditingPassword ? "Current Password" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      disabled={!isEditingPassword}
                      className="w-[323px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEditingPassword ? (
              <p
                onClick={() => setIsEditingPassword(true)}
                className="text-[#5B52B6] text-sm cursor-pointer underline"
              >
                Change Password?
              </p>
            ) : (
              <FormField
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Enter new password" className="w-[323px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isEditingPassword && (
              <Button
                type="button"
                onClick={handleVerifyPassword}
                className="bg-[#5B52B6] text-white"
              >
                Verify
              </Button>
            )}
          </div>
        </form>

        {/* Email Verification Dialog */}
        <Dialog open={isEmailOverlayOpen} onOpenChange={setIsEmailOverlayOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                name="otp"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                      OTP Code
                    </FormLabel>

                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)} // Handle the change for each input
                        className="otp-input"
                        maxLength={1} // Each input should accept only one character
                        type="text"
                        autoFocus={index === 0} // Focus on the first input initially
                      />
                    ))}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleUpdateEmail}
                className="w-full bg-[#5B52B6] text-white"
              >
                Update Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Password Verification Dialog */}
        <Dialog open={isPasswordOverlayOpen} onOpenChange={setIsPasswordOverlayOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                  name="otp"
                  render={() => ( // No need to destructure 'field' since it's not used
                    <FormItem>
                      <FormLabel className="text-[14px] text-[#A9A9AE] leading-[21px] font-medium">
                        OTP Code
                      </FormLabel>

                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          value={digit}
                          onChange={(e) => handleInputChange(e, index)} // Handle the change for each input
                          className="otp-input"
                          maxLength={1} // Each input should accept only one character
                          type="text"
                          autoFocus={index === 0} // Focus on the first input initially
                        />
                      ))}

                      <FormMessage />
                    </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleUpdatePassword}
                className="w-full bg-[#5B52B6] text-white"
              >
                Update Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FormProvider>

      <div className="pt-10">
        <div>
          <div className="flex items-center gap-[4px]">
            <h1 className="text-[16px] leading-[24px] text-[#101828] font-bold">Two Factor Authentication</h1>

            <Image width={24} height={24} src={InfoIcon} alt="InfoIcon" />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Switch id="two-factor-switch" />
            <label
              htmlFor="two-factor-switch"
              className="text-[14px] leading-[20px] text-[#101828] font-medium"
            >
              Enabled
            </label>
          </div>
        </div>

        <div className="pt-10">
          <div className="flex items-center gap-[4px]">
            <h1 className="text-[16px] leading-[24px] text-[#101828] font-bold">Ask to Change Password Every 6 Months</h1>


            <Image width={24} height={24} src={InfoIcon} alt="InfoIcon" />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Switch id="two-factor-switch" />
            <label
              htmlFor="two-factor-switch"
              className="text-[14px] leading-[20px] text-[#101828] font-medium"
            >
              Enabled
            </label>
          </div>
        </div>


        <div className="pt-10">
          <div>
            <h1 className="text-[16px] leading-[24px] text-[#101828] font-bold">Delete Account ?</h1>


            <div className="flex pt-[10px] gap-[8px]">
              <p className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">We do our best to give you great experience, we will be sad to see you leave.</p>

              <p className="text-[#5B52B6] text-[16px] leading-[24px] font-normal">Delete Account</p>
            </div>
          </div>
        </div>


          
          
      </div>
    </div>






  );
};


export default SettingsAuthenticationSection;
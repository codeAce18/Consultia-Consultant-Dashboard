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

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

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

  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [passwordOtp, setPasswordOtp] = useState(["", "", "", "", "", ""]);

  const handleEmailOtpChange = (newOtp: string) => {
    const otpArray = newOtp.split('').slice(0, 6); 
    setEmailOtp(otpArray);
  };

  const handlePasswordOtpChange = (newOtp: string) => {
    const otpArray = newOtp.split('').slice(0, 6); 
    setPasswordOtp(otpArray);
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
    router.push("/login");
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
                Update Email
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
                Update Password
              </Button>
            )}
          </div>
        </form>

        <Dialog open={isEmailOverlayOpen} onOpenChange={setIsEmailOverlayOpen}>
          <DialogContent className="min-h-[400px]">
            <DialogHeader>
              <DialogTitle className="text-[20px] pl-10">Enter verification code</DialogTitle>
              <DialogTitle className="text-[15px] pl-10">The verification code has been sent to your email just now</DialogTitle>
            </DialogHeader>
            <FormField
              name="otp"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-center">
                    <InputOTP
                      maxLength={6}
                      value={emailOtp.join('')} 
                      onChange={handleEmailOtpChange} 
                    >
                      <InputOTPGroup className="flex gap-4 justify-center">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot key={index} index={index} className="w-12 h-12 
                          border rounded-md text-center text-xl" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                onClick={handleUpdateEmail}
                disabled={emailOtp.some((digit) => !digit)} 
                className={`w-full text-white ${emailOtp.some((digit) => !digit) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5B52B6] cursor-pointer'}`}
              >
                Update Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Password Verification Dialog */}
        <Dialog open={isPasswordOverlayOpen} onOpenChange={setIsPasswordOverlayOpen}>
          <DialogContent className="min-h-[400px]">
            <DialogHeader>
              <DialogTitle className="text-[20px] pl-10">Enter verification code</DialogTitle>
              <DialogTitle className="text-[15px] pl-10">The verification code has been sent to your email just now</DialogTitle>
            </DialogHeader>
            <div>
              <FormField
                name="otp"
                render={() => (
                  <FormItem>
                    <div className="flex items-center justify-center">

                      <InputOTP
                        maxLength={6}
                        value={passwordOtp.join('')}
                        onChange={handlePasswordOtpChange} 
                      >
                        <InputOTPGroup className="flex gap-4 justify-center">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot key={index} index={index} className="w-12 h-12 
                            border rounded-md text-center text-xl" />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>

                    </div>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleUpdatePassword}
                disabled={emailOtp.some((digit) => !digit)} 
                className={`w-full text-white ${passwordOtp.some((digit) => !digit) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5B52B6] cursor-pointer'}`}
              >
                Continue
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
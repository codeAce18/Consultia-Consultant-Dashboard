import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from 'next/router';

import "../app/globals.css";
import SideBar from '@/app/components/SideBar';

const OTPVerificationPage = () => {
  const [otpValue, setOtpValue] = useState('');
  const [showWalletContent, setShowWalletContent] = useState(false);
  const router = useRouter();
  const { amount, bank, accountNumber } = router.query;

  const handleOtpVerification = () => {
    if (otpValue.length === 6) {
      // Here you would typically verify the OTP with backend
      // Example:
      // const response = await verifyOTP(otpValue);
      // if (response.success) {
      setShowWalletContent(true);
      // }
    }
  };

  if (showWalletContent) {
    return (

      <div>

        <SideBar />
        {/* <WalletContent /> */}

      </div>

    );
  }

  const isOtpVerificationButtonEnabled = otpValue.length === 6;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5B52B6] p-4">
      <div className="w-full max-w-[540px] min-h-[540px]  bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-start justify-start pl-10">
          <h1 className="text-[#191C1D] text-left text-[24px] leading-[32px] font-semibold pt-20 ">Enter Your Transaction PIN</h1>
          
          <p className="text-[16px] pt-[20px] leading-[32px] font-normal max-w-[400px]">
            You are about to withdraw <span>₦{amount}</span> from your Consultia wallet to
            your <span>{accountNumber}</span>  <span>{bank}</span> Account. Kindly input your transaction
            PIN to proceed.
          </p>
        </div>
        <div className="space-y-6">

          <div className="flex justify-center pt-10">
            <InputOTP 
              maxLength={6} 
              value={otpValue} 
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup className="gap-8">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot 
                    key={index} 
                    index={index} 
                    className="border border-gray-300 rounded-md w-10 h-10"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="pt-16">
            <button
              onClick={handleOtpVerification}
              disabled={!isOtpVerificationButtonEnabled}
              className={`w-full max-w-[400px] flex flex-col items-center justify-center mx-auto p-2 rounded-[8px] font-bold ${
                isOtpVerificationButtonEnabled
                  ? 'bg-[#5B52B6] text-white'
                  : 'bg-[#CFCDEC] text-white cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
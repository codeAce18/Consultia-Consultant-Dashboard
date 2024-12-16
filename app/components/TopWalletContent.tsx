import React, { useState } from "react";
import Image from "next/image";
import CardIcon from "../../public/assets/CardIcon.svg";
import BankIcon from "../../public/assets/BankIcon.svg";
import WalletIcon from "../../public/assets/WalletIcon.svg";
import MasterCardImage from "../../public/assets/MasterCardImage.svg"

interface TopUpWalletContentProps {
    onClose?: () => void;
  }

const TopUpWalletContent: React.FC<TopUpWalletContentProps> = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("debitCard");

    const handlePaymentMethodChange = (method: string) => {
      setSelectedPaymentMethod(method);
    };
  

  return (
    <div className="flex items-center justify-center flex-col">
        <div className="p-6 bg-white rounded-lg max-w-[702px] w-full">
      
    
          {/* Top-Up Amount Input */}
          <div className="mb-6">
            <label className="block text-[#667085] text-sm mb-2">Top-Up Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#101828] font-semibold">₦</span>
              <input
                type="text"
                placeholder="0.00"
                className="w-full max-w-[634px] pl-8 pr-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] focus:outline-none focus:border-[#5B52B6]"
              />
            </div>
          </div>
    
          {/* Account Holder Input */}
          <div className="mb-6">
            <label className="block text-[#667085] text-sm mb-2">Account Holder</label>
            <input
              type="text"
              placeholder="Enter account holder's name"
              className="w-full max-w-[634px] px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] focus:outline-none focus:border-[#5B52B6]"
            />
          </div>
    
          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-[#667085] text-sm mb-2">Select Payment Method</label>
    
            {/* Debit Card */}
            <div className="flex w-full max-w-[634px] items-center border border-[#D0D5DD] rounded-lg p-2 mb-3 hover:border-[#5B52B6] cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                id="debitCard"
                value="debitCard"
                checked={selectedPaymentMethod === "debitCard"}
                onChange={() => handlePaymentMethodChange("debitCard")}
                className="mr-3"
              />
              <label htmlFor="debitCard" className="flex-grow text-[#101828]">
                Debit Card
              </label>
              <Image src={CardIcon} alt="Debit Card Icon" width={24} height={24} />
            </div>
    
            {/* Bank Transfer */}
            <div className="flex items-center w-full max-w-[634px] border border-[#D0D5DD] rounded-lg p-2 mb-3 hover:border-[#5B52B6] cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                id="bankTransfer"
                value="bankTransfer"
                checked={selectedPaymentMethod === "bankTransfer"}
                onChange={() => handlePaymentMethodChange("bankTransfer")}
                className="mr-3"
              />
              <label htmlFor="bankTransfer" className="flex-grow text-[#101828]">
                Bank Transfer
              </label>
              <Image src={BankIcon} alt="Bank Icon" width={24} height={24} />
            </div>
    
            {/* Wallet */}
            <div className="flex items-center border w-full max-w-[634px] border-[#D0D5DD] rounded-lg p-2 hover:border-[#5B52B6] cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                id="wallet"
                value="wallet"
                checked={selectedPaymentMethod === "wallet"}
                onChange={() => handlePaymentMethodChange("wallet")}
                className="mr-3"
              />
              <label htmlFor="wallet" className="flex-grow text-[#101828]">
                Wallet
              </label>
              <Image src={WalletIcon} alt="Wallet Icon" width={24} height={24} />
            </div>
          </div>
    
          {/* Conditional Content Based on Payment Method */}
          {selectedPaymentMethod === "debitCard" && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#101828] mb-4">Card Information</h2>
    
              {/* Cardholder Name */}
              <div className="mb-4">
                <label className="block text-[#667085] text-sm mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Enter cardholder's name"
                  className="w-full max-w-[634px] px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] focus:outline-none focus:border-[#5B52B6]"
                />
              </div>
    
              {/* Card Information */}
              <div className="mb-4">
                <label className="block text-[#667085] text-sm mb-2">Select a Payment Method</label>
                <div className="relative w-full max-w-[634px]">
                  <input
                    type="text"
                    value="Debit Card"
                    readOnly
                    className="w-full px-4 py-2 border border-[#D0D5DD] rounded-lg bg-[#F9FAFB] text-[#101828] focus:outline-none"
                  />
                  <Image
                    src={MasterCardImage}
                    alt="MasterCardImage"
                    width={24}
                    height={24}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>
    
              {/* Expiry Date and CVC */}
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-[#667085] text-sm mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full max-w-[200px] px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] focus:outline-none focus:border-[#5B52B6]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[#667085] text-sm mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full max-w-[200px] px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] focus:outline-none focus:border-[#5B52B6]"
                  />
                </div>
              </div>
            </div>
          )}
    
          {selectedPaymentMethod === "bankTransfer" && (
            <div className="mb-6">
              <h2 className="pt-[20px] text-[31px] leading-[46.5px] font-bold text-[#101828]">₦ 109,062.75</h2>
              <p className="text-[#101828] pt-[15px] text-[16px] leading-[22.4px] font-normal">Please transfer to the following account</p>

              <div className="flex flex-col pt-[15px] items-start justify-start">
                <h2 className="text-[14px] leading-[21px] font-bold text-[#A3A2AB]">Account Name:</h2>

                <h2 className="text-[16px] font-normal leading-[22.4px] text-[#A3A2AB]">Bankole onafuwa</h2>
              </div>

              <div className="pt-[15px]">
                <h2 className="text-[#A3A2AB] text-[16px] leading-[24px] font-medium">Account Number</h2>

                <div className="flex items-center gap-[12px]">
                  <h1 className="text-[#5B52B6] text-[20px] leading-[30px] font-medium">543 1876 234</h1>

                  <button className="border-[1px] rounded-[100px] border-[#5B52B6] max-w-[51px] w-full p-[10px] text-[#5B52B6] text-[13px] leading-[19.5px] font-normal">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Pay Now Button */}
          <button className="w-full max-w-[634px] bg-[#5B52B6] text-white py-3 rounded-lg hover:bg-[#4A41A0] transition-colors">
            Pay Now
          </button>
        </div>
    </div>
  );
};

export default TopUpWalletContent;
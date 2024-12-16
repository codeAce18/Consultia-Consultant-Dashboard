import React, { useState } from 'react';
import Image from "next/image"
import { Eye, EyeOff } from 'lucide-react';
import NoDocuments from "../../public/assets/NoDocuments.svg"
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Separator } from "@/components/ui/separator"
import { SearchIcon } from 'lucide-react';
import NotificationIcon from "../../public/assets/NotificationIcon.svg"
import ChatIcon from "../../public/assets/ChatIcon.svg"
import MyProfile from "../../public/assets/MyProfile.svg"
import Arrowdown from "../../public/assets/Arrowdown.svg"
import profile from "../../public/assets/profile.svg"
import LogOutIcon from "../../public/assets/LogOutIcon.svg"

const WalletPayoutContent = () => {
  const router = useRouter();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [withdrawalStage, setWithdrawalStage] = useState<'initial' | 'pin-creation' | 'withdrawal'>('initial');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');
  const [destinationBank, setDestinationBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');

  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [showNewPin, setShowNewPin] = useState<boolean>(false);
  const [showConfirmPin, setShowConfirmPin] = useState<boolean>(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleCreatePinClick = () => {
    setWithdrawalStage('pin-creation');
  };

  const handleMakeWithdrawal = () => {
    // Construct the URL with query parameters
    const url = `/otpverificationpage?amount=${encodeURIComponent(withdrawalAmount)}&bank=${encodeURIComponent(destinationBank)}&accountNumber=${encodeURIComponent(accountNumber)}`;
    
    // Use router.push with the constructed URL
    router.push(url);
  };

  const handlePinCreation = () => {
    // In a real app, you'd implement PIN creation logic here
    if (newPin === confirmPin && newPin.length === 6) {
      setWithdrawalStage('withdrawal');
    }
  };

  const isPinCreateButtonEnabled = 
  newPin.length === 6 && 
  confirmPin.length === 6 && 
  newPin === confirmPin;

  const isWithdrawalButtonEnabled = 
    withdrawalAmount !== '' && 
    destinationBank !== '' && 
    accountNumber.length === 10;

  const bankOptions = [
    'Select Bank',
    'First Bank', 
    'GTBank', 
    'Access Bank', 
    'Zenith Bank', 
    'UBA'
  ];

  return (
    <div>
      {/* Top navigation section remains the same as in original code */}
      <div className="flex justify-between">
        {/* ... (previous navigation code) ... */}
      </div>

      <div className="pt-[24px]">
        <Separator />
      </div>

      {withdrawalStage === 'initial' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image src={NoDocuments} alt="NoDocuments" />
            </div>
            <h1 className="text-[#101828] text-[25px] leading-[37.5px] font-bold">
              No Withdrawal yet!
            </h1>
            <p className="text-[rgb(163,162,171)] text-[16px] leading-[24px] font-normal max-w-[378px] w-full text-center">
              In order to make a withdrawal, you are required to set up a PIN
            </p>
            <div className="pt-10">
              <button 
                onClick={handleCreatePinClick}
                className="flex items-center bg-[#5B52B6] max-w-[216px] w-full rounded-[8px] p-[10px] gap-[10px] text-[16.5px] leading-[19.8px] font-bold text-white"
              >
                Create Withdrawal PIN
              </button>
            </div>
          </div>
        </div>
      )}

{withdrawalStage === 'pin-creation' && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-[702px] min-h-[500px]">
          <h2 className="text-[#101828] text-[20px] leading-[30px] font-bold mb-4">
            Create Withdrawal PIN
          </h2>

          <div>
            <label className="text-[#41404B] text-[14px] leading-[21px] font-medium">
              New PIN
            </label>

            <div className="pt-[10px] relative">
              <Input
                type={showNewPin ? "text" : "password"}
                className="mb-4 w-full h-[48px] pr-10"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              />
              <div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPin(!showNewPin)}
              >
                {showNewPin ? <Eye size={20} className="text-[#5B52B6]" /> : <EyeOff size={20} className="text-[#5B52B6]" />}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#41404B] text-[14px] leading-[21px] font-medium">
              Confirm PIN
            </label>

            <div className="pt-[10px] relative">
              <Input
                type={showConfirmPin ? "text" : "password"}
                className="mb-4 w-full h-[48px] pr-10"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              />
              <div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
              >
                {showConfirmPin ? <Eye size={20} className="text-[#5B52B6]" /> : <EyeOff size={20} className="text-[#9894ca]" />}
              </div>
            </div>
          </div>

          <div className="pt-10">
            <h1 className="font-bold mb-2">PIN Requirements</h1>
            <ul className="list-disc pl-5">
              <li>Must be numbers only</li>
              <li>Must be 6 digits long without any spaces</li>
            </ul>
          </div>

          <div className="pt-10">
            <button
              onClick={handlePinCreation}
              disabled={!isPinCreateButtonEnabled}
              className={`w-full p-2 rounded-[8px] font-bold ${
                isPinCreateButtonEnabled 
                  ? 'bg-[#5B52B6] text-white' 
                  : 'bg-[#CFCDEC] text-white cursor-not-allowed'
              }`}
            >
              Create PIN
            </button>
          </div>
        </div>
      </div>
    )}

    {withdrawalStage === 'withdrawal' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-[702px] min-h-[530px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#101828] text-[24px] leading-[36px] font-bold">
                Make Withdrawal to Bank
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">Available Balance</p>
              <p className="text-[#101828] text-[39px] leading-[46.8px] font-medium">
                ₦ 140,000.<span className="text-[24px] leading-[28.8px] font-medium">00</span>
              </p>
            </div>

            <div>
              <label className="text-[#41404B] text-[14px] leading-[21px] font-medium">Withdrawal Amount</label>
              <div className="pt-[10px]">
                <Input
                  type="number"
                  className="mb-4 w-full h-[48px] "
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[#41404B] text-[14px] leading-[21px] font-medium">Destination Bank</label>
              <div className="pt-[10px]">
                <select
                  value={destinationBank}
                  onChange={(e) => setDestinationBank(e.target.value)}
                  className="mb-4 w-full p-2 border rounded-md h-[48px]"
                >
                  {bankOptions.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#41404B] text-[14px] leading-[21px] font-medium">Account Number</label>
              <div className="pt-[10px]">
                <Input
                  type="text"
                  className="mb-4 w-full h-[48px]"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                />
              </div>
            </div>

            <button 
              onClick={handleMakeWithdrawal}
              disabled={!isWithdrawalButtonEnabled}
              className={`w-full p-2 rounded-[8px] font-bold ${
                isWithdrawalButtonEnabled 
                  ? 'bg-[#5B52B6] text-white' 
                  : 'bg-[#CFCDEC] text-white cursor-not-allowed'
              }`}
            >
              Make Withdrawal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletPayoutContent
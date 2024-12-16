import React, { useState } from 'react';
import Image from "next/image"

import NoDocuments from "../../public/assets/NoDocuments.svg"
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import { SearchIcon } from 'lucide-react';
import NotificationIcon from "../../public/assets/NotificationIcon.svg"
import ChatIcon from "../../public/assets/ChatIcon.svg"
import MyProfile from "../../public/assets/MyProfile.svg"
import Arrowdown from "../../public/assets/Arrowdown.svg"
import profile from "../../public/assets/profile.svg"
import LogOutIcon from "../../public/assets/LogOutIcon.svg"
import Modal from './Modal';



const SubscriptionContent = () => {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div>
       <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-10">
            <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">Subscription</h1>
            <div>
              <div className="relative flex items-center w-[479px] h-[40px] mx-auto">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pr-10 pl-10 py-2 border-none bg-[#F0F0F9] rounded-[100px] w-full text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <div className="absolute left-3">
                  <SearchIcon className="w-[24px] h-[24px] text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[10px] border-l-[1px] border-[#D0D0D3] pl-[20px]">
          <div>
            <Image width={24} height={24} src={NotificationIcon} alt="NotificationIcon"/>
          </div>
          <div>
            <Image width={24} height={24} src={ChatIcon} alt="ChatIcon"/>
          </div>
          <div>
            <div className="flex items-center gap-[10px] cursor-pointer" onClick={toggleOverlay}>
              <div>
                <Image width={24} height={24} src={MyProfile} alt="MyProfile" />
              </div>
              <div>
                <h1 className="text-[13px] leading-[19.5px] text-[#101828] font-semibold">Dora Consulting</h1>
                <p className="text-[#41404B] text-[13px] leading-[19.5px] font-normal">Consultant</p>
              </div>
              <div>
                <Image width={16} height={16} src={Arrowdown} alt="Arrowdown" />
              </div>
            </div>

            {isOverlayVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={toggleOverlay}>
                <div className="bg-white flex flex-col items-start gap-y-[12px] p-[8px] w-[134px] rounded-lg shadow-lg absolute top-20 right-6">
                  <div className='flex items-center gap-[12px]'>
                    <Image width={24} height={24} src={profile} alt="profile" />
                    <h2 className='text-[#101828] text-[13px] leading-[19.5px] font-normal'>Profile</h2>
                  </div>
                  <div className='flex items-center gap-[12px]'>
                    <Image width={24} height={24} src={LogOutIcon} alt="LogOutIcon" />
                    <h2 className='text-[#101828] text-[13px] leading-[19.5px] font-normal'>Log Out</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-[24px]">
        <Separator />
      </div>


      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image src={NoDocuments} alt="NoDocuments" />
            </div>
            <h1 className="text-[#101828] text-[25px] leading-[37.5px] font-bold ">No Subscription yet!</h1>
            <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal max-w-[378px] w-full text-center">In order to activate your Consultia account, you are required to subscribe to a plan. </p>


            <div className="pt-10">
              <button 
                onClick={toggleModal}
                className="flex items-center bg-[#5B52B6] max-w-[216px] w-full rounded-[8px] p-[10px] gap-[10px] text-[16.5px] leading-[19.8px] font-bold text-white">
                Subscribe to a plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && <Modal onClose={toggleModal} />}
    </div>
  )
}

export default SubscriptionContent
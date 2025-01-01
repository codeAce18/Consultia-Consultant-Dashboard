import React, { useState } from 'react';
import Image from "next/image"

import NoDocuments from "../../public/assets/NoDocuments.svg"
import { Separator } from "@/components/ui/separator"

import Modal from './Modal';
import DashboardHeader from './DashboardHeader';



interface SubscriptionContentProps {
  setActiveComponent: (component: string) => void;
}

const SubscriptionContent: React.FC<SubscriptionContentProps> = ({ setActiveComponent }) => {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };




  return (
    <div>
      {/* Header for the Subscription Screen */}
      
      <DashboardHeader title="Subscription" setActiveComponent={setActiveComponent} />

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
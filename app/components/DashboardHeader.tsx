import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import NotificationIcon from "../../public/assets/NotificationIcon.svg";
import MyProfile from "../../public/assets/MyProfile.svg";
import ChatIcon from "../../public/assets/ChatIcon.svg";
import profile from "../../public/assets/profile.svg";
import Arrowdown from "../../public/assets/Arrowdown.svg";
import LogOutIcon from "../../public/assets/LogOutIcon.svg";

interface HeaderProps {
  title: string;
  setActiveComponent: (component: string) => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({ title , setActiveComponent }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);




  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white shadow-sm rounded-md">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h1>
        <div className="relative flex items-center w-full md:w-[400px]">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-10 pl-10 py-2 border-none bg-gray-100 rounded-full w-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <SearchIcon className="absolute left-3 w-5 h-5 text-gray-500" />
        </div>
      </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 mt-4 md:mt-0 relative">
            <Image width={24} height={24} src={NotificationIcon} alt="Notifications" />

            <Image
                width={24}
                height={24}
                src={ChatIcon}
                alt="Chat"
                className="cursor-pointer"
                onClick={() => setActiveComponent("Chat")}
            />

            <div className="relative">
                <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleOverlay}
                >
                <Image width={24} height={24} src={MyProfile} alt="My Profile" />
                <div className="hidden md:block">
                    <h2 className="text-sm font-semibold text-gray-800">Dora Consulting</h2>
                    <p className="text-sm text-gray-500">Consultant</p>
                </div>
                <Image width={16} height={16} src={Arrowdown} alt="Arrow Down" />
                </div>

                {/* Overlay */}
                {isOverlayVisible && (
                <div
                    className="absolute  pt-10  right-0 mt-2 bg-white flex flex-col items-start gap-4 p-4 rounded-lg shadow-lg w-[150px] z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-3">
                    <Image width={24} height={24} src={profile} alt="Profile" />
                    <span className="text-sm text-gray-800">Profile</span>
                    </div>
                    <div className="flex items-center gap-3">
                    <Image width={24} height={24} src={LogOutIcon} alt="Log Out" />
                    <span className="text-sm text-gray-800">Log Out</span>
                    </div>
                </div>
                )}
            </div>
        </div>

    </header>
  );
};

export default DashboardHeader;

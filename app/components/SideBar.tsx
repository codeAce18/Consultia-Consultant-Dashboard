import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from 'lucide-react';

import DashboardLogoo from "../../public/assets/DashboardLogoo.svg";
import DashboardIconNormal from "../../public/assets/DashboardIconNormal.svg";
import DashboardIconWhite from "../../public/assets/DashboardIconWhite.svg";
import JobOrderIcon from "../../public/assets/JobOrderIcon.svg";
import JobOrderIconWhite from "../../public/assets/JobOrderIconWhite.svg";
import InvoiceIcon from "../../public/assets/InvoiceIcon.svg";
import InvoiceWhiteIcon from "../../public/assets/InvoiceWhiteIcon.svg";
import ProjectManageIcon from "../../public/assets/ProjectManageIcon.svg";
import ProjectManageWhiteIcon from "../../public/assets/ProjectManageWhiteIcon.svg";
import ComplianceTrackingIcon from "../../public/assets/ComplianceTrackingIcon.svg";
import ComplianceTrackingWhiteIcon from "../../public/assets/ComplianceTrackingWhiteIcon.svg";
import WalletIcon from "../../public/assets/WalletIcon.svg";
import WalletWhiteIcon from "../../public/assets/WalletWhiteIcon.svg";
import SubscriptionIcon from "../../public/assets/SubscriptionIcon.svg";
import SubscriptionWhiteIcon from "../../public/assets/SubscriptionWhiteIcon.svg";
import SettingsIcon from "../../public/assets/SettingsIcon.svg";
import SettingsIconWhite from "../../public/assets/SettingsIconWhite.svg";
import LogOutIcon from "../../public/assets/LogOutIcon.svg";
import LogOutIconWhite from "../../public/assets/LogOutIconWhite.svg";
import NairaSvg from "../../public/assets/NairaSvg.svg";
import TopUpIcon from "../../public/assets/TopUpIcon.svg";
import ShareIcon from "../../public/assets/ShareIcon.svg";
import MoreIcon from "../../public/assets/MoreIcon.svg";
import WithdrawIcon from "../../public/assets/WithdrawIcon.svg";

import DashboardContent from "./DashboardContent";
import JobOrderContent from "./JobOrderContent";
import InvoiceContent from "./InvoiceContent";
import ComplianceTrackingContent from "./ComplianceTrackingContent";
import ProjectManagementContent from "./ProjectManagementContent";
import WalletPayoutContent from "./WalletPayoutContent";
import SubscriptionContent from "./SubscriptionContent";
import SettingsContent from "./SettingsContent";
import WalletContent from "./WalletContent";


import ChatContent from "./ChatContent";


const SideBar = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Dashboard");

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogoutClick = () => {
        router.push('/login');
    };

    const isActive = (componentName: string) => activeComponent === componentName;



    // Reusable menu link component
    interface MenuLinkProps {
        name: string;
        icon: string;
        whiteIcon: string;
        onClick: () => void;
        customClass?: string;
    }

    const MenuLink: React.FC<MenuLinkProps> = ({ name, icon, whiteIcon, onClick, customClass = "" }) => (
        <div
            onClick={() => {
                onClick();
                setIsMobileMenuOpen(false);
            }}
            className={`flex items-center p-4 cursor-pointer rounded-lg duration-200 max-w-[235px] mx-auto group ${
                isActive(name)
                    ? "bg-[#5B52B6] text-white border-l-[6px] border-l-[#CFCDEC]"
                    : "text-[#7B91B0] hover:bg-[#5B52B6] hover:text-white hover:border-l-[6px] hover:border-l-[#CFCDEC]"
            } ${customClass}`}
        >
            <div className="relative w-8 h-8">
                <Image
                    src={icon}
                    alt={`${name}Icon`}
                    className={`absolute top-0 left-0 transition-opacity duration-200 ${
                        isActive(name) ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                    }`}
                />
                <Image
                    src={whiteIcon}
                    alt={`${name}WhiteIcon`}
                    className={`absolute top-0 left-0 transition-opacity duration-200 ${
                        isActive(name) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                />
            </div>
            <h1 className="ml-2 font-medium">{name}</h1>
        </div>
    );

    return (
        <div className="flex relative">
            {/* Mobile Menu Toggle Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-[#5B52B6] fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed lg:translate-x-0 transition-transform duration-300 w-[290px] h-screen bg-white border-r-[2px] z-40 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full overflow-y-auto scrollbar-hide">
                    {/* Logo */}
                    <div className={`pt-6 ${isMobileMenuOpen ? 'pl-16' : ''}`}>
                        <Link href="/">
                            <div className="max-w-[235px] mx-auto">
                                <Image src={DashboardLogoo} alt="DashboardLogoo" />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <div className="pt-16">
                        <MenuLink
                            name="Dashboard"
                            icon={DashboardIconNormal}
                            whiteIcon={DashboardIconWhite}
                            onClick={() => setActiveComponent("Dashboard")}
                        />

                        <div className="max-w-[195px] py-6 mx-auto">
                            <h1 className="text-[14px] leading-[21px] font-semibold text-[#D8D7DE]">OTHER FEATURES</h1>
                        </div>

                        <MenuLink
                            name="Job Order Registry"
                            icon={JobOrderIcon}
                            whiteIcon={JobOrderIconWhite}
                            onClick={() => setActiveComponent("Job Order Registry")}
                            customClass="mt-6"
                        />

                        <MenuLink
                            name="Project Management"
                            icon={ProjectManageIcon}
                            whiteIcon={ProjectManageWhiteIcon}
                            onClick={() => setActiveComponent("Project Management")}
                            customClass="mt-6"
                        />

                        <MenuLink
                            name="Compliance Tracking"
                            icon={ComplianceTrackingIcon}
                            whiteIcon={ComplianceTrackingWhiteIcon}
                            onClick={() => setActiveComponent("Compliance Tracking")}
                            customClass="mt-6"
                        />

                        <MenuLink
                            name="Invoice & Payment"
                            icon={InvoiceIcon}
                            whiteIcon={InvoiceWhiteIcon}
                            onClick={() => setActiveComponent("Invoice & Payment")}
                            customClass="mt-6"
                        />

                        <MenuLink
                            name="Wallet & Payout"
                            icon={WalletIcon}
                            whiteIcon={WalletWhiteIcon}
                            onClick={() => setActiveComponent("Wallet & Payout")}
                            customClass="mt-6"
                        />

                        <MenuLink
                            name="Subscriptions"
                            icon={SubscriptionIcon}
                            whiteIcon={SubscriptionWhiteIcon}
                            onClick={() => setActiveComponent("Subscriptions")}
                            customClass="mt-6"
                        />

                        <div className="max-w-[235px] border-b-[1px] border-b-[#F0F0F9] mx-auto mt-6"></div>

                        <MenuLink
                            name="Settings"
                            icon={SettingsIcon}
                            whiteIcon={SettingsIconWhite}
                            onClick={() => setActiveComponent("Settings")}
                            customClass="mt-6"
                        />

                        {/* Logout Button */}
                        <div className="pt-6">
                            <div 
                                onClick={handleLogoutClick}
                                className="flex items-center p-4 cursor-pointer rounded-lg duration-200 max-w-[235px] mx-auto hover:bg-[#5B52B6] group text-[#7B91B0] hover:text-white hover:border-l-[6px] hover:border-l-[#CFCDEC]"
                            >
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={LogOutIcon}
                                        alt="LogOutIcon"
                                        className="absolute top-0 left-0 transition-opacity duration-200 group-hover:opacity-0"
                                    />
                                    <Image
                                        src={LogOutIconWhite}
                                        alt="LogOutIconWhite"
                                        className="absolute top-0 left-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                                <h1 className="ml-2 font-medium">Log Out</h1>
                            </div>
                        </div>

                        {/* Wallet Card */}
                        <div className="pt-16 pb-10">
                            <div 
                                className="bg-[#5B52B6] max-w-[235px] cursor-pointer p-4 rounded-lg mx-auto"
                                onClick={() => setActiveComponent("Wallet")}
                            >
                                <div className="border-b-[1px] border-b-[#F1F1F1] pb-[5px]">
                                    <h1 className="text-[20px] leading-[30px] font-bold text-white">Wallet</h1>
                                </div>

                                <div className="pt-[15px]">
                                    <p className="text-[16px] leading-[24px] font-normal text-[#F1F1F1]">Available Balance</p>
                                    <div className="flex gap-[10px] pt-[5px]">
                                        <Image width={16} height={18} src={NairaSvg} alt="NairaSvg" />
                                        <h1 className="text-[20px] leading-[30px] font-bold text-white">
                                            00.<span className="text-[14px] leading-[21px] font-bold">00</span>
                                        </h1>
                                    </div>
                                </div>

                                <div className="pt-16 flex items-center justify-between">
                                    <div className="text-center">
                                        <Image className="mx-auto mb-2" src={TopUpIcon} alt="TopUpIcon" />
                                        <p className="text-[13px] leading-[19.5px] font-normal text-white">Top Up</p>
                                    </div>
                                    <div className="text-center">
                                        <Image className="mx-auto mb-2" src={WithdrawIcon} alt="WithdrawIcon" />
                                        <p className="text-[13px] leading-[19.5px] font-normal text-white">Withdraw</p>
                                    </div>
                                    <div className="text-center">
                                        <Image className="mx-auto mb-2" src={ShareIcon} alt="ShareIcon" />
                                        <p className="text-[13px] leading-[19.5px] font-normal text-white">Share</p>
                                    </div>
                                    <div className="text-center">
                                        <Image className="mx-auto mb-2" src={MoreIcon} alt="MoreIcon" />
                                        <p className="text-[13px] leading-[19.5px] font-normal text-white">More</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 w-full min-h-screen bg-[#F9FAFE]
                ${isMobileMenuOpen ? 'lg:ml-[290px]' : 'ml-0 lg:ml-[290px]'}`}>
                <div className="px-4 lg:px-10 py-6 pt-16 lg:pt-6">
                    {activeComponent === "Dashboard" && <DashboardContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Job Order Registry" && <JobOrderContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Project Management" && <ProjectManagementContent  setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Compliance Tracking" && <ComplianceTrackingContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Invoice & Payment" && <InvoiceContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Wallet & Payout" && <WalletPayoutContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Subscriptions" && <SubscriptionContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Settings" && <SettingsContent  setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Wallet" && <WalletContent setActiveComponent={setActiveComponent} />}
                    {activeComponent === "Chat" && <ChatContent />}
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default SideBar;
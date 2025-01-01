// app/components/Modal.tsx
'use client';
import Image from "next/image";

import Cross from "../../public/assets/Cross.svg"

import blueTickCircle from "../../public/assets/blueTickCircle.svg"

import whiteCheck from "../../public/assets/whiteCheck.svg"


interface ModalProps {
  onClose: () => void;
  
}





const Modal: React.FC<ModalProps> = ({ onClose }) => {
    

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white overflow-y-auto scrollbar-hide min-h-[614px]  rounded-lg p-6 text-center transform transition-all duration-500 ease-in-out translate-y-[-100%] animate-slide-in  w-full max-w-[758px] h-screen md:h-auto md:min-h-[614px]  relative">

        <div>
            <div className="flex flex-col items-start justify-start border-b-[1px] w-full pb-[20px]">
                <h1 className="text-[#101828] text-[20px] leading-[30px] font-bold">
                    Select Plan!
                </h1>
                <h1 className="text-[#41404B] text-[16px] leading-[22.4px]">Simple and flexible per-user pricing</h1>
            </div>

            <button
                onClick={onClose}
                className="absolute top-[34px] right-10 z-50"
                >
                <Image src={Cross} alt="Cross" />
            </button>
        </div>




        <div className="pt-16 ">
            <div className="w-full px-4 py-8">
                <div className=" flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 ">
                    <div className="w-full sm:w-[80%] lg:w-[188.81px] flex flex-col items-start  bg-[#FFFFFF] justify-start rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-auto lg:h-[322.25px]">
                        <h1 className="text-[#101828] text-[12.12px] leading-[14.66px] font-semibold">Professional Plan</h1>

                        <h1 className="pt-[10px] text-[#101828] text-[18.17px] leading-[21.99px] font-semibold">N10,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="w-full pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#5B52B6] w-full lg:w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#FFFFFF] text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col items-start justify-start w-full">
                            <h1 className="text-[#101828] text-[10.1px] leading-[12.22px] font-semibold">Core Features</h1>

                            <div className="pt-[8px] flex flex-col space-y-[6px] items-start justify-start w-full">
                                {[
                                    "Client Onboarding",
                                    "Basic Task Management",
                                    "Basic Compliance Tracking",
                                    "Invoicing",
                                    "Up to 5 clients",
                                    "Email Support",
                                    "Best for small consultancies just getting started"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-[4.04px]">
                                        <Image src={blueTickCircle} alt="blueTickCircle" />
                                        <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Essential Plan */}
                    <div className="w-full sm:w-[80%] lg:w-[188.81px] flex flex-col items-start bg-[#FFFFFF] justify-start rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-auto lg:h-[342.44px]">
                        <h1 className="text-[#101828] text-[12.12px] leading-[14.66px] font-semibold">Essential Plan</h1>

                        <h1 className="pt-[10px] text-[#101828] text-[18.17px] leading-[21.99px] font-semibold">N30,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="w-full pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#5B52B6] w-full lg:w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#FFFFFF] text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col items-start justify-start w-full">
                            <h1 className="text-[#101828] text-[10.1px] leading-[12.22px] font-semibold">Core Features</h1>

                            <div className="pt-[8px] flex flex-col space-y-[6px] items-start justify-start w-full">
                                {[
                                    "Everything in essential",
                                    "Advanced Task Management",
                                    "Advanced Compliance Tracking",
                                    "Reporting & Analytics",
                                    "Up to 20 clients",
                                    "Priority Email Support",
                                    "Phone Support",
                                    "Best for growing firms needing more robust tool"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-[4.04px]">
                                        <Image src={blueTickCircle} alt="blueTickCircle" />
                                        <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="w-full sm:w-[80%] lg:w-[188.81px] flex flex-col items-start bg-[#5B52B6] justify-start rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-auto lg:h-[360.61px]">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-[#FFFFFF] text-[12.12px] leading-[14.66px] font-semibold">Enterprise Plan</h1>
                            <h1 className="bg-[#FFFFFF] rounded-[50.48px] p-[5.05px] text-[#101828] text-[5.05px] leading-[6.06px] font-bold">
                                BEST VALUE
                            </h1>
                        </div>

                        <h1 className="pt-[10px] text-[#FFFFFF] text-[18.17px] leading-[21.99px] font-semibold">N10,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="w-full pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#FFFFFF] w-full lg:w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#5B52B6] font-bold text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col items-start justify-start w-full">
                            <div className="pt-[8px] flex flex-col space-y-[6px] items-start justify-start w-full">
                                {[
                                    "Everything in professional",
                                    "Custom Workflows",
                                    "API Access",
                                    "Premium Support",
                                    "Dedicated Account Manager",
                                    "Unlimited clients",
                                    "24/7 Premium Support",
                                    "Custom Training",
                                    "Best for large firms with complex needs and multiple teams"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-start gap-[4.04px]">
                                        <Image src={whiteCheck} alt="whiteCheck" />
                                        <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>









       
  );
};

export default Modal;

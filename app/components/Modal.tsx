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
      <div className="bg-white w-[758px] min-h-[614px]  rounded-lg p-6 text-center transform transition-all duration-500 ease-in-out translate-y-[-100%] animate-slide-in">

        <div className="flex flex-col items-start justify-start border-b-[1px] w-full pb-[20px]">

            <h1 className="text-[#101828] text-[20px] leading-[30px] font-bold">
                Select Plan!
            </h1>

            <h1 className="text-[#41404B] text-[16px] leading-[22.4px]">Simple and flexible per-user pricing</h1>
        </div>


        <div className="pt-16">


            <div className="flex items-start justify-center gap-10">
                <div>
                    <div className="flex flex-col items-start bg-[#FFFFFF] justify-start w-[188.81px]  rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-[322.25px]">
                        <h1 className="text-[#101828] text-[12.12px] leading-[14.66px] font-semibold">Professional Plan</h1>


                        <h1 className="pt-[10px] text-[#101828] text-[18.17px] leading-[21.99px] font-semibold">N10,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#5B52B6] w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#FFFFFF] text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col  items-start justify-start">
                            <h1 className="text-[#101828] text-[10.1px] leading-[12.22px] font-semibold">Core Features</h1>

                            <div className="pt-[8px] flex flex-col space-y-[6px] items-start justify-start">
                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Client Onboarding</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Basic Task Management</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Basic Compliance Tracking</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Invoicing</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Up to 5 clients</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Email Support</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal text-start">Best for small consultancies just <br /> getting started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div>
                    <div className="flex flex-col items-start bg-[#FFFFFF] justify-start w-[188.81px]  rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-[342.44px]">
                        <h1 className="text-[#101828] text-[12.12px] leading-[14.66px] font-semibold">Essential Plan</h1>


                        <h1 className="pt-[10px] text-[#101828] text-[18.17px] leading-[21.99px] font-semibold">N30,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#5B52B6] w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#FFFFFF] text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col items-start justify-start">
                            <h1 className="text-[#101828] text-[10.1px] leading-[12.22px] font-semibold">Core Features</h1>

                            <div className="pt-[8px] flex flex-col items-start space-y-[6px] justify-start">
                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Everythig in essential</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Advanced Task Management</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Advanced Compliance Tracking</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Reporting & Analytics</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Up to 20 clients</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal">Priority Email Support</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal text-start">Phone Support</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={blueTickCircle} alt="blueTickCircle" />

                                    <p className="text-[#101828] text-[8.33px] leading-[11.66px] font-normal text-start">Best for growing firms needing more robust tool</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="flex flex-col items-start bg-[#5B52B6] justify-start w-[188.81px]  rounded-[10.1px] border-[0.5px] p-[12.12px] border-[#BEC3CE] h-[360.61px]">


                        <div className="flex items-center gap-10">
                            <h1 className="text-[#FFFFFF] text-[12.12px] leading-[14.66px] font-semibold">Enterprise Plan</h1>

                            <h1 className="bg-[#FFFFFF] rounded-[50.48px] p-[5.05px] text-[#101828] text-[5.05px] leading-[6.06px] font-bold">
                                BEST VALUE
                            </h1>
                        </div>

                        <h1 className="pt-[10px] text-[#FFFFFF] text-[18.17px] leading-[21.99px] font-semibold">N10,000/<span className="font-normal">Month</span></h1>

                        <p className="text-[#5B52B6] text-[10.1px] leading-[15.15px]">14 Days Free Trials</p>
                        
                        <div className="pt-[10px] border-b-[0.5px] border-b-[#CFCDEC] pb-[16px]">
                            <button className="bg-[#FFFFFF] w-[164.58px] rounded-[4.04px] p-[5.05px] h-[24.23px] text-[#5B52B6] font-bold text-[8.33px] leading-[10px]">
                                Choose Plan
                            </button>
                        </div>

                        <div className="pt-[16px] flex flex-col items-start justify-start">

                      
                            <h1 className="text-[#101828] text-[10.1px] leading-[12.22px] font-semibold"></h1>

                                
                          


                            <div className="pt-[8px] flex flex-col items-start space-y-[6px] justify-start">
                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">Everything in professional</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">Custom Workflows</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">API Access</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">Premium Support</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">Dedicated Account Manager</p>
                                </div>

                                <div className="flex items-center gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal">Unlimited clients</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal text-start">24/7 Premium Support</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal text-start">Custom Training</p>
                                </div>

                                <div className="flex items-start justify-start gap-[4.04px]">
                                    <Image src={whiteCheck} alt="whiteCheck" />

                                    <p className="text-[#FFFFFF] text-[8.33px] leading-[11.66px] font-normal text-start">Best for large firms with complex needs and multiple teams</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    


                    


                



            </div>



        </div>



        <button
          onClick={onClose}
          className="absolute top-[34px] right-10 z-50"
        >
          <Image src={Cross} alt="Cross" />
        </button>


       
      </div>
    </div>
  );
};

export default Modal;

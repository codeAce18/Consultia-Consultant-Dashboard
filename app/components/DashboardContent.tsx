import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import { SearchIcon } from 'lucide-react';

import Image from "next/image";

import NotificationIcon from "../../public/assets/NotificationIcon.svg"

import more from "../../public/assets/more.svg"

import ChatIcon from "../../public/assets/ChatIcon.svg"

import AddCircle from "../../public/assets/AddCircle.svg"

import MyProfile from "../../public/assets/MyProfile.svg"

import profile from "../../public/assets/profile.svg"

import Arrowdown from "../../public/assets/Arrowdown.svg"

import LogOutIcon from "../../public/assets/LogOutIcon.svg"


import TotalClientsIcon from "../../public/assets/TotalClientsIcon.svg"

import TotalJobOrdersIcon from "../../public/assets/TotalJobOrdersIcon.svg"

import TotalRevenueIcon from "../../public/assets/TotalRevenueIcon.svg"

import TotalWithdrawalIcon from "../../public/assets/TotalWithdrawalIcon.svg"
import IncomeSummaryChart from './Charts/IncomeSummaryChart';
import OngoingTask from './OngoingTask';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';



import eye from "../../public/assets/eye.svg"

import CancelIcon from "../../public/assets/CancelIcon.svg"

// Define types for job order data
interface Client {
  name: string;
  location: string;
  image: string;
}

interface JobOrderDates {
  start: string;
  due: string;
}

interface JobOrder {
  id: number;
  client: Client;
  serviceType: string;
  dates: JobOrderDates;
  status: Status;
}

// Define Status type with a specific set of values
type Status = 'New' | 'Ongoing' | 'Completed' | 'Rejected';

// Custom status styling
const statusStyles: Record<Status, { bg: string; text: string }> = {
  'New': { bg: '#5B52B61A', text: '#5B52B6' },
  'Ongoing': { bg: '#FAD9C2', text: '#F87B24' },
  'Completed': { bg: '#D2F6D2', text: '#008000' },
  'Rejected': { bg: '#F5BFC1', text: '#DD2025' }
};

const initialJobOrders: JobOrder[] = [
  {
    id: 1,
    client: {
      name: 'Femi Akingbola',
      location: 'Lagos, Nigeria',
      image: '/assets/Femi.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'New'
  },
  {
    id: 2,
    client: {
      name: 'Faith Bamidele',
      location: 'Lagos, Nigeria',
      image: '/assets/Faith.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'New'
  },

  {
    id: 3,
    client: {
      name: 'Olivia Williams',
      location: 'Atlanta, USA.',
      image: '/assets/Olivia.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Ongoing'
  },


  {
    id: 4,
    client: {
      name: 'David McCarthy ',
      location: 'London, United Kingdom',
      image: '/assets/David.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Ongoing'
  },

  {
    id: 5,
    client: {
      name: 'Omar Al Maktoum',
      location: 'Abu Dhabi, UAE',
      image: '/assets/Omar.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Ongoing'
  },

  {
    id: 6,
    client: {
      name: 'Olivia Martinez',
      location: 'New York, United States',
      image: '/assets/Martinez.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Ongoing'
  },
];


interface DashboardContentProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}




const DashboardContent: React.FC<DashboardContentProps> = ({ setActiveComponent }) => {

  const handleViewAllClick = () => {
    setActiveComponent("JobOrder"); // Switch to JobOrderContent when clicked
  };
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const toggleDropdown = (index: number) => {
    setDropdownState((prevState) => {
      const newState = { ...prevState };
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const [dropdownState, setDropdownState] = useState<{ [key: number]: boolean }>({});

  const handlePreviewClick = () => {
    // setIsSheetOpen(true); 
    setDropdownState({}); // Close all dropdowns
  };

  const handleCancelClick = () => {
    setDropdownState({}); // Close all dropdowns
  };

  return (
    <div>
      {/* Header for the Dashboard Screen */}
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-10">
            <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">Dashboard</h1>
            <div>
              <div className="relative flex items-center w-[479px] h-[40px] mx-auto">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="pr-10 pl-10 py-2 border-none bg-[#F0F0F9] rounded-[100px]  w-full text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
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
            <Image  width={24} height={24}  src={ChatIcon} alt="ChatIcon"/>
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

      <div className="pt-10">
        <div className='flex items-center justify-between'>
          <h1 className="text-[#101828] leading-[30px] text-[20px] font-normal">Welcome to Consultia,    <span className="font-bold">Dora Consulting Ltd.</span></h1>

          <div>
            <button className='w-[257px] p-[10px] flex items-center rounded-[8px] gap-[10px] bg-[#FF7D20] text-[#FFFFFF] text-[16.5px] leading-[19.8px] font-bold'>
              <Image width={24} height={24} src={AddCircle} alt="AddCircle" />
              Activate Your Business
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="grid grid-cols-4 gap-8">

          <div className="bg-[#FFFFFF] rounded-[8px] border-[1px] shadow-custom  border-[#F0F0F9] max-w-[260px] p-[16px] w-full">
            <div className="flex items-center gap-[5px]">
              <Image width={37} height={37} src={TotalClientsIcon} alt="TotalClientsIcon" />
              <h1 className="text-[24px] leading-[28.8px] font-bold text-[#101828]">2,850</h1>
            </div>
            <h1 className="text-[#7B91B0] pt-[20px] text-left text-[16px] leading-[24px] font-normal">Total Clients</h1>
          </div>

          <div className="bg-[#FFFFFF] rounded-[8px] border-[1px] shadow-custom  border-[#F0F0F9] max-w-[260px] p-[16px] w-full">
            <div className="flex items-center gap-[5px]">
              <Image width={37} height={37} src={TotalJobOrdersIcon} alt="TotalJobOrdersIcon" />
              <h1 className="text-[24px] leading-[28.8px] font-bold text-[#101828]">1,800</h1>
            </div>
            <h1 className="text-[#7B91B0] pt-[20px] text-left text-[16px] leading-[24px] font-normal">Total Job Orders</h1>
          </div>

          <div className="bg-[#FFFFFF] w-full rounded-[8px] border-[1px] shadow-custom  border-[#F0F0F9] max-w-[260px] p-[16px]">
            <div className="flex items-center gap-[5px]">
              <Image width={37} height={37} src={TotalRevenueIcon} alt="TotalRevenueIcon" />
              <h1 className="text-[24px] leading-[28.8px] font-bold text-[#101828]">₦400,000,000</h1>
            </div>
            <h1 className="text-[#7B91B0] pt-[20px] text-left text-[16px] leading-[24px] font-normal">Total Revenue</h1>
          </div>

          <div className="bg-[#FFFFFF] rounded-[8px] w-full border-[1px] shadow-custom  border-[#F0F0F9] max-w-[260px] p-[16px]">
            <div className="flex items-center gap-[5px]">
              <Image width={37} height={37} src={TotalWithdrawalIcon} alt="TotalWithdrawalIcon" />
              <h1 className="text-[24px] leading-[28.8px] font-bold text-[#101828]">₦320,000,000</h1>
            </div>
            <h1 className="text-[#7B91B0] pt-[20px] text-left text-[16px] leading-[24px] font-normal">Total Withdrawal</h1>
          </div>
        </div>
      </div>

      <div className='pt-[20px]'>
        <div className="flex gap-6 w-full">

          <IncomeSummaryChart />
            
          <div className="flex flex-col items-end justify-end">
            <div className="bg-[#FFFFFF] w-[323.67px] h-[342.96px] p-[17.83px] overflow-y-auto scrollbar-thin">
              <div className="flex items-center justify-between">
                <h1 className="text-[#101828] text-[20px] leading-[30px] font-bold">Ongoing Tasks</h1>
                <Image width={21.5} height={21.5} src={more} alt="more" />
              </div>

              <div className="pt-[25px] bg-white">
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Business Strategy Development" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Organizational Restructuring" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Tax Advisory and Compliance" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Fundraising Strategy and Execution" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>

                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <OngoingTask label="Change Management" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='pt-10 flex items-center justify-between'>
          <h1 className='text-[#101828] text-[20px] leading-[30px] font-bold'>Recent Job Orders</h1>
  
          <button 
            onClick={handleViewAllClick}
            className='bg-[#5B52B6] text-[14px] leading-[16.8px] font-normal text-white w-[96px] p-[10px] rounded-[8px]'>
            View All
          </button>
        </div>

      </div>
      <div className="mt-8">
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Client Name</h1></TableCell>
                <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Service Type</h1></TableCell>
                <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Start/Due Date</h1></TableCell>
                <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Status</h1></TableCell>
                <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">More</h1></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='bg-[#F9FAFE]'>
            {initialJobOrders.map((order, index) => (
              <TableRow key={order.id}>
                {/* Client Name */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={order.client.image}
                      alt={order.client.name}
                    />
                    <div>
                      <div className="text-[#101828] text-[14px] leading-[21px] font-bold">
                        {order.client.name}
                      </div>
                      <div className="text-[#A3A2AB] text-[11px] leading-[16.5px] font-normal">
                        {order.client.location}
                      </div>
                    </div>
                  </div>
                </TableCell>
                {/* Service Type */}
                <TableCell>
                  <div className='text-[#41404B] text-[14px] leading-[21px] font-normal'>
                    {order.serviceType}
                  </div>
                </TableCell>
                {/* Start/Due Date */}
                <TableCell>
                  <div className="text-[#101828] text-[14px] leading-[21px] font-normal">
                    {order.dates.start} / {order.dates.due}
                  </div>
                </TableCell>
                {/* Status */}
                <TableCell>
                  <div
                    className="px-3 py-1 rounded-full max-w-[96px] w-full flex items-center justify-center text-[14px] leading-[21px] font-medium"
                    style={{
                      backgroundColor: statusStyles[order.status].bg,
                      color: statusStyles[order.status].text
                    }}
                  >
                    {order.status}
                  </div>
                </TableCell>
                {/* More */}
                <TableCell>
                  <div className="relative">
                    <IconButton onClick={() => toggleDropdown(index)}>
                      <MoreVert />
                    </IconButton>
                    {dropdownState[index] && (
                      <div className="absolute right-0 z-10 w-[124px] bg-white shadow-md rounded-md">
                        <div
                          className="flex items-center gap-[15px] p-2 cursor-pointer"
                          onClick={handlePreviewClick}
                        >
                          <Image width={24} height={24} src={eye} alt="eye" />
                          View
                        </div>
                        <div
                          className="flex items-center gap-[15px] p-2 cursor-pointer"
                          onClick={handleCancelClick}
                        >
                          <Image width={24} height={24} src={CancelIcon} alt="CancelIcon" />
                          Cancel
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        
          </Table>
        </TableContainer>
      </div>

       

    </div>


      


  )
}

export default DashboardContent
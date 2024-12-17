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

import FileUploadField from './FileUploadField';

import { useCallback } from 'react';


import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { useDropzone } from 'react-dropzone';

import CircularProgressBar from './CircularProgressBar';
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [percentage, setPercentage] = useState(10);
  const [uploadedFiles, setUploadedFiles] = useState<{
    cacDocument: File | null;
    memorandum: File | null;
    shareAllotment: File | null;
    utilityBill: File | null;
  }>({
    cacDocument: null,
    memorandum: null,
    shareAllotment: null,
    utilityBill: null,
  });
  const [isBusinessActivated, setIsBusinessActivated] = useState(false);
  const [activeTab, setActiveTab] = useState('Business Info');

  const handleActivateBusiness = () => {
    setIsBusinessActivated(true);
  };

  const handleBackToDashboard = () => {
    setIsBusinessActivated(false);
  };

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

  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: false,
  });


  const handleFileSelect = (file: File | null, fieldName: string) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploaded Files:', uploadedFiles);
  };


  const tabs = [
    'Business Info', 
    'Payout Account Info', 
    'Incorporation Doc', 
    'BVN of Primary Officer', 
    'Other Info', 
    'Summary'
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Business Info':
        return (
         <div className='pt-[20px]'>
            <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
              <div>
                <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
                <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                  Kindly provide the information requested below
                  about your business for our review and verification.
                  Your account will be activated once requested
                  information is completely provided and verified.
                </p>
              </div>

              <div>
                <CircularProgressBar percentage={percentage} size={120} strokeWidth={12} />
              </div>
            </div>

            <div className='pt-10'>
              <div className="border rounded-lg p-6 shadow-md bg-white max-w-[912px] mx-auto">
                <div className='mb-[10px] border-b-[1px] border-b-[#F1F1F1] pb-[20px]'>
                  <h2 className="text-[#101828] text-[20px] leading-[30px] font-medium">Company Profile</h2>
                  <p className="pt-10 text-[#F87B24] text-[16px] leading-[24px] font-normal">
                    All fields marked with <span className="font-bold">*</span> are required.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Company Registration Number */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="registrationNumber">Company Registration Number<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="registrationNumber" placeholder="Enter registration number" />
                    </div>
                  </div>
                  {/* Years in Business */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="yearsInBusiness">Years in Business<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="yearsInBusiness" placeholder="Input years in business" />
                    </div>
                  </div>
                  {/* Number of Staff */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="numberOfStaff">Number of Staff<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="numberOfStaff" placeholder="Input the number of staff" />
                    </div>
                  </div>
                  {/* Business Email */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="businessEmail">Business Email<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="businessEmail" placeholder="Type in your company email" />
                    </div>
                  </div>
                  {/* Country of Operation */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium' htmlFor="country">Country of Operation<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="country" className='max-w-[336px] w-full bg-[#F0F0F9] '>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* State */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="state">State<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="state" className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state1">State 1</SelectItem>
                          <SelectItem value="state2">State 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* City */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="city">City<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="city" className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <SelectValue placeholder="Select your city of operation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="city1">City 1</SelectItem>
                          <SelectItem value="city2">City 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Address */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="address">Address<span className='text-[#F87B24]'>*</span></Label>
                    <div>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="address" placeholder="Type in full address" />
                    </div>
                  </div>
                  {/* Company Website */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="website">Company Website<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="website" placeholder="Enter your website link" />
                    </div>
                  </div>
                  {/* Year of Registration */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>Year of Registration<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Popover>
                        <PopoverTrigger asChild className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            {date ? format(date, 'dd/MM/yyyy') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>


                  {/* Enter NIN */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="nin">Enter NIN<span className='text-[#F87B24]'>*</span></Label>
                    <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="nin" placeholder="Enter your NIN number" />
                  </div>

                  {/* Enter BVN */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="bvn">Enter BVN<span className='text-[#F87B24]'>*</span></Label>
                    <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="bvn" placeholder="Enter your BVN number" />
                  </div>

                  {/* Brief About Your Company */}
                  <div className='flex flex-col'>
                    <div className="mt-4">
                      <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="companyBrief">Brief about your company</Label>
                      <div className="pt-2">
                        <Textarea
                          id="companyBrief"
                          placeholder="Write a short description about your company"
                          rows={4}
                          className='w-full'
                        />
                      </div>
                    </div>
                    {/* Upload Company Logo */}
                    <div className="mt-4">
                      <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>Upload Company Logo</Label>
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-2 flex items-center justify-center text-sm text-gray-500 hover:cursor-pointer hover:bg-gray-50"
                      >
                        <input {...getInputProps()} />
                        {file ? (
                          <p className="text-center">{file.name}</p>
                        ) : (
                          <p>Drag and Drop file here or choose file</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('Payout Account Info')}
                    className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                    Next
                  </button>
                </div>
              </div>

              
              
            </div>
          </div>
        );
      case 'Payout Account Info':
        return (
          <div className='pt-[20px]'>
            <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
                <div>
                  <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
                  <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                    Kindly provide the information requested below
                    about your business for our review and verification.
                    Your account will be activated once requested
                    information is completely provided and verified.
                  </p>
                </div>
                <div>
                  <CircularProgressBar percentage={20} size={120} strokeWidth={12} />
                </div>
            </div>
            <div className='pt-10'>
              <div className="max-w-[912px] w-full mx-auto bg-white p-6 rounded-md shadow-lg">
              <h1 className="text-[#101828] text-[20px] leading-[30px] font-medium">Corporate Bank Account</h1>
              <p className="pt-10 text-[#F87B24] text-[16px] leading-[24px] font-normal">
                All fields marked with <span className="font-bold">*</span> are required.
              </p>
              <form>
                <div className="space-y-6 pt-10">
                  <div>
                    <div>
                      <label htmlFor="bank-name"className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                        Bank Name<span className='text-[#F87B24]'>*</span>
                      </label>
                      <Select>
                        <SelectTrigger className="max-w-[694px] w-full bg-[#F0F0F9] outline-none">
                          <SelectValue placeholder="Select your Bank Name" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-bank">First Bank of Nigeria</SelectItem>
                          <SelectItem value="gtbank">GTBank</SelectItem>
                          <SelectItem value="access-bank">Access Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="account-number" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                      Account Number<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="account-number" placeholder="Enter your Account Number" />
                  </div>
                  <div>
                    <label htmlFor="account-name" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                      Account Name<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="account-name" placeholder="Enter your Account Name" />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6 gap-x-4">
                 
                    <button 
                      onClick={() => setActiveTab('Business Info')}
                      className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                      Back
                    </button>
                
               
                    <button 
                      onClick={() => setActiveTab('Incorporation Doc')}
                      className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                      Next
                    </button>
                  
                </div>
              </form>
              </div>
            </div>
          </div>
        );
      case 'Incorporation Doc':
      return (
        <div className="pt-[20px]">
         <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
            <div>
              <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
              <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                Kindly provide the information requested below
                about your business for our review and verification.
                Your account will be activated once requested
                information is completely provided and verified.
              </p>
            </div>
            <div>
              <CircularProgressBar percentage={40} size={120} strokeWidth={12} />
            </div>
          </div>
          <div className='pt-10'>
            <div className='bg-[#FFFFFF] max-w-[912px] rounded-[8px] mx-auto p-10'>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FileUploadField
                  label="Upload CAC Documents*"
                  fieldName="cacDocument"
                  onFileSelect={handleFileSelect}
                />
                <FileUploadField
                  label="Upload Memorandum & Articles of Information*"
                  fieldName="memorandum"
                  onFileSelect={handleFileSelect}
                />
                <FileUploadField
                  label="Upload Share Allotment Form*"
                  fieldName="shareAllotment"
                  onFileSelect={handleFileSelect}
                />
                <div className="flex items-center justify-center mt-6 gap-x-4">
                 
                 <button 
                   onClick={() => setActiveTab('Payout Account Info')}
                   className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                   Back
                 </button>
             
            
                 <button 
                   onClick={() => setActiveTab('BVN of Primary Officer')}
                   className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                   Next
                 </button>
               
             </div>
              </form>
            </div>
          </div>

        </div>
      );
      case 'BVN of Primary Officer':
      return (
        <div className='pt-[20px]'>
            <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
                <div>
                  <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
                  <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                    Kindly provide the information requested below
                    about your business for our review and verification.
                    Your account will be activated once requested
                    information is completely provided and verified.
                  </p>
                </div>
                <div>
                  <CircularProgressBar percentage={80} size={120} strokeWidth={12} />
                </div>
            </div>
            <div className='pt-10'>
              <div className="max-w-[912px] w-full mx-auto bg-white p-6 rounded-md shadow-lg">
              <h1 className="text-[#101828] text-[20px] leading-[30px] font-medium">Bank Verification Details</h1>
              <p className="pt-10 text-[#F87B24] text-[16px] leading-[24px] font-normal">
                All fields marked with <span className="font-bold">*</span> are required.
              </p>
              <form>
                <div className="space-y-6 pt-10">
                  <div>
                    <label htmlFor="bvn-number" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                    BVN Number<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="account-number" placeholder="Enter your BVN Number" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="date-of-birth" className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                    BVN D.O.B<span className="text-[#F87B24]">*</span>
                    </label>
                    <input
                      type="date"
                      id="date-of-birth"
                      className="max-w-[694px] w-full bg-[#F0F0F9] text-[#101828] text-[14px] leading-[21px] font-medium rounded-[4px] p-[8px] border-[1px] border-[#D0D0D3]"
                      placeholder="Enter your BVN D.O.B"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6 gap-x-4">
                 
                    <button 
                      onClick={() => setActiveTab('Incorporation Doc')}
                      className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF]
                       rounded-[8px] p-[10px] font-bold'>
                      Back
                    </button>
                
               
                    <button 
                      onClick={() => setActiveTab('Other Info')}
                      className='bg-[#5B52B6] max-w-[145px] w-full 
                      text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                      Next
                    </button>
                  
                </div>
              </form>
              </div>
            </div>
          </div>
      );

      case 'Other Info':
      return (
        <div className='pt-[20px]'>
            <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
                <div>
                  <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
                  <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                    Kindly provide the information requested below
                    about your business for our review and verification.
                    Your account will be activated once requested
                    information is completely provided and verified.
                  </p>
                </div>
                <div>
                  <CircularProgressBar percentage={100} size={120} strokeWidth={12} />
                </div>
            </div>
            <div className='pt-10'>
              <div className="max-w-[912px] w-full mx-auto bg-white p-6 rounded-md shadow-lg">
              <h1 className="text-[#101828] text-[20px] leading-[30px] font-medium">Other Info</h1>
              <p className="pt-10 text-[#F87B24] text-[16px] leading-[24px] font-normal">
                All fields marked with <span className="font-bold">*</span> are required.
              </p>
              <form>
                <div className="space-y-6 pt-10">
                  <div>
                    <label htmlFor="business-website" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                    Business Website<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="business-website" placeholder="Enter your business website" />
                  </div>
                  <div>
                    <label htmlFor="nin" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                    National Identification Number (NIN)<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="nin" placeholder="Enter your NIN" />
                  </div>

                  <div>
                    <label htmlFor="tin" className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>
                    Tax Identification Number (TIN)<span className='text-[#F87B24]'>*</span>
                    </label>
                    <Input className="max-w-[694px] w-full bg-[#F0F0F9]" id="tin" placeholder="Enter your TIN" />
                  </div>

                  <FileUploadField
                  label="Upload any Utility bill*"
                  fieldName="utilityBill"
                  onFileSelect={handleFileSelect}
                  />
                </div>
                <div className="flex items-center justify-center mt-6 gap-x-4">
                 
                    <button 
                      onClick={() => setActiveTab('BVN of Primary Officer')}
                      className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                      Back
                    </button>
                
               
                    <button 
                      onClick={() => setActiveTab('Summary')}
                      className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF]
                       rounded-[8px] p-[10px] font-bold'>
                      Next
                    </button>
                  
                </div>
              </form>
              </div>
            </div>
          </div>
      );

      case 'Summary':
      return (
        <div className='pt-[20px]'>
            <div className='bg-[#F1F1F1] rounded-[8px] p-[10px] flex items-center justify-between'>
              <div>
                <h1 className='text-[#101828] text-[24px] leading-[36px] font-bold'>Business Activation</h1>
                <p className='pt-[20px] text-[#41404B] text-[16px] leading-[24px] max-w-[436px] '>
                  Kindly provide the information requested below
                  about your business for our review and verification.
                  Your account will be activated once requested
                  information is completely provided and verified.
                </p>
              </div>

              <div>
                <CircularProgressBar percentage={100} size={120} strokeWidth={12} />
              </div>
            </div>

            <div className='pt-10'>
              <div className="border rounded-lg p-6 shadow-md bg-white max-w-[912px] mx-auto">
                <div className='mb-[10px] border-b-[1px] border-b-[#F1F1F1] pb-[20px]'>
                  <h2 className="text-[#101828] text-[20px] leading-[30px] font-medium">Company Profile</h2>
                  <p className="pt-10 text-[#F87B24] text-[16px] leading-[24px] font-normal">
                    All fields marked with <span className="font-bold">*</span> are required.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Company Registration Number */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="registrationNumber">Company Registration Number<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="registrationNumber" placeholder="Enter registration number" />
                    </div>
                  </div>
                  {/* Years in Business */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="yearsInBusiness">Years in Business<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="yearsInBusiness" placeholder="Input years in business" />
                    </div>
                  </div>
                  {/* Number of Staff */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="numberOfStaff">Number of Staff<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="numberOfStaff" placeholder="Input the number of staff" />
                    </div>
                  </div>
                  {/* Business Email */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="businessEmail">Business Email<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="businessEmail" placeholder="Type in your company email" />
                    </div>
                  </div>
                  {/* Country of Operation */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium' htmlFor="country">Country of Operation<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="country" className='max-w-[336px] w-full bg-[#F0F0F9] '>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* State */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="state">State<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="state" className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state1">State 1</SelectItem>
                          <SelectItem value="state2">State 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* City */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="city">City<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Select>
                        <SelectTrigger id="city" className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <SelectValue placeholder="Select your city of operation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="city1">City 1</SelectItem>
                          <SelectItem value="city2">City 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Address */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="address">Address<span className='text-[#F87B24]'>*</span></Label>
                    <div>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="address" placeholder="Type in full address" />
                    </div>
                  </div>
                  {/* Company Website */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="website">Company Website<span className='text-[#F87B24]'>*</span></Label>
                    <div className='pt-2'>
                      <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="website" placeholder="Enter your website link" />
                    </div>
                  </div>
                  {/* Year of Registration */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>Year of Registration<span className='text-[#F87B24]'>*</span></Label>
                    <div className="pt-2">
                      <Popover>
                        <PopoverTrigger asChild className='max-w-[336px] w-full bg-[#F0F0F9]'>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            {date ? format(date, 'dd/MM/yyyy') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>


                  {/* Enter NIN */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="nin">Enter NIN<span className='text-[#F87B24]'>*</span></Label>
                    <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="nin" placeholder="Enter your NIN number" />
                  </div>

                  {/* Enter BVN */}
                  <div>
                    <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="bvn">Enter BVN<span className='text-[#F87B24]'>*</span></Label>
                    <Input className='max-w-[336px] w-full bg-[#F0F0F9]' id="bvn" placeholder="Enter your BVN number" />
                  </div>

                  {/* Brief About Your Company */}
                  <div className='flex flex-col'>
                    <div className="mt-4">
                      <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium ' htmlFor="companyBrief">Brief about your company</Label>
                      <div className="pt-2">
                        <Textarea
                          id="companyBrief"
                          placeholder="Write a short description about your company"
                          rows={4}
                          className='w-full'
                        />
                      </div>
                    </div>
                    {/* Upload Company Logo */}
                    <div className="mt-4">
                      <Label className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium '>Upload Company Logo</Label>
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-2 flex items-center justify-center text-sm text-gray-500 hover:cursor-pointer hover:bg-gray-50"
                      >
                        <input {...getInputProps()} />
                        {file ? (
                          <p className="text-center">{file.name}</p>
                        ) : (
                          <p>Drag and Drop file here or choose file</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('Payout Account Info')}
                    className='bg-[#5B52B6] max-w-[145px] w-full text-[#FFFFFF] rounded-[8px] p-[10px] font-bold'>
                    Next
                  </button>
                </div>
              </div>

              
              
            </div>
          </div>
      );
      default:
        return null;
    }
  };

  // If business is activated, render the activation content
  if (isBusinessActivated) {
    return (
      <div>
        {/* Header - Similar to original dashboard */}
        <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-10">
            <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">Company Profile</h1>
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

        {/* Tabs */}
        <div className="pt-6 border-b border-[#D0D0D3]">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold ${
                  activeTab === tab 
                    ? 'text-[#5B52B6] border-b-2 border-[#5B52B6]' 
                    : 'text-[#41404B] hover:bg-[#F0F0F9]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>

        {/* Optional: Back to Dashboard button */}
        <div className="p-6">
          <button 
            onClick={handleBackToDashboard}
            className="bg-[#5B52B6] text-white px-6 py-3 rounded-[8px]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

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
            <button 
              onClick={handleActivateBusiness}
              className='w-[257px] p-[10px] flex items-center rounded-[8px] gap-[10px] bg-[#FF7D20] text-[#FFFFFF] text-[16.5px] leading-[19.8px] font-bold'>
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
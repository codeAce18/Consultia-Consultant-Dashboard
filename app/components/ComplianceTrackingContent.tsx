import React, { useState } from 'react';
import Image from "next/image";

import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { 
  Table, 
  TableBody, 
  TableCell,  
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// Import all the images
import AddCircle from "../../public/assets/AddCircle.svg"

import eye from "../../public/assets/eye.svg"

import CancelIcon from "../../public/assets/CancelIcon.svg"

import MediumSvg from "../../public/assets/MediumSvg.svg"

import PriorityIcon from "../../public/assets/PriorityIcon.svg"

import wallet from "../../public/assets/wallet.svg"

import Timer from "../../public/assets/Timer.svg"

import HourGlass from "../../public/assets/HourGlass.svg"

import AssigneeIcon from "../../public/assets/AssigneeIcon.svg"

import Femi from "../../public/assets/Femi.svg"

import Folder from "../../public/assets/Folder.svg"

import more from "../../public/assets/more.svg"
import DashboardHeader from './DashboardHeader';


// Define types
interface ComplianceData {
  projectId: string;
  title: string;
  serviceType: string;
  dueDate: string;
  status: number;
}

// Circular Progress Component with Percentage
const CircularProgressWithLabel: React.FC<{ value: number }> = ({ value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress 
        variant="determinate" 
        value={100} 
        size={40}
        sx={{
          color: '#E0E0E0', // Light grey background track
          position: 'absolute',
        }}
      />
      <CircularProgress 
        variant="determinate" 
        value={value} 
        size={40}
        sx={{
          color: "#5B52B6"
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '14px' }}>{`${Math.round(value)}%`}</span>
      </Box>
    </Box>
  );
};

// Dummy Data
const dummyData: ComplianceData[] = [
  {
    projectId: 'FN-6785-24',
    title: 'Financial and Accounting Consulting',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 86,
  },
  {
    projectId: 'FN-6786-24',
    title: 'Legal and Compliance Consulting',
    serviceType: 'Consulting',
    dueDate: 'Feb 15, 2024',
    status: 70,
  },

  {
    projectId: 'FN-6787-24',
    title: 'Legal and Compliance Consulting',
    serviceType: 'Consulting',
    dueDate: 'Mar 10, 2024',
    status: 90,
  },

  {
    projectId: 'FN-6788-24',
    title: 'Market Research and Analysis',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 75,
  },

  {
    projectId: 'FN-6789-24',
    title: 'Human Resources Management',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 82,
  },

  {
    projectId: 'FN-6790-24',
    title: 'Digital Marketing Strategy',
    serviceType: 'Consulting',
    dueDate: 'Mar 10, 2024',
    status: 65,
  },

  {
    projectId: 'FN-6791-24',
    title: 'Supply Chain Optimization',
    serviceType: 'Consulting',
    dueDate: 'Mar 10, 2024',
    status: 78,
  },

  {
    projectId: 'FN-6792-24',
    title: 'Customer Experience Enhancement',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 88,
  },

  {
    projectId: 'FN-678793-24',
    title: 'Product Development Strategy',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 72,
  },

  {
    projectId: 'FN-6794-24',
    title: 'Risk Management Solutions',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 85,
  },

  {
    projectId: 'FN-6795-24',
    title: 'IT Infrastructure Consulting',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 77,
  },

  {
    projectId: 'FN-6796-24',
    title: 'Brand Identity Development',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 68,
  },

  {
    projectId: 'FN-6797-24',
    title: 'Project Management Services',
    serviceType: 'Consulting',
    dueDate: 'Jan 20, 2024',
    status: 80,
  },
];




interface ComplianceTrackingContentProps {
  setActiveComponent: (component: string) => void;
}

const ComplianceTrackingContent: React.FC<ComplianceTrackingContentProps> = ({ setActiveComponent }) => {
  
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [dropdownState, setDropdownState] = useState<{ [key: number]: boolean }>({});
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const [isComplianceSheetOpen, setIsComplianceSheetOpen] = useState<boolean>(false);


  const toggleDropdown = (index: number) => {
    setDropdownState((prevState) => {
      const newState = { ...prevState };
      newState[index] = !prevState[index];
      return newState;
    });
  };






  const handlePreviewClick = () => {
    setIsSheetOpen(true); // Open the sheet
    setDropdownState({}); // Close all dropdowns
  };

  const handleCancelClick = () => {
    setDropdownState({}); // Close all dropdowns
  };


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null, 
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <DashboardHeader title="Compliance" setActiveComponent={setActiveComponent} />

      <div className="pt-[24px]">
        <Separator />
      </div>

      <div className='pt-10'>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[#101828] text-[16.5px] leading-[19.8px] font-bold border-b-[3px] border-b-[#5B52B6] pb-[10px]">All Compliance</h1>
            <div>
              {/* Button to trigger the sheet */}
              <button
                className="flex items-center bg-[#5B52B6] max-w-[205px] w-full rounded-[8px] p-[10px] gap-[10px] text-[16.5px] leading-[19.8px] font-bold text-white"
                onClick={() => setIsComplianceSheetOpen(true)}
              >
                <Image src={AddCircle} alt="AddCircle" />
                Create Reminder
              </button>

              {/* Sheet Component */}
              <Sheet open={isComplianceSheetOpen} onOpenChange={setIsComplianceSheetOpen}>
                <SheetContent side="right" className="max-w-[400px] w-full p-6 overflow-y-auto scrollbar-hide">
                  <h2 className="text-xl font-bold mb-4">Create Reminder</h2>

                  {/* Project ID Input */}
                  <div className="mb-4">
                    <label htmlFor="projectId" className="block text-sm font-medium mb-2">
                      Project ID
                    </label>
                    <input
                      id="projectId"
                      type="text"
                      placeholder="Enter Project ID"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="space-y-[5px] pt-[20px]">

                    <div className="py-[10.75px] px-[10px] rounded-[10px] shadow-custom-two ">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Financial Planning and Analysis</h1>

                      <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div>

                    <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Tax Advisory and Compliance</h1>

                      <p className="text-[#A3A2AB]  pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div> 

                    <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Audit and Assurance Services</h1>

                      <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div>  

                    <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Forensic Accounting</h1>

                      <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div>

                    <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px] ">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Investment Advisory Services</h1>

                      <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div> 

                    <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                      <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Fundraising Strategy and Execution</h1>

                      <p className="text-[#A3A2AB]  pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                    </div> 
                  </div>

                  {/* Compliance Requirement Textarea */}
                  <div className="mb-4">
                    <label htmlFor="complianceRequirement" className="block text-sm font-medium mb-2">
                      Compliance Requirement
                    </label>
                    <textarea
                      id="complianceRequirement"
                      placeholder="Enter compliance requirement"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md"
                    ></textarea>
                  </div>

                  {/* Due Date Input */}
                  <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
                      Set Due Date
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="dueDate"
                        type="date"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <button className="bg-[#5B52B6] text-white px-4 py-2 rounded-md font-medium">
                        Add
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Project ID</div></TableCell>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Title</div></TableCell>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Service Type</div></TableCell>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Due Date</div></TableCell>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Status</div></TableCell>
                  <TableCell><div className='text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold'>Action</div></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-[#F9FAFE]">
                {dummyData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell><h1 className="text-[#101828] text-[14px] leading-[21px] font-semibold">{row.projectId}</h1></TableCell>
                      <TableCell><h1 className="text-[#41404B] text-[14px] leading-[21px] font-normal max-w-[166px]">{row.title}</h1></TableCell>
                      <TableCell><h1 className="text-[#101828] text-[14px] leading-[21px] font-normal max-w-[166px]">{row.serviceType}</h1></TableCell>
                      <TableCell><h1 className="text-[#101828] text-[14px] leading-[21px] font-normal max-w-[166px]">{row.dueDate}</h1></TableCell>
                      <TableCell>
                        <CircularProgressWithLabel value={row.status} />
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <IconButton onClick={() => toggleDropdown(index)}>
                            <MoreVertIcon />
                          </IconButton>
                          {dropdownState[index] && (
                            <div className="absolute right-0 z-10 w-[124px] bg-white shadow-md rounded-md">
                              <div
                                className="flex items-center gap-[15px] p-2 cursor-pointer"
                                onClick={handlePreviewClick}
                              >
                                <Image width={24} height={24} src={eye} alt="eye" />
                                Preview
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
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="overflow-y-auto scrollbar-hide" >

                  <div className="pt-[20px]">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[24px] leading-[36px] font-bold">Project Overview</h2>

                      <Image src={more} alt="more" />
                    </div>

                    <div className="pt-[15px]">
                      <div className="bg-[#FAD9C2] w-[96px] rounded-[100px] justify-center flex items-center text-[#F87B24] text-[13px] leading-[19.5px]">
                        <Image width={10} height={14.33} src={MediumSvg} alt="MediumSvg" />
                        Medium
                      </div>
                    </div>

                    <div className="pt-[30px]">
                      <h1>{dummyData[0].title}</h1>

                      <p className="pt-[10px] max-w-[415px] text-[#A3A2AB] text-[16px] leading-[24px] font-normal">Financial and Accounting Consulting is a financial institution offering savings, investments, loans, and financial advisory services.</p>
                    </div>

                    <div className="pt-10 space-y-[15px]">

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={Folder} alt="Folder" />
                          Project ID
                        </div>

                        <h1 className="text-[#5B52B6] text-[16px] leading-[24px] font-normal">FN-5467-435</h1>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={HourGlass} alt="HourGlass" />
                          Status
                        </div>

                        <h1 className="text-[#5B52B6] text-[16px] leading-[24px] bg-[#F0F0F9] w-[87px] rounded-[8px] p-[2px] flex items-center justify-center">Ongoing</h1>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={PriorityIcon} alt="PriorityIcon" />
                          Priority
                        </div>

                        <span  className="bg-[#FAD9C2] w-[96px] rounded-[100px] justify-center flex items-center text-[#F87B24] text-[13px] leading-[19.5px]">
                          <Image src={MediumSvg} alt="MediumSvg" />
                          <h1>
                            Medium
                          </h1>
                        </span>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={Timer} alt="Timer" />
                          Due Date
                        </div>

                        <h1 className="text-[#5B52B6] text-[16px] leading-[24px] font-normal">Sept 24,2024</h1>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={wallet} alt="wallet" />
                          Budget
                        </div>

                        <h1 className="text-[#5B52B6] text-[16px] leading-[24px] font-normal">₦500,000</h1>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal flex items-center gap-[15px]">
                          <Image src={AssigneeIcon} alt="AssigneeIcon" />
                          Assignee
                        </div>

                        <Image src={Femi} alt="Femi" />
                      </div>
                    </div>
                    

                    <div>
                      <div className="pt-10 flex items-center justify-between">
                        <h1 className="text-[#101828] text-[20px] leading-[30px] font-bold">Compliance Requirements</h1>
                        <Image src={more} alt="more" />
                      </div>

                      <div className="space-y-[5px] pt-[20px]">

                        <div className="py-[10.75px] px-[10px] rounded-[10px] shadow-custom-two ">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Financial Planning and Analysis</h1>

                          <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div>

                        <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Tax Advisory and Compliance</h1>

                          <p className="text-[#A3A2AB]  pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div> 

                        <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Audit and Assurance Services</h1>

                          <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div>  

                        <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Forensic Accounting</h1>

                          <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div>

                        <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px] ">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Investment Advisory Services</h1>

                          <p className="text-[#A3A2AB] pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div> 

                        <div className="py-[10.75px] px-[10px] shadow-custom-two rounded-[10px]">
                          <h1 className="text-[16px] leading-[24px] text-[#101828] font-normal">Fundraising Strategy and Execution</h1>

                          <p className="text-[#A3A2AB]  pt-[10px] text-[14px] leading-[18.23px] font-normal">Monday, 2nd April</p>
                        </div> 
                      </div>
                    </div>
                  </div>


                    
                  
                </SheetContent>
              </Sheet>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dummyData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="bg-[#F9FAFE] scrollbar-hide"
            />
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default ComplianceTrackingContent
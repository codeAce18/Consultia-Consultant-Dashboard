import React, { useState } from 'react';
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
  TablePagination
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import Image from "next/image"

import Export from "../../../public/assets/Export.svg"

import eye from "../../../public/assets/eye.svg"

import CancelIcon from "../../../public/assets/CancelIcon.svg"

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

// Dummy data with proper typing and image path
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

  {
    id: 7,
    client: {
      name: 'Liam Chen',
      location: 'Sydney, Australia',
      image: '/assets/Liam.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Ongoing'
  },

  {
    id: 8,
    client: {
      name: 'James Eze',
      location: 'Johannesburg, South Africa',
      image: '/assets/James.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Rejected'
  },

  {
    id: 9,
    client: {
      name: 'Damilola Ibrahim',
      location: 'Abuja, Nigeria',
      image: '/assets/Damilola.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Rejected'
  },

  {
    id: 10,
    client: {
      name: 'Chinedu Olamide',
      location: 'Lagos, Nigeria',
      image: '/assets/Chinedu.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Rejected'
  },

  {
    id: 11,
    client: {
      name: 'Fatima Yusuf',
      location: 'Cairo, Egypt',
      image: '/assets/Fatima.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Completed'
  },

  {
    id: 12,
    client: {
      name: 'Jack Silva',
      location: 'São Paulo, Brazil',
      image: '/assets/Jack.svg'
    },
    serviceType: 'Financial and Accounting Consulting',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Completed'
  },

  {
    id: 13,
    client: {
      name: 'Emily OConnor',
      location: 'Dublin, Ireland',
      image: '/assets/Emily.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Completed'
  },

  {
    id: 14,
    client: {
      name: 'Adebayo Akinyemi',
      location: 'Sydney, Australia',
      image: '/assets/Adebayo.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Completed'
  },

  {
    id: 15,
    client: {
      name: 'William Russo',
      location: 'Rome, Italy',
      image: '/assets/Wlliam.svg'
    },
    serviceType: 'Market Entry Strategy',
    dates: {
      start: 'Jan 20, 2024',
      due: 'May 19, 2024'
    },
    status: 'Completed'
  },
];

// Define tab type
type TabType = 'All Job Orders' | Status;

const JobOrderRegistryTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All Job Orders');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // Filter job orders based on active tab
  const filteredJobOrders = initialJobOrders.filter(order => 
    activeTab === 'All Job Orders' || order.status === activeTab
  );

  // Pagination handlers
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null, 
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

  // Slice data for current page
  const paginatedJobOrders = filteredJobOrders.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  // Tabs array with proper typing
  const tabs: TabType[] = ['All Job Orders', 'New', 'Ongoing', 'Completed', 'Rejected'];


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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedJob, setSelectedJob] = useState<JobOrder | null>(null);

  // const handleView = (job: JobOrder) => {
  //   setSelectedJob(job);
  // };


  // const handleBack = () => {
  //   setSelectedJob(null);
  // };



  return (
    <div>
      {/* Tabs Section */}
      <div className='pt-10'>
        <div className='flex   flex-col lg:flex-row lg:items-center items-start lg:justify-between'>
          <div className='flex gap-y-[16px] flex-wrap items-start lg:items-center space-x-10'>
            {tabs.map((tab) => (
              <div 
                key={tab}
                className={`cursor-pointer pb-2 ${
                  activeTab === tab 
                    ? 'font-bold border-b-4 border-[#5B52B6]' 
                    : 'text-[#41404B]'
                } text-[16px] leading-[22.4px]`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className='pt-6 lg:pt-0'>
            <button
              className='flex items-center bg-[#5B52B6] gap-[8px] max-w-[121px] w-full rounded-[4px] h-[32px] whitespace-nowrap px-[10px] text-[#FFFFFF] text-[14px] leading-[20px] font-normal'
              onClick={() => {/* Export CSV logic */}}
            >
              <Image src={Export} alt="Export" />
              Export CSV
            </button>
          </div>
        </div>
      </div>
      {/* Table Section */}
      <TableContainer component={Paper} className="mt-6">
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
            {paginatedJobOrders.map((order , index) => (
              <TableRow key={order.id}>
                {/* Client Name */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={order.client.image} 
                      alt={order.client.name}
                    />
                    <div>
                      <div className="text-[#101828] text-[14px] leading-[21px] font-bold">{order.client.name}</div>
                      <div className="text-[#A3A2AB] text-[11px] leading-[16.5px] font-normal">{order.client.location}</div>
                    </div>
                  </div>
                </TableCell>

                {/* Service Type */}
                <TableCell><div className='text-[#41404B] text-[14px] leading-[21px] font-normal'>{order.serviceType}</div></TableCell>

                {/* Start/Due Date */}
                <TableCell>
                  <div className="text-[#101828] text-[14px] leading-[21px] font-normal">{order.dates.start} / {order.dates.due}</div>
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

        {/* Custom Pagination */}
        <TablePagination
          className="scrollbar-hide"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredJobOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              backgroundColor: '#F9FAFE',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select': {
              fontWeight: 600,
            },
            '& .MuiTablePagination-actions button': {
              color: '#5B52B6',
            }
          }}
        />
      </TableContainer>
         
        
  </div>
    
   
      
        
 
        
        
        
  );
};

export default JobOrderRegistryTable;
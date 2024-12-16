import React, { useState } from 'react';
import Image from "next/image";
import { X } from 'lucide-react';
import NoDocuments from "../../public/assets/NoDocuments.svg";
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator";
import { SearchIcon } from 'lucide-react';
import NotificationIcon from "../../public/assets/NotificationIcon.svg";
import ChatIcon from "../../public/assets/ChatIcon.svg";
import MyProfile from "../../public/assets/MyProfile.svg";
import Arrowdown from "../../public/assets/Arrowdown.svg";
import profile from "../../public/assets/profile.svg";
import LogOutIcon from "../../public/assets/LogOutIcon.svg";
import AddCircle from "../../public/assets/AddCircle.svg";
import Dora from "../../public/assets/Dora.svg";
import SendIcon from "../../public/assets/SendIcon.svg";

import trash from "../../public/assets/trash.svg";

import Bigtrash from "../../public/assets/Bigtrash.svg";

import eye from "../../public/assets/eye.svg";

import EditPen from "../../public/assets/EditPen.svg";

import CrossX from "../../public/assets/CrossX.svg";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 

  IconButton, 
  Menu, 
} from '@mui/material';

// import { TablePagination } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import InvoiceSendSheet from './InvoiceSendSheet'; 


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";


interface Client {
  id: string;
  name: string;
  location: string;
  phone: string;
}


interface InvoiceItem {
  description: string;
  quantity: string;
  unitPrice: string;
  total: string;
  cost: string;
  hours: string;
}

interface InvoiceDetails {
    items: InvoiceItem[];
    clientName: string;
    clientService: string;
    invoiceNumber: string;
    dateIssued: string;
    dateDue: string;

}


const InvoiceContent = () => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [anchorEls, setAnchorEls] = React.useState<Record<string | number, HTMLElement | null>>({});
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [isInvoiceCreated, setIsInvoiceCreated] = useState<boolean>(false);
  const [isInvoiceSent, setIsInvoiceSent] = React.useState<boolean>(false);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState<boolean>(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    items: [],
    clientName: '',
    clientService: '',
    invoiceNumber: '',
    dateIssued: '',
    dateDue: '',
  });

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const tabs: ['All Invoices', 'Paid Invoices', 'Pending Invoices', 'Declined Invoices'] = [
    'All Invoices', 'Paid Invoices', 'Pending Invoices', 'Declined Invoices'
  ];

  const clients: Client[] = [
    {
      id: '1',
      name: "Bankole Onafuwa",
      location: "Lagos, Nigeria",
      phone: "+234 800 123 4567"
    },
    {
      id: '2',
      name: "Paul Oshagale",
      location: "Abuja, Nigeria", 
      phone: "+234 800 987 6543"
    },
    {
      id: '3',
      name: "James Morgan",
      location: "Port Harcourt, Nigeria",
      phone: "+234 800 456 7890"
    }
  ];

  const invoices = [
    {
      id: 'INV-001',
      client: {
        name: 'John Doe',
        location: 'New York, USA',
        avatar: '/assets/David.svg'
      },
      total: 11400000,
      issuedDate: '2023-12-01',
      status: 'Paid'
    },
    {
      id: 'INV-002',
      client: {
        name: 'Jane Smith',
        location: 'San Francisco, CA',
        avatar: '/assets/Emily.svg'
      },
      total: 11400000,
      issuedDate: '2023-12-10',
      status: 'Pending'
    },

    {
      id: 'INV-003',
      client: {
        name: 'Jane cowell',
        location: 'San Francisco, CA',
        avatar: '/assets/Fatima.svg'
      },
      total: 11400000,
      issuedDate: '2023-12-10',
      status: 'Pending'
    },
    {
      id: 'INV-004',
      client: {
        name: 'Alice Johnson',
        location: 'Chicago, IL',
        avatar: '/assets/Femi.svg'
      },
      total: 11400000,
      issuedDate: '2023-11-25',
      status: 'Declined'
    },

    {
      id: 'INV-005',
      client: {
        name: 'Alice Johnson',
        location: 'Chicago, IL',
        avatar: '/assets/James.svg'
      },
      total: 11400000,
      issuedDate: '2023-11-25',
      status: 'Declined'
    },

    {
      id: 'INV-006',
      client: {
        name: 'Alice Johnson',
        location: 'Chicago, IL',
        avatar: '/assets/Liam.svg'
      },
      total: 11400000,
      issuedDate: '2023-11-25',
      status: 'Pending'
    },

    {
      id: 'INV-007',
      client: {
        name: 'Alice Johnson',
        location: 'Chicago, IL',
        avatar: '/assets/Martinez.svg'
      },
      total: 11400000,
      issuedDate: '2023-11-25',
      status: 'Paid'
    },
  ];


  const getFilteredInvoices = () => {
    const currentTab = tabs[tabValue];
  
    if (currentTab === 'All Invoices') return invoices;
  
    const statusMap = {
      'Paid Invoices': 'Paid',
      'Pending Invoices': 'Pending',
      'Declined Invoices': 'Declined'
    };
  
    return invoices.filter(invoice => invoice.status === statusMap[currentTab]);
  };

  const filteredInvoices = getFilteredInvoices();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredInvoices.map((n) => n.id);
      setSelectedInvoices(newSelected);
      return;
    }
    setSelectedInvoices([]);
  };

  const handleClick = (event: React.MouseEvent, id: string) => {
    const selectedIndex = selectedInvoices.indexOf(id);
    let newSelected: string[] = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedInvoices, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedInvoices.slice(1));
    } else if (selectedIndex === selectedInvoices.length - 1) {
      newSelected = newSelected.concat(selectedInvoices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedInvoices.slice(0, selectedIndex),
        selectedInvoices.slice(selectedIndex + 1)
      );
    }
  
    setSelectedInvoices(newSelected);
  };

 

  const handleTabChange = (index: number) => {
    setTabValue(index);
    setPage(0);
  };


// // Handle page change
// const handleChangePage = (
//   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, 
//   newPage: number
// ) => {
//   setPage(newPage);
// };

// // Handle rows per page change
// const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
//   setRowsPerPage(parseInt(event.target.value, 10)); // Set rows per page
//   setPage(0); // Reset to first page after changing rows per page
// };

  const handleClientChange = (value: string) => {
    const client = clients.find(c => c.id === value) || null;
    setSelectedClient(client);
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const generateInvoiceNumber = (): string => {
    // Example logic to generate an invoice number, e.g., based on current timestamp
    return `INV-${new Date().getTime()}`;
  };
  
  const handleCreateInvoice = () => {
    setInvoiceDetails((prev) => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
      dateIssued: new Date().toLocaleDateString(),
      dateDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days from now
    }));
  
    setIsInvoiceCreated(true); 
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setInvoiceDetails({
      ...invoiceDetails,
      [field]: e.target.value
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...invoiceDetails.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

   

    setInvoiceDetails({
      ...invoiceDetails,
      items: newItems
    });
  };

  const calculateTotal = () => {
    return invoiceDetails.items.reduce((total, item) => {
      const cost = parseFloat(item.cost) || 0;
      const hours = parseFloat(item.hours) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return total + (cost * hours * quantity);
    }, 0).toFixed(2);
  };

  const addNewItem = (): void => {
    setInvoiceDetails((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: '', unitPrice: '', total: '', cost: '', hours: '' }, 
      ],
    }));
  };

  const removeItem = (indexToRemove: number): void => {
    // Prevent removing the last item
    if (invoiceDetails.items.length > 1) {
      setInvoiceDetails((prev) => ({
        ...prev,
        items: prev.items.filter((_, index) => index !== indexToRemove),
      }));
    }
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSendInvoice = (): void => {
  // Here you can add any additional logic for sending the invoice
  setIsInvoiceSent(true);
};
  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleResetInvoice = () => {
  //   setIsInvoiceCreated(false);
  //   setIsInvoiceSent(false);
  // };


  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    id: string | number
  ): void => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };


 const handleMenuClose = (id: string | number): void => {
  setAnchorEls((prev) => {
    const newAnchors = { ...prev };
    delete newAnchors[id];
    return newAnchors;
  });
};

  const handleDeleteClick = (id: string | number): void => {
    // Close the menu first
    handleMenuClose(id);
    // Then open the delete confirmation overlay
    setIsOverlayVisible(true);
  };


  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-10">
            <h1 className="text-[20px] leading-[30px] text-[#101828] font-bold whitespace-nowrap">My Invoice</h1>
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
            <Image width={24} height={24} src={NotificationIcon} alt="NotificationIcon" />
          </div>
          <div>
            <Image width={24} height={24} src={ChatIcon} alt="ChatIcon" />
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
        {isInvoiceSent ? (
          <div>
          <div className=" pt-10  items-center flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              {tabs.map((tab, index) => (
                <div 
                  key={tab}
                  onClick={() => handleTabChange(index)}
                  className={`
                    px-4 py-2 cursor-pointer
                    ${tabValue === index 
                      ? 'text-[#101828] text-[16.5px] leading-[19.8px] font-bold border-b-[2px] border-b-[#5B52B6]' 
                      : 'text-[#41404B] text-[16px]  font-normal'}
                  `}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="pt-10">
              <button
                onClick={handleCreateInvoice}
                className="flex items-center bg-[#5B52B6] max-w-[207px] w-full rounded-[8px] p-[10px] gap-[10px] text-[16.5px] leading-[19.8px] font-bold text-white"
              >
                <Image src={AddCircle} alt="AddCircle" />
                Create Invoice
              </button>
            </div>
          </div>
    
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedInvoices.length > 0 && 
                        selectedInvoices.length < filteredInvoices.length
                      }
                      checked={
                        filteredInvoices.length > 0 && 
                        selectedInvoices.length === filteredInvoices.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Invoice ID</h1></TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Client</h1></TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Total</h1></TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Issued Date</h1></TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Status</h1></TableCell>
                  <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Actions</h1></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredInvoices
                ).map((invoice) => {
                  const isItemSelected = selectedInvoices.indexOf(invoice.id) !== -1;
    
                  return (
                    <TableRow 
                      key={invoice.id}
                      hover
                      role="checkbox"
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, invoice.id)}
                        />
                      </TableCell>
                      <TableCell><h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-medium">{invoice.id}</h1></TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                        <Avatar 
                          src={invoice.client.avatar} 
                          alt={invoice.client.name} 
                          sx={{ width: 26, height: 26 }} 
                        />
                          <div>
                            <div className="text-[#101828] text-[16px] leading-[24px] font-normal">{invoice.client.name}</div>
                            <div className="text-[#A3A2AB] text-[13px] leading-[19.5px] font-normal">
                              {invoice.client.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">₦{invoice.total.toLocaleString()}</h1></TableCell>
                      <TableCell><h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-medium">{invoice.issuedDate}</h1></TableCell>
                      <TableCell>
                      <div
                        className={`
                           w-[96px] p-[10px] rounded-[100px] flex justify-center items-center px-3 py-1 rounded-full text-sm font-medium
                          ${
                            invoice.status === 'Paid'
                              ? 'bg-[#D2F6D2] text-[#008000]'
                              : invoice.status === 'Pending'
                              ? 'bg-[#FAD9C2] text-[#F87B24]'
                              : 'bg-[#F5BFC1] text-[#DD2025]'
                          }
                        `}
                      >
                        {invoice.status}
                      </div>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(event) => handleMenuOpen(event, invoice.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEls[invoice.id]}
                          open={Boolean(anchorEls[invoice.id])}
                          onClose={() => handleMenuClose(invoice.id)}
                        >
                          <div
                            className="px-[20px] flex items-center cursor-pointer gap-[15px] text-[#101828] text-[13px] leading-[19.5px] font-normal"
                            onClick={() => handleMenuClose(invoice.id)}
                          >
                            <Image width={24} height={24} src={eye} alt="eye" />
                            Preview
                          </div>
                          <div
                            className="px-[20px] py-[10px] cursor-pointer flex items-center gap-[15px] text-[#101828] text-[13px] leading-[19.5px] font-normal"
                            onClick={() => handleMenuClose(invoice.id)}
                          >
                            <Image width={24} height={24} src={EditPen} alt="EditPen" />
                            Edit
                          </div>
                          <div
                            className="px-[20px] py-[10px] cursor-pointer flex items-center gap-[15px] text-[#101828] text-[13px] leading-[19.5px] font-normal"
                            onClick={() => handleDeleteClick(invoice.id)}
                          >
                            <Image width={24} height={24} src={trash} alt="trash" />
                            Delete
                          </div>
                        </Menu>
                      </TableCell>

                      {isOverlayVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                          <div className="bg-white p-[20px] min-h-[415px] rounded-lg shadow-lg relative max-w-[341px] w-full text-center">
                            <button
                              onClick={closeOverlay}
                              className="absolute top-[10px] right-[10px]"
                            >
                              <Image src={CrossX} alt="Close" width={34} height={34} />
                            </button>


                            <div className="flex items-center justify-center pt-10">
                              <Image src={Bigtrash} alt="Bigtrash" />
                            </div> 


                            <div className="pt-10">
                              <h2 className="text-[#101828] text-[25px] leading-[37.5px] font-bold">
                                Delete Invoice
                              </h2>
                              <p className="text-[#41404B] text-[16px] leading-[24px] font-normal">
                                Are you sure you want to delete this invoice?
                              </p>
                            </div>


                            <div className="pt-[10px] flex flex-col justify-center gap-[15px]">

                              <button
                                onClick={() => {
                                  // Add delete logic here
                                  closeOverlay();
                                }}
                                className="bg-red-600 w-[270px] text-white h-[48px] p-[10px] mx-auto rounded-lg"
                              >
                                Yes, Delete
                              </button>

                              <button
                                onClick={closeOverlay}
                                className="w-[270px] p-[10px] mx-auto text-[#5B52B6] text-[16.5px] leading-[19.8px] font-bold bg-[#F1F1F1] h-[48px] rounded-lg"
                              >
                                Cancel
                              </button>
                              
                            </div>
                          </div>
                        </div>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]} // Define options for rows per page
              component="div" // Specify that it's a div container
              count={filteredInvoices.length} // Total number of rows to paginate
              rowsPerPage={rowsPerPage} // Number of rows displayed per page
              page={page} // Current page number
              onPageChange={handleChangePage}  // Correctly typed page change handler
              onRowsPerPageChange={handleChangeRowsPerPage}  // Correctly typed rows per page change handler
            /> */}
          </TableContainer>
        </div>
        ) :

          isInvoiceCreated ? (
          <div className="pt-10 flex items-start justify-between min-h-screen">
            <div className="bg-white max-w-[769px] w-full min-h-[872px] rounded-[8px] shadow-custom">
              <div className="pt-[24px]">
                <div className="flex items-start justify-between rounded-[8px] bg-[#F9F9FF] max-w-[698px] w-full mx-auto p-[24px]">
                  <div className="flex items-start gap-[10px]">
                    <Image width={26} height={26} src={Dora} alt="Dora" />
                    <div>
                      <h1 className="text-[#101828] text-[13px] leading-[19.5px] font-semibold">Dora Consulting Ltd.</h1>
                      <p className="text-[#A3A2AB] text-[13px] leading-[19.5px] font-normal">Business Strategy & Mgt Consulting</p>
                      <p className="pt-[10px] text-[#A3A2AB] text-[16px] leading-[24px] font-normal max-w-[199px] ">Suite 5, Block A, Millennium Plaza,Central Business District,Abuja, FCT, Nigeria.</p>
                      <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">Phone: +234 800 123 4567</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-[20px]">
                    <div className="flex items-center gap-8">
                      <h1 className="text-[#101828] text-[16px] leading-[24px] font-medium">Invoice</h1>
                      <Input 
                        readOnly 
                        value={invoiceDetails.invoiceNumber} 
                        className="border-[1px] border-[#A3A2AB] max-w-[211px] w-full text-[#A3A2AB]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-[#A3A2AB] text-[16px] whitespace-nowrap leading-[24px] font-normal">Date Issued:</h1>
                      <Input 
                        readOnly 
                        value={invoiceDetails.dateIssued} 
                        className="border-[1px] border-[#A3A2AB] max-w-[211px] w-full text-[#A3A2AB]"
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <h1 className="text-[#A3A2AB] whitespace-nowrap text-[16px] leading-[24px] font-normal">Date Due:</h1>
                      <Input  
                        value={invoiceDetails.dateDue} 
                        onChange={(e) => handleInputChange(e, 'dateDue')}
                        className="border-[1px] border-[#A3A2AB] max-w-[211px] w-full text-[#A3A2AB]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <div className="flex items-center max-w-[698px] w-full mx-auto justify-between">
                    <div>
                      <h1 className="text-[#A9A9AE] text-[14px] leading-[21px] font-normal mb-2">Invoice To:</h1>

                      <Select 
                        onValueChange={handleClientChange}
                      >
                        <SelectTrigger className="w-[280px] bg-[#F1F1F1]">
                          <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedClient && (
                        <div className="flex flex-col items-start mt-2">
                          <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">
                            {selectedClient.location}
                          </p>
                          <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">
                            Phone: {selectedClient.phone}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h1 className="text-[#A9A9AE] text-[14px] leading-[21px] font-normal">Transfer to</h1>

                      <div>
                        <div>
                          <h1 className="text-[#41404B] leading-[24px] text-[16px] font-normal flex items-center gap-4">Account Name:  <span>Dora Consulting</span></h1>
                          <h1 className="text-[#41404B] leading-[24px] text-[16px] font-normal flex items-center gap-4">Bank Name:  <span>Access Bank</span></h1>
                          <h1 className="text-[#41404B] leading-[24px] text-[16px] font-normal flex items-center gap-4">Account Number: <span>0164440932</span></h1>
                          <h1 className="text-[#41404B] leading-[24px] text-[16px] font-normal flex items-center gap-4">Total Due: <span>{invoiceDetails.dateIssued}</span></h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items Section */}
                <div className="pt-16  max-w-[698px] w-full mx-auto">
                  <div className="flex items-center gap-72 mb-4 font-semibold text-[#101828]">
                    <div className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium">Item</div>

                    <div className="flex gap-36">
                      <div className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium">Cost</div>

                      <div className="flex gap-16">
                        <div className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium">Hours</div>
                        <div className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium">Quantity</div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  {invoiceDetails.items.map((item, index) => (
                    <div key={index} className="flex  items-center gap-10 mb-2 items-center">
                    {/* Item Dropdown */}
                    <Select 
                      value={item.item}
                      onValueChange={(value) => handleItemChange(index, 'item', value)}
                    >
                      <SelectTrigger className="bg-[#F1F1F1] w-[316px]">
                        <SelectValue placeholder="Select Item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business strategy Consulting">
                          Business strategy Consulting
                        </SelectItem>
                      </SelectContent>
                    </Select>
          
                    {/* Cost Input */}
                    <Input 
                      type="number"
                      placeholder="Cost"
                      value={item.cost}
                      className="bg-[#F1F1F1] border-none max-w-[142px] w-full"
                      onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
                    />
          
                    {/* Hours Input */}
                    <Input 
                      type="number"
                      placeholder="Hours"
                      value={item.hours}
                      className="bg-[#F1F1F1] border-none max-w-[70px] w-full"
                      onChange={(e) => handleItemChange(index, 'hours', e.target.value)}
                    />
          
                    {/* Quantity Input */}
                    <Input 
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      className="bg-[#F1F1F1] border-none max-w-[84px] w-full"
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
          
                    {/* Remove Item Button */}
                    {invoiceDetails.items.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
          
                {/* Add Item Button */}
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    onClick={addNewItem}
                    className="text-[#5B52B6]"
                  >
                    + Add Item
                  </Button>
                </div>

                  {/* Total Calculation */}
                  <div className="mt-10 border-b-[1px] border-[#F1F1F1] pb-10">
                    <div className="flex justify-between items-center  gap-4">
                      <span className="text-[14px] leading-[21px] text-[#A9A9AE] font-medium">Subtotal</span>
                      <span className="text-[16px] text-[#101828] leading-[24px] font-medium">
                        ₦{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-10 border-b-[1px] border-[#F1F1F1] pb-10">
                    <div className="flex justify-between items-center  gap-4">
                      <span className="text-[14px] leading-[21px] text-[#A9A9AE] font-medium">Discount</span>
                      <span className="text-[16px] text-[#101828] leading-[24px] font-medium">
                      -₦10,000.00
                      </span>
                    </div>
                  </div>

                  <div className="mt-10 border-b-[1px] border-[#F1F1F1] pb-10">
                    <div className="flex justify-between items-center  gap-4">
                      <span className="text-[14px] leading-[21px] text-[#A9A9AE] font-medium">VAT</span>
                      <span className="text-[16px] text-[#101828] leading-[24px] font-medium">
                        7.5%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-end gap-y-[25px]">
              <button 
                onClick={() => setIsSendSheetOpen(true)}
                className="flex items-center gap-[10px] p-[10px] bg-[#5B52B6] rounded-[8px] max-w-[208px] w-full text-[16.5px] leading-[19.8px] font-bold text-white">
                <Image width={24} height={24} src={SendIcon} alt="SendIcon" />
                Send Invoice
              </button>

              <button className="flex items-center justify-center p-[10px] rounded-[8px] max-w-[208px] w-full text-[16.5px] leading-[19.8px] font-bold text-[#A3A2AB] border-[1px] border-[#A3A2AB]">
                Preview
              </button>

              <button className="flex items-center justify-center p-[10px] rounded-[8px] max-w-[208px] w-full text-[16.5px] leading-[19.8px] font-bold text-[#A3A2AB] border-[1px] border-[#A3A2AB]">
                Save
              </button>
            </div>
            <InvoiceSendSheet 
            isOpen={isSendSheetOpen}
            onClose={() => setIsSendSheetOpen(false)}
            invoiceDetails={invoiceDetails}
            onSendInvoice={handleSendInvoice}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
              <div>
                <Image src={NoDocuments} alt="NoDocuments" />
              </div>
              <h1 className="text-[#101828] text-[25px] leading-[37.5px] font-bold ">No Invoice sent</h1>
              <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal max-w-[274px] w-full text-center">
                Use this feature to bill your client easily or send professional invoice
              </p>

              <div className="pt-10">
                <button
                  onClick={handleCreateInvoice}
                  className="flex items-center bg-[#5B52B6] max-w-[207px] w-full rounded-[8px] p-[10px] gap-[10px] text-[16.5px] leading-[19.8px] font-bold text-white"
                >
                  <Image src={AddCircle} alt="AddCircle" />
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceContent;

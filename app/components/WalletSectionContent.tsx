import { useState } from "react";
import Image from "next/image";

import GreenCheck from "../../public/assets/GreenCheck.svg";

import CopyIcon from "../../public/assets/CopyIcon.svg";

import Share from "../../public/assets/Share.svg";

import TopUpAdd from "../../public/assets/TopUpAdd.svg";

import TotalInflowsIcon from "../../public/assets/TotalInflowsIcon.svg";

import TotalOutflowsIcon from "../../public/assets/TotalOutflowsIcon.svg";

import CrossX from "../../public/assets/CrossX.svg";

import TransactionCountIcon from "../../public/assets/TransactionCountIcon.svg";

import AtSocial from "../../public/assets/AtSocial.svg";

import FacebookHandle from "../../public/assets/FacebookHandle.svg";

import GmailHandle from "../../public/assets/GmailHandle.svg";

import Whatsapp from "../../public/assets/Whatsapp.svg";

import WemaBankImage from "../../public/assets/WemaBankImage.svg";

import CancelIcon from "../../public/assets/CancelIcon.svg";

// import PreviewIcon from "../../public/assets/PreviewIcon.svg"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
//   Menu,
//   MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TopUpWalletContent from "./TopWalletContent";

type Status = "Successful" | "Pending" | "Failed";

type Transaction = {
  id: string;
  description: { type: "TopUp" | "Payment"; text: string; subtext: string };
  amount: string;
  channel: "Card" | "Transfer";
  status: Status;
};

const statusStyles = {
  Successful: { background: "#D2F6D2", color: "#008000" },
  Pending: { background: "#FAD9C2", color: "#F87B24" },
  Failed: { background: "#F5BFC1", color: "#DD2025" },
};

const defaultTransactions: Transaction[] = [
    {
      id: "FN-234567",
      description: { type: "TopUp", text: "Top-Up", subtext: "Today, 1:20 PM" },
      amount: "500000",
      channel: "Card",
      status: "Successful",
    },
    {
      id: "FN-988654",
      description: { type: "Payment", text: "Payment", subtext: "Oct 10, 12:20 AM" },
      amount: "-350000",
      channel: "Transfer",
      status: "Pending",
    },
    {
      id: "FN-987654",
      description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
      amount: "-14000",
      channel: "Card",
      status: "Failed",
    },
    {
      id: "FN-244567",
      description: { type: "TopUp", text: "Top-Up", subtext: "Today, 1:21 PM" },
      amount: "400000",
      channel: "Transfer",
      status: "Successful",
    },
  ];
  
  interface TransactionsSectionContentProps {
    transactions?: Transaction[];
    switchToTransactions: () => void;
   
  }

const monthlyData: Record<
  "Oct 2024" | "Nov 2024",
  {
    inflow: { amount: string; percentage: string; color: string; bgColor: string };
    outflow: { amount: string; percentage: string; color: string; bgColor: string };
    transactions: { count: string; percentage: string; color: string; bgColor: string };
  }
> = {
  "Oct 2024": {
    inflow: { amount: "₦2,000,000", percentage: "+20%", color: "#1ED11E", bgColor: "#D3FED3" },
    outflow: { amount: "₦1,800,000", percentage: "-13%", color: "#F87B24", bgColor: "#FAD9C2" },
    transactions: { count: "355", percentage: "-5%", color: "#5B52B6", bgColor: "#5B52B61A" },
  },
  "Nov 2024": {
    inflow: { amount: "₦2,500,000", percentage: "+25%", color: "#1ED11E", bgColor: "#D3FED3" },
    outflow: { amount: "₦2,100,000", percentage: "-10%", color: "#F87B24", bgColor: "#FAD9C2" },
    transactions: { count: "400", percentage: "+8%", color: "#5B52B6", bgColor: "#5B52B61A" },
  },
};

type Month = keyof typeof monthlyData;



const WalletSectionContent: React.FC<TransactionsSectionContentProps> = ({transactions: propTransactions,  switchToTransactions }) => {
    const [isTopUpWalletVisible, setIsTopUpWalletVisible] = useState(false);

  const toggleTopUpWallet = () => {
    setIsTopUpWalletVisible(!isTopUpWalletVisible);
  };

    const displayTransactions = propTransactions || defaultTransactions;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<null | string>(null);
  
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
      setAnchorEl(event.currentTarget);
      setSelectedTransaction(id);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedTransaction(null);
    };
  
    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const displayedRows = displayTransactions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const [selectedMonth, setSelectedMonth] = useState<Month>("Oct 2024");

    const data = monthlyData[selectedMonth];


    const [isShareOverlayVisible, setIsShareOverlayVisible] = useState(false);

    const toggleShareOverlay = () => {
        setIsShareOverlayVisible(!isShareOverlayVisible);
    };

   

    return(
        
        <div>
            {isTopUpWalletVisible ? (
            <TopUpWalletContent onClose={() => setIsTopUpWalletVisible(false)} />
          ) : (
            <>
            <div>
                <h1 className="text-[#101828] text-[24px] leading-[36px] font-bold">Wallet</h1>

                <p className="text-[#41404B] text-[16px] leading-[22.4px] font-normal pt-[10px]">Available Balance</p>

                <h1 className="text-[#101828] text-[39px] leading-[46.8px] font-medium">₦ 140,000.<span className="text-[24px] leading-[28.8px]">00</span></h1>
            </div>


            <div className="pt-10">
                <div className="flex items-start gap-32">
                    <div className="flex items-center justify-center rounded-[10.58px] shadow-custom-lg gap-16 bg-[#FFFFFF] p-[30px] max-w-[565px] w-full">
                        <div className="space-y-[20px]">
                            <div>
                                <h1 className="text-[#101828] text-[20px] leading-[30px] font-semibold">6500413410</h1>
                                <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">Wema Bank</p>
                            </div>

                            <div>
                                <h1 className="text-[#101828] text-[20px] leading-[30px] font-semibold whitespace-nowrap">Dora Consulting Ltd.
                                <p className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">Name of Account</p>
                              </h1>
                            </div>
                        </div>

                        <div className="space-y-[10px]">
                            <h1 className="text-[#101828] text-[20px] leading-[30px] font-semibold">Linked ID</h1>

                            <div className="space-y-[20px]">
                                <div className="flex items-center gap-20">
                                    <h1 className="text-[14px] leading-[21px] font-normal text-[#A3A2AB]">BVN</h1>

                                    <div className="flex items-center gap-[10px]">
                                        <div className="flex items-center justify-center w-[104px] bg-[#D2F6D2] p-[5px] rounded-[100px] gap-[10px]">
                                            <h1 className="text-[#008000] text-[14px] leading-[21px] font-normal">Verified</h1>
                                            <Image src={GreenCheck} alt="GreenCheck" />
                                        </div>

                                        <p className="text-[#101828] text-[14px] leading-[21px] font-normal">22228*****</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-20">
                                    <h1 className="text-[14px] leading-[21px] font-normal text-[#A3A2AB]">NIN</h1>

                                    <div className="flex items-center gap-[10px]">
                                        <div className="flex items-center justify-center bg-[#D2F6D2] w-[104px] p-[5px] rounded-[100px] gap-[10px]">
                                            <h1 className="text-[#008000] text-[14px] leading-[21px] font-normal">Verified</h1>
                                            <Image src={GreenCheck} alt="GreenCheck" />
                                        </div>

                                        <p className="text-[#101828] text-[14px] leading-[21px] font-normal">21602*****</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-[10px]">
                        <h1 className="text-[#41404B] text-[16.5px] leading-[19.8px] font-semibold">Quick Action</h1>

                        <div className="flex flex-col items-start space-y-[20px]">
                            <div className="flex items-center gap-[10px]">
                                <Image width={24} height={24} src={CopyIcon} alt="CopyIcon" />

                                <h1 className="text-[#A3A2AB] text-[13px] leading-[19.5px] font-normal">Withdraw</h1>
                            </div>

                            <div className="flex items-center gap-[10px] cursor-pointer" onClick={toggleTopUpWallet}>
                                <Image width={24} height={24} src={TopUpAdd} alt="TopUpAdd" />

                                <h1 className="text-[#A3A2AB] text-[13px] leading-[19.5px] font-normal">Top Up Wallet</h1>
                            </div>


                            <div>
                                <div className="flex items-center gap-[10px] cursor-pointer"
                                 onClick={toggleShareOverlay}>
                                    <Image width={24} height={24} src={Share} alt="CopyIcon" />
                                    <h1 className="text-[#A3A2AB] text-[13px] leading-[19.5px] font-normal">Share Details</h1>
                                </div>


                                {isShareOverlayVisible && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white relative p-6 rounded-[8px] shadow-lg w-[400px]">
                                            <h2 className="text-lg font-bold text-center pt-10">Share Details</h2>
                                            
                                            <div className="flex items-center justify-center gap-[24px] pt-10 pb-10">
                                                <div>
                                                    <Image src={AtSocial} alt="AtSocial" />
                                                </div>

                                                <div>
                                                    <Image src={FacebookHandle} alt="FacebookHandle" />
                                                </div>

                                                <div>
                                                    <Image src={GmailHandle} alt="GmailHandle" />
                                                </div>

                                                <div>
                                                    <Image src={Whatsapp} alt="Whatsapp" />
                                                </div>
                                            </div>

                                            <div className="bg-[#F1F1F1] flex flex-col items-center  justify-center space-y-[16px] p-[8px] rounded-[8px]">
                                                <div className="flex items-center gap-24">
                                                    <h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal whitespace-nowrap">Bank Name :</h1>

                                                    <div className="flex items-center gap-[5px]">
                                                        <Image src={WemaBankImage} alt="WemaBankImage" />

                                                        <h1 className="text-[#101828] text-[16px] leading-[24px] font-normal whitespace-nowrap">Wema Bank</h1>
                                                    </div>
                                                </div>


                                                <div className="flex items-center gap-20">
                                                    <h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal whitespace-nowrap">Account Name :</h1>


                                                    <p className="text-[#101828] text-[16px] leading-[24px] font-normal whitespace-nowrap">PAUL OSEGHALE</p>
                                                </div>

                                                <div className="flex items-center gap-20">
                                                    <h1 className="text-[#A3A2AB] text-[16px] leading-[24px] font-normal">Account Number :</h1>


                                                    <p className="text-[#101828] text-[16px] leading-[24px] font-normal">6500413410</p>
                                                </div>
                                            </div>


                                            <div className="flex items-center justify-end gap-[8px] pt-[25px] pb-10">
                                                <Image width={24} height={24} src={CopyIcon} alt="CopyIcon" />

                                                <h1 className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Copy details</h1>
                                            </div>

                                            <button
                                            className="absolute top-[19px] left-[350px]"
                                            onClick={toggleShareOverlay}
                                            >
                                            <Image src={CrossX} alt="CrossX" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="pt-[30px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#41404B] text-[16.5px] leading-[19.8px] font-semibold">Statistics</h1>
        
                    {/* Month Select Dropdown */}
                    <select
                    className="bg-transparent border-[0.5px] border-[#CFCDEC] rounded-[4px] p-[8px] outline-none text-[#41404B] text-[16px] font-semibold"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value as Month)}
                    >
                    {Object.keys(monthlyData).map((month) => (
                        <option key={month} value={month}>
                        {month}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Statistics Content */}
                <div className="flex items-center justify-between pt-[20px]">
                    {/* Total Inflow */}
                    <div className="flex items-center gap-10">
                    <div className="flex items-center gap-[15px]">
                        <Image width={24} height={24} src={TotalInflowsIcon} alt="TotalInflowsIcon" />
                        <div>
                        <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Total Inflow</p>
                        <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">{data.inflow.amount}</h1>
                        </div>
                    </div>
                    <p
                        className={`text-[14px] leading-[21px] font-normal w-[57px] rounded-[100px] flex items-center justify-center p-[10px] bg-[${data.inflow.bgColor}] text-[${data.inflow.color}]`}
                    >
                        {data.inflow.percentage}
                    </p>
                </div>

                {/* Total Outflow */}
                <div className="flex items-center gap-10">
                <div className="flex items-center gap-[15px]">
                    <Image width={24} height={24} src={TotalOutflowsIcon} alt="TotalOutflowsIcon" />
                    <div>
                    <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Total Outflow</p>
                    <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">{data.outflow.amount}</h1>
                    </div>
                </div>
                <p
                    className={`text-[14px] leading-[21px] font-normal w-[57px] rounded-[100px] flex items-center justify-center p-[10px] bg-[${data.outflow.bgColor}] text-[${data.outflow.color}]`}
                >
                    {data.outflow.percentage}
                </p>
                </div>

                {/* Transaction Count */}
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-[15px]">
                        <Image width={24} height={24} src={TransactionCountIcon} alt="TransactionCountIcon" />
                        <div>
                        <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Transaction Count</p>
                        <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">{data.transactions.count}</h1>
                        </div>
                    </div>
                    <p
                        className={`text-[14px] leading-[21px] font-normal w-[57px] rounded-[100px] flex items-center justify-center p-[10px] bg-[${data.transactions.bgColor}] text-[${data.transactions.color}]`}
                    >
                        {data.transactions.percentage}
                    </p>
                </div>
            </div>
        </div>


        <div className="pt-16">
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-[#41404B] text-[16px] leading-[19.2px] font-semibold">Transactions History</h1>

                    <button
                        onClick={switchToTransactions}
                        className="bg-[#5B52B6] text-[#FFFFFF] text-[14px] leading-[16.8px] font-normal p-[10px] w-[96px] rounded-[8px]">
                        View All
                    </button>
                

                </div>
            </div>
        </div>

        <div className="pt-[20px]">
            <Paper>
                <TableContainer className="scrollbar-hide">
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Description</h1></TableCell>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Amount</h1></TableCell>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Transaction ID</h1></TableCell>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Channel</h1></TableCell>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Status</h1></TableCell>
                        <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Action</h1></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {displayedRows.map((transaction) => (
                        <TableRow key={transaction.id}>
                        {/* Description */}
                        <TableCell>
                            <div className="flex items-center space-x-2">
                            <img
                                src={
                                transaction.description.type === "TopUp"
                                    ? "/assets/TotalInflowsIcon.svg"
                                    : "/assets/TotalOutflowsIcon.svg"
                                }
                                alt="icon"
                                style={{ width: 24, height: 24 }}
                            />
                            <div>
                                <h1 className="text-[#101828] text-[14px] leading-[21px] font-semibold">{transaction.description.text}</h1>
                                <h1 className="text-[14px] leading-[21px] text-[#A3A2AB] font-normal">{transaction.description.subtext}</h1>
                            </div>
                            </div>
                        </TableCell>
                        {/* Amount */}
                        <TableCell>
                            <Typography style={{ color: "#101828" }}>
                                <h1 className="text-[#101828] text-[14px] leading-[21px] font-normal">
                                    {parseFloat(transaction.amount) > 0 ? "+" : "-"}
                                    ₦{Math.abs(parseFloat(transaction.amount))}
                                </h1>
                            </Typography>
                        </TableCell>
                        {/* Transaction ID */}
                        <TableCell><h1 className="text-[#A3A2AB] leading-[24px] text-[16px] font-medium">{transaction.id}</h1></TableCell>
                        {/* Channel */}
                        <TableCell><h1 className="text-[#A3A2AB] leading-[24px] text-[16px] font-medium">{transaction.channel}</h1></TableCell>
                        {/* Status */}
                        <TableCell>
                            <div
                            style={{
                                backgroundColor: statusStyles[transaction.status].background,
                                color: statusStyles[transaction.status].color,
                            }}
                            className="text-[14px] leading-[21px] font-normal w-[116px] flex items-center justify-center p-[10px] rounded-[100px]"
                            >
                            {transaction.status}
                            </div>
                        </TableCell>
                        {/* Action */}
                        <TableCell className="relative">
                            {/* MoreVert Icon Button */}
                            <IconButton
                                onClick={(event) => handleMenuClick(event, transaction.id)}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            {/* Custom Dropdown */}
                            {selectedTransaction === transaction.id && anchorEl && (
                                <div
                                className="absolute bg-white border border-gray-200 rounded-lg shadow-md p-2 w-[100px] z-50"
                                style={{
                                    top: anchorEl.getBoundingClientRect().height + 8, // Place dropdown below the button
                                    left: 10, // Align with the button's left edge
                                }}
                                >
                                <div
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                    console.log("Preview clicked");
                                    handleMenuClose();
                                    }}
                                >
                                    {/* <Image src={PreviewIcon} alt="Preview Icon" width={16} height={16} /> */}
                                    <span className="text-[13px] leading-[19.5px] font-normal text-[#101828] ml-2">
                                     Preview
                                    </span>
                                </div>

                                <div
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                    console.log("Cancel clicked");
                                    handleMenuClose();
                                    }}
                                >
                                    <Image src={CancelIcon} alt="Cancel Icon" width={16} height={16} />
                                    <span className="text-[13px] leading-[19.5px] font-normal text-[#101828] ml-2">
                                    Cancel
                                    </span>
                                </div>
                                </div>
                            )}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                {/* Pagination */}
                <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={displayTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
        </>
        )}


            {/* <div className="pt-[30px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#41404B] text-[16.5px] leading-[19.8px] font-semibold">Statistics</h1>

                    <p>Oct 2024</p>
                </div>

                <div className="flex items-center justify-between pt-[20px]">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-[15px]">
                            <Image width={24} height={24} src={TotalInflowsIcon} alt="TotalInflowsIcon" />
                            <div>
                                <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Total Inflow</p>
                                <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">₦2,000,000</h1>
                            </div>
                        </div>

                        <p className="text-[#1ED11E] text-[14px] leading-[21px] font-normal bg-[#D3FED3] w-[57px] rounded-[100px] flex items-center justify-center p-[10px]">+20%</p>
                    </div>


                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-[15px]">
                            <Image width={24} height={24} src={TotalOutflowsIcon} alt="TotalOutflowsIcon" />
                            <div>
                                <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Total Outflow</p>
                                <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">₦1,800,000</h1>
                            </div>
                        </div>

                        <p className="text-[#F87B24] text-[14px] leading-[21px] font-normal bg-[#FAD9C2] w-[57px] rounded-[100px] flex items-center justify-center p-[10px]">-13%</p>
                    </div>


                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-[15px]">
                            <Image width={24} height={24} src={TransactionCountIcon} alt="TransactionCountIcon" />
                            <div>
                                <p className="text-[#A3A2AB] text-[14px] leading-[21px] font-normal">Transaction Count</p>
                                <h1 className="text-[#41404B] text-[16px] leading-[22.4px] font-semibold">355</h1>
                            </div>
                        </div>

                        <p className="text-[#5B52B6] text-[14px] leading-[21px] font-normal bg-[#5B52B61A] w-[57px] rounded-[100px] flex items-center justify-center p-[10px]">-5%</p>
                    </div>
                </div>
            </div> */}
        </div>

    )
};


export default WalletSectionContent;
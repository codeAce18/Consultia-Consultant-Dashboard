import React, { useState } from "react";
import Image from "next/image";
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
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CancelIcon from "../../public/assets/CancelIcon.svg"
// import PreviewIcon from "../../public/assets/PreviewIcon.svg"

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
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-250000",
    channel: "Transfer",
    status: "Pending",
  },
  {
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-15000",
    channel: "Transfer",
    status: "Failed",
  },
  {
    id: "FN-234567",
    description: { type: "TopUp", text: "Top-Up", subtext: "Today, 1:20 PM" },
    amount: "500000",
    channel: "Card",
    status: "Successful",
  },
  {
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-250000",
    channel: "Transfer",
    status: "Pending",
  },
  {
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-15000",
    channel: "Transfer",
    status: "Failed",
  },
  {
    id: "FN-234567",
    description: { type: "TopUp", text: "Top-Up", subtext: "Today, 1:20 PM" },
    amount: "500000",
    channel: "Card",
    status: "Successful",
  },
  {
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-250000",
    channel: "Transfer",
    status: "Pending",
  },
  {
    id: "FN-987654",
    description: { type: "Payment", text: "Payment", subtext: "Oct 10, 11:20 AM" },
    amount: "-15000",
    channel: "Transfer",
    status: "Failed",
  },
];

interface TransactionsSectionContentProps {
  transactions?: Transaction[];
}

const TransactionsSectionContent: React.FC<TransactionsSectionContentProps> = ({ 
  transactions: propTransactions 
}) => {
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
  
    return (
      <Paper>
        <TableContainer>
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
                  <TableCell>
                    <IconButton
                      onClick={(event) => handleMenuClick(event, transaction.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {selectedTransaction === transaction.id && (
                      <div
                       className="absolute bg-white border border-gray-200 rounded-lg shadow-md p-2 mt-2 w-[120px] z-50"
                       style={{ top: anchorEl?.getBoundingClientRect()?.bottom, left: anchorEl?.getBoundingClientRect()?.left }}
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
    );
};

export const transactions = defaultTransactions;

export default TransactionsSectionContent;
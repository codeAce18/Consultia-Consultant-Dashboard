import React, { useState } from 'react';
import {Send, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import GreenCheck from "../../public/assets/GreenCheck.svg";

interface InvoiceSendSheetProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceDetails: InvoiceDetails;
  onSendInvoice: (emailDetails: EmailDetails) => void;
}

interface InvoiceDetails {
  dateIssued: string;
  invoiceNumber: string;
  id?: number; 
  amount?: number;  
  date?: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  description: string;
  quantity: string;
  unitPrice: string;
  total: string;
}

interface EmailDetails {
  from: string;
  to: string;
  subject: string;
  message: string;
}

const InvoiceSendSheet = ({ 
  isOpen, 
  onClose, 
  invoiceDetails, 
  onSendInvoice 
}: InvoiceSendSheetProps) => {
  const [emailDetails, setEmailDetails] = useState<EmailDetails>({
    from: '',
    to: '',
    subject: '',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);


  const handleInputChange = (field: string, value: string) => {
    setEmailDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

 const handleSendInvoice = () => {
  // Here you would typically implement the actual send logic
  // For now, we'll just simulate a successful send
  onSendInvoice(emailDetails); // Correctly passes the emailDetails object
  setIsSent(true);
};
  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  if (isSent) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent side="right" className="w-[500px] p-8">
          <div className="flex flex-col items-center justify-center h-full">
            <Image 
              src={GreenCheck} 
              alt="Success" 
              width={120} 
              height={120} 
              className="mb-6"
            />
            <h2 className="text-2xl font-bold text-[#101828] mb-4">
              Invoice Sent Successfully
            </h2>
            <p className="text-[#667085] text-center mb-8">
              Your invoice has been sent to {emailDetails.to}
            </p>
            <Button 
              onClick={handleClose} 
              className="w-full"
            >
              Done
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[500px] p-8 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">Send Invoice</SheetTitle>
        </SheetHeader>

        {/* Email Details Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">
              From
            </label>
            <Input 
              placeholder="Your email"
              value={emailDetails.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">
              To
            </label>
            <Input 
              placeholder="Recipient's email"
              value={emailDetails.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">
              Subject
            </label>
            <Input 
              placeholder="Invoice from Dora Consulting"
              value={emailDetails.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">
              Message
            </label>
            <Textarea 
              placeholder="Add a message to your invoice (optional)"
              value={emailDetails.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full min-h-[120px]"
            />
          </div>
        </div>

        <div className="bg-[#F9F9FF] rounded-lg p-4 mb-6 flex items-center">
          <FileText className="text-[#5B52B6] mr-4" size={24} />
          <div>
            <h3 className="font-semibold text-[#101828]">
              Invoice #{invoiceDetails?.invoiceNumber || 'N/A'} {/* Fallback for invoice number */}
            </h3>
            <p className="text-[#667085] text-sm">
              PDF, {invoiceDetails?.dateIssued || 'Date not available'} {/* Fallback for date */}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            className="w-full bg-[#5B52B6] hover:bg-[#4A42A0]"
            onClick={handleSendInvoice}
          >
            <Send className="mr-2" size={16} />
            Send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvoiceSendSheet;
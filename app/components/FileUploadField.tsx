import React, { useState } from 'react';
import Image from 'next/image';
import UploadIcon from '../../public/assets/UploadIcon.svg'; 

interface FileUploadFieldProps {
  label: string;
  fieldName: string;
  onFileSelect: (file: File | null, fieldName: string) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, fieldName, onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onFileSelect(file, fieldName);
  };

  return (
    <div className="text-left mb-6">
      <label className="text-[16px] text-[#101828] leading-[24px] font-medium">{label}</label>
      <div className="pt-[5px]">
        <div className="border-dashed w-full max-w-[696px] h-[96px] border-[1px] border-[#5B52B6] rounded-[8px] bg-[#F1F1F1] p-4 text-center relative">
          <input
            type="file"
            accept="image/jpeg, image/png, application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <Image src={UploadIcon} alt="Upload Icon" width={24} height={24} className="mx-auto" />
          <p className="text-[14px] leading-[21px] text-[#D0D0D3] font-normal pt-[5px]">
            Drag and Drop file here or choose file
          </p>
          {fileName && (
            <p className="absolute top-2 right-2 text-[12px] text-[#000000] font-medium">
              {fileName}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-[13px] text-[#757678] font-normal">Supported formats: PDF, JPEG, PNG</p>
          <p className="text-[13px] text-[#757678] font-normal">Maximum size: 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadField;

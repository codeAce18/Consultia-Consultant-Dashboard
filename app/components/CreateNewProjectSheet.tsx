import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter 
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import Image from 'next/image';
import UploadIcon from "../../public/assets/UploadIcon.svg";
import TodoList from './TodoList';

const categories = [
  "Software Development",
  "Consulting",
  "Marketing",
  "Design",
  "Other"
] as const;

const serviceTypes = [
  "Full-time",
  "Part-time", 
  "Contract",
  "Hourly"
] as const;

const priorities = [
  "Low",
  "Medium", 
  "High",
  "Urgent"
] as const;

const tags = [
  "Web Development",
  "Mobile App",
  "UI/UX",
  "Backend",
  "Frontend",
  "Cloud"
] as const;

type Category = typeof categories[number];
type ServiceType = typeof serviceTypes[number];
type Priority = typeof priorities[number];
type Tag = typeof tags[number];

interface CreateNewProjectSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateNewProjectSheet: React.FC<CreateNewProjectSheetProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const [isClientOnConsultia, setIsClientOnConsultia] = useState<'yes' | 'no' | null>(null);
  const [projectStartDate, setProjectStartDate] = useState<Date | undefined>(undefined);
  const [projectDueDate, setProjectDueDate] = useState<Date | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [clientIdentifier, setClientIdentifier] = useState<string>('');
  const [projectCategory, setProjectCategory] = useState<Category | undefined>(undefined);
  const [serviceType, setServiceType] = useState<ServiceType | undefined>(undefined);
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [fileName, setFileName] = useState<string | null>(null); 
  const [error, setError] = useState<string | null>(null); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
      // Validate file format (XLS and XLSX)
      const supportedFormats = ['xls', 'xlsx', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      
      if (!supportedFormats.includes(fileType) && 
          !supportedFormats.includes(fileExtension || '')) {
        setError('Supported formats: XLS and XLSX only.');
        return;
      }
  
      // Clear any previous errors
      setError(null);
      setFileName(file.name);
    }
  };

  const handleReset = () => {
    setIsClientOnConsultia(null);
    setProjectStartDate(undefined);
    setProjectDueDate(undefined);
    setSelectedFiles([]);
    setClientIdentifier('');
    setProjectCategory(undefined);
    setServiceType(undefined);
    setPriority(undefined);
    setSelectedTags([]);
  };

  const handleCreateProject = () => {
    // Implement project creation logic
    console.log('Project creation logic', {
      isClientOnConsultia,
      clientIdentifier,
      projectCategory,
      serviceType,
      projectStartDate,
      projectDueDate
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Create New Project</SheetTitle>
          <SheetDescription>
            Kindly fill out all fields provided below
          </SheetDescription>
        </SheetHeader>

       

        {/* Client on Consultia */}
        <div className="mb-4">
          <Label>Is this client on Consultia?</Label>
          <RadioGroup 
            onValueChange={(value: 'yes' | 'no') => setIsClientOnConsultia(value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>

         {/* Conditional Client Identification */}
        {isClientOnConsultia !== null && (
          <div className="mb-4">
            <Label>
              {isClientOnConsultia === 'yes' 
                ? 'Enter Client ID' 
                : 'Enter Client Email'}
            </Label>
            <Input 
                className='bg-[#F1F1F1] outline-none'
              placeholder={
                isClientOnConsultia === 'yes' 
                  ? 'Enter client ID' 
                  : 'Enter client email'
              }
              value={clientIdentifier}
              onChange={(e) => setClientIdentifier(e.target.value)}
              type={isClientOnConsultia === 'yes' ? 'text' : 'email'}
            />
          </div>
        )}

        {/* Project Category & Service Type */}
          <div className="w-full">
            <Label>Project Category</Label>
            <Select 
              value={projectCategory} 
              onValueChange={(value: Category) => setProjectCategory(value)}
            >
              <SelectTrigger  className='bg-[#F1F1F1] outline-none'>
                <SelectValue placeholder="Select a consultancy type" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full pt-4">
            <Label>Service Type</Label>
            <Select 
              value={serviceType}
              onValueChange={(value: ServiceType) => setServiceType(value)}
            >
              <SelectTrigger className='bg-[#F1F1F1] outline-none'>
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {/* Tags */}
        <div className="mb-4 pt-4">
          <Label>Tags</Label>
          <Select 
            value={selectedTags[0]} 
            onValueChange={(value: Tag) => setSelectedTags([value])}
          >
            <SelectTrigger className='bg-[#F1F1F1] outline-none'>
              <SelectValue placeholder="Pick few tags" />
            </SelectTrigger>
            <SelectContent>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Dates */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <Label>Project Start Date</Label>
            <Popover>
              <PopoverTrigger asChild className='bg-[#F1F1F1] outline-none'>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {projectStartDate ? format(projectStartDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={projectStartDate}
                  onSelect={setProjectStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-1/2">
            <Label>Project Due Date</Label>
            <Popover>
              <PopoverTrigger asChild className='bg-[#F1F1F1] outline-none' >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {projectDueDate ? format(projectDueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={projectDueDate}
                  onSelect={setProjectDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Budget & Priority */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <Label>Budget</Label>
            <Input type="number" placeholder="Enter budget" className='bg-[#F1F1F1] outline-none' />
          </div>
          <div className="w-1/2">
            <Label>Priority</Label>
            <Select 
              value={priority}
              onValueChange={(value: Priority) => setPriority(value)}
            >
              <SelectTrigger className='bg-[#F1F1F1] outline-none'>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priorityItem => (
                  <SelectItem key={priorityItem} value={priorityItem}>
                    {priorityItem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Task Assign Personnels */}
         <div className="mb-4">
           <Label>Task Assign Personnels</Label>
           <Textarea 
             className='bg-[#F1F1F1] outline-none'
             placeholder="List assigned team members or personnels"
             rows={3}
           />
         </div>

         {/* Project Description */}
         <div className="mb-4">
           <Label>Project Description</Label>           
           <Textarea 
             className='bg-[#F1F1F1] outline-none'
             placeholder="Provide a detailed description of the project"
            rows={4}
           />
         </div>

         <div className="text-left">
            <label className="text-[16px] text-[#101828] leading-[24px] font-medium">File Upload</label>
            <div className='pt-[5px]'>
            <div className="border-dashed h-[96px] border-[1px] border-[#5B52B6] rounded-[8px] bg-[#F1F1F1] p-4 text-center relative">
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange} // Handle file input change
            />
            <Image src={UploadIcon} alt="Upload Icon" width={24} height={24} className="mx-auto" /> {/* Update with correct path */}
            <p className="text-[14px] leading-[21px] text-[#D0D0D3] font-normal pt-[5px]">Drag and Drop photo here or choose photo</p>
            
            {fileName && (
                <p className="absolute top-2 right-2 text-[12px] text-[#000000] font-medium">
                {fileName}
                </p> // Display file name at the top-right corner
            )}
            
            {error && (
                <p className="text-red-500 mt-2">{error}</p>
            )}

            {/* {errors.profilePicture && <p>{(errors.profilePicture.message as string) || 'Profile picture is required'}</p>} */}
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[13px] leading-[19.5px] text-[#757678] font-normal">Supported format: XLS , XLSX</p>

                <p className="text-[13px] leading-[19.5px] text-[#757678] font-normal">Maximum size: 25MB</p>
            </div>
            </div>
        </div>

            <div className='pt-10'>
                <h1 className='text-[#A9A9AE] text-[14px] leading-[21px] font-medium' >To-Do List</h1>
                <div className="pt-[25px] bg-white">
                  <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                    <TodoList label="Clients Meetings and Calls" />
                  </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Strategy Development" />
                </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Report Writing & Documentation" />
                </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Team Collaboration" />
                </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Client Communication" />
                </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Market & Industry Research" />
                </div>
                <div className="py-[10.75px] px-[7.17px] shadow-custom-two border-b-[7px]">
                  <TodoList label="Attend NAPCO Conference" />
                </div>
              </div>
            </div>

            <div className="mb-4 pt-10">
              <div className="flex items-center gap-2">
                <input
                  id="newTask"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  placeholder='Add New Task'
                />
                <button className="bg-[#5B52B6] text-white px-4 py-2 rounded-md font-medium">
                  Add
                </button>
              </div>
            </div>


         

            {/* Action Buttons */}
            <SheetFooter className="flex space-x-4 pt-10">
            <Button 
                variant="outline" 
                onClick={handleReset}
                className="w-1/2"
            >
                Reset
            </Button>
            <Button 
                onClick={handleCreateProject} 
                className="w-1/2 bg-[#5B52B6]"
            >
                Create Project
            </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
  );
};

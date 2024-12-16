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
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import MemberRemoveIcon from "../../public/assets/MemberRemoveIcon.svg"
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddMembersIcon from  "../../public/assets/AddMemberIcon.svg";
import EditPen from  "../../public/assets/EditPen.svg";
import Alert from  "../../public/assets/Alert.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Existing interfaces from previous code
interface RoleOption {
  value: string;
  label: string;
}

interface AccessOption {
  label: string;
}

interface Member {
  id: number;
  name: string;
  image: string;
  email: string;
  role: string;
  access?: string[];
}

interface NewMember {
  name: string;
  email: string;
  role: string;
  access: string[];
}

// Existing role and access options from previous code
const roleOptions: RoleOption[] = [
  { value: 'md/ceo', label: 'MD/CEO' },
  { value: 'senior designer', label: 'Senior Designer' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'project manager', label: 'Project Manager' },
  { value: 'software engineer', label: 'Software Engineer' },
  { value: 'data analyst', label: 'Data Analyst' },
  { value: 'sales manager', label: 'Sales Manager' },
  { value: 'ux designer', label: 'UX Designer' },
  { value: 'product manager', label: 'Product Manager' },
  { value: 'customer support specialist', label: 'Customer Support Specialist' },
  { value: 'business analyst', label: 'Business Analyst' },
  { value: 'hr manager', label: 'HR Manager' },
  { value: 'financial analyst', label: 'Financial Analyst' },
];

const accessOptions: AccessOption[] = [
  { label: 'All Access' },
  { label: 'Can flag a client' },
  { label: 'Can access all features' },
  { label: 'Can edit client information' },
  { label: 'Can view analytics data' },
  { label: 'Can generate reports' },
  { label: 'Can manage user permissions' },
  { label: 'Can export data' },
  { label: 'Can import data' },
  { label: 'Can customize dashboard' },
  { label: 'Can schedule automated reports' },
  { label: 'Can collaborate with team members' },
  { label: 'Can track user activity' },
];

const SettingsManageRolesSection: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState<boolean>(false);
  const [isManageAccessSheetOpen, setIsManageAccessSheetOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: 'Paul Osahgale',
      image: 'https://github.com/shadcn.png',
      email: 'osahgalepaul112@gmail.com',
      role: 'MD/CEO',
      access: ['All Access', 'Can manage user permissions']
    },
    {
      id: 2,
      name: 'Taiwo Joel',
      image: 'https://github.com/shadcn.png',
      email: 'joeltaiwo24@gmail.com',
      role: 'Software Engineer',
      access: ['Can view analytics data', 'Can generate reports']
    }
  ]);

  const [newMember, setNewMember] = useState<NewMember>({
    name: '',
    email: '',
    role: '',
    access: []
  });

  const handleInviteMember = () => {
    const memberToAdd: Member = {
      id: members.length + 1,
      name: newMember.name,
      image: 'https://github.com/shadcn.png', // Placeholder
      email: newMember.email,
      role: newMember.role,
      access: newMember.access // Include access when adding new member
    };

    // Explicitly spread the memberToAdd to satisfy TypeScript
    setMembers(prevMembers => [...prevMembers, {...memberToAdd}]);
    setIsSheetOpen(false);
    // Reset form
    setNewMember({
      name: '',
      email: '',
      role: '',
      access: []
    });
  };

  // Handle More Vert Icon Click
  const handleMoreVertClick = (event: React.MouseEvent<HTMLButtonElement>, member: Member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Remove Member
  const handleRemoveMember = () => {
    if (selectedMember) {
      setMembers(prev => prev.filter(m => m.id !== selectedMember.id));
      setIsRemoveDialogOpen(false);
      handleMenuClose();
    }
  };

  // Handle Manage Access
  const handleManageAccess = () => {
    setIsManageAccessSheetOpen(true);
    handleMenuClose();
  };

  // Handle Access Change in Manage Access Sheet
  const handleAccessChange = (option: string, checked: boolean) => {
    // For new member invite
    if (!selectedMember) {
      setNewMember(prev => ({
        ...prev,
        access: checked 
          ? [...prev.access, option]
          : prev.access.filter(a => a !== option)
      }));
    } else {
      // For managing existing member's access
      const updatedAccess = checked 
        ? [...(selectedMember.access || []), option]
        : (selectedMember.access || []).filter(a => a !== option);

      setSelectedMember(prev => prev ? {...prev, access: updatedAccess} : null);
    }
  };

  // Update Member's Access
  const handleUpdateMemberAccess = () => {
    if (selectedMember) {
      setMembers(prev => 
        prev.map(m => 
          m.id === selectedMember.id 
            ? {...m, access: selectedMember.access} 
            : m
        )
      );
      setIsManageAccessSheetOpen(false);
    }
  };

  // Reset Member's Access
  const handleResetMemberAccess = () => {
    if (selectedMember) {
      const originalMember = members.find(m => m.id === selectedMember.id);
      if (originalMember) {
        setSelectedMember({...originalMember});
      }
    }
  };

  return (
    <div className="p-4">
      {/* Existing Invite Members Button and Table Code */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsSheetOpen(true)} 
          className="flex bg-[#5B52B6] items-center gap-2 text-white text-[16.5px] leading-[19.8px] w-[207px] rounded-[8px] p-[10px] font-bold"
        >
          <Image width={24} height={24} src={AddMembersIcon} alt="AddMembersIcon" />
          Invite Members
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          {/* Existing Table Header */}
          <TableHead>
            <TableRow>
              <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Name</h1></TableCell>
              <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Email</h1></TableCell>
              <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Role</h1></TableCell>
              <TableCell><h1 className="text-[#7B91B0] text-[16.5px] leading-[19.8px] font-semibold">Actions</h1></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-[#F9FAFE]">
            {members.map((member) => (
              <TableRow key={member.id}>
                {/* Existing Table Row Content */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={member.image} 
                      alt={member.name} 
                    />
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">Lagos, Nigeria</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    color={'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={(e) => handleMoreVertClick(e, member)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* More Vert Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => setIsRemoveDialogOpen(true)}>
          <div className="flex items-center gap-[15px] text-[#101828] text-[13px] leading-[19.5px] font-normal">
            <Image width={24} height={24} src={MemberRemoveIcon} alt="MemberRemoveIcon" />
            Remove
          </div>
        </MenuItem>
        <MenuItem onClick={handleManageAccess}>
          <div className="flex items-center gap-[15px] text-[#101828] text-[13px] leading-[19.5px] font-normal">
            <Image width={24} height={24} src={EditPen} alt="EditPen" />
            Manage Access
          </div>
        </MenuItem>
      </Menu>

      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <div>
          <DialogContent className="max-w-[341px] w-full">
              <div className="flex flex-col items-center justify-center">
                <Image width={200} height={200} src={Alert} alt="Alert" />
                <DialogTitle className="text-center text-[#101828] font-bold text-[25px] leading-[37.5px]">Remove Member</DialogTitle>
              </div>
            <DialogHeader>
              <DialogDescription className="text-center max-w-[270px] w-full text-[#41404B] text-[16px] leading-[24px] font-normal">
                By doing this, {selectedMember?.name} will no longer be able to access your Consultia account.
              </DialogDescription>

            </DialogHeader>
            <div className="flex flex-col justify-center gap-4 mt-4">
              <button className="bg-[#F1F1F1] text-[#5B52B6] text-[16.5px] leading-[19.8px] font-bold max-w-[270px] w-full p-[10px] rounded-[8px] shadow-button-custom mx-auto" onClick={() => setIsRemoveDialogOpen(false)}>
                Cancel
              </button>
              <button className="bg-[#5B52B6] font-bold text-[#FFFFFF] text-[16.5px] leading-[19.8px] max-w-[270px] w-full p-[10px] rounded-[8px] shadow-button-custom mx-auto" onClick={handleRemoveMember}>
                Yes Remove
              </button>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* Manage Access Sheet */}
      <Sheet open={isManageAccessSheetOpen} onOpenChange={setIsManageAccessSheetOpen}>
        <SheetContent className="overflow-y-auto scrollbar-hide">
          <SheetHeader>
            <SheetTitle className="text-[#101828] text-[24px] leading-[36px] font-bold">
              Manage {selectedMember?.name} Access
            </SheetTitle>
            <SheetDescription className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">
              Update access permissions for this team member
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <h1 className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium pb-[10px]">Manage Access</h1>
            {accessOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 ">
                <Checkbox 
                  id={`access-${index}`}
                  checked={selectedMember?.access?.includes(option.label)}
                  onCheckedChange={(checked: boolean) => handleAccessChange(option.label, checked)}
                />
                <div>
                  <label 
                    htmlFor={`access-${index}`} 
                    className="text-[#3E3E45] text-[16px] leading-[22.4px] font-normal"
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className='pt-10 flex items-center justify-center gap-[23px]'>
            <SheetClose asChild>
              <button 
                onClick={handleResetMemberAccess}
                className='bg-[#FFFFFF] max-w-[172px] w-full p-[10px] rounded-[8px] text-[#5B52B6] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'
              >
                Reset
              </button>
            </SheetClose>
            <button 
              onClick={handleUpdateMemberAccess} 
              className='bg-[#5B52B6] text-white w-full max-w-[172px] p-[10px] rounded-[8px] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'
            >
              Update
            </button>
          </div>
        </SheetContent>
      </Sheet>
        
      {/* sheet for inviting a member */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto scrollbar-hide">
          <SheetHeader>
            <SheetTitle className="text-[#101828] text-[24px] leading-[36px] font-bold">Invite Team Member</SheetTitle>
            <SheetDescription className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">
              Kindly edit any editable fields on this project.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4 pt-10 ">
            <div className="items-center gap-4">
              <label htmlFor="name" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Member Name
              </label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="col-span-3"
              />
            </div>
            
            <div className="items-center gap-4">
              <label htmlFor="email" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Add Email
              </label>
              <Input
                id="email"
                value={newMember.email}
                onChange={(e) => setNewMember(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="col-span-3"
              />
            </div>
            
            <div className="items-center gap-4">
              <label htmlFor="role" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Roles
              </label>
              <Select 
                value={newMember.role}
                onValueChange={(value) => setNewMember(prev => ({
                  ...prev,
                  role: value
                }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <h1 className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium pb-[10px]">Manage Access</h1>
              {accessOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 ">
                  <Checkbox 
                    id={`access-${index}`}
                    checked={newMember.access.includes(option.label)}
                    onCheckedChange={(checked: boolean) => handleAccessChange(option.label, checked)}
                  />
                  <div>
                    <label 
                      htmlFor={`access-${index}`} 
                      className="text-[#3E3E45] text-[16px] leading-[22.4px] font-normal"
                    >
                      {option.label}
                    </label>
                  </div>
                </div>
                    
              ))}
            </div>
          </div>

          <div className='pt-10 flex items-center justify-center gap-[23px]'>
            <SheetClose asChild>
              <button className='bg-[#FFFFFF] max-w-[172px] w-full p-[10px] rounded-[8px] text-[#5B52B6] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'>Reset</button>
            </SheetClose>
            
            <button onClick={handleInviteMember} className='bg-[#5B52B6] text-white w-full max-w-[172px] p-[10px] rounded-[8px] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'>Invite</button>
          </div>
        </SheetContent>
      </Sheet>
    </div>

  );
};

export default SettingsManageRolesSection;




{/* <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto scrollbar-hide">
          <SheetHeader>
            <SheetTitle className="text-[#101828] text-[24px] leading-[36px] font-bold">Invite Team Member</SheetTitle>
            <SheetDescription className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">
              Kindly edit any editable fields on this project.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4 pt-10 ">
            <div className="items-center gap-4">
              <label htmlFor="name" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Member Name
              </label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="col-span-3"
              />
            </div>
            
            <div className="items-center gap-4">
              <label htmlFor="email" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Add Email
              </label>
              <Input
                id="email"
                value={newMember.email}
                onChange={(e) => setNewMember(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="col-span-3"
              />
            </div>
            
            <div className="items-center gap-4">
              <label htmlFor="role" className="text-left text-[#A9A9AE] text-[14px] leading-[21px] font-medium">
                Roles
              </label>
              <Select 
                value={newMember.role}
                onValueChange={(value) => setNewMember(prev => ({
                  ...prev,
                  role: value
                }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <h1 className="text-[#A9A9AE] text-[14px] leading-[21px] font-medium pb-[10px]">Manage Access</h1>
              {accessOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 ">
                  <Checkbox 
                    id={`access-${index}`}
                    checked={newMember.access.includes(option.label)}
                    onCheckedChange={(checked: boolean) => handleAccessChange(option.label, checked)}
                  />
                  <div>
                    <label 
                      htmlFor={`access-${index}`} 
                      className="text-[#3E3E45] text-[16px] leading-[22.4px] font-normal"
                    >
                      {option.label}
                    </label>
                  </div>
                </div>
                    
              ))}
            </div>
          </div>

            <div className='pt-10 flex items-center justify-center gap-[23px]'>
              <SheetClose asChild>
                <button className='bg-[#FFFFFF] max-w-[172px] w-full p-[10px] rounded-[8px] text-[#5B52B6] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'>Reset</button>
              </SheetClose>
              <button onClick={handleInviteMember} className='bg-[#5B52B6] text-white w-full max-w-[172px] p-[10px] rounded-[8px] text-[16.5px] leading-[19.8px] font-bold shadow-button-custom'>Invite</button>
            </div>
        </SheetContent>

      </Sheet> */}
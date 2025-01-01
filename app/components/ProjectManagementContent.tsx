import React, { useState, useEffect } from 'react';
import Image from "next/image";

import { Separator } from "@/components/ui/separator"


import more from "../../public/assets/more.svg"
import MediumSvg from "../../public/assets/MediumSvg.svg"
import HighSvg from "../../public/assets/HighSvg.svg"
import LowSvg from "../../public/assets/LowSvg.svg"
import Femi from "../../public/assets/Femi.svg"
import Omar from "../../public/assets/Omar.svg"
import David from "../../public/assets/David.svg"
import Liam from "../../public/assets/Liam.svg"

import Timer from "../../public/assets/Timer.svg"

import AddCircle from "../../public/assets/AddCircle.svg"



import AssignedToIcon from "../../public/assets/AssignedToIcon.svg"

import StatusIcon from "../../public/assets/StatusIcon.svg"

import TimelineIcon from "../../public/assets/TimelineIcon.svg"

import EditPen from "../../public/assets/EditPen.svg"

import EditPenWhite from "../../public/assets/EditPenWhite.svg"
import CancelIcon from "../../public/assets/CancelIcon.svg"

import Folder from "../../public/assets/Folder.svg"

import GlassHour from "../../public/assets/GlassHour.svg"


import PriorityIcon from "../../public/assets/PriorityIcon.svg"


import timerClock from "../../public/assets/timerClock.svg"

import Assignee from "../../public/assets/Assignee.svg"


import wallet from "../../public/assets/wallet.svg"

import BrandingAssets from "../../public/assets/BrandingAssets.svg"

import GuidelinesPdf from "../../public/assets/GuidelinesPdf.svg"

import Plus from "../../public/assets/Plus.svg"

import TodoList from './TodoList';
import { CreateNewProjectSheet } from './CreateNewProjectSheet';
import DashboardHeader from './DashboardHeader';

// Type definitions
type TeamMember = {
  name: string;
  image: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  priority: 'Low' | 'Medium' | 'High';
  priorityColor: string;
  priorityIcon: string;
  status: 'Ongoing' | 'Completed';
  progress: number;
  progressColor: string;
  timeLeft: string;
  team: TeamMember[];
};

type ProjectCardProps = {
  project: Project;
  onClick: (project: Project) => void;
  isSelected: boolean;
};

type ProjectManagementContentProps = {
  setActiveComponent: (component: string) => void;
};

const ProjectManagementContent: React.FC<ProjectManagementContentProps> = ({ setActiveComponent }) => {
  const [activeTab, setActiveTab] = useState<string>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);



  const [isMoreOverlayVisible, setIsMoreOverlayVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setIsMoreOverlayVisible(false);
  };

 



  const EditProjectView: React.FC = () => {
    // Create local state for editing project details
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editedProject, setEditedProject] = useState(selectedProject);

 
    return (
        <div className="pt-10">
          <div className='flex flex-wrap-reverse'>
            <div className='flex-1'>
              <h1 className='text-[#101828] text-[20px] leading-[30px] font-medium'>{editedProject?.title || ''}</h1>
              <div className='flex items-center justify-start gap-[10px] pt-[10px]'>
                <h1 className='bg-[#F0F0F9] text-[#807ACC] text-[13px] leading-[19.5px] font-normal w-[87px] p-[2px] rounded-[8px] flex items-center justify-center'>Fintech</h1>
                <h1 className='bg-[#F0F0F9] text-[#807ACC] text-[13px] leading-[19.5px] font-normal w-[87px] p-[2px] rounded-[8px] flex items-center justify-center'>Consultation</h1>
                <h1 className='bg-[#F0F0F9] text-[#807ACC] text-[13px] leading-[19.5px] font-normal w-[87px] p-[2px] rounded-[8px] flex items-center justify-center'>Accounting</h1>
              </div>
              <div className='pt-[20px]'>
                <h1 className='text-[#101828] text-[16.5px] leading-[24.75px] font-semibold'>Description</h1>
                <p className='pt-[10px] text-[#A3A2AB] text-[16px] leading-[24px] font-normal max-w-[357px]'>{editedProject?.description || ''}</p>
              </div>
            
              <div className='pt-10'>
                <div className="pt-[25px] bg-white max-w-[412px] w-full">
                  <div className='flex items-center justify-between px-[20px]'>
                    <h1 className='text-[#101828] text-[20px] leading-[30px] font-bold mb-[20px]'>To-Do List</h1>
                    <Image src={more} alt='more' />
                  </div>
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
          </div>




           

          <div>
            <button 
              onClick={() => setIsSheetOpen(true)}
              className='flex items-center rounded-[8px] justify-center gap-[10px] bg-[#5B52B6] p-[10px] max-w-[205px] w-full text-[#FFFFFF] text-[16.5px] leading-[19.8px] font-bold'>
              <Image src={EditPenWhite} alt='EditPenWhite' />
              Edit Project
            </button>
            <CreateNewProjectSheet 
              isOpen={isSheetOpen} 
              onOpenChange={setIsSheetOpen} 
            />


            <div className='pt-10'>
              <h1 className='text-[#101828] text-[16.5px] leading-[24.75px] font-medium'>Details</h1>

              <div className='space-y-[15px] pt-[15px]'>
                <div className='flex items-center gap-[8px]'>
                  <Image src={Folder} alt='Folder' />
                  <h1 className='text-[#A9A9AE] flex items-center gap-[30px] text-[16px] leading-[22.4px] font-normal'>Project ID<span className='text-[#5B52B6] leading-[24px]'>FN-5467-435</span></h1>
                </div>
                <div  className='flex items-center  gap-[8px]'>
                  <Image src={GlassHour} alt='GlassHour' />
                  <h1 className='text-[#A9A9AE] text-[16px]  flex items-center gap-[30px] leading-[22.4px] font-normal'>Status<span className='text-[#5B52B6]'>Ongoing</span></h1>
                </div>
                <div  className='flex items-center  gap-[8px]'>
                  <Image src={PriorityIcon} alt='PriorityIcon' />
                  <h1 className='text-[#A9A9AE] text-[16px] flex items-center gap-[30px] leading-[22.4px] font-normal'>Priority<span className='text-[#F87B24] bg-[#FAD9C2] p-[10px] rounded-[100px]'>{editedProject?.priority || ''}</span></h1>
                </div>
                <div  className='flex items-center  gap-[8px]'>
                  <Image src={timerClock} alt='timerClock' />
                  <h1 className='text-[#A9A9AE] text-[16px] flex items-center gap-[30px] leading-[22.4px] font-normal'>Due Date<span className='text-[#5B52B6]'>Sept 24,2024</span></h1>
                </div>
                <div  className='flex items-center  gap-[8px]'>
                  <Image src={wallet} alt='wallet' />
                  <h1 className='text-[#A9A9AE] text-[16px] flex items-center gap-[30px] leading-[22.4px] font-normal'>Budget<span className='text-[#5B52B6]'>₦500,000</span></h1>
                </div>
                <div className='flex items-center  gap-[8px]'>
                  <Image src={Assignee} alt='wallet' />
                  <div className='flex items-center gap-[30px]'>
                    <h1 className='text-[#A9A9AE] text-[16px] leading-[22.4px] font-normal'>Assignee</h1>
                    {editedProject?.team.map(member => (
                      <div key={member.name} className="flex items-center gap-[10px]">
                        <Image width={30} height={30} src={member.image} alt={member.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            <div className='pt-10'>
              <div className='flex items-center gap-[10px]'> 
                <h1 className='text-[#101828] text-[16.5px] leading-[24.75px] font-medium'>Attachments</h1>
                <h1 className='text-[#101828] text-[16.5px] leading-[24.75px] font-medium'>Uploaded</h1>
              </div>

              <div className='flex flex-wrap items-center gap-[10px]'>
                <Image src={GuidelinesPdf} alt='GuidelinesPdf' />

                <Image src={BrandingAssets} alt='BrandingAssets' />

                <Image src={Plus} alt='Plus' />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const projectsData: Project[] = [
    {
      id: 'FN-4555-67',
      title: 'Financial and Accounting Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Medium',
      priorityColor: 'bg-[#FAD9C2] text-[#F87B24]',
      priorityIcon: MediumSvg,
      status: 'Ongoing',
      progress: 70,
      progressColor: 'bg-[#F87B24]',
      timeLeft: '2 days left',
      team: [
        { name: 'Femi', image: Femi },
        { name: 'Omar', image: Omar }
      ]
    },
    {
      id: 'FN-4555-68',
      title: 'Legal and Compliance Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'High',
      priorityColor: 'bg-[#F5BFC1] text-[#DD2025]',
      priorityIcon: HighSvg,
      status: 'Ongoing',
      progress: 85,
      progressColor: 'bg-[#DD2025]',
      timeLeft: '14 days left',
      team: [
        { name: 'David', image: David },
        { name: 'Liam', image: Liam }
      ]
    },
    {
      id: 'FN-4555-69',
      title: 'Human Resources and Recruitment Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Ongoing',
      progress: 35,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '7 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },
    {
      id: 'FN-4555-70',
      title: 'IT and Digital Transformation Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'High',
      priorityColor: 'bg-[#F5BFC1] text-[#DD2025]',
      priorityIcon: HighSvg,
      status: 'Completed',
      progress: 100,
      progressColor: 'bg-[#DD2025]',
      timeLeft: '14 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-71',
      title: 'Marketing and Sales Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Ongoing',
      progress: 43,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '5 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-72',
      title: 'Environmental and Sustainability Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Medium',
      priorityColor: 'bg-[#FAD9C2] text-[#F87B24]',
      priorityIcon: MediumSvg,
      status: 'Completed',
      progress: 100,
      progressColor: 'bg-[#F87B24]',
      timeLeft: '14 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-73',
      title: 'Healthcare and Life Sciences Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Medium',
      priorityColor: 'bg-[#FAD9C2] text-[#F87B24]',
      priorityIcon: MediumSvg,
      status: 'Ongoing',
      progress: 10,
      progressColor: 'bg-[#F87B24]',
      timeLeft: '14 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-74',
      title: 'Agriculture and Agribusiness Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'High',
      priorityColor: 'bg-[#F5BFC1] text-[#DD2025]',
      priorityIcon: HighSvg,
      status: 'Ongoing',
      progress: 50,
      progressColor: 'bg-[#DD2025]',
      timeLeft: '14 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-75',
      title: 'Public Sector and Government Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Completed',
      progress: 100,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '2 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-76',
      title: 'Agriculture and wildlife Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'High',
      priorityColor: 'bg-[#F5BFC1] text-[#DD2025]',
      priorityIcon: HighSvg,
      status: 'Ongoing',
      progress: 20,
      progressColor: 'bg-[#DD2025]',
      timeLeft: '10 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-77',
      title: 'Public Sector Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Ongoing',
      progress: 95,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '1 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    {
      id: 'FN-4555-78',
      title: 'Human Resources Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Ongoing',
      progress: 15,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '14 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },
    
    {
      id: 'FN-4555-79',
      title: 'Compliance Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'High',
      priorityColor: 'bg-[#F5BFC1] text-[#DD2025]',
      priorityIcon: HighSvg,
      status: 'Ongoing',
      progress: 65,
      progressColor: 'bg-[#DD2025]',
      timeLeft: '12 days left',
      team: [
        { name: 'David', image: David },
        { name: 'Liam', image: Liam }
      ]
    },
    
    {
      id: 'FN-4555-80',
      title: 'Financial and Auditing Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Medium',
      priorityColor: 'bg-[#FAD9C2] text-[#F87B24]',
      priorityIcon: MediumSvg,
      status: 'Ongoing',
      progress: 50,
      progressColor: 'bg-[#F87B24]',
      timeLeft: '6 days left',
      team: [
        { name: 'Femi', image: Femi },
        { name: 'Omar', image: Omar }
      ]
    },

    {
      id: 'FN-4555-81',
      title: 'Private Sector and Government Consulting',
      description: 'Financial and Accounting Consulting is a financial institution offering savings investments loans and financial advisory services',
      subtitle: 'Tax Advisory and Compliance',
      priority: 'Low',
      priorityColor: 'bg-[#EBEAFC] text-[#5B52B6]',
      priorityIcon: LowSvg,
      status: 'Completed',
      progress: 100,
      progressColor: 'bg-[#5B52B6]',
      timeLeft: '10 days left',
      team: [
        { name: 'Liam', image: Liam },
        { name: 'David', image: David }
      ]
    },

    
  ];

  const filteredProjects = projectsData.filter(project => 
    activeTab === 'All Projects' || 
    (activeTab === 'Ongoing Projects' && project.status === 'Ongoing') ||
    (activeTab === 'Completed Projects' && project.status === 'Completed')
  );

  // Open first project by default when component loads or projects change
  useEffect(() => {
    if (filteredProjects.length > 0 && !selectedProject) {
      setSelectedProject(filteredProjects[0]);
    }
  }, [filteredProjects]);

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isSelected }) => (
    <div 
      className={`bg-[#FFFFFF]  rounded-[8px] shadow-custom max-w-[237px] min-h-[280px] w-full px-[12px] py-[16px] cursor-pointer 
      ${isSelected ? 'border-2 border-[#5B52B6]' : ''}`} 
      onClick={() => onClick(project)}
    >
      <div 
      >
        <div className={`
        ${project.status === 'Ongoing' ? 'bg-[#FFFBF9]' : 
          project.status === 'Completed' ? 'bg-[#FAF7F7]' : 'bg-[#F9F9FF]'} 
        rounded-[8px] px-[12px] py-[16px]`}>
          <div className="flex items-center justify-between">
            <h1 className="text-[#7B91B0] text-[13px] leading-[19.5px] font-normal">{project.id}</h1>
            <div className={`max-w-[96px] w-full justify-center rounded-[100px] h-[28px] gap-[6px] flex items-center ${project.priorityColor}`}>
              <Image src={project.priorityIcon} alt={`${project.priority}Svg`} />
              {project.priority}
            </div>
          </div>
          <div className="pt-[15px]">
            <h1 className="text-[#3E3E45] text-[16.5px] leading-[19.8px] font-bold max-w-[192px]">{project.title}</h1>
            <p className="text-[#A9A9AE] text-[14px] leading-[21px] pt-[5px] font-normal">{project.subtitle}</p>
          </div>
        </div>
        
        <div className="pt-[20px]">
          <div className="w-full max-w-md space-y-2">
            <div className="relative h-[6px] w-full rounded-full bg-[#F0F0F9]">
              <div
                className={`absolute h-full rounded-full ${project.progressColor}`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="text-[#41404B] text-[13px] leading-[19.5px] font-normal">{project.status}</span>
              <span className="text-[#41404B] text-[13px] leading-[19.5px] font-normal">{project.progress}%</span>
            </div>
          </div>
        </div>

        <div className="pt-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[5px]">
              <Image src={Timer} alt="Timer" />
              <p className="text-[#7B91B0] text-[13px] leading-[19.5px] font-normal">{project.timeLeft}</p>
            </div>

            <div className="relative">
              <div className="w-full">
                <Image width={35} height={35} src={project.team[0].image} alt={project.team[0].name} />
              </div>
              <div className="absolute top-0 right-[20px] w-full">
                <Image width={35} height={35} src={project.team[1].image} alt={project.team[1].name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}

      <DashboardHeader title='Project Board' setActiveComponent={setActiveComponent} />

      <div className="pt-[24px]">
        <Separator />
      </div>
              
      {isEditMode ? (
      <EditProjectView />
    ) : (
      <div className="flex lg:flex-row  flex-col">
    <div className="pt-10">
      <div className="flex lg:flex-row flex-wrap  items-start gap-24">
        <div className="grid grid-cols-2 gap-10">
          {['All Projects', 'Ongoing Projects', 'Completed Projects'].map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer ${
                activeTab === tab
                  ? 'text-[#5B52B6] font-bold'
                  : 'text-[#41404B]'
              } text-[16px] leading-[22.4px] whitespace-nowrap`}
            >
              {tab}
            </div>
          ))}
        </div>
        <button 
          className="flex items-center bg-[#5B52B6]    
          rounded-[8px] p-[10px] gap-[10px] text-[16.5px] 
          leading-[19.8px] font-bold text-white"
          onClick={() => setIsSheetOpen(true)}
          >
          
          <Image src={AddCircle} alt="AddCircle" />
          Create New Project

        </button>
        <CreateNewProjectSheet 
          isOpen={isSheetOpen} 
          onOpenChange={setIsSheetOpen} 
        />
      </div>

      <div className="pt-[30px]">
        <div className="bg-white pt-10 max-w-[450px] lg:max-w-[772px] w-full overflow-y-auto max-h-[936px] scrollbar-thin scrollbar-thumb-[#5B52B6] scrollbar-track-[#F0F0F9]   gap-4 grid grid-cols-1 lg:grid-cols-2 ">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              isSelected={selectedProject?.id === project.id}
            />
          ))}
        </div>
      </div>
    </div>

    {/* <div className="pt-10 flex"> */}
      

      <div className='pt-10 lg:pt-0'>
        {selectedProject && (
          <div className=" ml-4 p-4 border-[1px] border-[#D0D0D3] lg:w-[317px] md:w-[450px] w-[300px] md:mx-auto bg-[#FFFFFF]">
            <div className="flex items-center justify-between pt-[30px]">
              <h1 className="text-[#101828] text-[20px] leading-[30px] font-bold">Project Overview</h1>
              <div className="relative inline-block">
                <div onClick={toggleEditMode} className="cursor-pointer">
                  <Image src={more} alt="more" />
                </div>
                {isMoreOverlayVisible && (
                  <div className="absolute top-full right-0 mt-2 w-[134px] p-[8px] bg-white shadow-lg rounded-md z-10">
                    <div className='space-y-[12px]'>
                      <div className='flex items-center gap-[10px]'>
                        <Image src={EditPen} alt='EditPen' />
                        <h1 className='text-[#101828] text-[13px] leading-[19.5px] font-normal'>Edit</h1>
                      </div>
                      <div className='flex items-center gap-[10px]'>
                        <Image src={CancelIcon} alt='CancelIcon' />
                        <h1 className='text-[#101828] text-[13px] leading-[19.5px] font-normal'>Cancel</h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        
            <div className="pt-[10px]">
              <div
                className={`max-w-[96px] w-full justify-center rounded-[100px] h-[28px] gap-[6px] flex items-center ${selectedProject.priorityColor}`}
              >
                <Image
                  src={selectedProject.priorityIcon}
                  alt={`${selectedProject.priority}Svg`}
                  width={16} // Adjust the size as needed
                  height={16}
                />
                {selectedProject.priority}
              </div>
            </div>
            <div className='pt-8'>
              <h2 className="text-[#101828] text-[20px] leading-[30px] font-medium">{selectedProject.title}</h2>
              <p className="pt-[10px] text-[#A3A2AB] text-[16px] leading-[24px] font-normal">{selectedProject.description}</p>
            </div>
            <div className="mt-4 space-y-[20px]">
        
              <div className='flex items-center gap-[10px]'>
                <Image src={StatusIcon} alt="StatusIcon" />
                <p className='flex items-center gap-[30px] text-[#D0D0D3] text-[16px] leading-[22.4px] font-normal'>Status: <span className='text-[#5B52B6] bg-[#F0F0F9]'>{selectedProject.status}</span></p>
              </div>
        
              <div className='flex items-center gap-[10px]'>
                <Image src={TimelineIcon} alt="TimelineIcon" />
                <p className='flex items-center gap-[30px] text-[#D0D0D3] text-[16px] leading-[24px] font-normal'>Timeline<span className='text-[#5B52B6]'>Sept 24,2024</span></p>
              </div>
              <div className='flex items-center gap-[10px]'>
                <Image src={AssignedToIcon} alt="AssignedToIcon" />
                <p className='flex items-center gap-[30px] text-[#D0D0D3] text-[16px] leading-[24px] font-normal'>Assignee</p>
                {selectedProject.team.map(member => (
                  <div key={member.name} className="flex items-center">
                    <Image width={30} height={30} src={member.image} alt={member.name} />
                  </div>
                ))}
              </div>
            </div>
        
              <div className='pt-10'>
                <h1 className='text-[#101828] text-[20px] leading-[30px] font-bold'>To-Do List</h1>
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
        
          </div>
        )}
      </div>
    {/* </div> */}
    </div>
    )}
      
      
    </div>
    
  );
};

export default ProjectManagementContent;


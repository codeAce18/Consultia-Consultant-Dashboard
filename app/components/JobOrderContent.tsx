import { Separator } from "@/components/ui/separator"
import JobOrderRegistryTable from './Tables/JobOrderRegistryTable';
import DashboardHeader from './DashboardHeader';














interface JobOrderContentProps {
  setActiveComponent: (component: string) => void;
}

const JobOrderContent = ({ setActiveComponent }: JobOrderContentProps) => {



  return (
    <div>
      {/* Header for the Job Order Registry Screen */}
      
      <DashboardHeader title="Job Order" setActiveComponent={setActiveComponent} />


      <div className="pt-[24px]">
        <Separator />
      </div>


      <JobOrderRegistryTable />
      
    </div>
  )
}

export default JobOrderContent
import { useState } from 'react';
import { Separator } from "@/components/ui/separator"
import SettingsAuthenticationSection from './SettingsAuthenticationSection';
import SettingsAlertsSection from './SettingsAlertSection';
import SettingsManageRolesSection from './SettingsManageRolesSection';
import DashboardHeader from './DashboardHeader';














interface SettingsContentProps {
    setActiveComponent: (component: string) => void;
}

const SettingsContent = ({ setActiveComponent }: SettingsContentProps) => {
    const [activeTab, setActiveTab] = useState('authentication');



    const renderContent = () => {
        switch (activeTab) {
        case 'authentication':
            return <SettingsAuthenticationSection />;
        case 'alerts':
            return <SettingsAlertsSection />;
        case 'roles':
            return <SettingsManageRolesSection />;
        default:
          return <SettingsAuthenticationSection />;
        }
    };

    return (
        <div>
            {/*  Settings Header for the Dashboard Screen */}
            <DashboardHeader title='Settings' setActiveComponent={setActiveComponent} />


            <div className="pt-[24px]">
                <Separator />
            </div>


            <div className="pt-10">
                <div className="flex   items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <button
                            onClick={() => setActiveTab('authentication')}
                            className={`pb-2 ${
                            activeTab === 'authentication'
                                ? 'border-b-[#5B52B6] border-b-[4px] font-medium'
                                : 'text-gray-600'
                            }`}
                        >
                            Authentication
                        </button>

                        <button
                            onClick={() => setActiveTab('alerts')}
                            className={`pb-2 ${
                            activeTab === 'alerts'
                                ? 'border-b-[#5B52B6] border-b-[4px] font-medium'
                                : 'text-gray-600'
                            }`}
                        >
                            Alerts
                        </button>

                        <button
                            onClick={() => setActiveTab('roles')}
                            className={`pb-2 ${
                            activeTab === 'roles'
                                ? 'border-b-[#5B52B6] border-b-[4px] font-medium'
                                : 'text-gray-600'
                            }`}
                        >
                            Manage Roles
                        </button>
                    </div>
                </div>

                {/* The Content Section */}

                <div className="pt-16">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
} 


export default SettingsContent;
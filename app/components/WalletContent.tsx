import { useState } from 'react';
import { Separator } from "@/components/ui/separator"
import WalletSectionContent from './WalletSectionContent';
import TransactionSectionContent from './TransactionsSectionContent';
import InflowsSectionContent from './InflowsSectionContent';
import OutflowsSectionContent from './OutflowsSectionContent';
import DashboardHeader from './DashboardHeader';







interface WalletContentProps {
    setActiveComponent: (component: string) => void;
}

const WalletContent: React.FC<WalletContentProps> = ({ setActiveComponent }) => {
    
    const [activeSection, setActiveSection] = useState('Wallet');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);




    const renderActiveSection = () => {
        switch (activeSection) {
          case 'Wallet':
            return <WalletSectionContent switchToTransactions={() => setActiveSection('Transactions')} />;
          case 'Transactions':
            return <TransactionSectionContent  />;
          case 'Inflows':
            return <InflowsSectionContent />;
          case 'Outflows':
            return <OutflowsSectionContent />;
          default:
            return <WalletSectionContent switchToTransactions={() => setActiveSection('Transactions')} />;
        }
    };

    return (
       <div>

            {/*  Wallet Header for the Dashboard Screen */}
        <DashboardHeader title='Wallet' setActiveComponent={setActiveComponent} />


            <div className="pt-[24px]">
                <Separator />
            </div>


            <div className="pt-10">
                <div className="flex flex-wrap items-center gap-10 mb-6 border-b pb-2">
                    {['Wallet', 'Transactions', 'Inflows', 'Outflows'].map((section) => (
                    <div 
                        key={section}
                        className={`cursor-pointer ${
                        activeSection === section 
                            ? 'border-b-[#5B52B6] text-[#101828] border-b-[4px] font-medium'
                            : 'text-gray-600'
                        }`}
                        onClick={() => setActiveSection(section)}
                    >
                        <h1>{section}</h1>
                    </div>
                    ))}
                </div>

                {/* Rendering the active section's content */}
                <div className="mt-4">
                    {renderActiveSection()}
                </div>
            </div>
        </div>
    )
} 


export default WalletContent;
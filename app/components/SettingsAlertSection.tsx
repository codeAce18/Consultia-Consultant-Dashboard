import { Switch } from "@/components/ui/switch"





const SettingsAlertsSection = () => {
    return (
      <div>
        <div>
          <h1 className="text-[#101828] text-[24px] leading-[36px] font-bold">Alert Configuration</h1>

          <p className="text-[#41404B] text-[16px] leading-[22.4px] font-normal">Here you can change your alert settings</p>
        </div>


        <div className="pt-10">
          <div className="max-w-[671px]">
            <div className="flex items-center justify-between">
              <h1 className="text-[#A3A2AB] text-[16px] leading-[22.4px] font-normal">Alert Topics</h1>

              <p className="text-[#5B52B6] text-[16px] leading-[22.4px] font-normal">On/Off</p>
            </div>

            <div className="space-y-[5px] pt-[10px] shadow-custom-sm">
              <div className="flex items-center justify-between bg-[#F9FAFE] shadow-custom-lg p-[10px] rounded-[8px]">
                <h1 className="text-[#41404B] text-[16.5px] leading-[24.75px] font-semibold">Transaction Emails</h1>
                <div>
                  <Switch id="two-factor-switch" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#F9FAFE] shadow-custom-lg p-[10px] rounded-[8px]">
                <h1 className="text-[#41404B] text-[16.5px] leading-[24.75px] font-semibold">Project Tracking Email</h1>
                <div>
                  <Switch id="two-factor-switch" />
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#F9FAFE] shadow-custom-lg p-[10px] rounded-[8px]">
                <h1 className="text-[#41404B] text-[16.5px] leading-[24.75px] font-semibold">Reminder Emails</h1>
                <div>
                  <Switch id="two-factor-switch" />
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#F9FAFE] shadow-custom-lg p-[10px] rounded-[8px]">
                <h1 className="text-[#41404B] text-[16.5px] leading-[24.75px] font-semibold">Promotional Emails</h1>
                <div>
                  <Switch id="two-factor-switch" />
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#F9FAFE] shadow-custom-lg p-[10px] rounded-[8px]">
                <h1 className="text-[#41404B] text-[16.5px] leading-[24.75px] font-semibold">Login Emails</h1>
                <div>
                  <Switch id="two-factor-switch" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
};


export default SettingsAlertsSection;
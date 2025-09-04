import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainDashboard } from "@/pages/MainDashboard";
import { ApartmentView } from "@/pages/ApartmentView";
import { CommunityView } from "@/pages/CommunityView";
import { LegalConsultationView } from "@/pages/LegalConsultationView";
import { MarketView } from "@/pages/MarketView";
import { ProfileView } from "@/pages/ProfileView";
import { useMobileApp } from "@/hooks/useMobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("main");
  const { isNative } = useMobileApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "main":
        return <MainDashboard />;
      case "apartment":
        return <ApartmentView />;
      case "community":
        return <CommunityView />;
      case "legal":
        return <LegalConsultationView />;
      case "market":
        return <MarketView />;
      case "profile":
        return <ProfileView />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {renderActiveTab()}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

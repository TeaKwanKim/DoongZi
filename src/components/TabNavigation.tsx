import { useState } from "react";
import { Home, Building, MessageSquare, Scale, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mobileActions } from "@/utils/mobile";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "main", label: "메인", icon: Home },
  { id: "apartment", label: "내 아파트", icon: Building },
  { id: "community", label: "커뮤니티", icon: MessageSquare },
  { id: "legal", label: "법률상담", icon: Scale },
  { id: "market", label: "마켓", icon: ShoppingBag },
  { id: "profile", label: "프로필", icon: User },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const handleTabPress = async (tabId: string) => {
    await mobileActions.tabSwitch();
    onTabChange(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 pb-safe">
      <div className="grid grid-cols-6 h-20 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabPress(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-200 rounded-lg mx-1 mt-2",
                "active:scale-95 touch-manipulation haptic-feedback",
                isActive 
                  ? "text-primary bg-primary-soft shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("transition-all duration-200", isActive ? "h-6 w-6" : "h-5 w-5")} />
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive ? "opacity-100 scale-105" : "opacity-80"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
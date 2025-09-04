import { useState } from "react";
import { Home, Building, MessageSquare, Scale, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-6 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive 
                  ? "text-primary bg-primary-soft" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
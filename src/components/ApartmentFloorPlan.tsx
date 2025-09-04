import { useState } from "react";
import { Home, AlertTriangle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Unit {
  id: string;
  number: string;
  status: "normal" | "warning" | "danger";
  recentAlerts: number;
}

interface ApartmentFloorPlanProps {
  floor: number;
  units: Unit[];
  onUnitClick: (unit: Unit) => void;
}

const statusConfig = {
  normal: {
    bgClass: "bg-muted hover:bg-accent",
    textColor: "text-muted-foreground",
    icon: Home
  },
  warning: {
    bgClass: "bg-warning-soft border-2 border-warning hover:bg-warning/20",
    textColor: "text-warning",
    icon: Bell
  },
  danger: {
    bgClass: "bg-destructive-soft border-2 border-destructive hover:bg-destructive/20",
    textColor: "text-destructive",
    icon: AlertTriangle
  }
};

export function ApartmentFloorPlan({ floor, units, onUnitClick }: ApartmentFloorPlanProps) {
  const handleUnitPress = (unit: Unit) => {
    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    onUnitClick(unit);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">{floor}층</h3>
        <p className="text-sm text-muted-foreground mt-1">
          세대를 터치하여 상세 정보를 확인하세요
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {units.map((unit) => {
          const config = statusConfig[unit.status];
          const Icon = config.icon;
          
          return (
            <Button
              key={unit.id}
              variant="ghost"
              onClick={() => handleUnitPress(unit)}
              className={cn(
                "h-24 flex flex-col items-center justify-center gap-2 relative transition-all duration-200 rounded-xl",
                config.bgClass,
                config.textColor,
                "active:scale-95 touch-manipulation"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-base font-semibold">{unit.number}</span>
              
              {unit.recentAlerts > 0 && (
                <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-7 w-7 flex items-center justify-center text-sm font-bold shadow-lg">
                  {unit.recentAlerts}
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
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
    bgClass: "bg-warning-soft border-warning hover:bg-warning/20",
    textColor: "text-warning",
    icon: Bell
  },
  danger: {
    bgClass: "bg-destructive-soft border-destructive hover:bg-destructive/20",
    textColor: "text-destructive",
    icon: AlertTriangle
  }
};

export function ApartmentFloorPlan({ floor, units, onUnitClick }: ApartmentFloorPlanProps) {
  return (
    <Card className="p-4 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{floor}층</h3>
        <p className="text-sm text-muted-foreground">
          세대를 클릭하여 상세 정보를 확인하세요
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {units.map((unit) => {
          const config = statusConfig[unit.status];
          const Icon = config.icon;
          
          return (
            <Button
              key={unit.id}
              variant="ghost"
              onClick={() => onUnitClick(unit)}
              className={cn(
                "h-16 flex flex-col items-center justify-center gap-1 relative transition-all duration-200",
                config.bgClass,
                config.textColor,
                "hover:scale-105"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{unit.number}</span>
              
              {unit.recentAlerts > 0 && (
                <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
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
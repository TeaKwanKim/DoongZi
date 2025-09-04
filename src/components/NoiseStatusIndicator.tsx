import { Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoiseStatusIndicatorProps {
  status: "quiet" | "warning" | "danger";
  alertCount?: number;
  className?: string;
}

const statusConfig = {
  quiet: {
    icon: VolumeX,
    text: "현재 조용함",
    bgClass: "bg-gradient-status-good",
    textColor: "text-success-foreground",
    iconColor: "text-success-foreground"
  },
  warning: {
    icon: Volume2,
    text: "소음 알림 발생 중",
    bgClass: "bg-gradient-status-warning",
    textColor: "text-warning-foreground",
    iconColor: "text-warning-foreground"
  },
  danger: {
    icon: AlertTriangle,
    text: "지속 소음 감지",
    bgClass: "bg-gradient-status-danger",
    textColor: "text-destructive-foreground",
    iconColor: "text-destructive-foreground"
  }
};

export function NoiseStatusIndicator({ status, alertCount, className }: NoiseStatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "rounded-xl p-4 shadow-status transition-all duration-300",
      config.bgClass,
      status !== "quiet" && "animate-status-pulse",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Icon className={cn("h-6 w-6", config.iconColor)} />
        </div>
        <div className="flex-1">
          <p className={cn("font-semibold text-lg", config.textColor)}>
            {config.text}
          </p>
          {alertCount && alertCount > 0 && (
            <p className={cn("text-sm opacity-90", config.textColor)}>
              {alertCount}건의 소음 알림
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
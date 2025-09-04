import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "busy";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig = {
  online: "bg-success",
  offline: "bg-muted-foreground", 
  busy: "bg-warning"
};

const sizeConfig = {
  sm: "h-2 w-2",
  md: "h-3 w-3", 
  lg: "h-4 w-4"
};

export function StatusIndicator({ status, size = "md", className }: StatusIndicatorProps) {
  return (
    <div className={cn(
      "rounded-full",
      statusConfig[status],
      sizeConfig[size],
      status === "online" && "animate-pulse",
      className
    )} />
  );
}
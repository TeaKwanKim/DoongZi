import { Bell, Send, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AlertStats {
  received: number;
  sent: number;
  trend: "up" | "down" | "stable";
}

interface AlertSummaryCardProps {
  stats: AlertStats;
  period: string;
}

export function AlertSummaryCard({ stats, period }: AlertSummaryCardProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-destructive";
      case "down": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case "up": return "증가";
      case "down": return "감소";
      default: return "유지";
    }
  };

  return (
    <Card className="p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">내 알림/경고함</h3>
        <Badge variant="outline" className="text-xs">
          {period}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-primary-soft rounded-lg">
          <div className="p-2 bg-primary rounded-full">
            <Bell className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{stats.received}</p>
            <p className="text-sm text-primary">받은 알림</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
          <div className="p-2 bg-foreground rounded-full">
            <Send className="h-4 w-4 text-background" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.sent}</p>
            <p className="text-sm text-muted-foreground">보낸 알림</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm">
        <TrendingUp className={`h-4 w-4 ${getTrendColor(stats.trend)}`} />
        <span className="text-muted-foreground">지난 주 대비</span>
        <span className={getTrendColor(stats.trend)}>
          {getTrendText(stats.trend)}
        </span>
      </div>
    </Card>
  );
}
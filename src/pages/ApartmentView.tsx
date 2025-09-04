import { useState } from "react";
import { ApartmentFloorPlan } from "@/components/ApartmentFloorPlan";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Bell, AlertTriangle, Home } from "lucide-react";

interface Unit {
  id: string;
  number: string;
  status: "normal" | "warning" | "danger";
  recentAlerts: number;
}

export function ApartmentView() {
  const { toast } = useToast();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // 샘플 데이터 - 5층 아파트
  const floors = [
    {
      floor: 5,
      units: [
        { id: "501", number: "501", status: "normal" as const, recentAlerts: 0 },
        { id: "502", number: "502", status: "warning" as const, recentAlerts: 1 },
        { id: "503", number: "503", status: "normal" as const, recentAlerts: 0 },
        { id: "504", number: "504", status: "normal" as const, recentAlerts: 0 },
      ]
    },
    {
      floor: 4,
      units: [
        { id: "401", number: "401", status: "normal" as const, recentAlerts: 0 },
        { id: "402", number: "402", status: "normal" as const, recentAlerts: 0 },
        { id: "403", number: "403", status: "danger" as const, recentAlerts: 3 },
        { id: "404", number: "404", status: "normal" as const, recentAlerts: 0 },
      ]
    },
    {
      floor: 3,
      units: [
        { id: "301", number: "301", status: "warning" as const, recentAlerts: 2 },
        { id: "302", number: "302", status: "normal" as const, recentAlerts: 0 },
        { id: "303", number: "303", status: "normal" as const, recentAlerts: 0 },
        { id: "304", number: "304", status: "normal" as const, recentAlerts: 0 },
      ]
    }
  ];

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleSendQuietRequest = () => {
    toast({
      title: "조용히 부탁 알림 전송",
      description: `${selectedUnit?.number}호에 정중한 알림을 보냈습니다.`,
    });
    setSelectedUnit(null);
  };

  const handleSendWarning = () => {
    toast({
      title: "경고 전송",
      description: `${selectedUnit?.number}호에 소음 경고를 보냈습니다.`,
      variant: "destructive",
    });
    setSelectedUnit(null);
  };

  const handleOpenChat = () => {
    toast({
      title: "채팅방 개설",
      description: `${selectedUnit?.number}호와의 대화방이 열렸습니다.`,
    });
    setSelectedUnit(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal": return "정상";
      case "warning": return "경고 1단계";
      case "danger": return "지속 소음";
      default: return "알 수 없음";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "danger": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">🏠 내 아파트</h1>
        <p className="text-muted-foreground">실시간 소음 현황을 확인하세요</p>
      </div>

      {/* 범례 */}
      <Card className="p-4 shadow-card">
        <h3 className="text-sm font-semibold mb-3 text-foreground">상태 표시</h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">정상</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">최근 경고</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">지속 소음</span>
          </div>
        </div>
      </Card>

      {/* 층별 도면 */}
      {floors.map((floorData) => (
        <ApartmentFloorPlan
          key={floorData.floor}
          floor={floorData.floor}
          units={floorData.units}
          onUnitClick={handleUnitClick}
        />
      ))}

      {/* 세대 상세 다이얼로그 */}
      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedUnit?.number}호 세대 정보
              <Badge className={getStatusColor(selectedUnit?.status || "normal")}>
                {getStatusText(selectedUnit?.status || "normal")}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">최근 30일 경고 횟수</p>
              <p className="text-2xl font-bold text-foreground">
                {selectedUnit?.recentAlerts || 0}건
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleSendQuietRequest}
                className="w-full bg-gradient-primary text-primary-foreground shadow-peaceful"
              >
                <Bell className="h-4 w-4 mr-2" />
                조용히 부탁드려요
              </Button>
              
              <Button 
                onClick={handleSendWarning}
                variant="outline"
                className="w-full border-warning text-warning hover:bg-warning-soft"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                경고 보내기
              </Button>
              
              <Button 
                onClick={handleOpenChat}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary-soft"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                1:1 채팅하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
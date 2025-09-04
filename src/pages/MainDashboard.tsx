import { NoiseStatusIndicator } from "@/components/NoiseStatusIndicator";
import { QuickActionButtons } from "@/components/QuickActionButtons";
import { AlertSummaryCard } from "@/components/AlertSummaryCard";
import { useToast } from "@/hooks/use-toast";

export function MainDashboard() {
  const { toast } = useToast();

  const handleQuietRequest = () => {
    toast({
      title: "조용히 부탁 알림 전송",
      description: "이웃에게 정중한 알림을 보냈습니다.",
    });
  };

  const handleSendWarning = () => {
    toast({
      title: "경고 전송",
      description: "소음 경고가 기록되었습니다.",
      variant: "destructive",
    });
  };

  const handleOpenChat = () => {
    toast({
      title: "채팅방 개설",
      description: "이웃과의 대화방이 열렸습니다.",
    });
  };

  const alertStats = {
    received: 2,
    sent: 1,
    trend: "down" as const
  };

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">🌙 QuietNest</h1>
        <p className="text-muted-foreground">평화로운 우리 아파트</p>
      </div>

      {/* 실시간 소음 현황 */}
      <NoiseStatusIndicator 
        status="quiet" 
        alertCount={0}
      />

      {/* 바로가기 버튼들 */}
      <QuickActionButtons
        onQuietRequest={handleQuietRequest}
        onSendWarning={handleSendWarning}
        onOpenChat={handleOpenChat}
      />

      {/* 내 알림/경고함 요약 */}
      <AlertSummaryCard 
        stats={alertStats}
        period="최근 30일"
      />

      {/* 최근 활동 */}
      <div className="bg-card rounded-xl p-4 shadow-card">
        <h3 className="text-lg font-semibold mb-3 text-foreground">최근 활동</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-success-soft rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-success">
                조용한 하루를 보내고 있습니다
              </p>
              <p className="text-xs text-muted-foreground">오늘 0건의 소음 신고</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary-soft rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                501호에서 사과 메시지를 받았습니다
              </p>
              <p className="text-xs text-muted-foreground">어제 오후 3:22</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
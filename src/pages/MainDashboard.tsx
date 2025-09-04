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
    <div className="pb-20 pt-safe px-4 space-y-6 bg-background min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">🌙 QuietNest</h1>
        <p className="text-base text-muted-foreground">평화로운 우리 아파트</p>
      </div>

      {/* 실시간 소음 현황 */}
      <NoiseStatusIndicator 
        status="quiet" 
        alertCount={0}
        className="mobile-card"
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
      <div className="bg-card rounded-xl p-6 shadow-card mobile-card">
        <h3 className="text-xl font-semibold mb-4 text-foreground">최근 활동</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-success-soft rounded-xl mobile-transition">
            <div className="w-3 h-3 bg-success rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-success mb-1">
                조용한 하루를 보내고 있습니다
              </p>
              <p className="text-xs text-muted-foreground">오늘 0건의 소음 신고</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-primary-soft rounded-xl mobile-transition">
            <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary mb-1">
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
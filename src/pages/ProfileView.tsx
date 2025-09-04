import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Home, Bell, Send, Scale, Settings, TrendingDown, Calendar, MessageSquare } from "lucide-react";

export function ProfileView() {
  const userInfo = {
    name: "김민지",
    unit: "502호",
    joinDate: "2023년 8월",
    avatar: ""
  };

  const noiseStats = {
    received: {
      last30Days: 2,
      total: 8
    },
    sent: {
      last30Days: 1,
      total: 3
    },
    trend: "down" as const
  };

  const recentActivities = [
    {
      id: "1",
      type: "received",
      description: "501호에서 사과 메시지를 받았습니다",
      date: "2일 전",
      status: "resolved"
    },
    {
      id: "2", 
      type: "sent",
      description: "603호에 조용히 부탁 알림을 보냈습니다",
      date: "1주일 전",
      status: "sent"
    }
  ];

  const consultationHistory = [
    {
      id: "1",
      lawyer: "김민수 변호사",
      date: "2024-01-15",
      topic: "층간소음 분쟁조정 절차",
      status: "completed"
    }
  ];

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">👤 프로필</h1>
        <p className="text-muted-foreground">내 정보와 활동을 확인하세요</p>
      </div>

      {/* 사용자 정보 */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userInfo.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {userInfo.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{userInfo.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>{userInfo.unit}</span>
            </div>
            <p className="text-sm text-muted-foreground">가입일: {userInfo.joinDate}</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            편집
          </Button>
        </div>
      </Card>

      {/* 소음 기록 통계 */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">내 소음 기록</h3>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingDown className="h-4 w-4" />
            <span>개선됨</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-warning-soft rounded-lg text-center">
            <Bell className="h-6 w-6 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">{noiseStats.received.last30Days}</p>
            <p className="text-sm text-muted-foreground">받은 경고 (30일)</p>
            <p className="text-xs text-muted-foreground">누적: {noiseStats.received.total}건</p>
          </div>

          <div className="p-4 bg-primary-soft rounded-lg text-center">
            <Send className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{noiseStats.sent.last30Days}</p> 
            <p className="text-sm text-muted-foreground">보낸 경고 (30일)</p>
            <p className="text-xs text-muted-foreground">누적: {noiseStats.sent.total}건</p>
          </div>
        </div>

        <div className="p-3 bg-success-soft rounded-lg">
          <p className="text-sm text-success font-medium">
            ✨ 지난 주 대비 받은 경고가 50% 감소했어요!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            평화로운 생활을 위한 노력이 결실을 맺고 있습니다.
          </p>
        </div>
      </Card>

      {/* 최근 활동 */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">최근 활동</h3>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className={`p-2 rounded-full ${
                activity.type === "received" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-warning text-warning-foreground"
              }`}>
                {activity.type === "received" ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              {activity.status === "resolved" && (
                <Badge variant="outline" className="text-xs bg-success-soft text-success">
                  해결됨
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 상담 이력 */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">상담·중재 이력</h3>
        
        {consultationHistory.length > 0 ? (
          <div className="space-y-3">
            {consultationHistory.map((consultation) => (
              <div key={consultation.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Scale className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{consultation.lawyer}</p>
                  <p className="text-xs text-muted-foreground">{consultation.topic}</p>
                  <p className="text-xs text-muted-foreground">{consultation.date}</p>
                </div>
                <Badge variant="outline" className="bg-success-soft text-success">
                  완료
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Scale className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">상담 이력이 없습니다.</p>
          </div>
        )}
      </Card>

      {/* 내 신청 관리 */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">내 신청 관리</h3>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-3" />
            법률 상담 예약 내역
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-3" />
            전문가 컨설팅 신청
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-3" />
            제휴 서비스 신청 현황
          </Button>
        </div>
      </Card>
    </div>
  );
}
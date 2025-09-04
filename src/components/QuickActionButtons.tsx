import { Volume2, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickActionButtonsProps {
  onQuietRequest: () => void;
  onSendWarning: () => void;
  onOpenChat: () => void;
}

export function QuickActionButtons({ onQuietRequest, onSendWarning, onOpenChat }: QuickActionButtonsProps) {
  return (
    <Card className="p-4 shadow-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">바로가기</h3>
      
      <div className="space-y-3">
        <Button 
          onClick={onQuietRequest}
          className="w-full bg-gradient-primary text-primary-foreground shadow-peaceful hover:shadow-lg transition-all duration-200 h-12"
        >
          <Volume2 className="h-5 w-5 mr-2" />
          조용히 부탁드려요
        </Button>
        
        <Button 
          onClick={onSendWarning}
          variant="outline" 
          className="w-full border-warning text-warning hover:bg-warning-soft h-12"
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          경고 보내기
        </Button>
        
        <Button 
          onClick={onOpenChat}
          variant="outline" 
          className="w-full border-primary text-primary hover:bg-primary-soft h-12"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          이웃과 대화하기
        </Button>
      </div>
    </Card>
  );
}
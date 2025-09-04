import { Volume2, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mobileActions } from "@/utils/mobile";

interface QuickActionButtonsProps {
  onQuietRequest: () => void;
  onSendWarning: () => void;
  onOpenChat: () => void;
}

export function QuickActionButtons({ onQuietRequest, onSendWarning, onOpenChat }: QuickActionButtonsProps) {
  const handleButtonPress = async (action: () => void, type: 'primary' | 'secondary' | 'danger' = 'primary') => {
    await mobileActions.buttonPress(type);
    action();
  };

  return (
    <Card className="p-6 shadow-card mobile-card">
      <h3 className="text-lg font-semibold mb-6 text-foreground">바로가기</h3>
      
      <div className="space-y-4">
        <Button 
          onClick={() => handleButtonPress(onQuietRequest, 'primary')}
          className="w-full bg-gradient-primary text-primary-foreground shadow-peaceful hover:shadow-lg transition-all duration-200 h-14 text-base font-medium active:scale-95 haptic-feedback mobile-button"
        >
          <Volume2 className="h-6 w-6 mr-3" />
          조용히 부탁드려요
        </Button>
        
        <Button 
          onClick={() => handleButtonPress(onSendWarning, 'danger')}
          variant="outline" 
          className="w-full border-2 border-warning text-warning hover:bg-warning-soft h-14 text-base font-medium active:scale-95 haptic-feedback mobile-button"
        >
          <AlertTriangle className="h-6 w-6 mr-3" />
          경고 보내기
        </Button>
        
        <Button 
          onClick={() => handleButtonPress(onOpenChat, 'secondary')}
          variant="outline" 
          className="w-full border-2 border-primary text-primary hover:bg-primary-soft h-14 text-base font-medium active:scale-95 haptic-feedback mobile-button"
        >
          <MessageCircle className="h-6 w-6 mr-3" />
          이웃과 대화하기
        </Button>
      </div>
    </Card>
  );
}
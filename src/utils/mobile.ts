import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

/**
 * 햅틱 피드백 유틸리티
 */
export const hapticFeedback = {
  light: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    } else {
      // 웹에서는 vibration API 사용
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  },
  
  medium: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
    }
  },
  
  heavy: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    }
  },
  
  success: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: NotificationType.Success });
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  },
  
  warning: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: NotificationType.Warning });
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  },
  
  error: async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: NotificationType.Error });
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate([300, 100, 300, 100, 300]);
      }
    }
  }
};

/**
 * 상태바 제어
 */
export const statusBar = {
  setLight: async () => {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.setStyle({ style: Style.Light });
    }
  },
  
  setDark: async () => {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.setStyle({ style: Style.Dark });
    }
  },
  
  show: async () => {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.show();
    }
  },
  
  hide: async () => {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.hide();
    }
  },
  
  setBackgroundColor: async (color: string) => {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({ color });
    }
  }
};

/**
 * 스플래쉬 스크린 제어
 */
export const splashScreen = {
  hide: async () => {
    if (Capacitor.isNativePlatform()) {
      await SplashScreen.hide();
    }
  },
  
  show: async () => {
    if (Capacitor.isNativePlatform()) {
      await SplashScreen.show({
        showDuration: 3000,
        fadeInDuration: 300,
        fadeOutDuration: 300,
        autoHide: true
      });
    }
  }
};

/**
 * 플랫폼 감지
 */
export const platform = {
  isNative: () => Capacitor.isNativePlatform(),
  isWeb: () => !Capacitor.isNativePlatform(),
  isIOS: () => Capacitor.getPlatform() === 'ios',
  isAndroid: () => Capacitor.getPlatform() === 'android',
  getPlatform: () => Capacitor.getPlatform()
};

/**
 * 안전 영역 감지
 */
export const safeArea = {
  getInsets: () => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      return {
        top: style.getPropertyValue('--safe-area-inset-top') || '0px',
        bottom: style.getPropertyValue('--safe-area-inset-bottom') || '0px',
        left: style.getPropertyValue('--safe-area-inset-left') || '0px',
        right: style.getPropertyValue('--safe-area-inset-right') || '0px'
      };
    }
    return { top: '0px', bottom: '0px', left: '0px', right: '0px' };
  }
};

/**
 * 공통 모바일 액션들
 */
export const mobileActions = {
  // 버튼 터치 피드백
  buttonPress: async (type: 'primary' | 'secondary' | 'danger' = 'primary') => {
    switch (type) {
      case 'primary':
        await hapticFeedback.medium();
        break;
      case 'secondary':
        await hapticFeedback.light();
        break;
      case 'danger':
        await hapticFeedback.heavy();
        break;
    }
  },
  
  // 탭 전환 피드백
  tabSwitch: async () => {
    await hapticFeedback.light();
  },
  
  // 성공 액션
  success: async () => {
    await hapticFeedback.success();
  },
  
  // 경고 액션
  warning: async () => {
    await hapticFeedback.warning();
  },
  
  // 에러 액션
  error: async () => {
    await hapticFeedback.error();
  }
};
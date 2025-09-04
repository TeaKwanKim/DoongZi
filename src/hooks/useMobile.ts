import { useEffect, useState } from 'react';
import { platform, statusBar, splashScreen } from '@/utils/mobile';

/**
 * 모바일 환경 감지 훅
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [platformName, setPlatformName] = useState<string>('web');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsNative(platform.isNative());
      setPlatformName(platform.getPlatform());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return {
    isMobile,
    isNative,
    platformName,
    isIOS: platform.isIOS(),
    isAndroid: platform.isAndroid(),
    isWeb: platform.isWeb()
  };
}

/**
 * 모바일 앱 초기화 훅
 */
export function useMobileApp() {
  const { isNative, isIOS } = useMobile();

  useEffect(() => {
    if (isNative) {
      // 앱 시작 시 설정
      const initializeApp = async () => {
        // 스플래쉬 스크린 숨기기
        await splashScreen.hide();
        
        // 상태바 설정
        if (isIOS) {
          await statusBar.setLight();
        } else {
          await statusBar.setDark();
          await statusBar.setBackgroundColor('#158B8D');
        }
      };

      initializeApp();
    }
  }, [isNative, isIOS]);

  return { isNative };
}

/**
 * 안전 영역 훅
 */
export function useSafeArea() {
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    const updateSafeArea = () => {
      if (typeof window !== 'undefined') {
        const style = getComputedStyle(document.documentElement);
        setSafeAreaInsets({
          top: parseInt(style.getPropertyValue('--safe-area-inset-top').replace('px', '')) || 0,
          bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom').replace('px', '')) || 0,
          left: parseInt(style.getPropertyValue('--safe-area-inset-left').replace('px', '')) || 0,
          right: parseInt(style.getPropertyValue('--safe-area-inset-right').replace('px', '')) || 0
        });
      }
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeAreaInsets;
}
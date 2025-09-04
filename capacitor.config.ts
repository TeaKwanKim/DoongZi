import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.096c8ee998a14aa09e80ab8fdf1d1dab',
  appName: 'quiet-haven-connect',
  webDir: 'dist',
  server: {
    url: 'https://096c8ee9-98a1-4aa0-9e80-ab8fdf1d1dab.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999"
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#158B8D'
    }
  }
};

export default config;
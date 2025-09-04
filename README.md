# 🌙 QuietNest - 층간소음 분쟁 해결 플랫폼

평화로운 공동생활을 위한 올인원 모바일 앱

## 프로젝트 정보

**URL**: https://lovable.dev/projects/096c8ee9-98a1-4aa0-9e80-ab8fdf1d1dab

## 앱 개요

QuietNest는 아파트와 공동주택에서 발생하는 층간소음 문제를 해결하기 위해 설계된 종합 모바일 플랫폼입니다.
사용자는 소음을 기록하고, 이웃과 안전하게 소통하며, 필요 시 전문가 상담과 생활 솔루션까지 이어갈 수 있습니다.

### 주요 기능

🏠 **내 아파트**: 아파트 도면 기반 실시간 소음 현황 모니터링  
💬 **커뮤니티**: 이웃과의 소통 및 관리사무소 공지사항  
📊 **메인 대시보드**: 개인 알림/경고 관리 및 바로가기 기능  
⚖️ **법률상담**: 전문 변호사와의 상담 예약 및 연결 서비스  
🛒 **마켓**: 방음 솔루션 및 제휴 서비스 제공  
👤 **프로필**: 개인 소음 기록 및 활동 이력 관리  

### 모바일 앱 특징

📱 **네이티브 모바일 경험**: Capacitor 기반 iOS/Android 네이티브 앱  
🔔 **햅틱 피드백**: 터치 상호작용 시 진동 피드백  
🎨 **모바일 최적화 UI**: 터치 친화적 디자인과 안전 영역 지원  
⚡ **실시간 동기화**: 즉시 업데이트되는 소음 현황  

## 기술 스택

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI 라이브러리**: shadcn/ui, Radix UI
- **모바일**: Capacitor (iOS/Android)
- **상태 관리**: React Query (TanStack Query)
- **라우팅**: React Router Dom
- **빌드 도구**: Vite
- **백엔드**: Supabase (데이터베이스, 인증, 실시간 기능)

## 모바일 앱 실행 방법

### 개발 환경 (웹 미리보기)
1. `npm install`
2. `npm run dev`

### 네이티브 앱 빌드
1. 프로젝트를 GitHub로 내보내기 (Export to Github 버튼)
2. `git pull`하여 로컬에 복제
3. `npm install`
4. 플랫폼 추가: `npx cap add ios` 또는 `npx cap add android`
5. `npm run build`
6. `npx cap sync`
7. `npx cap run ios` 또는 `npx cap run android`

### 요구사항
- **iOS**: Xcode가 설치된 Mac
- **Android**: Android Studio

## 백엔드 기능 활성화

QuietNest의 완전한 기능(사용자 인증, 데이터 저장, 실시간 알림 등)을 위해서는 Supabase 통합이 필요합니다.

1. 인터페이스 우상단의 **녹색 Supabase 버튼** 클릭
2. Supabase 프로젝트 연결
3. 데이터베이스 테이블 및 인증 설정 자동 구성

## 배포

Lovable 인터페이스의 **Publish** 버튼을 클릭하여 웹 앱을 즉시 배포할 수 있습니다.

---

**QuietNest**로 평화로운 아파트 생활을 시작하세요! 🌙
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import AppShellWithTab from './layouts/AppShellWithTab';

import MainPage from './pages/main/Mainpage';

import WelcomePage from './pages/login/WelcomePage';

import SignUpPage from './pages/login/SignUpPage';
import SignInPage from './pages/login/SignInPage';
import TermsCheckPage from './pages/login/TermsCheckPage';
import SocialLoginCallBackPage from './pages/login/SocialLoginCallBackPage';

import OnboardingTopicSelectPage from './pages/onboarding/OnboardingTopicSelectPage';
import OnboardingProfileSelectPage from './pages/onboarding/OnboardingProfileSelectPage';
import OnboardingLetterIntroPage from './pages/onboarding/OnboardingLetterIntroPage';
import OnboardingLetterWritePage from './pages/onboarding/OnboardingLetterWritePage';
import OnboardingLetterGuidePage from './pages/onboarding/OnboardingLetterGuidePage';

import FriendRequestPage from './pages/friend/FriendRequestPage';
import FriendInboxPage from './pages/friend/FriendInboxPage';
import FriendPostPage from './pages/friend/FriendPostPage';
import FriendDraftPage from './pages/friend/FriendDraftPage';
import FriendSentTransitionPage from './pages/friend/FriendSentTransitionPage';

import LetterDecoPage from './pages/letter/LetterDecoPage';
import LetterReportPage from './pages/LetterReportPage';
import LetterDraftRoute from './pages/letter/LetterDraftRoute';

import LoadingPage from './pages/system/LoadingPage';
import ServerErrorPage from './pages/system/ServerErrorPage';
import NetworkErrorPage from './pages/system/NetworkErrorPage';
import ForbiddenPage from './pages/system/ForbiddenPage';
import NotFoundPage from './pages/system/NotFoundPage';
import ErrorPage from './pages/system/ErrorPage';
import SocialErrorPage from './pages/system/SocialErrorPage';

import FeedPage from './pages/feed/PublicFeedPage';
import FriendFeedPage from './pages/feed/FriendFeedPage';

import LetterSendingPage from './pages/letter/LetterSendingPage';
import ProfileSetUpPage from './pages/login/ProfileSetUpPage';

import LetterReviewPage from './pages/letter/LetterReviewPage';

import LetterInboxOtherPage from './pages/letter/LetterInboxOtherPage';
import LetterInboxSelfPage from './pages/letter/LetterInboxSelfPage';
import LetterPostSelfPage from './pages/letter/LetterPostSelfPage';
import LetterReplyPage from './pages/letter/LetterReplyPage';
import LetterPostOtherPage from './pages/letter/LetterPostOtherPage';

import WeeklyReportPage from './pages/report/WeeklyReportPage';
import KeywordLetterPage from './pages/report/KeywordLetterPage';

import MyPage from './pages/my/MyPage';
import InquiryPage from './pages/my/InquiryPage';
import SplashPage from './pages/login/SplashPage';
import LetterOtherStopPage from './pages/letter/LetterOtherStopPage';
import GuestGate from './routes/GuestGate';
import EntryRoute from './routes/EntryRoute';
import OnboardingLetterSendPage from './pages/onboarding/OnboardingLetterSendPage';

import FriendReplyPage from './pages/friend/FriendReplyPage';

import SettingPage from './pages/setting/SettingPage';
import PasswordResetPage from './pages/setting/PasswordResetPage';
import AlarmSettingPage from './pages/setting/AlarmSettingPage';
import PersonalConsentPage from './pages/setting/PersonalConsentPage';
import NoticePage from './pages/setting/NoticePage';
import TermsOfServicePage from './pages/setting/TermsOfServicePage';
import PrivacyPolicyPage from './pages/setting/PrivacyPolicyPage';
import CommunityGuidelinePage from './pages/setting/CommunityGuidelinePage';
import FindAccountPage from './pages/login/FindAccountPAge';

// ===== Placeholders =====
const TODOPage = () => <div />;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <EntryRoute /> },
      {
        element: <GuestGate />,
        children: [
          // 프레임 + 탭바
          {
            element: <AppShellWithTab />,
            children: [
              { path: 'home/main', element: <MainPage /> },
              {
                path: '/letter',
                children: [
                  { index: true, element: <Navigate to='/letter/inbox-other' replace /> },
                  { path: 'inbox-other', element: <LetterInboxOtherPage /> },
                  { path: 'inbox-self', element: <LetterInboxSelfPage /> },
                  { path: 'other-stop', element: <LetterOtherStopPage /> },
                  // { path: 'letter/10-end', element: <LetterTenEndPage /> },
                ],
              },
              {
                path: '/friend',
                children: [
                  { index: true, element: <Navigate to='/friend/inbox' replace /> },
                  { path: 'inbox', element: <FriendInboxPage /> },
                  { path: 'request', element: <FriendRequestPage /> },
                  { path: 'sent-transition/:sessionId', element: <FriendSentTransitionPage /> }, // letter/10-end 페이지
                ],
              },
              { path: 'report/weekly-report', element: <WeeklyReportPage /> },
              { path: 'setting', element: <SettingPage /> },
            ],
          },
          // 프레임만
          {
            element: <AppShellLayout />,
            children: [
              // 비로그인 허용 시작점
              { path: 'splash', element: <SplashPage /> },

              // 시스템 화면
              { path: 'loading', element: <LoadingPage /> },
              { path: 'error/500', element: <ServerErrorPage /> },
              { path: 'error/network', element: <NetworkErrorPage /> },
              { path: 'error/403', element: <ForbiddenPage /> },
              { path: 'error/404', element: <NotFoundPage /> },
              { path: 'error/social', element: <SocialErrorPage /> },
              {
                path: 'auth',
                children: [
                  { index: true, element: <Navigate to='welcome' replace /> },
                  { path: 'welcome', element: <WelcomePage /> },
                  { path: 'signin', element: <SignInPage /> },
                  { path: 'id-find', element: <FindAccountPage /> },
                  { path: 'id-verify', element: <FindAccountPage /> },
                  { path: 'pw-find', element: <FindAccountPage /> },
                  { path: 'pw-reset', element: <FindAccountPage /> },
                  { path: 'signup', element: <SignUpPage /> },
                  { path: 'profile-setup', element: <ProfileSetUpPage /> },
                  { path: 'terms', element: <TermsCheckPage /> },
                  { path: 'callback/:provider', element: <SocialLoginCallBackPage /> },
                ],
              },
              {
                path: 'onboarding',
                children: [
                  { index: true, element: <Navigate to='topic-select-1' replace /> },
                  { path: 'topic-select-1', element: <OnboardingProfileSelectPage /> },
                  { path: 'topic-select-2', element: <OnboardingTopicSelectPage /> },
                  { path: 'letter-intro', element: <OnboardingLetterIntroPage /> },
                  { path: 'letter-write', element: <OnboardingLetterWritePage /> },
                  { path: 'letter-guide', element: <OnboardingLetterGuidePage /> },
                  { path: 'letter-send', element: <OnboardingLetterSendPage /> },
                ],
              },
              { path: 'feed/public-all', element: <FeedPage /> },
              { path: 'feed/friend-all', element: <FriendFeedPage /> },
              /**
               * letter/{target}/{step} 표준 (비탭)
               * target = anon | other | friend | self
               */
              {
                path: 'letter/:target',
                children: [
                  { path: 'draft', element: <LetterDraftRoute /> },
                  { path: 'decorate', element: <LetterDecoPage /> },
                  { path: 'sending', element: <LetterSendingPage /> },
                ],
              },
              { path: 'letter/thread/:sessionId', element: <LetterPostOtherPage /> },
              { path: 'letter/reply/:sessionId/:letterId', element: <LetterReplyPage /> },
              { path: 'letter/report', element: <LetterReportPage /> },
              { path: 'letter/review/:sessionId', element: <LetterReviewPage /> },
              { path: 'letter/post-self/:letterId', element: <LetterPostSelfPage /> },
              { path: 'letter/loading', element: <LoadingPage /> },
              // 기존 코드 충돌 방지를 위한 코드(레거시). 추후 삭제
              {
                path: 'letter/other_draft',
                element: <Navigate to='/letter/other/draft' replace />,
              },
              { path: 'letter/self_draft', element: <Navigate to='/letter/self/draft' replace /> },
              { path: 'friend/draft', element: <FriendDraftPage /> }, // 기존 라우팅
              { path: 'friend/thread/:friendId', element: <FriendPostPage /> }, // 나눈 편지 목록(질문 스레드 단위)
              {
                path: 'friend/thread/:friendId/:letterId',
                element: <FriendReplyPage />,
              },
              { path: 'report/keyword-letter', element: <KeywordLetterPage /> }, // TODO: 수정 필요
              { path: 'report/keyword-letter-indi', element: <TODOPage /> },

              { path: 'my/my-page', element: <MyPage /> },
              { path: 'my/limits', element: <TODOPage /> },
              { path: 'my/complain', element: <TODOPage /> },
              { path: 'my/inquiry', element: <InquiryPage /> },

              // 설정 페이지들
              { path: 'setting/pw-reset', element: <PasswordResetPage /> },
              { path: 'setting/alarm', element: <AlarmSettingPage /> },
              { path: 'setting/personal-consent', element: <PersonalConsentPage /> },
              { path: 'setting/notice', element: <NoticePage /> },
              { path: 'setting/terms', element: <TermsOfServicePage /> },
              { path: 'setting/privacy', element: <PrivacyPolicyPage /> },
              { path: 'setting/guideline', element: <CommunityGuidelinePage /> },

              // 404 처리
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

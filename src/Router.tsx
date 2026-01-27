import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import AppShellWithTab from './layouts/AppShellWithTab';

// import Homepage from './pages/Homepage';
import MainPage from './pages/main/Mainpage';

import WelcomePage from './pages/login/WelcomePage';

import SignUpPage from './pages/login/SignUpPage';
import SignInPage from './pages/login/SignInPage';
import TermsCheckPage from './pages/login/TermsCheckPage';

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

import FeedPage from './pages/feed/PublicFeedPage';
import FriendFeedPage from './pages/feed/FriendFeedPage';

import LetterSendingPage from './pages/letter/LetterSendingPage';
import ProfileSetUpPage from './pages/login/ProfileSetUpPage';

import FindAccountPage from './pages/login/FindAccountPAge';
import LetterReviewPage from './pages/letter/LetterReviewPage';

import LetterInboxOtherPage from './pages/letter/LetterInboxOtherPage';
import LetterInboxSelfPage from './pages/letter/LetterInboxSelfPage';
import LetterPostSelfPage from './pages/letter/LetterPostSelfPage';
import LetterReplyPage from './pages/letter/LetterReplyPage';
import LetterPostOtherPage from './pages/letter/LetterPostOtherPage';

import WeeklyReportPage from './pages/WeeklyReportPage';
import MyPage from './pages/my/MyPage';
import InquiryPage from './pages/my/InquiryPage';

// ===== Placeholders =====
const TODOPage = () => <div />;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // 프레임 + 탭바
      {
        element: <AppShellWithTab />,
        children: [
          { index: true, element: <Navigate to='/home/main' replace /> },
          { path: 'home/main', element: <MainPage /> },
          { path: 'letter/inbox-other', element: <LetterInboxOtherPage /> },
          { path: 'letter/inbox-self', element: <LetterInboxSelfPage /> },
          // { path: 'letter/10-end', element: <LetterTenEndPage /> },
          // { path: 'letter/other-stop', element: <LetterOtherStopPage /> },
          { path: 'friend/request', element: <FriendRequestPage /> },
          { path: 'friend/inbox', element: <FriendInboxPage /> },

          { path: 'friend/sent-transition', element: <FriendSentTransitionPage /> },
          { path: 'report/weekly-report', element: <WeeklyReportPage /> },
        ],
      },

      // 프레임만
      {
        element: <AppShellLayout />,
        children: [
          // 시스템 화면
          { path: 'loading', element: <LoadingPage /> },
          { path: 'error/500', element: <ServerErrorPage /> },
          { path: 'error/network', element: <NetworkErrorPage /> },
          { path: 'error/403', element: <ForbiddenPage /> },
          { path: 'error/404', element: <NotFoundPage /> },

          // 기존 라우트
          // { path: 'splash', element: <SplashPage /> },

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
              // { path: 'sent-transition', element: <LetterSendingPage /> }, TODO: 예디랑 논의 필요
            ],
          },

          { path: 'letter/post-other', element: <LetterPostOtherPage /> }, // 기존 라우팅 TODO: 삭제 필요
          { path: 'letter/:letterId/thread/:threadId', element: <LetterPostOtherPage /> },

          { path: 'letter/reply', element: <LetterReplyPage /> }, // TODO: 삭제 필요
          { path: 'letter/reply/:letterId', element: <LetterReplyPage /> },
          { path: 'letter/reply/:threadId/:letterId', element: <LetterReplyPage /> },

          { path: 'letter/report', element: <LetterReportPage /> },
          { path: 'letter/review/:letterId', element: <LetterReviewPage /> },

          { path: 'letter/post-self', element: <LetterPostSelfPage /> },
          { path: 'letter/post-self/:letterId', element: <LetterPostSelfPage /> },
          { path: 'letter/loading', element: <LoadingPage /> },

          // 기존 코드 충돌 방지를 위한 코드(레거시). 추후 삭제
          { path: 'letter/other_draft', element: <Navigate to='/letter/other/draft' replace /> },
          { path: 'letter/self_draft', element: <Navigate to='/letter/self/draft' replace /> },

          { path: 'friend/draft', element: <FriendDraftPage /> }, // 기존 라우팅
          { path: 'friend/post/:letterId', element: <FriendPostPage /> }, // 기존 라우팅
          { path: 'friend/:friendId/thread/:threadId', element: <FriendPostPage /> }, // 나눈 편지 목록(질문 스레드 단위)
          { path: 'friend/:friendId/thread/:threadId/draft', element: <FriendDraftPage /> }, // 작성 버튼 눌렀을 때, 새 편지 작성
          {
            path: 'friend/:friendId/thread/:threadId/letters/:letterId',
            element: <LetterReplyPage />,
          },

          { path: 'report/keyword-letter', element: <TODOPage /> },
          { path: 'report/keyword-letter-indi', element: <TODOPage /> },

          { path: 'my/my-page', element: <MyPage /> },
          { path: 'my/limits', element: <TODOPage /> },
          { path: 'my/complain', element: <TODOPage /> },
          { path: 'my/inquiry', element: <InquiryPage /> },

          // 404 처리
          { path: '*', element: <NotFoundPage /> },

          // 기존 코드. 주석처리
          // {
          // path: 'letter/anon-draft',
          // element: <AnonDraftPage />,
          // },
          // {
          // path: 'letter/other-draft',
          // element: <OtherDraftPage />,
          // },
          // {
          // path: 'letter/self-draft',
          // element: <SelfDraftPage />,
          // },
          // {
          // path: 'letter/:mode-decorate',
          // element: <LetterDecoPage />,
          // },

          // { path: 'letter/report', element: <LetterReportPage /> },
        ],
      },
    ],
  },
]);

export default router;

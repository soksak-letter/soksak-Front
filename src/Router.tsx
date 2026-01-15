import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import AppShellWithTab from './layouts/AppShellWithTab';

// import Homepage from './pages/Homepage';
import MainPage from './pages/main/Mainpage';

import WelcomePage from './pages/login/WelcomePage';
import SignInPage from './pages/login/SignInPage';
import SignUpPage from './pages/login/SignUpPage';
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

import AnonDraftPage from './pages/letter/AnonDraftPage';
import OtherDraftPage from './pages/letter/OtherDraftPage';

import SelfDraftPage from './pages/letter/SelfDraftPage';

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
          // { path: 'letter/inbox-other', element: <LetterInboxOtherPage /> },
          // { path: 'letter/inbox-self', element: <LetterInboxSelfPage /> },
          // { path: 'letter/10-end', element: <LetterTenEndPage /> },
          // { path: 'letter/other-stop', element: <LetterOtherStopPage /> },
          { path: 'friend/request', element: <FriendRequestPage /> },
          { path: 'friend/inbox', element: <FriendInboxPage /> },
          // { path: 'report/keyword-letter', element: <KeywordLetterPage /> },
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
              // { path: 'email-find', element: <EmailFindPage /> },
              // { path: 'email-verify', element: <EmailVerifyPage /> },
              // { path: 'pw-find', element: <PwFindPage /> },
              // { path: 'pw-reset', element: <PwResetPage /> },
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
              // { path: 'sent-transition', element: <TODOPage /> },
            ],
          },

          { path: 'letter/post-other', element: <FriendPostPage /> },

          { path: 'letter/reply', element: <Navigate to='/letter/post-other' replace /> },
          { path: 'letter/reply/:letterId', element: <TODOPage /> },

          { path: 'letter/report', element: <LetterReportPage /> },
          // { path: 'letter/review/:letterId', element: <TODOPage /> },

          // { path: 'letter/post-self', element: <TODOPage /> },
          // { path: 'letter/loading', element: <TODOPage /> },

          // 기존 코드 충돌 방지를 위한 코드(레거시). 추후 삭제
          { path: 'letter/other_draft', element: <Navigate to='/letter/other/draft' replace /> },
          { path: 'letter/self_draft', element: <Navigate to='/letter/self/draft' replace /> },

          { path: 'friend/draft', element: <FriendDraftPage /> },
          { path: 'friend/post/:letterId', element: <FriendPostPage /> },
          { path: 'friend/sent-transition', element: <FriendSentTransitionPage /> },

          { path: 'report/weekly-report', element: <TODOPage /> },
          { path: 'report/keyword-letter-indi', element: <TODOPage /> },

          { path: 'my/my-page', element: <TODOPage /> },
          { path: 'my/limits', element: <TODOPage /> },
          { path: 'my/complain', element: <TODOPage /> },

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

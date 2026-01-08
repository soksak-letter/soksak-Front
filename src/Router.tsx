import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';

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
import WelcomePage from './pages/login/WelcomePage';
import SelfDraftPage from './pages/letter/SelfDraftPage';
import LetterDecoPage from './pages/letter/LetterDecoPage';
import SignInPage from './pages/login/SigninPage';
import SignUpPage from './pages/login/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // 프레임만
      {
        element: <AppShellLayout />,
        children: [
          { path: 'onboarding/profile', element: <OnboardingProfileSelectPage /> },
          { path: 'onboarding/topic-select', element: <OnboardingTopicSelectPage /> },
          { path: 'onboarding/letter-intro', element: <OnboardingLetterIntroPage /> },
          { path: 'onboarding/letter-write', element: <OnboardingLetterWritePage /> },
          { path: 'onboarding/letter-guide', element: <OnboardingLetterGuidePage /> },

          { path: 'friend/post', element: <FriendPostPage /> },
          { path: 'friend/draft', element: <FriendDraftPage /> },

          // TODO : 'letter'로 이동했을 때 엣지케이스 처리 필요
          {
            path: 'letter/anon-draft',
            element: <AnonDraftPage />,
          },
          {
            path: 'letter/other-draft',
            element: <OtherDraftPage />,
          },
          {
            path: '/auth/login_entry',
            element: <WelcomePage />,
          },
          {
            path: 'letter/self-draft',
            element: <SelfDraftPage />,
          },
          {
            path: 'letter/:mode-decorate',
            element: <LetterDecoPage />,
          },
          {
            path: '/auth/signin',
            element: <SignInPage />,
          },
          {
            path: '/auth/signup',
            element: <SignUpPage />,
          },
        ],
      },

      // 프레임 + 탭바
      {
        element: <AppShellWithTab />,
        children: [
          { index: true, element: <Homepage /> },
          { path: 'friend/request', element: <FriendRequestPage /> },
          { path: 'friend/inbox', element: <FriendInboxPage /> },
          { path: 'friend/sent-transition', element: <FriendSentTransitionPage /> },
        ],
      },
    ],
  },
]);

export default router;

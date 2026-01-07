import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';
import FriendRequestPage from './pages/friend/FriendRequestPage';
import FriendInboxPage from './pages/friend/FriendInboxPage';
import FriendPostPage from './pages/friend/FriendPostPage';
import FriendDraftPage from './pages/friend/FriendDraftPage';
import FriendSentTransitionPage from './pages/friend/FriendSentTransitionPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // 프레임만
      {
        element: <AppShellLayout />,
        children: [
          // { path: 'onboarding/topic-select', element: <OnboardingTopicSelectPage /> }
          { path: 'friend/post', element: <FriendPostPage /> },
          { path: 'friend/draft', element: <FriendDraftPage /> },
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
      {
        path: '/test/letter-carousel',
        element: <LetterCarouselTestPage />,
      },
    ],
  },
]);

export default router;

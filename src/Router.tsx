import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';
import BottomSheetTestPage from './pages/BottomSheetTestPage';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';
import AnonDraftPage from './pages/letter/AnonDraftPage';
import OtherDraftPage from './pages/letter/OtherDraftPage';
import WelcomePage from './pages/WelcomePage';

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
        ],
      },

      // 프레임 + 탭바
      {
        element: <AppShellWithTab />,
        children: [
          { index: true, element: <Homepage /> },
          // { path: 'friends/search', element: <FriendSearchPage /> },
        ],
      },
      {
        path: '/test/letter-carousel',
        element: <LetterCarouselTestPage />,
      },
      {
        path: '/test/bottom-sheet',
        element: <BottomSheetTestPage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';
import BottomSheetTestPage from './pages/BottomSheetTestPage';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';

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

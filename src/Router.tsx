import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';
import LetterReportPage from './pages/LetterReportPage';

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
          {path:'letter/report',element:<LetterReportPage/>}
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
    ],
  },
]);

export default router;

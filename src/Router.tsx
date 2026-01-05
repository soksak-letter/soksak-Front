import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';
import OnboardingTopicSelectPage from './pages/OnboardingTopicSelectPage';
import OnboardingProfileSelectPage from './pages/OnboardingProfileSelectPage';

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
    ],
  },
]);

export default router;

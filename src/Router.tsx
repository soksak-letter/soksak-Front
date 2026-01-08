import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';
import BottomSheetTestPage from './pages/BottomSheetTestPage';
import AppShellWithTab from './layouts/AppShellWithTab';

import Homepage from './pages/Homepage';

import OnboardingTopicSelectPage from './pages/onboarding/OnboardingTopicSelectPage';
import OnboardingProfileSelectPage from './pages/onboarding/OnboardingProfileSelectPage';
import OnboardingLetterIntroPage from './pages/onboarding/OnboardingLetterIntroPage';
import OnboardingLetterWritePage from './pages/onboarding/OnboardingLetterWritePage';
import OnboardingLetterGuidePage from './pages/onboarding/OnboardingLetterGuidePage';
        
import AnonDraftPage from './pages/letter/AnonDraftPage';
import OtherDraftPage from './pages/letter/OtherDraftPage';


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

          {
            path: 'letter/anon-draft',
            element: <AnonDraftPage />,
          },
          {
            path: 'letter/other-draft',
            element: <OtherDraftPage />,
          },

        ],
      },

      // 프레임 + 탭바
      {
        element: <AppShellWithTab />,
        children: [{ index: true, element: <Homepage /> }],
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

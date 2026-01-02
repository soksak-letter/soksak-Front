import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import AppShellLayout from './layouts/AppShellLayout';
import LetterCarouselTestPage from './pages/LetterCarouselTestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AppShellLayout />, // 375 고정 레이아웃
        children: [
          {
            index: true,
            element: <Hompage />,
          },
          // { path: 'letter/:id', element: <LetterDetailPage /> },
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

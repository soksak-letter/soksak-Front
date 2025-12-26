import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Hompage />,
      },
    ],
  },
]);

export default router;

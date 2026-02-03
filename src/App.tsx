import { Outlet } from 'react-router-dom';
import ModalRoot from './components/modal/ModalRoot';
import ActivityTracker from './components/ActivityTracker';

function App() {
  const hasToken = Boolean(localStorage.getItem('token'));

  return (
    <>
      {hasToken && <ActivityTracker />}
      <ModalRoot />
      <Outlet />
    </>
  );
}

export default App;

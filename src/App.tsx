import { Outlet } from 'react-router-dom';
import ModalRoot from './components/modal/ModalRoot';
import ActivityTracker from './components/ActivityTracker';
import { useAuthStore } from './stores/useAuthStore';

function App() {
  const hasToken = useAuthStore((s) => s.hasToken);

  return (
    <>
      {hasToken && <ActivityTracker />}
      <ModalRoot />
      <Outlet />
    </>
  );
}

export default App;

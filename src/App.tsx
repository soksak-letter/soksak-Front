import { Outlet } from 'react-router-dom';
import ModalRoot from './components/modal/ModalRoot';
import ActivityTracker from './components/ActivityTracker';

function App() {
  return (
    <>
      <ActivityTracker />
      <ModalRoot />
      <Outlet />
    </>
  );
}

export default App;

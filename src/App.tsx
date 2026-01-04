import { Outlet } from 'react-router-dom';
import ModalRoot from './components/modal/ModalRoot';

function App() {
  return (
    <>
      <ModalRoot />
      <Outlet />
    </>
  );
}

export default App;

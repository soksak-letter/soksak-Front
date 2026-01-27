import ToastPopup from '../ToastPopup';
import { useGlobalToast } from './ToastProvider';

function GlobalToast() {
  const { toast, visible, closeToast } = useGlobalToast();

  if (!toast) return null;

  return (
    <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
      <ToastPopup
        status={toast.status}
        message={toast.message}
        visible={visible}
        onClose={closeToast}
      />
    </div>
  );
}

export default GlobalToast;

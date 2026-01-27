import useToast from '@/hooks/useToast';
import ToastPopup from '../ToastPopup';

function GlobalToast() {
  const { toast, visible, closeToast } = useToast();

  if (!toast) return null;

  return (
    <ToastPopup
      status={toast.status}
      message={toast.message}
      visible={visible}
      onClose={closeToast}
    />
  );
}

export default GlobalToast;

import { useModalStore } from '@/stores/modalStore';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const navigate = useNavigate();
  const openModal = useModalStore((s) => s.openModal);

  const handleTryExit = () => {
    openModal('exitConfirm', {
      onConfirmExit: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div>
      <button onClick={handleTryExit}>모달 오픈</button>
    </div>
  );
};

export default TestPage;

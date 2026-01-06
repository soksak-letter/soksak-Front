import BackHeader from '@/components/common/headers/BackHeader';
import useCountdown from '@/hooks/useCountdown';
import { useModalStore } from '@/stores/modalStore';
import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DAY_MS = 1000;

const AnonDraftPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const startAtRef = useRef<number>(Date.now());
  const deadlineMs = useMemo(() => startAtRef.current + DAY_MS, []);

  const { isExpired, mmss } = useCountdown(deadlineMs);

  const handleBack = () => {
    if (isExpired) {
      openModal('exitConfirm', {
        onConfirmExit: () => navigate(-1),
      });
      return;
    }
    navigate(-1);
  };

  return (
    <>
      <BackHeader
        title='타인에게 보내는 편지'
        rightElement={<button>꾸미기</button>}
        onBack={handleBack}
      />
      <div>
        <p>
          당신의 인생에 가장 큰 영감을
          <br />
          주는 사람은 누구인가요?
        </p>
        <div>{mmss} 후에 질문이 사라져요.</div>
      </div>
    </>
  );
};

export default AnonDraftPage;

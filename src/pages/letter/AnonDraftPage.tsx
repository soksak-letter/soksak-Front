import BackHeader from '@/components/common/headers/BackHeader';
import LetterTextBox from '@/components/LetterTextBox';
import useCountdown from '@/hooks/useCountdown';
import { useModalStore } from '@/stores/modalStore';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DAY_MS = 24 * 60 * 60 * 1000;

const AnonDraftPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const [letter, setLetter] = useState({
    title: '',
    content: '',
  });

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
    <div className='flex flex-col'>
      <BackHeader
        title='타인에게 보내는 편지'
        rightElement={<button>꾸미기</button>}
        onBack={handleBack}
      />
      <div className='flex flex-col items-start p-5 gap-3'>
        <p className='text-black font-medium text-[20px] leading-[120%] w-[251px]'>
          당신의 인생에 가장 큰 영감을
          <br />
          주는 사람은 누구인가요?
        </p>
        <div className='flex items-center text-[16px] leading-[160%] font-semibold'>
          <span className='text-[#F2261C]'>{mmss}</span>
          <span className='text-black ml-1'>후에 질문이 사라져요.</span>
        </div>
      </div>
      <div className='px-4'>
        <LetterTextBox value={letter} onChange={setLetter} className='w-[343px] h-[394px]' />
      </div>
    </div>
  );
};

export default AnonDraftPage;

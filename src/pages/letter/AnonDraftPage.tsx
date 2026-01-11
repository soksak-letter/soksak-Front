import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import useCountdown from '@/hooks/useCountdown';
import { useModalStore } from '@/stores/modalStore';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DAY_MS = 60 * 1000;

const AnonDraftPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const [letter, setLetter] = useState({
    title: '',
    content: '',
  });
  const [isPublic, setIsPublic] = useState(false);

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

  // TODO:
  // 1. title 최소/최대 글자 수 조건 확인
  // 2. content 최소/최대 글자 수 조건 확인
  // 3. 조건 안 맞으면 토스트/에러 처리
  const handleSubmit = () => {
    navigate('/letter/anon/decorate', {
      state: {
        title: letter.title,
        content: letter.content,
      },
    });
  };

  return (
    <div className='flex flex-col'>
      <BackHeader
        title='타인에게 보내는 편지'
        rightElement={
          <button type='button' onClick={handleSubmit}>
            꾸미기
          </button>
        }
        onBack={handleBack}
      />
      <div className='flex flex-col items-start p-5 -mt-3 gap-2'>
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
      <div className='flex items-center justify-end p-5 -mt-3 gap-2'>
        <span className='text-[var(--color-text-normal)] text-[14px] font-medium'>
          오늘 하루 동안 편지 공개하기
        </span>
        <ToggleSwitch checked={isPublic} onCheckedChange={setIsPublic} />
      </div>
      <p className='flex p-5 text-[12px] text-[var(--color-text-assistive)] leading-[160%] font-medium'>
        비방의 언어가 담기면 자동으로 필터링 돼요.
        <br />
        상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
      </p>
    </div>
  );
};

export default AnonDraftPage;

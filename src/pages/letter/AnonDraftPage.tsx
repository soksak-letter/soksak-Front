import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import ToastPopup, { type ToastPopupProps } from '@/components/ToastPopup';
import useCountdown from '@/hooks/useCountdown';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ToastState = null | Pick<ToastPopupProps, 'status' | 'message'>;
const DAY_MS = 24 * 60 * 60 * 1000;

const LIMIT = {
  TITLE: { MIN: 3, MAX: 20 },
  CONTENT: { MIN: 1, MAX: 500 },
} as const;

const AnonDraftPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const [letter, setLetter] = useState({
    title: '',
    content: '',
  });
  const [isPublic, setIsPublic] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const startAtRef = useRef<number>(Date.now());
  const deadlineMs = useMemo(() => startAtRef.current + DAY_MS, []);
  const toastTimerRef = useRef<number | null>(null);
  const toastClearRef = useRef<number | null>(null);

  const { isExpired, mmss } = useCountdown(deadlineMs);

  const clearToastTimers = () => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    if (toastClearRef.current) {
      window.clearTimeout(toastClearRef.current);
      toastClearRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearToastTimers();
  }, []);

  const showToast = (message: string, status: 'error' | 'success' = 'error') => {
    setToast({ message, status });
    setToastVisible(true);

    clearToastTimers();

    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false); // 애니메이션 먼저
      toastClearRef.current = window.setTimeout(() => setToast(null), 300); // 애니메이션 끝나고 제거
    }, 3000);
  };

  const validate = (title: string, content: string) => {
    if (title.length < LIMIT.TITLE.MIN) return `제목을 ${LIMIT.TITLE.MIN}자 이상 입력해주세요.`;
    if (title.length > LIMIT.TITLE.MAX)
      return `제목은 최대 ${LIMIT.TITLE.MAX}자까지 입력할 수 있어요.`;
    if (content.length < LIMIT.CONTENT.MIN) return '내용을 작성해 주세요!';
    if (content.length > LIMIT.CONTENT.MAX)
      return `내용은 최대 ${LIMIT.CONTENT.MAX}자까지 입력할 수 있어요.`;

    return null;
  };

  const handleBack = () => {
    if (isExpired) {
      openModal('exitConfirm', {
        onConfirmExit: () => navigate(-1),
      });
      return;
    }
    navigate(-1);
  };

  const handleSubmit = () => {
    const title = letter.title.trim();
    const content = letter.content.trim();
    const errorMsg = validate(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    navigate('/letter/anon/decorate', {
      state: {
        title,
        content,
      },
    });
  };

  return (
    <div className='relative flex flex-col'>
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
      {toast && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]'>
          <ToastPopup
            status={toast.status}
            message={toast.message}
            visible={toastVisible}
            onClose={() => {
              clearToastTimers();
              setToastVisible(false);
              toastClearRef.current = window.setTimeout(() => setToast(null), 300);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnonDraftPage;

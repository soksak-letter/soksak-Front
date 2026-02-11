import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModalStore } from '@/stores/modalStore';
import useCountdown from '@/hooks/auth/useCountdown';
import { MdCalendarToday } from 'react-icons/md';

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import SurpriseLetterContent from '@/components/BottomSheet/contents/SurpriseLetterContent';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useLetterStore } from '@/stores/letterStore';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import LoadingPage from '../system/LoadingPage';
import { validateLetter } from '@/utils/validateLetter';

type DateValue = { year: number; month: number; day: number };

const SelfDraftPage = () => {
  const { data, isLoading, isError, error } = useDailyQuestion();

  const setActiveTarget = useLetterStore((s) => s.setActiveTarget);
  const draft = useLetterStore((s) => s.getDraft());
  const patchDraft = useLetterStore((s) => s.patchDraft);
  const resetCurrent = useLetterStore((s) => s.resetCurrent);

  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();

  // 페이지 진입 시 target 세팅
  useEffect(() => {
    setActiveTarget('self');
  }, [setActiveTarget]);

  // 데이트 피커 바텀시트 상태
  const [isOpen, setIsOpen] = useState(false);

  const [pickedDate, setPickedDate] = useState<DateValue>(() => {
    // store에 저장된 값이 있으면 그걸 우선 사용
    if (draft.deliverAtDate) return draft.deliverAtDate;

    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
  });

  // picked date 저장
  useEffect(() => {
    patchDraft({ deliverAtDate: pickedDate });
  }, [pickedDate, patchDraft]);

  const openSheet = () => {
    setIsOpen(true);
  };
  const closeSheet = () => setIsOpen(false);

  const label = `${pickedDate.year}.${pickedDate.month + 1}.${pickedDate.day}`;

  const handleSelectionChange = useCallback(
    (selection: {
      type: 'surprise' | 'manual';
      period?: '3days' | '1week' | '1month' | '3months' | '6months' | '1year';
      date?: { month: number; day: number; year: number };
    }) => {
      const now = new Date();

      if (selection.type === 'surprise' && selection.period) {
        const d = new Date(now);

        const addDays = (n: number) => d.setDate(d.getDate() + n);
        switch (selection.period) {
          case '3days':
            addDays(3);
            break;
          case '1week':
            addDays(7);
            break;
          case '1month':
            d.setMonth(d.getMonth() + 1);
            break;
          case '3months':
            d.setMonth(d.getMonth() + 3);
            break;
          case '6months':
            d.setMonth(d.getMonth() + 6);
            break;
          case '1year':
            d.setFullYear(d.getFullYear() + 1);
            break;
        }

        setPickedDate({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate() });
        return;
      }

      if (selection.type === 'manual' && selection.date) {
        setPickedDate({
          year: selection.date.year,
          month: selection.date.month, // DatePickerWheel은 0-based
          day: selection.date.day,
        });
      }
    },
    [setPickedDate], // setState는 안정적이라 사실 deps 비워도 되지만 이렇게 써도 OK
  );

  // 질문 유지 시간 계산
  const deadlineMs = useMemo(() => {
    if (!data?.expiredAt) return null;
    const t = new Date(data.expiredAt).getTime();
    return Number.isNaN(t) ? null : t;
  }, [data?.expiredAt]);

  // deadlineMs가 아직 로딩되지 않은 경우 Date.now()를 그대로 전달하면
  // countdown이 즉시 만료된 것으로 판단될 수 있다.
  // 이를 방지하기 위해 로딩 중에는 1분의 여유 시간을 둔다.
  const { isExpired, mmss } = useCountdown(deadlineMs ?? Date.now() + 60000);

  const handleBack = () => {
    if (isExpired) {
      openModal('exitConfirm', { onConfirmExit: () => navigate(-1) });
      return;
    }

    const hasSomething = draft.title.trim().length > 0 || draft.content.trim().length > 0;

    if (!hasSomething) {
      navigate(-1);
      return;
    }

    openModal('storageConfirm', {
      onExit: () => {
        resetCurrent();
        navigate(-1);
      },
      onConfirmStorage: async () => {
        showToast('임시저장 되었습니다!', 'success');
        navigate(-1);
      },
    });
  };

  const handleSubmit = () => {
    const title = draft.title.trim();
    const content = draft.content.trim();
    const errorMsg = validateLetter(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    navigate('/letter/self/decorate');
  };

  // questionId 저장
  useEffect(() => {
    if (!data?.id) return;

    if (draft.questionId == null) patchDraft({ questionId: data.id });
  }, [data?.id, draft.questionId, patchDraft]);

  const handled = useRef(false);

  // questionId 관련 처리
  useEffect(() => {
    if (!isError || handled.current) return;
    handled.current = true;

    const message =
      (error as { reason?: string })?.reason ||
      (error as Error)?.message ||
      '네트워크 연결을 확인해주세요.';

    showToast(message, 'error');

    const id = window.setTimeout(() => {
      navigate('/home/main', { replace: true });
    }, 3000);

    return () => window.clearTimeout(id);
  }, [isError, error, navigate, showToast]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const formattedQuestionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  return (
    <div className='flex flex-col'>
      <BackHeader
        title='나에게 보내는 편지'
        rightElement={
          <button type='submit' onClick={handleSubmit}>
            꾸미기
          </button>
        }
        onBack={handleBack}
      />
      <div className='flex flex-col items-start p-5 -mt-3 gap-2'>
        <>
          <p className='text-[var(--color-primary-heavy)] ty-title2 w-[251px] whitespace-pre-line'>
            {formattedQuestionText}
          </p>
          <div className='flex items-center ty-body2'>
            <span className='text-[var(--color-primary-500)]'>{mmss}</span>
            <span className='text-[var(--color-primary-heavy)] ml-1'>후에 질문이 사라져요.</span>
          </div>
        </>
      </div>

      <div className='flex items-center justify-end p-5 -mt-7 gap-1'>
        <button
          type='button'
          className='flex items-center gap-1 border-0 bg-transparent p-0'
          onClick={openSheet}
        >
          <span className='text-[var(--color-text-alternative)] ty-body5'>{label}에 받을게요.</span>
          <MdCalendarToday className='text-[var(--color-status-caution)]' />
        </button>
        {isOpen && (
          <BottomSheet isOpen={isOpen} onClose={closeSheet}>
            <SurpriseLetterContent onSelectionChange={handleSelectionChange} />
          </BottomSheet>
        )}
      </div>

      <div className='px-4'>
        <LetterTextBox
          value={{ title: draft.title, content: draft.content }}
          onChange={(next) => patchDraft({ title: next.title, content: next.content })}
          className='w-[343px] h-[394px]'
        />
      </div>
      <div className='flex items-center justify-end p-5 -mt-5 gap-2'>
        <span className='text-[var(--color-text-normal)] ty-body5'>
          오늘 하루 동안 편지 공개하기
        </span>
        <ToggleSwitch
          checked={draft.isPublic}
          onCheckedChange={(v) => patchDraft({ isPublic: v })}
        />
      </div>
      <p className='flex p-5 -mt-3 ty-detailMedium text-[var(--color-text-assistive)]'>
        비방의 언어가 담기면 자동으로 필터링 돼요.
        <br />
        상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
      </p>
    </div>
  );
};

export default SelfDraftPage;

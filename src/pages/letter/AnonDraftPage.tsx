import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';

import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import useCountdown from '@/hooks/auth/useCountdown';
import { useLetterStore } from '@/stores/letterStore';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DraftSkeleton from '@/components/skeleton/DraftSkeleton';
import { validateLetter } from '@/utils/validateLetter';

const AnonDraftPage = () => {
  const { data, isLoading, isError, error } = useDailyQuestion();

  const setActiveTarget = useLetterStore((s) => s.setActiveTarget);
  const draft = useLetterStore((s) => s.getDraft());
  const patchDraft = useLetterStore((s) => s.patchDraft);

  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();

  // 페이지 진입 시 target 세팅
  useEffect(() => {
    setActiveTarget('anon');
  }, [setActiveTarget]);

  const deadlineMs = useMemo(() => {
    if (!data?.expiredAt) return null;
    const t = new Date(data.expiredAt).getTime();
    return Number.isNaN(t) ? null : t;
  }, [data?.expiredAt]);

  const { isExpired, formattedTime } = useCountdown(deadlineMs ?? Date.now());

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
    const title = draft.title.trim();
    const content = draft.content.trim();
    const errorMsg = validateLetter(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    navigate('/letter/anon/decorate');
  };

  // questionId 저장
  useEffect(() => {
    if (!data?.id) return;

    if (draft.questionId == null) patchDraft({ questionId: data.id });
  }, [data?.id, draft.questionId, patchDraft]);

  const handled = useRef(false);

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

  const formattedQuestionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  if (isLoading) return <DraftSkeleton title='타인에게 보내는 편지' />;

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
        <p className='text-[var(--color-primary-heavy)] ty-title2 w-[251px] whitespace-pre-line'>
          {formattedQuestionText}
        </p>
        <div className='flex items-center ty-body2'>
          <span className='text-[var(--color-primary-500)]'>{formattedTime}</span>
          <span className='text-[var(--color-primary-heavy)] ml-1'>후에 질문이 사라져요.</span>
        </div>
      </div>

      <div className='px-4'>
        <LetterTextBox
          value={{ title: draft.title, content: draft.content }}
          onChange={(next) => patchDraft({ title: next.title, content: next.content })}
          className='w-[343px] h-[394px]'
        />
      </div>
      <div className='flex items-center justify-end p-5 -mt-3 gap-2'>
        <span className='text-[var(--color-text-normal)] ty-body5'>
          오늘 하루 동안 편지 공개하기
        </span>
        <ToggleSwitch
          checked={draft.isPublic}
          onCheckedChange={(v) => patchDraft({ isPublic: v })}
        />
      </div>
      <p className='flex p-5 text-[var(--color-text-assistive)] ty-detailMedium'>
        비방의 언어가 담기면 자동으로 필터링 돼요.
        <br />
        상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
      </p>
    </div>
  );
};

export default AnonDraftPage;

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import useCountdown from '@/hooks/useCountdown';
import { useLetterDraftStore } from '@/stores/letterDraftStore';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LIMIT = {
  TITLE: { MIN: 3, MAX: 20 },
  CONTENT: { MIN: 1, MAX: 500 },
} as const;

const AnonDraftPage = () => {
  const { draft, patch } = useLetterDraftStore(); // TODO : 추후 셀렉터로 렌더 최적화
  const { data, isLoading, isError, error } = useDailyQuestion();
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();

  const deadlineMs = useMemo(() => {
    if (!data?.expiredAt) return null;
    const t = new Date(data.expiredAt).getTime();
    return Number.isNaN(t) ? null : t;
  }, [data?.expiredAt]);

  const { isExpired, mmss } = useCountdown(deadlineMs ?? Date.now());

  const handleBack = () => {
    if (isExpired) {
      openModal('exitConfirm', {
        onConfirmExit: () => navigate(-1),
      });
      return;
    }
    navigate(-1);
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

  const handled = useRef(false);

  // questionId 저장
  useEffect(() => {
    if (!data?.id) return;

    if (draft.questionId == null) patch({ questionId: data.id });
  }, [data?.id, draft.questionId, patch]);

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

  const handleSubmit = () => {
    const title = draft.title.trim();
    const content = draft.content.trim();
    const errorMsg = validate(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    navigate('/letter/anon/decorate');
  };

  const questionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

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
        {isLoading ? (
          <>
            {/* 질문 스켈레톤 */}
            <div className='h-6 w-[260px] rounded bg-gray-200 animate-pulse' />
            <div className='h-6 w-[210px] rounded bg-gray-200 animate-pulse' />

            {/* 타이머 스켈레톤 */}
            <div className='h-4 w-[160px] rounded bg-gray-200 animate-pulse mt-2' />
          </>
        ) : (
          <>
            <p className='text-black ty-title2 w-[251px] whitespace-pre-line'>{questionText}</p>
            <div className='flex items-center ty-body2'>
              <span className='text-[#F2261C]'>{mmss}</span>
              <span className='text-black ml-1'>후에 질문이 사라져요.</span>
            </div>
          </>
        )}
      </div>
      <div className='px-4'>
        <LetterTextBox
          value={{ title: draft.title, content: draft.content }}
          onChange={(next) => patch({ title: next.title, content: next.content })}
          className='w-[343px] h-[394px]'
        />
      </div>
      <div className='flex items-center justify-end p-5 -mt-3 gap-2'>
        <span className='text-[var(--color-text-normal)] ty-body5'>
          오늘 하루 동안 편지 공개하기
        </span>
        <ToggleSwitch checked={draft.isPublic} onCheckedChange={(v) => patch({ isPublic: v })} />
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

import { useLocation, useNavigate } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import DailyQuestionBox from '@/components/letters/DailyQuestionBox';

import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import { useLetterStore } from '@/stores/letterStore';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useEffect } from 'react';

const LIMIT = {
  TITLE: { MIN: 3, MAX: 20 },
  CONTENT: { MIN: 1, MAX: 500 },
} as const;

const OtherDraftPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { draft, patchDraft, resetAll } = useLetterStore();
  const { data, isLoading, isError, refetch } = useDailyQuestion();
  const { showToast } = useGlobalToast();

  const senderName = (location.state as { senderName?: string } | null)?.senderName ?? '익명';

  // TODO : 남은 편지 횟수 처리 필요
  const letterLeft = 4;

  const validate = (title: string, content: string) => {
    if (title.length < LIMIT.TITLE.MIN) return `제목을 ${LIMIT.TITLE.MIN}자 이상 입력해주세요.`;
    if (title.length > LIMIT.TITLE.MAX)
      return `제목은 최대 ${LIMIT.TITLE.MAX}자까지 입력할 수 있어요.`;
    if (content.length < LIMIT.CONTENT.MIN) return '내용을 작성해 주세요!';
    if (content.length > LIMIT.CONTENT.MAX)
      return `내용은 최대 ${LIMIT.CONTENT.MAX}자까지 입력할 수 있어요.`;

    return null;
  };

  // questionId 저장
  useEffect(() => {
    const newId = data?.id;
    if (!newId) return;

    if (draft.questionId !== newId) {
      patchDraft({ questionId: newId });
    }
  }, [data?.id, draft.questionId, patchDraft]);

  const handleSubmit = () => {
    if (isLoading) {
      showToast('질문을 불러오는 중이에요. 잠시만 기다려주세요.', 'error');
      return;
    }

    const questionId = data?.id;
    if (isError || !questionId) {
      showToast('질문을 불러오지 못했어요. 다시 시도해주세요.', 'error');
      return;
    }

    const title = draft.title.trim();
    const content = draft.content.trim();
    const errorMsg = validate(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    patchDraft({ questionId });

    navigate('/letter/anon/decorate');
  };

  const handleBack = () => {
    resetAll();
    navigate(-1);
  };

  const formattedQuestionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  const questionNode = isLoading ? (
    <DailyQuestionBox
      Icon={BsQuestionCircleFill}
      question='질문을 불러오는 중...'
      iconClassName='text-(--color-primary-500)'
      bubbleBgColor='var(--color-grey-100)'
      bubbleTextStyle='text-(--color-text-normal)'
    />
  ) : isError ? (
    <div className='w-full rounded-xl bg-(--color-grey-100) p-4'>
      <p className='ty-body5 text-(--color-text-normal)'>질문을 불러오지 못했어요.</p>
      <button
        type='button'
        className='mt-2 ty-body5 font-medium text-(--color-primary-500)'
        onClick={() => refetch()}
      >
        다시 시도
      </button>
    </div>
  ) : (
    <DailyQuestionBox
      Icon={BsQuestionCircleFill}
      question={formattedQuestionText}
      iconClassName='text-(--color-primary-500)'
      bubbleBgColor='var(--color-grey-100)'
      bubbleTextStyle='ty-body5 text-(--color-text-normal)'
    />
  );

  return (
    <div className='flex flex-col'>
      <BackHeader
        title={`${senderName}에게 보내는 편지`}
        rightElement={
          <button type='submit' onClick={handleSubmit}>
            꾸미기
          </button>
        }
        onBack={handleBack}
      />
      <div className='flex flex-col items-start p-4 -mt-3 gap-3'>
        <div className='text-[18px] font-semibold leading-[160%]'>
          <span className='text-black'>우리에게 남은 편지 횟수는 </span>
          <span className='text-[var(--color-primary-500)]'>{letterLeft}회</span>
        </div>
        {/* daily question */}
        {questionNode}
        <div>
          <LetterTextBox
            value={{ title: draft.title, content: draft.content }}
            onChange={(next) => patchDraft(next)}
            className='w-[343px] h-[394px]'
          />
        </div>
        <div className='w-full flex items-center justify-end -mt-3 gap-2'>
          <span className='text-(--color-text-normal) ty-body5'>오늘 하루 동안 편지 공개하기</span>
          <ToggleSwitch
            checked={draft.isPublic}
            onCheckedChange={(v) => patchDraft({ isPublic: v })}
          />
        </div>
        <p className='ty-detailMedium text-(--color-text-assistive)'>
          비방의 언어가 담기면 자동으로 필터링 돼요.
          <br />
          상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
        </p>
      </div>
    </div>
  );
};

export default OtherDraftPage;

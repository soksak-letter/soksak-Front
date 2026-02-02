import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import DailyQuestionBox from '@/components/letters/DailyQuestionBox';

import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import { useLetterStore } from '@/stores/letterStore';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useEffect } from 'react';
import LoadingPage from '../system/LoadingPage';
import { Button } from '@/components/common/Button';
import { useThreadFlowStore } from '@/stores/letterContext';
import { validateLetter } from '@/utils/validateLetter';

const OtherDraftPage = () => {
  const { data, isLoading, isError, refetch } = useDailyQuestion();

  const setActiveTarget = useLetterStore((s) => s.setActiveTarget);
  const draft = useLetterStore((s) => s.getDraft());
  const patchDraft = useLetterStore((s) => s.patchDraft);

  const { showToast } = useGlobalToast();
  const navigate = useNavigate();

  // 페이지 진입 시 target 세팅
  useEffect(() => {
    setActiveTarget('other');
  }, [setActiveTarget]);

  // SenderName 불러오기
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';

  // TODO : 남은 편지 횟수 처리 필요
  const letterLeft = 4;

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
    const errorMsg = validateLetter(title, content);

    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    patchDraft({ questionId });

    navigate('/letter/other/decorate');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formattedQuestionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className='min-h-dvh bg-[var(--color-bg-500)]'>
        <BackHeader title={`${senderName}에게 보내는 편지`} onBack={handleBack} />
        <div className='flex flex-col items-center justify-center gap-8 py-30 text-center px-5'>
          <p className='ty-title3'>질문을 불러오지 못했어요.</p>
          <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

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
        <div className='ty-title3'>
          <span className='text-black'>우리에게 남은 편지 횟수는 </span>
          <span className='text-[var(--color-primary-500)]'>{letterLeft}회</span>
        </div>
        {/* daily question */}
        <DailyQuestionBox
          Icon={BsQuestionCircleFill}
          question={formattedQuestionText}
          iconClassName='text-[var(--color-primary-500)]'
          bubbleBgColor='var(--color-grey-100)'
          bubbleTextStyle='ty-body5 text-[var(--color-text-normal)]'
        />

        <LetterTextBox
          value={{ title: draft.title, content: draft.content }}
          onChange={(next) => patchDraft(next)}
          className='w-[343px] h-[394px]'
        />

        <div className='w-full flex items-center justify-end -mt-3 gap-2'>
          <span className='text-[var(--color-text-normal)] ty-body5'>
            오늘 하루 동안 편지 공개하기
          </span>
          <ToggleSwitch
            checked={draft.isPublic}
            onCheckedChange={(v) => patchDraft({ isPublic: v })}
          />
        </div>

        <p className='ty-detailMedium text-[var(--color-text-assistive)]'>
          비방의 언어가 담기면 자동으로 필터링 돼요.
          <br />
          상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
        </p>
      </div>
    </div>
  );
};

export default OtherDraftPage;

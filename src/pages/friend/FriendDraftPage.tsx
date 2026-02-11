import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';

import { BsQuestionCircle } from 'react-icons/bs';
import LetterTextBox from '@/components/letters/LetterTextBox';
import DailyQuestionBox from '@/components/letters/DailyQuestionBox';
import { useLetterStore } from '@/stores/letterStore';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import DraftSkeleton from '@/components/skeleton/DraftSkeleton';
import { Button } from '@/components/common/Button';
import { validateLetter } from '@/utils/validateLetter';
import { useModalStore } from '@/stores/modalStore';

export default function FriendDraftPage() {
  const { data, isLoading, isError, refetch } = useDailyQuestion();

  const setActiveTarget = useLetterStore((s) => s.setActiveTarget);
  const draft = useLetterStore((s) => s.getDraft());
  const patchDraft = useLetterStore((s) => s.patchDraft);
  const resetCurrent = useLetterStore((s) => s.resetCurrent);

  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();
  const navigate = useNavigate();

  // 페이지 진입 시 target 세팅
  useEffect(() => {
    setActiveTarget('friend');
  }, [setActiveTarget]);

  // friendId, friendName 가져오기
  const location = useLocation();
  const headerTitle = `${friendName ?? ''}에게 보내는 편지`;
  const { friendId, friendName } = (location.state ?? {}) as {
    friendId?: number;
    friendName?: string;
  };

  useEffect(() => {
    setActiveTarget('friend');

    if (typeof friendId === 'number' && Number.isFinite(friendId) && friendId > 0) {
      patchDraft({ receiverUserId: friendId });
    }
  }, [setActiveTarget, patchDraft, friendId]);

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

    navigate('/letter/friend/decorate', {
      state: { friendName },
    });
  };

  const handleBack = () => {
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

  const formattedQuestionText = (data?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  if (isLoading) {
    return <DraftSkeleton title={headerTitle} />;
  }
  if (isError) {
    return (
      <div className='min-h-dvh bg-[var(--color-bg-500)]'>
        <BackHeader title={headerTitle} onBack={handleBack} />
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
        title={headerTitle}
        rightElement={
          <button type='submit' onClick={handleSubmit}>
            꾸미기
          </button>
        }
        onBack={handleBack}
      />
      <div className='flex flex-col items-start p-5 -mt-3 gap-3'>
        <DailyQuestionBox
          question={formattedQuestionText}
          Icon={BsQuestionCircle}
          iconClassName='text-[var(--color-text-assistive)]'
          bubbleBgColor='#414141'
          bubbleTextStyle='var(--color-white)'
        />
      </div>
      <div className='px-4'>
        <LetterTextBox
          value={{ title: draft.title, content: draft.content }}
          onChange={(next) => patchDraft(next)}
          className='w-[343px] h-[394px]'
        />{' '}
      </div>
      <div className='flex items-center justify-end p-5 -mt-5 gap-2'>
        <span className='ty-body5 text-[var(--color-text-normal)]'>
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
}

import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useEffect, useMemo } from 'react';
import { useModalStore } from '@/stores/modalStore';
import ToastPopup from '@/components/ToastPopup';
import { useLetterStore } from '@/stores/letterStore';
import { useCreateLetter } from '@/hooks/letters/useCreateLetter';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import type { CreateLetterBody } from '@/types/dto/sendLetter';

type Target = 'anon' | 'other' | 'self' | 'friend';

const LetterSendingPage = () => {
  const { pathname } = useLocation();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { target } = useParams<{ target?: string }>();

  const createLetterMutation = useCreateLetter();
  const { draft, style, resetAll } = useLetterStore();

  const { showToast } = useGlobalToast();

  // 이것도 letterStore에 ...
  const isFriendSending = pathname.includes('/letter/friend/sending');

  const safeMode: Target | null = useMemo(() => {
    return ['anon', 'other', 'self', 'friend'].includes(target ?? '') ? (target as Target) : null;
  }, [target]);

  const payload: CreateLetterBody | null = useMemo(() => {
    // 필수값 누락시 아예 null -> 전송 못하도록
    if (!style.fontId || !style.paperId || !style.stampId) {
      return null;
    }
    return {
      questionId: draft.questionId,
      title: draft.title,
      content: draft.content,
      isPublic: draft.isPublic,
      paperId: style.paperId,
      fontId: style.fontId,
      stampId: style.stampId,
      receiverUserId: 1, // TODO : receiverUserId 어떻게 받아오는지 확인 필요
    };
  }, [draft, style]);

  // 잘못된 접근 방어 (URL로 직접 접근, 꾸미기/작성 흐름 없이 들어온 경우)
  useEffect(() => {
    if (!safeMode) {
      navigate('/error/404', { replace: true });
      return;
    }
    if (!payload) {
      navigate(`/letter/${safeMode}/draft`, { replace: true });
    }
  }, [safeMode, payload, navigate]);

  // POST 실행 및 분기
  useEffect(() => {
    if (!safeMode || !payload) return;

    let cancelled = false;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  }, []);

  const getTargetText = () => {
    if (pathname.includes('/letter/other/sending') || pathname.includes('/letter/anon/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          누군가에게 전달되고 있어요.
        </>
      );
    }
    if (pathname.includes('/letter/self/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          미래의 {sender}님에게 전달되고 있어요.
        </>
      );
    }
    if (pathname.includes('/letter/friend/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          {receiver}님에게 전달되고 있어요.
        </>
      );
    }
    return (
      <>
        {sender}님의 소중한 편지가
        <br />
        누군가에게 전달되고 있어요.
      </>
    );
  };

  const TargetText = getTargetText();
  if (!safeMode || !payload) return null;

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-dvh'>
      <p className='ty-title2 text-center'>{TargetText}</p>
      <LetterEnvelope
        paperColor={testPapers[1].color}
        stampSrc={testStamps[0].src}
        stampAlt='우표 이미지'
        className='-rotate-4 shadow-lg'
      />
      <p className='ty-body3 text-center'>평균 24시간 이내로 편지에 답장을 받아요.</p>

      {/* 편지 전송 성공 Toast (친구/10회 미만) */}
      {toast && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]'>
          <ToastPopup
            status={toast.status}
            message={toast.message}
            visible={visible}
            onClose={closeToast}
          />
        </div>
      )}
    </div>
  );
};

export default LetterSendingPage;

import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useMemo } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useCreateLetter } from '@/hooks/letters/useCreateLetter';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import type { CreateLetterBody } from '@/types/dto/sendLetter';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';
import { PAPER_ASSET_MAP, DEFAULT_PAPER_ID } from '@/constants/paperAssets';

type Target = 'anon' | 'other' | 'self' | 'friend';

const LetterSendingPage = () => {
  const navigate = useNavigate();
  const { target } = useParams<{ target?: string }>();

  const createLetterMutation = useCreateLetter();
  const { draft, style, resetAll } = useLetterStore();
  const { data } = useLetterStyleOptions();

  const { showToast } = useGlobalToast();

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

    createLetterMutation.mutate(payload, {
      onSuccess: async (res) => {
        if (cancelled) return;

        resetAll();

        // TODO : receiverUserId가 친구인지 확인하는 방법?
        // TODO : isTenTimes 부분도 전역 상태로 관리할 것?
        const isFriendSending = safeMode === 'friend';
        const isTenTimes = isFriendSending ? true : false;

        if (isTenTimes) {
          await delay(3000);
          if (cancelled) return;
          navigate('/friend/sent-transition', { replace: true });
          return;
        }

        showToast('편지를 전송했어요!', 'success');
        await delay(3000);
        if (cancelled) return;
        navigate('/home/main', { replace: true });
      },

      onError: () => {
        if (cancelled) return;
        showToast('편지 전송에 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
        navigate(-1);
      },
    });

    return () => {
      cancelled = true;
    };
  }, [safeMode, payload, createLetterMutation, navigate, resetAll, showToast]);

  const getTargetText = () => {
    // TODO : Mock data 제거
    const sender = '개굴';
    const receiver = '파란수박';

    if (safeMode === 'anon' || safeMode === 'other') {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          누군가에게 전달되고 있어요.
        </>
      );
    }
    if (safeMode === 'self') {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          미래의 {sender}님에게 전달되고 있어요.
        </>
      );
    }
    if (safeMode === 'friend') {
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

  // Deco페이지에서 선택한 꾸미기 요소 계산 로직
  // TODO : Deco 페이지에서도 해당 부분 중복 있어서 추후 분리 고려
  const stamps = data?.stamps ?? [];

  const selectedStamp = stamps.find((s) => s.id === style.stampId);
  const stampUrl = selectedStamp?.assetUrl ?? '';

  const paperAsset =
    (style.paperId != null ? PAPER_ASSET_MAP[style.paperId] : undefined) ??
    PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

  const envelopeColor = paperAsset.envelopeColor;

  const TargetText = getTargetText();
  if (!safeMode || !payload) return null;

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-dvh'>
      <p className='ty-title2 text-center'>{TargetText}</p>
      <LetterEnvelope
        paperColor={envelopeColor}
        stampSrc={stampUrl}
        stampAlt={selectedStamp?.name ?? '우표 이미지'}
        className='-rotate-4 shadow-lg'
      />
      <p className='ty-body3 text-center'>평균 24시간 이내로 편지에 답장을 받아요.</p>
    </div>
  );
};

export default LetterSendingPage;

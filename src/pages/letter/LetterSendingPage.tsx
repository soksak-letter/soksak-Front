import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useMemo, useRef } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useCreateLetter } from '@/hooks/letters/useCreateLetter';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';
import { PAPER_ASSET_MAP, DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import axios from 'axios';
import type { ToastLocationState } from '@/types/toastLocationState';

type Target = 'anon' | 'other' | 'self' | 'friend';

const LetterSendingPage = () => {
  const navigate = useNavigate();
  const { target } = useParams<{ target?: string }>();
  // 중복 POST 방지용
  const hasSentRef = useRef(false);

  const createLetterMutation = useCreateLetter();
  const { draft, style } = useLetterStore();
  const { data } = useLetterStyleOptions();

  const { showToast } = useGlobalToast();

  const safeMode: Target | null = useMemo(() => {
    return ['anon', 'other', 'self', 'friend'].includes(target ?? '') ? (target as Target) : null;
  }, [target]);

  useEffect(() => {}, [target, safeMode]);

  const payload = useMemo(() => {
    if (!safeMode) return null;

    // 필수값 가드
    if (!draft.title || !draft.content) return null;
    if (!style.paperId || !style.fontId || !style.stampId) return null;

    return {
      title: draft.title,
      content: draft.content,
      isPublic: draft.isPublic,

      paperId: style.paperId,
      fontId: style.fontId,
      stampId: style.stampId,

      // 값이 있으면 보내고, 없으면 보내지 않는다
      ...(draft.questionId != null && { questionId: draft.questionId }),
      ...(draft.receiverUserId != null && { receiverUserId: draft.receiverUserId }),
    };
  }, [
    safeMode,
    draft.title,
    draft.content,
    draft.isPublic,
    draft.questionId,
    draft.receiverUserId,
    style.paperId,
    style.fontId,
    style.stampId,
  ]);

  // 잘못된 접근 방어 (URL로 직접 접근, 꾸미기/작성 흐름 없이 들어온 경우)
  useEffect(() => {
    if (!safeMode) {
      navigate('/error/404', { replace: true });
      return;
    }
    if (!payload) {
      if (hasSentRef.current) {
        navigate('/home/main', { replace: true });
      } else {
        navigate(`/letter/${safeMode}/draft`, { replace: true });
      }
    }
  }, [safeMode, payload, navigate]);

  // POST 실행
  useEffect(() => {
    if (!safeMode || !payload) return;
    if (hasSentRef.current) return;

    hasSentRef.current = true;

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    console.log('[Sending] FINAL PAYLOAD :', payload);

    createLetterMutation.mutate(payload, {
      onSuccess: async (res) => {
        console.log('success', res);

        await delay(2000);

        const isTenTimes = safeMode === 'other' ? true : false; // TODO 실제 값으로 교체
        if (isTenTimes) {
          await delay(2000);
          navigate('/friend/sent-transition', { replace: true });
          return;
        }

        navigate('/home/main', {
          replace: true,
          state: {
            toast: { status: 'success', message: '편지를 전송했어요!' },
          } satisfies ToastLocationState,
        });
      },

      onError: async (err) => {
        if (axios.isAxiosError(err)) await delay(2000);
        showToast('편지 전송에 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
        navigate(-1);
      },
    });
  }, [safeMode, payload, createLetterMutation, navigate, showToast]);

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

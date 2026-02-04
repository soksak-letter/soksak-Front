import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useMemo, useRef } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useCreateLetter } from '@/hooks/letters/useCreateLetter';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';
import { PAPER_ASSET_MAP, DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import { useCreateSelfLetter } from '@/hooks/letters/useCreateSelfLetter';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import NotFoundPage from '../system/NotFoundPage';

type Target = 'anon' | 'other' | 'self' | 'friend';

const LetterSendingPage = () => {
  const style = useLetterStore((d) => d.getStyle());
  const draft = useLetterStore((s) => s.getDraft());

  const navigate = useNavigate();

  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const sessionId = useThreadFlowStore((s) => s.sessionId);

  const { target } = useParams<{ target?: string }>();
  // 중복 POST 방지용
  const hasSentRef = useRef(false);

  const createLetterMutation = useCreateLetter();
  const createSelfLetterMutation = useCreateSelfLetter();
  const { data } = useLetterStyleOptions();
  const { showToast } = useGlobalToast();

  const safeMode: Target | null = useMemo(() => {
    return ['anon', 'other', 'self', 'friend'].includes(target ?? '') ? (target as Target) : null;
  }, [target]);

  // 공통 base payload
  const basePayload = useMemo(() => {
    if (!safeMode) return null;
    if (!draft.title?.trim() || !draft.content?.trim()) return null;
    if (style.paperId == null || style.fontId == null || style.stampId == null) return null;

    return {
      title: draft.title.trim(),
      content: draft.content.trim(),
      isPublic: draft.isPublic,
      paperId: style.paperId,
      fontId: style.fontId,
      stampId: style.stampId,
      ...(draft.questionId != null && { questionId: draft.questionId }),
    };
  }, [
    safeMode,
    draft.title,
    draft.content,
    draft.isPublic,
    draft.questionId,
    style.paperId,
    style.fontId,
    style.stampId,
  ]);

  // 타인 전송 payload (anon/other/friend)
  const sendPayload = useMemo(() => {
    if (!basePayload) return null;
    if (!safeMode) return null;

    if (safeMode === 'friend') {
      if (draft.receiverUserId == null) return null;
      return { ...basePayload, receiverUserId: draft.receiverUserId };
    }

    if (safeMode === 'anon' || safeMode === 'other') {
      return basePayload;
    }

    return null; // self는 여기 아님
  }, [basePayload, safeMode, draft.receiverUserId]);

  // 나에게 전송할 때 payload
  const selfPayload = useMemo(() => {
    if (!basePayload) return null;
    if (safeMode !== 'self') return null;

    const d = draft.deliverAtDate;
    if (!d) return null;

    // 서버로 보낼 시간 파싱
    const scheduled = new Date(d.year, d.month, d.day, 0, 0, 0, 0).toISOString();

    return { ...basePayload, scheduledAt: scheduled };
  }, [basePayload, safeMode, draft.deliverAtDate]);

  // POST 실행
  useEffect(() => {
    if (!safeMode) return;
    if (hasSentRef.current) return;

    const payloadToUse = safeMode === 'self' ? selfPayload : sendPayload;

    if (!payloadToUse) return;

    hasSentRef.current = true;

    (async () => {
      try {
        const res =
          safeMode === 'self'
            ? await createSelfLetterMutation.mutateAsync(payloadToUse)
            : await createLetterMutation.mutateAsync(payloadToUse);

        console.log('[CreateLetter success response]', res);

        // TODO : 실제 응답/스토어 값으로 교체
        const letterCount = 0; // 임시

        if (letterCount === 10) {
          navigate(`/friend/sent-transition/${sessionId}`, { replace: true });
        } else {
          navigate('/home/main', {
            replace: true,
            state: { toast: { status: 'success', message: '편지를 전송했어요!' } },
          });
        }
      } catch {
        hasSentRef.current = false;
        showToast('편지 전송에 실패했어요.', 'error');
        navigate(-1);
      }
    })();
  }, [
    safeMode,
    selfPayload,
    sendPayload,
    createLetterMutation,
    createSelfLetterMutation,
    navigate,
    showToast,
    sessionId,
  ]);

  // 잘못된 접근 방어 (URL로 직접 접근, 꾸미기/작성 흐름 없이 들어온 경우)
  const needsSessionId = safeMode === 'other';
  const invalid = !safeMode || (needsSessionId && !sessionId);

  if (invalid) {
    return <NotFoundPage />;
  }

  const getTargetText = () => {
    // TODO : Mock data 제거
    const sender = '개굴';

    if (safeMode === 'anon') {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          누군가에게 전달되고 있어요.
        </>
      );
    }
    if (safeMode === 'other') {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          {senderName}님에게 전달되고 있어요.
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
          {senderName}님에게 전달되고 있어요.
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

  const ok = safeMode === 'self' ? selfPayload != null : sendPayload != null;
  if (!safeMode || !ok) return null;

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

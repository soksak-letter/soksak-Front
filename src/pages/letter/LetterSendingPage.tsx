import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useCreateLetter } from '@/hooks/letters/useCreateLetter';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';
import { DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import { useCreateSelfLetter } from '@/hooks/letters/useCreateSelfLetter';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import NotFoundPage from '../system/NotFoundPage';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

type Target = 'anon' | 'other' | 'self' | 'friend';

const LetterSendingPage = () => {
  const style = useLetterStore((d) => d.getStyle());
  const draft = useLetterStore((s) => s.getDraft());

  const navigate = useNavigate();

  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const sessionId = useThreadFlowStore((s) => s.sessionId);
  const letterCount = useThreadFlowStore((s) => s.letterCount) ?? 0;

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

    // 분기별로 payload를 따로 확정해서 타입 좁히기
    if (safeMode === 'self') {
      if (!selfPayload) return;

      hasSentRef.current = true;

      (async () => {
        try {
          const res = await createSelfLetterMutation.mutateAsync(selfPayload);
          console.log('[CreateSelfLetter success response]', res);

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

      return;
    }

    // anon/other/friend
    if (!sendPayload) return;

    hasSentRef.current = true;

    (async () => {
      try {
        const res = await createLetterMutation.mutateAsync(sendPayload);
        console.log('[CreateLetter success response]', res);

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
    letterCount,
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

  // 편지 봉투 불러오기
  const envelopeAsset =
    (style.paperId != null ? ENVELOPE_ASSET_MAP[style.paperId] : undefined) ??
    ENVELOPE_ASSET_MAP[DEFAULT_PAPER_ID];

  const EnvelopePreview = envelopeAsset?.Preview;
  // 우표 불러오기
  const stamps = data?.stamps ?? [];

  const selectedStamp = stamps.find((s) => s.id === style.stampId);
  const stampUrl = selectedStamp?.assetUrl ?? '';

  const TargetText = getTargetText();

  const ok = safeMode === 'self' ? selfPayload != null : sendPayload != null;
  if (!safeMode || !ok) return null;

  return (
    <div className='min-h-dvh flex flex-col items-center justify-center'>
      <p className='ty-title2 text-center'>{TargetText}</p>
      <div className='mt-10 mb-8'>
        <div className='relative w-[360px] h-[270px] -rotate-3'>
          {EnvelopePreview ? (
            <EnvelopePreview className='h-full w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
          ) : (
            <div className='h-full w-full rounded-xl bg-[#F2F2F2] drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
          )}

          {!!stampUrl && (
            <img
              src={stampUrl}
              className='absolute -rotate-5 right-[30px] bottom-[40px] h-[90px] w-[90px] object-contain pointer-events-none'
              draggable={false}
            />
          )}
        </div>
      </div>
      <p className='ty-body3 text-center'>평균 24시간 이내로 편지에 답장을 받아요.</p>
    </div>
  );
};

export default LetterSendingPage;

import { Button } from '@/components/common/Button';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import ToastPopup from '@/components/ToastPopup';
import useToast from '@/hooks/useToast';
import { useEffect, useMemo, useState } from 'react';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import NotFoundPage from '../system/NotFoundPage';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

type SentTransitionLocationState = {
  paperId?: number;
  stampId?: number;
  stampUrl?: string;

  // 필요하면 문구/카운트도 state로 확장 가능
  // totalCount?: number;
};

export default function FriendSentTransitionPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { toast, visible, showToast, closeToast } = useToast();
  const [isRequested, setIsRequested] = useState(false);

  // sessionId: store 우선, 없으면 param fallback (기존 유지)
  const { sessionId: sessionIdParam } = useParams();
  const sessionIdFromStore = useThreadFlowStore((s) => s.sessionId);
  const sessionId = sessionIdFromStore ?? (sessionIdParam ? Number(sessionIdParam) : null);

  // senderName / letterCount: 기존처럼 store 사용
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const letterCount = useThreadFlowStore((s) => s.letterCount) ?? 0;

  // OtherStopPage처럼 봉투/우표는 location.state에서 받기
  const location = useLocation();
  const state = (location.state as SentTransitionLocationState | null) ?? null;

  const paperId = state?.paperId ?? 0;
  const stampUrl = (state?.stampUrl ?? '').trim();

  const EnvelopePreview = useMemo(() => {
    const asset = ENVELOPE_ASSET_MAP[paperId];
    return asset?.Preview;
  }, [paperId]);

  // sessionId 없으면 404로 (OtherStopPage 스타일)
  useEffect(() => {
    if (!sessionId) {
      navigate('/error/404', { replace: true });
    }
  }, [sessionId, navigate]);

  if (!sessionId) return <NotFoundPage />;

  const handleFriendRequest = () => {
    openModal('friendRequest', {
      receiverName: senderName,
      onConfirmFriendRequest: () => {
        setIsRequested(true);
        showToast('친구 신청이 완료되었습니다!', 'success');
      },
    });
  };

  const handleGoToReview = () => {
    navigate(`/letter/review/${sessionId}`);
  };

  return (
    <div className='min-h-dvh px-6 pt-14 pb-28'>
      {/* Header (OtherStopPage 느낌 + 기존 문구 유지) */}
      <header className='flex flex-col justify-start gap-2'>
        <p className='ty-body1 leading-tight'>
          {senderName}님과
          <span className='text-[var(--color-primary-500)]'> {letterCount}회</span>
          의 대화를
          <br />
          모두 나누었어요.
        </p>
        <p className='ty-body5'>인연을 이어가시려면 친구로 추가해주세요.</p>
      </header>

      {/* Envelope + Link (OtherStopPage 동일) */}
      <section className='mt-8 flex flex-col items-center'>
        <div className='relative w-[340px] h-[250px] -rotate-3'>
          {EnvelopePreview ? (
            <EnvelopePreview className='h-full w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
          ) : (
            <div className='h-full w-full rounded-xl bg-[#F2F2F2] drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
          )}

          {!!stampUrl && (
            <img
              src={stampUrl}
              alt=''
              className='absolute -rotate-5 right-[30px] bottom-[40px] h-[90px] w-[90px] object-contain pointer-events-none'
              draggable={false}
            />
          )}
        </div>

        <Link
          to={`/letter/thread/${sessionId}`}
          className='ty-body5 text-[var(--color-text-assistive)] mt-3 underline underline-offset-4'
        >
          우리가 나눴던 대화 다시보기
        </Link>
      </section>

      {/* Buttons (친구 신청 유지 + 후기 남기기) */}
      <section className='mt-15 flex flex-col items-center gap-3'>
        <Button className='w-[343px]' onClick={handleFriendRequest} disabled={isRequested}>
          {isRequested ? '신청 완료' : '친구 신청'}
        </Button>

        <Button className='w-[343px]' color='white' onClick={handleGoToReview}>
          후기 남기기
        </Button>
      </section>

      {/* Toast (기존 유지) */}
      <ToastPopup
        status={toast?.status ?? 'success'}
        message={toast?.message ?? ''}
        visible={visible}
        onClose={closeToast}
      />
    </div>
  );
}

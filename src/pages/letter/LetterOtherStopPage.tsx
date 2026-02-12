import { Button } from '@/components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThreadFlowStore } from '@/stores/letterContextStore';

import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { useEffect } from 'react';

type OtherStopLocationState = {
  totalCount?: number;
  paperId?: number;
  stampId?: number;
  stampUrl?: string;
};

export default function OtherStopPage() {
  const navigate = useNavigate();

  const sessionId = useThreadFlowStore((s) => s.sessionId);
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const letterCount = useThreadFlowStore((l) => l.letterCount) ?? 0;

  const location = useLocation();
  const state = location.state as OtherStopLocationState | null;

  const paperId = state?.paperId ?? 0;
  const stampUrl = (state?.stampUrl ?? '').trim();

  const envelopeAsset = ENVELOPE_ASSET_MAP[paperId];
  const EnvelopePreview = envelopeAsset?.Preview;

  useEffect(() => {
    if (!sessionId) {
      navigate('/error/404', { replace: true });
    }
  }, [sessionId, navigate]);

  const handleGoToReview = () => {
    navigate(`/letter/review/${sessionId}`);
  };

  return (
    <div className='min-h-dvh px-6 pt-14 pb-28'>
      {/* Header */}
      <header className='flex flex-col justify-start gap-2'>
        <p className='ty-body1 leading-tight'>
          {senderName}님과
          <span className='text-[var(--color-primary-500)]'> {letterCount}회</span>
          의 대화를
          <br />
          나누었어요.
        </p>
      </header>

      {/* Envelope + Link */}
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

      <section className='flex flex-col items-center'>
        <div className='mt-[45px] w-full flex flex-col items-center gap-3'>
          <Button className='w-[343px]' onClick={handleGoToReview}>
            후기 남기기
          </Button>
        </div>
      </section>
    </div>
  );
}

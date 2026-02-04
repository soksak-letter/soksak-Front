import { Button } from '@/components/common/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LetterEndedEnvelope from '@/assets/icons/LetterEndedEnvelope.svg?react';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useEffect } from 'react';

export default function OtherStopPage() {
  const navigate = useNavigate();
  const { letterId: letterIdParam } = useParams();
  const letterId = letterIdParam ? Number(letterIdParam) : navigate('/error/404');

  const { showToast } = useGlobalToast();

  const sessionId = useThreadFlowStore((s) => s.sessionId);
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const letterCount = Number(useThreadFlowStore((l) => l.letterCount));

  useEffect(() => {
    if (letterCount == null) {
      showToast('편지를 나눈 횟수를 불러오지 못했어요. 잠시 후 다시 시도해주세요.', 'error');
    }
  }, [letterCount, showToast]);

  const handleGoToReview = () => {
    navigate(`/letter/review/${letterId}`);
  };

  return (
    <div className='min-h-dvh px-6 pt-14 pb-28'>
      {/* Header */}
      <header className='flex flex-col justify-start gap-2'>
        <p className='ty-body1 leading-tight'>
          {senderName}님과
          <span className='text-[var(--color-primary-500)]'>{letterCount}회</span>
          의 대화를
          <br />
          나누었어요.
        </p>
      </header>

      {/* Envelope + Link */}
      <section className='mt-15 flex flex-col items-center'>
        <LetterEndedEnvelope className='block' />
        <Link
          to={`/letter/thread/${sessionId}`}
          className='ty-body5 text-(--color-text-assistive) mt-3 underline underline-offset-4'
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

import { Button } from '@/components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LetterEndedEnvelope from '@/assets/icons/LetterEndedEnvelope.svg?react';

type LocationState = {
  friendName?: string;
  totalCount?: number; // 7
  // 필요하면 friendId/sessionId/letterId 추가
  // friendId?: string;
  // letterId?: string;
};

export default function OtherStopPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const s = (state ?? {}) as LocationState;

  // TODO: 앞 페이지에서 넘겨주는 값으로 교체
  const receiver = s.friendName ?? '파란수박';
  const totalCount = typeof s.totalCount === 'number' ? s.totalCount : 7;

  // TODO: 실제 식별자 있으면 교체
  const letterId = '1';

  const handleGoToReview = () => {
    navigate(`/letter/review/${letterId}`);
  };

  return (
    <div className='min-h-dvh px-6 pt-14 pb-28'>
      {/* Header */}
      <header className='flex flex-col justify-start gap-2'>
        <p className='ty-body1 leading-tight'>
          {receiver}님과 <span className='text-[var(--color-primary-500)]'>{totalCount}회</span>
          의 대화를
          <br />
          나누었어요.
        </p>
      </header>

      {/* Envelope + Link */}
      <section className='mt-15 flex flex-col items-center'>
        <LetterEndedEnvelope className='block' />
        <Link
          to={`/friend/post/${letterId}`}
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

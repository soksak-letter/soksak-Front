import { Button } from '@/components/common/Button';
import LetterEndedEnvelope from '@/assets/icons/LetterEndedEnvelope.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';

export default function FriendSentTransitionPage() {
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  // mock data
  // TODO : 앞 페이지랑 props 연결하기
  const receiver = '파란수박';

  const handleFriendRequest = () => {
    openModal('friendRequest', {
      // TODO : 친구 신청 후 화면 재설정
      onConfirmFriendRequest: () => navigate('/friend/inbox'),
    });
  };

  return (
    <div className='min-h-dvh px-6 pt-14 pb-28'>
      {/* Header */}
      <header className='flex flex-col justify-start gap-2'>
        <p className='ty-body1 leading-tight'>
          {receiver}님과 <span className='text-(--color-primary-500)'>10회</span>의 대화를
          <br />
          모두 나누었어요.
        </p>
        <p className='ty-body3'>인연을 이어가시려면 친구로 추가해주세요.</p>
      </header>

      {/* Envelope + Link */}
      <section className='mt-15 flex flex-col items-center'>
        <LetterEndedEnvelope className='block' />
        <Link
          to={`/friend/post`}
          className='ty-body5 text-(--color-text-assistive) mt-3 underline underline-offset-4'
        >
          우리가 나눴던 대화 다시보기
        </Link>
      </section>

      {/* Buttons */}
      <section className='mt-15 flex flex-col items-center gap-3'>
        <Button className='w-[343px]' onClick={handleFriendRequest}>
          친구 신청
        </Button>
        <Button className='w-[343px]' color='white'>
          후기 남기기
        </Button>
      </section>
    </div>
  );
}

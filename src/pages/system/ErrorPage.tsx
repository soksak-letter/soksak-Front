// 정해진 HTTP 코드가 아닌 예외/라우트 에러/렌더링 에러 전용
import { useNavigate } from 'react-router-dom';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { Button } from '@/components/common/Button';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home/main');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      <SadModalIcon className='mb-6 h-[87px] w-[82px]' />

      <div className='mb-8 text-center'>
        <p className='mb-4 ty-titile2 text-(--color-text-strong)'>문제가 발생했어요.</p>
        <p className='ty-body5 text-(--color-text-strong)'>
          잠시 후 다시 시도해 주세요.
          <br />
          계속되면 메인으로 이동해 주세요.
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <Button color='primary' size='cta150' onClick={handleGoHome}>
          메인으로
        </Button>
      </div>
    </div>
  );
}

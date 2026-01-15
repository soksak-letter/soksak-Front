// 500 전용
import { useNavigate } from 'react-router-dom';

import SleepIcon from '@/assets/icons/SleepIcon.svg?react';
import { Button } from '@/components/common/Button';

export default function ServerErrorPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    // 현재 페이지 새로고침
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      <SleepIcon className='mb-2 ml-3.5 h-[96px] w-[93px]' />

      <div className='mb-8 text-center'>
        <p className='mb-2 ty-titile2 text-(--color-text-strong)'>
          현재 서비스 이용이
          <br /> 원활하지 않습니다.
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <Button color='white' size='cta150' onClick={handleRetry}>
          다시 시도
        </Button>

        <Button color='primary' size='cta150' onClick={handleGoBack}>
          이전으로
        </Button>
      </div>
    </div>
  );
}

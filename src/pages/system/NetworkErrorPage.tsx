// 네트워크 전용
import { useNavigate } from 'react-router-dom';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { Button } from '@/components/common/Button';

export default function NetworkErrorPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    // 네트워크 재연결 시도 → 새로고침
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/home/main');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      <SadModalIcon className='mb-6 h-[87px] w-[82px]' />

      <div className='mb-8 text-center'>
        <p className='mb-4 ty-title2 text-(--color-text-strong)'>네트워크 연결 오류입니다.</p>
        <p className='ty-body5 text-(--color-text-strong)'>
          현재 네트워크에 연결되어 있지 않습니다.
          <br />
          확인 후 다시 시도해주시기 바랍니다.
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <Button color='white' size='cta150' onClick={handleRetry}>
          다시 시도
        </Button>

        <Button color='primary' size='cta150' onClick={handleGoHome}>
          메인으로
        </Button>
      </div>
    </div>
  );
}

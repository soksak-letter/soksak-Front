// 404 전용
import { useNavigate } from 'react-router-dom';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { Button } from '@/components/common/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home/main');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      <SadModalIcon className='mb-6 h-[87px] w-[82px]' />

      <div className='mb-8 text-center'>
        <p className='mb-4 ty-title2 text-(--color-text-strong)'>페이지를 찾을 수 없습니다.</p>
        <p className='ty-body5 text-(--color-text-strong)'>
          요청하신 페이지가 없거나 이동되었어요.
          <br />
          메인으로 이동할까요?
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

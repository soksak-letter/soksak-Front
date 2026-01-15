// 403 전용
import { useNavigate } from 'react-router-dom';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { Button } from '@/components/common/Button';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home/main');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      <SadModalIcon className='mb-6 h-[80px] w-[82px]' />

      <div className='mb-8 text-center'>
        <p className='mb-4 ty-titile2 text-(--color-text-strong)'>접근 권한이 없는 페이지입니다.</p>
        <p className='ty-body5 text-(--color-text-strong)'>
          잘못 들어온 것 같아요. 메인으로 이동할까요?
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

import SleepIcon from '@/assets/icons/SleepIcon.svg?react';
import { LoadingDots } from '@/components/LoadingDots';

export default function LoadingPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white'>
      <LoadingDots fillIntervalMs={350} />

      <SleepIcon className='h-[93px] w-[96px] mt-6 ml-3.5' />

      <p className='mt-4 ty-title2'>로딩 중...</p>
    </div>
  );
}

import { useEffect, useState } from 'react';

import SleepIcon from '@/assets/icons/SleepIcon.svg?react';
import LoadingDot1 from '@/assets/icons/LoadingDot1.svg?react'; // 진한
import LoadingDot2 from '@/assets/icons/LoadingDot2.svg?react'; // 연한

export default function LoadingPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white'>
      <LoadingDots fillIntervalMs={350} />

      <SleepIcon className='mt-6 ml-3.5 h-[93px] w-[96px]' />

      <p className='mt-4 ty-title2'>로딩 중...</p>
    </div>
  );
}

function LoadingDots({ fillIntervalMs = 350 }: { fillIntervalMs?: number }) {
  const [filledCount, setFilledCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFilledCount((prev) => (prev + 1) % 4);
    }, fillIntervalMs);

    return () => window.clearInterval(id);
  }, [fillIntervalMs]);

  return (
    <div className='flex items-center gap-[33px]'>
      <Dot filled={filledCount >= 1} />
      <Dot filled={filledCount >= 2} />
      <Dot filled={filledCount >= 3} />
    </div>
  );
}

function Dot({ filled }: { filled: boolean }) {
  return (
    <span className='inline-flex w-[15px] h-[15px] items-center justify-center'>
      {filled ? <LoadingDot1 /> : <LoadingDot2 />}
    </span>
  );
}

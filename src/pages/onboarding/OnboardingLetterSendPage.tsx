import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MintEnvelope from '@/assets/letter_envelope/Mint.svg?react';
import OnboardingStamp from '@/assets/icons/OnboardingStamp.svg?react';

export default function OnboardingLetterSendPage() {
  const navigate = useNavigate();

  useEffect(() => {
    //   화면 잠깐 보여주고 홈으로 (replace)
    const t = window.setTimeout(() => {
      navigate('/home/main', { replace: true });
    }, 900);

    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div className='flex min-h-dvh flex-col items-center px-5 pt-6 pb-6 bg-[var(--color-bg-500)]'>
      {/* 상단 문구 */}
      <p className='mt-[84px] text-center ty-title2'>
        현재의 내가 3일 뒤의 나에게
        <br />
        편지를 보내고 있어요.
      </p>

      {/* 봉투 영역 */}
      <div className='mt-[56px] flex w-full justify-center'>
        <div className='relative w-[300px] h-[215px] rotate-[-3deg] overflow-visible'>
          <MintEnvelope className='absolute inset-0 w-full h-full' />

          <OnboardingStamp
            className='absolute right-[40px] bottom-[28px] w-[68px] h-[80px] z-10'
            aria-hidden
          />

          {/* 살짝 둥실 효과 */}
          <div className='absolute inset-0 animate-[pulse_1.2s_ease-in-out_infinite] opacity-[0.06]' />
        </div>
      </div>

      <p className='mt-[30px] ty-body3 text-[var(--color-text-assistive)]'>홈으로 이동 중…</p>
    </div>
  );
}

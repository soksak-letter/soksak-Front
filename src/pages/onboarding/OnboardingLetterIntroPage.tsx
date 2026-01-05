import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

export default function OnboardingLetterIntroPage() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6 pb-6'>
      <div className='text-center'>
        <p className='mt-2 text-sm text-[#171717] leading-6'>
          속삭편지에 오신 걸 환영해요!
          <br />
          3일 뒤의 나에게 가볍게 편지를 작성해볼까요?
          <br />
          깜짝 선물처럼 알림을 보내드릴게요.
        </p>

        <p className='mt-5 text-[16px] font-semibold text-[#F5544C]'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </p>
      </div>

      <div className='relative mt-6 flex flex-1 items-center justify-center'>
        <div className='h-[360px] w-[280px] rounded-md bg-[#F7F7F7] shadow-sm' />

        <div className='absolute bottom-4 right-6 flex items-end gap-3'>
          <div className='rounded-xl bg-[#EDEDED] px-4 py-3 text-xs text-[#171717] shadow'>
            <p className='font-semibold'>Tip.</p>
            <p>아주 작은 것도 좋아요,</p>
            <p>달라지고 싶은 한 가지를 떠올려 볼까요?</p>
          </div>
          <HappyModalIcon className='h-[77.5px] w-[80px]' />
        </div>
      </div>

      <button
        type='button'
        className='mb-3 text-center text-xs text-gray-400 underline underline-offset-2'
        onClick={() => navigate('/')}
      >
        건너뛰기
      </button>

      <div className='flex justify-center'>
        <Button color='primary' size='large' onClick={() => navigate('/onboarding/letter-write')}>
          편지 작성하기
        </Button>
      </div>
    </div>
  );
}

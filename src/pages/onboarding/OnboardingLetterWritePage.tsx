import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LetterTextBox from '@/components/letters/LetterTextBox';
import BackHeader from '@/components/common/headers/BackHeader';

type LetterValue = {
  title: string;
  content: string;
};

export default function OnboardingLetterWritePage() {
  const navigate = useNavigate();

  const [value, setValue] = useState<LetterValue>({
    title: '',
    content: '',
  });

  const isTitleValid = value.title.trim().length >= 3;
  const isContentValid = value.content.trim().length > 0;
  const isValid = useMemo(() => isTitleValid && isContentValid, [isTitleValid, isContentValid]);

  const handleNext = () => {
    if (!isValid) return;

    navigate('/onboarding/letter-guide', {
      state: {
        title: value.title.trim(),
        content: value.content.trim(),
      },
    });
  };

  return (
    <div className='flex min-h-dvh flex-col'>
      <BackHeader title='나에게 보내는 편지' />

      <div className='flex flex-1 flex-col px-5 pt-4 pb-6'>
        <h2 className='text-base font-semibold text-[#171717]'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </h2>

        <div className='mt-4 flex-1'>
          <LetterTextBox value={value} onChange={setValue} className='h-[396px]' />
        </div>

        <p className='mt-3 text-[11px] text-gray-400 leading-4'>
          비방의 언어가 담긴 글은 자동으로 필터링 돼요.
          <br />
          상대방에게 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
        </p>

        <div className='mt-auto flex justify-center pt-4'>
          <button
            type='button'
            disabled={!isValid}
            onClick={handleNext}
            className={[
              'h-[48px] w-[343px] rounded-lg text-base font-medium transition',
              isValid ? 'bg-[#F5544C] text-white' : 'bg-[#B1B3B4] text-white',
            ].join(' ')}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}

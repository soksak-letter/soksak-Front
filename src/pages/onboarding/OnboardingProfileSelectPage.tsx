import { useState } from 'react';

import CautionIcon from '@/assets/icons/CautionIcon.svg?react';
import { SelectButton } from '@/components/common/SelectButton';
import { Button } from '@/components/common/Button';

import {
  ONBOARDING_GENDERS,
  ONBOARDING_JOBS,
  type GenderOption,
  type JobOption,
} from '@/constants/onboardingProfile';

import { useModalStore } from '@/stores/modalStore';
import { useNavigate } from 'react-router-dom';

type GenderId = GenderOption['id'];
type JobId = JobOption['id'];

export default function OnboardingProfileSelectPage() {
  const [gender, setGender] = useState<GenderId | null>(null);
  const [job, setJob] = useState<JobId | null>(null);

  const navigate = useNavigate();
  const openModal = useModalStore((s) => s.openModal);

  const isNextEnabled = gender !== null && job !== null;

  const handleNext = () => {
    if (!isNextEnabled) return;
    console.log('gender:', gender, 'job:', job);
    navigate('/onboarding/topic-select');
  };

  const handleSkipOpen = () => {
    openModal('onboardingSkipConfirm', {
      onConfirmSkip: () => {
        navigate('/onboarding/topic-select');
      },
    });
  };

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6'>
      <h1 className='mb-2 ty-title2'>
        <span className='block'>반가워요.</span>
        <span className='block'>당신은 어떤 사람인가요?</span>
      </h1>

      <p className='mb-2 ty-body3'>선택지에 맞는 오늘의 질문을 전달해드립니다.</p>

      <p className='mb-6 flex items-center gap-1.5 text-(--color-text-assistive) ty-detail'>
        <CautionIcon className='h-4 w-4 shrink-0' />
        <span>제공한 정보는 오늘의 질문 개인화를 위해서만 활용됩니다.</span>
      </p>

      <section className='mb-6'>
        <h2 className='mb-3 ty-body2 text-(--color-text-strong)'>성별을 선택해주세요.</h2>
        <div className='flex flex-wrap gap-2'>
          {ONBOARDING_GENDERS.map((opt) => (
            <SelectButton
              key={opt.id}
              size='large'
              selected={gender === opt.id}
              onClick={() => setGender(opt.id)}
            >
              {opt.label}
            </SelectButton>
          ))}
        </div>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 ty-body2 text-(--color-text-strong)'>직업을 선택해주세요.</h2>
        <div className='flex flex-wrap gap-2'>
          {ONBOARDING_JOBS.map((opt) => (
            <SelectButton
              key={opt.id}
              size='large'
              selected={job === opt.id}
              onClick={() => setJob(opt.id)}
            >
              {opt.label}
            </SelectButton>
          ))}
        </div>
      </section>

      <div className='mt-auto mb-6 flex flex-col items-center gap-3'>
        <button
          type='button'
          className='ty-body5 text-(--color-text-assistive) underline underline-offset-2'
          onClick={handleSkipOpen}
        >
          건너뛰기
        </button>

        <Button color='primary' size='large' onClick={handleNext} disabled={!isNextEnabled}>
          다음으로
        </Button>
      </div>
    </div>
  );
}

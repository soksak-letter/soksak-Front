import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import IosNotificationGuideModal from '@/modals/IosNotificationGuideModal';
import { useEffect, useState } from 'react';

import LetterCard from '@/components/letters/LetterCard';
import { PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { FONT_ASSET_MAP } from '@/constants/fontAssets';
import { useLetterStore } from '@/stores/letterStore';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

type LocationState = {
  title?: string;
  content?: string;
};

export default function OnboardingLetterGuidePage() {
  const { state } = useLocation() as { state?: LocationState };
  const navigate = useNavigate();

  // location.state + store fallback
  const { draft, patchDraft } = useLetterStore();
  const title = state?.title ?? draft.title ?? '제목';
  const content = state?.content ?? draft.content ?? '';

  const mintPaperId = 1; //  mint paper 선택
  const PaperBg = PAPER_ASSET_MAP[mintPaperId].Preview;

  const fontId = 3; // TODO: 나눔히피체 추가되면 교체해야 함
  const fontFamily = FONT_ASSET_MAP[fontId].fontFamily;

  useEffect(() => {
    if (state?.title || state?.content) {
      patchDraft({ title: state?.title ?? '', content: state?.content ?? '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    navigate('/onboarding/letter-send', { replace: true });
    console.log({
      question: '3일 뒤, 나는 어떤 모습으로 달라져 있을까요?',
      title,
      content,
    });
  };

  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6 pb-6 bg-[var(--color-bg-500)]'>
      <button
        type='button'
        onClick={() => setIsGuideOpen(true)}
        className='text-right ty-body3 text-(--color-text-assistive) underline underline-offset-2'
      >
        알림 설정 가이드
      </button>

      {isGuideOpen && <IosNotificationGuideModal onClose={() => setIsGuideOpen(false)} />}

      <div className='mt-4 text-center'>
        <p className='mt-2 ty-body3 text-[#000000] leading-6'>
          속삭편지에 오신 걸 환영해요
          <br />
          3일 뒤의 나에게 가볍게 편지를 작성해볼까요?
          <br />
          깜짝 선물처럼 알림을 보내드릴게요.
        </p>

        <p className='mt-[28px] ty-title3 text-(--color-primary-500)'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </p>
      </div>

      <div className='mt-6 flex flex-1 items-center justify-center'>
        <div
          className='relative w-[240px] h-[390px] -translate-y-[40px] flex justify-center [&_.z-10]:translate-y-[20px]
  [&_.z-10]:transform'
        >
          <div
            className='relative'
            style={{
              transform: 'scale(0.775)',
              transformOrigin: 'center',
            }}
          >
            <LetterCard
              PaperBg={PaperBg}
              font={fontFamily}
              value={{ title, content }}
              className={[
                'rotate-[2deg]',
                'drop-shadow-[0_12px_30px_rgba(0,0,0,0.08)]',
                '!bg-transparent',
                '!shadow-none',
                '!ring-0 !border-0',
                '!p-0',
                'overflow-visible',
              ].join(' ')}
            />
          </div>

          <HappyModalIcon className='absolute bottom-[-48px] right-[-28px] h-[77.5px] w-[80px]' />
        </div>
      </div>

      <div className='mt-auto flex justify-center pt-10'>
        <Button color='primary' size='large' onClick={handleNext}>
          다음으로
        </Button>
      </div>
    </div>
  );
}

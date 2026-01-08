import { useLocation } from 'react-router-dom';
import { Button } from '@/components/common/Button';

type LocationState = {
  title?: string;
  content?: string;
};

export default function OnboardingLetterGuidePage() {
  const { state } = useLocation() as { state?: LocationState };

  const title = state?.title ?? '제목';
  const content = state?.content ?? '';

  const handleNext = () => {
    // TODO: 여기서 저장 + 다음 온보딩 단계로
    console.log({
      question: '3일 뒤, 나는 어떤 모습으로 달라져 있을까요?',
      title,
      content,
    });
  };

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6 pb-6'>
      <button
        type='button'
        className='text-right text-xs text-gray-400 underline underline-offset-2'
        // onClick={() => navigate('/onboarding/letter-guide')} 여기 TODO
      >
        알림 설정 가이드
      </button>

      <div className='mt-4 text-center'>
        <p className='mt-2 text-sm text-[#171717] leading-6'>
          속삭편지에 오신 걸 환영해요
          <br />
          3일 뒤의 나에게 가볍게 편지를 작성해볼까요?
          <br />
          깜짝 선물처럼 알림을 보내드릴게요.
        </p>

        <p className='mt-5 text-[16px] font-semibold text-[#F5544C]'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </p>
      </div>

      <div className='mt-6 flex flex-1 items-center justify-center'>
        <div className='w-[300px] rounded-md bg-white shadow-sm ring-1 ring-black/5'>
          <div className='px-4 py-3 text-sm font-semibold text-[#171717]'>{title}</div>

          <div className='px-4 pb-4 text-sm text-[#171717] leading-6'>
            {content ? (
              <p className='whitespace-pre-wrap'>{content}</p>
            ) : (
              <p className='text-gray-400'>작성된 내용이 여기에 표시돼요.</p>
            )}
          </div>

          <div className='border-t border-black/5 px-4 py-3 text-center text-xs text-gray-400'>
            야, 제발 지켜라!!!!
          </div>
        </div>
      </div>

      <div className='mt-auto flex justify-center pt-4'>
        <Button color='primary' size='large' onClick={handleNext}>
          다음으로
        </Button>
      </div>
    </div>
  );
}

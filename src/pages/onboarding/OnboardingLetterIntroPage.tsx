import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';
import MintPaper from '@/assets/papers/Mint.svg?react';

export default function OnboardingLetterIntroPage() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6 pb-6'>
      <div className='text-center'>
        <p className='mt-2 ty-body3'>
          속삭편지에 오신 걸 환영해요!
          <br />
          3일 뒤의 나에게 가볍게 편지를 작성해볼까요?
          <br />
          깜짝 선물처럼 알림을 보내드릴게요.
        </p>

        <p className='mt-5 ty-title3 text-[var(--color-primary-500)]'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </p>
      </div>

      {/* 빨간 문구 ↔ 편지지 간격 */}
      <div className='mt-[31.75px] flex flex-1 items-center justify-center pb-[30px]'>
        {/* “일러스트 덩어리” 자체는 고정 크기(피그마), 화면에선 가운데 정렬 */}
        <div className='relative h-[390px] w-[240px]'>
          {/* 편지지: rotate 포함 */}
          <div className='absolute inset-0 rotate-[2deg] drop-shadow-[0_12px_30px_rgba(0,0,0,0.08)]'>
            <div className='relative h-full w-full'>
              <MintPaper className='absolute inset-0 h-full w-full' />
            </div>
          </div>

          {/* 말풍선 */}
          <div className='absolute bottom-[70px] left-[40px]'>
            <div className='relative w-[246px] h-[60px] rounded-md bg-[var(--color-primary-100)] px-[14px] shadow flex items-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]'>
              <div className='flex items-center gap-[8px] ty-detailMedium leading-[14px]'>
                <p className='font-semibold whitespace-nowrap'>Tip.</p>
                <p className='leading-[14px]'>
                  아주 작은 것도 좋으니,
                  <br />
                  달라지고 싶은 한 가지를 떠올려 볼까요?
                </p>
              </div>

              {/* 꼬리(말풍선 삼각형) */}
              <span
                className='absolute right-[30px] bottom-[-12px] block h-0 w-0'
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '12px solid var(--color-primary-100)',
                }}
              />
            </div>
          </div>

          <HappyModalIcon className='absolute bottom-[-22px] right-[-36px] h-[77.5px] w-[80px]' />
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

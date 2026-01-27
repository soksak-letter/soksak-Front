import type { WeeklyEmotionFlowItem } from '@/components/WeeklyReport/WeeklyEmotionFlowCard';
import type { EmotionStatusKey } from '@/components/WeeklyReport/EmotionStatusIcon';

import { WeeklyEmotionDistributionCard } from '@/components/WeeklyReport/WeeklyEmotionDistributionCard';
import { WeeklyEmotionFlowCard } from '@/components/WeeklyReport/WeeklyEmotionFlowCard';

// import StampIcon from '@/assets/icons/StampIcon.svg?react';

const emotionStatusMock: EmotionStatusKey = 'tired';

const flowMock: WeeklyEmotionFlowItem[] = [
  { day: '월', segments: [{ percent: 55, color: 'var(--color-primary-500)' }] },
  {
    day: '화',
    segments: [
      { percent: 55, color: 'var(--color-primary-500)' },
      { percent: 30, color: 'var(--color-primary-300)' },
    ],
  },
  { day: '수', segments: [] },
  { day: '목', segments: [] },
  { day: '금', segments: [] },
  {
    day: '토',
    segments: [
      { percent: 35, color: 'var(--color-primary-500)' },
      { percent: 40, color: 'var(--color-grey-300)' },
      { percent: 20, color: 'var(--color-primary-300)' },
    ],
  },
  { day: '일', segments: [] },
];

export default function WeeklyReportPage() {
  const distribution = [
    { key: 'tired', label: '피곤함', value: 50, color: '#F05A4F' },
    { key: 'calm', label: '차분함', value: 30, color: '#F3B3AE' },
    { key: 'excited', label: '설렘', value: 15, color: '#D9D9D9' },
    { key: 'other', label: '기타', value: 5, color: '#BFBFBF' },
  ] as const;

  return (
    <div className='relative isolate min-h-[100dvh] bg-[#FFEEED] overflow-x-hidden'>
      {/* 배경 레이어(스크롤해도 고정) */}
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FFEEED]'>
        {/*
        // 우표 배경
        <div className='absolute inset-0'>
          <div
            className='absolute left-[-48px] top-[72px]'
            style={{
              width: 90,
              height: 93,
              transform: 'rotate(20.41deg)',
              opacity: 0.22,
            }}
          >
            <div className='h-full w-full p-[6px]'>
              <StampIcon className='h-full w-full' />
            </div>
          </div>

          <div
            className='absolute right-[-32px] top-[260px]'
            style={{
              width: 76.78,
              height: 81.64,
              transform: 'rotate(-12deg)',
              opacity: 0.18,
            }}
          >
            <div className='h-full w-full p-[6px]'>
              <StampIcon className='h-full w-full' />
            </div>
          </div>

          <div
            className='absolute left-[24px] top-[420px]'
            style={{
              width: 76.78,
              height: 81.64,
              transform: 'rotate(20.41deg)',
              opacity: 0.16,
            }}
          >
            <div className='h-full w-full p-[6px]'>
              <StampIcon className='h-full w-full' />
            </div>
          </div>
        </div>
        */}
      </div>

      {/* 실제 스크롤 콘텐츠 */}
      <main className='relative z-10 mx-auto w-full max-w-[375px] px-4 pb-[110px] pt-[16px]'>
        <div className='flex flex-col gap-3'>
          {/* 타이틀 */}
          <h2 className='ty-title1 leading-[150%] mb-[30px]'>
            2월 1주차,
            <br />
            주간 마음 리포트가 도착했어요!
          </h2>
          {/* 상단 “주간 마음 리포트” 카드 (344x307) - TODO: "에잇" 이 컴포넌트 구현하고 변경해주세요*/}
          <section className='w-[344px] h-[307px] rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-4 py-4'>
            {/* 네트워크/키워드 영역 블랭크 */}
            <div className='mt-3 rounded-xl bg-[#FFF7F7] h-[150px] w-full' />

            {/* 태그 영역 블랭크 */}
            <div className='mt-3 flex flex-wrap gap-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-[28px] w-[78px] rounded-full bg-[#F2F2F2]' />
              ))}
            </div>
          </section>

          {/* 편지조각 보기 (피그마 375x170) - 블랭크 */}
          <section className='w-[375px] h-[170px] -mx-4 px-4'>
            <div className='h-full w-full p-4'>
              {/* 상단 라벨/버튼 자리 */}
              <div className='flex items-center justify-between'>
                <div className='ty-body2'>편지조각 보기</div>
                <div className='ty-body5 text-[var(--color-text-alternative)]'>전체보기</div>
              </div>

              {/* 카드 3개 블랭크 - TODO: 캐러셀로 변경 */}
              <div className='mt-3 grid grid-cols-3 gap-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='h-[96px] rounded-lg bg-[#EAF6FF]' />
                ))}
              </div>
            </div>
          </section>

          {/* 주간 감정 분포 */}
          <WeeklyEmotionDistributionCard data={distribution} emotionStatus={emotionStatusMock} />

          {/* 주간 감정 흐름 */}
          <WeeklyEmotionFlowCard data={flowMock} />

          {/* “주간 마음 편지” 블랭크 섹션 */}
          <section className='w-[343px] h-[381px] rounded-xl bg-[var(--color-secondary-300)] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'></section>
        </div>
      </main>
    </div>
  );
}

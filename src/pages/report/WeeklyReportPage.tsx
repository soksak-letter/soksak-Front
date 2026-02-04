import type { WeeklyEmotionFlowItem } from '@/components/WeeklyReport/WeeklyEmotionFlowCard';
import type { EmotionStatusKey } from '@/components/WeeklyReport/EmotionStatusIcon';

import { WeeklyEmotionDistributionCard } from '@/components/WeeklyReport/WeeklyEmotionDistributionCard';
import { WeeklyEmotionFlowCard } from '@/components/WeeklyReport/WeeklyEmotionFlowCard';
import { EmotionConstellation } from '@/components/WeeklyReport/EmotionConstellation';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

import ReportLetterCarousel from '@/components/WeeklyReport/ReportLetterCarousel';
import type { FeedLetter } from '@/types/letter';

import OnboardingStamp from '@/assets/icons/OnboardingStamp.svg?react';
import WeeklyMindLetterSection from '@/components/WeeklyReport/WeeklyMindLetterSection';

// API 응답 형태의 Mock Data (데이터가 오는 곳)
const keywordsMock = [
  { keyword: '운동/건강', count: 1 },
  { keyword: '야근', count: 1 },
  { keyword: '피곤', count: 10 },
  { keyword: '복잡', count: 5 },
  { keyword: '감사', count: 9 },
  { keyword: '기쁨', count: 1 },
  { keyword: '성취', count: 1 },
];
const reportMockData = [
  {
    id: '1',
    title: '테스트1',
    date: '2024.02.01',
    variant: 'blue',
    link: '#',
  },
  {
    id: '2',
    title: '테스트2',
    date: '2024.02.02',
    variant: 'pink',
    link: '#',
  },
  {
    id: '3',
    title: '테스트3',
    date: '2024.02.01',
    variant: 'blue',
    link: '#',
  },
  {
    id: '4',
    title: '테스트4',
    date: '2024.02.01',
    variant: 'blue',
    link: '#',
  },
];

const reportMockLetters: FeedLetter[] = reportMockData.map((x) => ({
  letterId: Number(x.id), // string -> number
  title: x.title,
  deliveredAt: '2024-02-01T00:00:00.000Z', // 화면용 임시 ISO
  paperId: x.variant === 'pink' ? 2 : 1, // 임시 매핑 (원하는대로 바꿔도 됨)
}));

//MockData 끝

export default function WeeklyReportPage() {
  const navigate = useNavigate();
  // 별자리 컴포넌트와 하단 태그 리스트에서 공통으로 사용할 데이터 변환
  const formattedKeywords = useMemo(() => {
    return [...keywordsMock]
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        id: index,
        keyword: item.keyword,
        count: item.count,
      }));
  }, []);

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

  const distribution = [
    { key: 'tired', label: '피곤함', value: 50, color: '#F05A4F' },
    { key: 'calm', label: '차분함', value: 30, color: '#F3B3AE' },
    { key: 'excited', label: '설렘', value: 15, color: '#D9D9D9' },
    { key: 'other', label: '기타', value: 5, color: '#BFBFBF' },
  ] as unknown as Parameters<typeof WeeklyEmotionDistributionCard>[0]['data'];

  return (
    <div className='relative min-h-full w-full overflow-hidden bg-[#FFEEED]'>
      {/* 배경 레이어(스크롤해도 고정) */}
      <div className='pointer-events-none absolute inset-0 z-0'>
        {/* 우표 배경 */}
        {/* 우표 1 */}
        <div
          className='absolute left-[-36px] top-[90px] opacity-[0.22]'
          style={{ width: 90, height: 94, transform: 'rotate(-20.41deg)' }}
        >
          <div className='h-full w-full'>
            <OnboardingStamp className='h-full w-full' />
          </div>
        </div>
        {/* 우표 2 */}
        <div
          className='absolute right-[-18px] top-[10px] opacity-[0.22]'
          style={{ width: 90, height: 88, transform: 'rotate(16deg)' }}
        >
          <div className='h-full w-full'>
            <OnboardingStamp className='h-full w-full' />
          </div>
        </div>
        {/* 우표 3 */}
        <div
          className='absolute left-[160px] top-[408px] opacity-[0.22]'
          style={{ width: 90, height: 100, transform: 'rotate(-20deg)' }}
        >
          <div className='h-full w-full'>
            <OnboardingStamp className='h-full w-full' />
          </div>
        </div>
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
          {/* 상단 “주간 마음 리포트” 카드 (344x307)*/}
          <section className='w-[344px] h-[307px] rounded-xl bg-[var(--color-bg-500)] shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-[16px] py-[8px]'>
            <div className='flex flex-col gap-[32px]'>
              {/* 네트워크/키워드 영역 블랭크 */}
              <div className='flex flex-col items-center mt-3 rounded-xl h-[148px] w-full gap-[16px] '>
                <p className='ty-title3'>이번 주, 당신의 마음을 채운 단어는?</p>
                <div className='flex h-full w-full justify-center items-center overflow-visible'>
                  <EmotionConstellation data={formattedKeywords} />
                </div>
              </div>
              {/* 태그 영역 블랭크 */}
              <div className=' flex flex-wrap justify-center gap-[15px]'>
                {formattedKeywords.map((node, index) => {
                  const isMain = index === 0; //가장 큰 노드
                  return (
                    <div
                      key={`tag-${node.id}`}
                      className={`h-[28px] px-[10px] flex items-center justify-center 
                        rounded-full border ty-detailMedium shadow-sm transition-all ${
                          isMain
                            ? 'border-[#FFC8C6] bg-[#FFF5F5] text-[#FF5C5C]'
                            : 'border-[#F0F0F0] bg-white text-[#999999]'
                        }`}
                    >
                      # {node.keyword} {node.count > 1 && `(${node.count})`}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 편지조각 보기- 블랭크 */}
          <div className='w-[375px] h-[170px] px-[16px]'>
            <div className='h-full w-full py-4'>
              {/* 상단 라벨/버튼 자리 */}
              <div className='flex flex-col gap-[16px]'>
                <div className='flex items-center justify-between'>
                  <h2 className='ty-body2 text-[var(--color-text-normal)]'>편지조각</h2>
                  <button
                    onClick={() => navigate(ROUTES.report.keyword)}
                    className='flex items-center gap-2 ty-body5 text-[var(--color-text-alternative)] hover:text-gray-700 transition-colors'
                  >
                    <span>전체보기</span>
                    <svg
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      fill='none'
                      className='rotate-180'
                    >
                      <path
                        d='M7.5 9L4.5 6L7.5 3'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>

                <ReportLetterCarousel letters={reportMockLetters} />
              </div>
            </div>
          </div>

          {/* 주간 감정 분포 */}
          <WeeklyEmotionDistributionCard data={distribution} emotionStatus={emotionStatusMock} />

          {/* 주간 감정 흐름 */}
          <WeeklyEmotionFlowCard data={flowMock} />

          {/* “주간 마음 편지” 블랭크 섹션 */}
          <WeeklyMindLetterSection
            receiverName='개굴'
            body={
              '이번 주는 ‘피곤’과 ‘노력’이라는 단어를 가장 많이 사용하셨네요.\n\n그래도 주 후반부에는 ‘설렘’과 ‘뿌듯함’도 함께 느껴져서 다행이에요.\n\n다음 주는 잠시 쉬어가는 시간을 가져보는 건 어떨까요?'
            }
            onClick={() => {
              console.log('다음 주 편지 쓰기');
            }}
          />
        </div>
      </main>
    </div>
  );
}

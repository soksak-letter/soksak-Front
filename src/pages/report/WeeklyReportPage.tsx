import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { EmotionStatusKey } from '@/components/WeeklyReport/EmotionStatusIcon';
import type { FeedLetter } from '@/types/letter';

import { WeeklyEmotionDistributionCard } from '@/components/WeeklyReport/WeeklyEmotionDistributionCard';
import { WeeklyEmotionFlowCard } from '@/components/WeeklyReport/WeeklyEmotionFlowCard';
import { EmotionConstellation } from '@/components/WeeklyReport/EmotionConstellation';
import ReportLetterCarousel from '@/components/WeeklyReport/ReportLetterCarousel';
import WeeklyMindLetterSection from '@/components/WeeklyReport/WeeklyMindLetterSection';

import OnboardingStamp from '@/assets/icons/OnboardingStamp.svg?react';

import LoadingPage from '../system/LoadingPage';
import { ROUTES } from '@/routes/paths';

import { useWeeklyReport } from '@/hooks/weeklyReport/useWeeklyReport';
// TODO: 서버 500 이슈로 하이라이트 상세 조회는 임시 비활성화
// import { useWeeklyReportHighlights } from '@/hooks/weeklyReport/useWeeklyReportHighlights';

import { mapWeeklyEmotionDistribution } from '@/utils/report/mapWeeklyEmotionDistribution';
import { mapWeeklyEmotionFlow } from '@/utils/report/mapWeeklyEmotionFlow';

export default function WeeklyReportPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useWeeklyReport();

  const reportData = data?.success?.result?.data ?? null;
  const keywords = reportData?.keywords ?? [];
  const emotions = reportData?.emotions ?? undefined;
  const report = reportData?.report ?? null;

  // TODO: 서버 500 이슈로 하이라이트 ids/조회 임시 비활성화
  // const highlightIds = useMemo(() => {
  //   const ids = reportData?.highlights?.map((h) => h.letterId) ?? [];
  //   return Array.from(new Set(ids)).filter((n) => Number.isFinite(n) && n > 0) as number[];
  // }, [reportData]);
  //
  // const {
  //   letters: highlightCarouselLetters,
  //   isLoading: isHighlightLoading,
  //   isError: isHighlightError,
  // } = useWeeklyReportHighlights(highlightIds);

  // 키워드 칩 포맷(네 constellation/칩에 쓰는 용도)
  const formattedKeywords = useMemo(() => {
    return [...keywords]
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((item, index) => ({
        id: index + 1,
        keyword: item.keyword,
        count: item.count,
      }));
  }, [keywords]);

  // 선택 키워드(전체보기 이동용)
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');

  useEffect(() => {
    if (!selectedKeyword && formattedKeywords.length > 0) {
      setSelectedKeyword(formattedKeywords[0].keyword);
    }
  }, [formattedKeywords, selectedKeyword]);

  const selectedCount = useMemo(() => {
    const found = formattedKeywords.find((k) => k.keyword === selectedKeyword);
    return found?.count ?? 0;
  }, [formattedKeywords, selectedKeyword]);

  // ✅ 키워드 기반 캐러셀 데이터(임시)
  // - 서버 하이라이트 실패 시에도 "보이게"만 하는 목적
  // - letterId는 안정적인 더미 id 생성
  // - paperId는 1~3 사이로 순환(봉투 프리뷰가 1-base 라는 가정)
  const keywordCarouselLetters: FeedLetter[] = useMemo(() => {
    // 키워드가 하나도 없으면 빈 배열 → emptyMessage로 처리
    if (formattedKeywords.length === 0) return [];

    // 3개만 노출(디자인 상 "하이라이트 3개" 느낌 유지)
    const base = formattedKeywords.slice(0, 3);

    const now = new Date();
    const iso = now.toISOString();

    return base.map((k, idx) => ({
      letterId: 10_000 + k.id, // 더미 but stable
      title: `${k.keyword} (${k.count})`,
      deliveredAt: iso,
      paperId: (idx % 3) + 1, // 1~3 순환
    }));
  }, [formattedKeywords]);

  // 감정 분포(도넛)
  const distribution = useMemo(() => mapWeeklyEmotionDistribution(emotions), [emotions]);

  // 감정 흐름(막대)
  const flowData = useMemo(() => mapWeeklyEmotionFlow(emotions), [emotions]);

  // ---- 렌더 분기 ----
  if (isLoading) return <LoadingPage />;

  const emotionStatusMock: EmotionStatusKey = 'neutral';

  const handleGoKeywordPage = () => {
    if (!selectedKeyword) return;
    navigate(ROUTES.report.keyword, {
      state: { keyword: selectedKeyword, count: selectedCount },
    });
  };

  return (
    <div className='relative min-h-full w-full overflow-hidden bg-[#FFEEED]'>
      {/* 배경 우표 */}
      <div className='pointer-events-none absolute inset-0 z-0'>
        <div
          className='absolute left-[-36px] top-[90px] opacity-[0.22]'
          style={{ width: 90, height: 94, transform: 'rotate(-20.41deg)' }}
        >
          <OnboardingStamp className='h-full w-full' />
        </div>

        <div
          className='absolute right-[-18px] top-[10px] opacity-[0.22]'
          style={{ width: 90, height: 88, transform: 'rotate(16deg)' }}
        >
          <OnboardingStamp className='h-full w-full' />
        </div>

        <div
          className='absolute left-[160px] top-[408px] opacity-[0.22]'
          style={{ width: 90, height: 100, transform: 'rotate(-20deg)' }}
        >
          <OnboardingStamp className='h-full w-full' />
        </div>
      </div>

      <main className='relative z-10 mx-auto w-full max-w-[375px] px-4 pb-[110px] pt-[16px]'>
        <div className='flex flex-col gap-3'>
          <h2 className='ty-title1 mb-4'>
            {report ? (
              <>
                {report.month}월 {report.week}주차,
                <br />
                주간 마음 리포트가 도착했어요!
              </>
            ) : (
              <>
                이번 주 주간 마음 리포트,
                <br />
                아직 준비되지 않았어요
              </>
            )}
          </h2>

          {/* 상단 키워드 카드 */}
          <section className='w-[344px] h-[307px] rounded-xl bg-[var(--color-bg-500)] shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-[16px] py-[8px]'>
            <div className='flex flex-col gap-[32px]'>
              <div className='flex flex-col items-center mt-3 rounded-xl h-[148px] w-full gap-[16px]'>
                <p className='ty-title3'>이번 주, 당신의 마음을 채운 단어는?</p>

                <div className='flex h-full w-full justify-center items-center overflow-visible'>
                  <EmotionConstellation
                    data={formattedKeywords}
                    onSelectKeyword={setSelectedKeyword}
                  />
                </div>
              </div>

              <div className='flex flex-wrap justify-center gap-[15px]'>
                {formattedKeywords.map((node) => {
                  const isSelected = node.keyword === selectedKeyword;
                  return (
                    <button
                      key={`tag-${node.id}`}
                      type='button'
                      onClick={() => setSelectedKeyword(node.keyword)}
                      className={`h-[28px] px-[10px] flex items-center justify-center rounded-full border ty-detailMedium shadow-sm transition-all ${
                        isSelected
                          ? 'border-[#FFC8C6] bg-[#FFF5F5] text-[#FF5C5C]'
                          : 'border-[#F0F0F0] bg-white text-[#999999]'
                      }`}
                    >
                      # {node.keyword} {node.count > 1 && `(${node.count})`}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 편지조각 보기 (키워드 기반 임시 캐러셀) */}
          <div className='w-[375px] h-[170px] px-[16px]'>
            <div className='h-full w-full py-4'>
              <div className='flex flex-col gap-[16px]'>
                <div className='flex items-center justify-between'>
                  <h2 className='ty-body2 text-[var(--color-text-normal)]'>편지조각 보기</h2>
                  <button
                    onClick={handleGoKeywordPage}
                    disabled={!selectedKeyword}
                    className={`flex items-center gap-2 mr-5 ty-body5 transition-colors ${
                      selectedKeyword
                        ? 'text-[var(--color-text-alternative)] hover:text-gray-700'
                        : 'text-[var(--color-text-disabled)] cursor-not-allowed'
                    }`}
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

                <ReportLetterCarousel
                  letters={keywordCarouselLetters}
                  emptyMessage='아직 모아볼 편지조각이 없어요.'
                  onClickItem={handleGoKeywordPage}
                />
              </div>
            </div>
          </div>

          {/* 감정 분포(도넛) */}
          <WeeklyEmotionDistributionCard
            data={distribution}
            emotionStatus={emotionStatusMock}
            emptyText='데이터가 아직 없어요'
          />

          {/* 감정 흐름(막대) */}
          <WeeklyEmotionFlowCard data={flowData} emptyText='데이터가 아직 없어요' />

          {/* 주간 마음 편지 */}
          <WeeklyMindLetterSection
            receiverName={report?.nickname ?? ''}
            body={report?.summaryText ?? ''}
            onClick={() => navigate('/letter/self/draft')}
          />
        </div>
      </main>
    </div>
  );
}

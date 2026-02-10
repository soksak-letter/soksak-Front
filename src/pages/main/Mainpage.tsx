import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterCarousel from '@/components/letters/LetterCarousel';
import QuestionCard from '@/components/common/QuestionCard';
import WriteLetterButtons from './WriteLetterButtons';
import LetterJourney from './LetterJourney';
import MainPageSkeleton from '@/components/skeleton/MainPageSkeleton';
import { useHomeSummary } from '@/hooks/useHomeSummary';
import { useFriendPublicLetters, useOtherPublicLetters } from '@/hooks/usePublicLetters';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useLetterStore } from '@/stores/letterStore';
import { useLocation } from 'react-router-dom';
import type { ToastLocationState } from '@/types/toastLocationState';
import type { FeedLetter } from '@/types/letter';

const MainPage = () => {
  const navigate = useNavigate();

  const { showToast } = useGlobalToast();
  const { resetAll } = useLetterStore();
  const location = useLocation();

  // 홈 요약 API 연동 (오늘의 질문, 편지 통계, 유저 정보)
  const { data: homeSummary, isLoading: summaryLoading, timeLeft } = useHomeSummary();
  const formattedQuestionText = (homeSummary?.todayQuestion?.content ?? '').replace(
    /^질문\s*#\d+:\s*/,
    '',
  );

  // 공개 편지 API 연동
  const { data: otherPublicLetters, isLoading: isOtherLettersLoading } = useOtherPublicLetters();

  // 친구 편지 API 연동
  const { data: friendPublicLetters, isLoading: isFriendLettersLoading } = useFriendPublicLetters();

  // API 데이터를 Letter 타입으로 변환
  const otherLetters = useMemo<FeedLetter[]>(
    () =>
      otherPublicLetters?.map((l) => ({
        letterId: l.id,
        title: l.title ?? '',
        deliveredAt: l.deliveredAt ?? '',
        paperId: l.design?.paper?.id ?? 1,
      })) ?? [],
    [otherPublicLetters],
  );

  const friendLetters = useMemo<FeedLetter[]>(
    () =>
      friendPublicLetters?.map((l) => ({
        letterId: l.id,
        title: l.title ?? '',
        deliveredAt: l.deliveredAt ?? '',
        paperId: l.design?.paper?.id ?? 1,
      })) ?? [],
    [friendPublicLetters],
  );
  const profileImageCacheBuster = useMemo(() => Date.now(), [homeSummary?.user?.profileImageUrl]);

  // 편지 발송 후 성공 토스트 뜨면 resetAll 실행
  useEffect(() => {
    const state = location.state as ToastLocationState | null;
    const toast = state?.toast;
    if (!toast) return;

    showToast(toast.message, toast.status);
    resetAll();

    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate, resetAll, showToast]);

  const handleWriteToSelf = () => {
    navigate('/letter/self/draft');
  };

  const handleWriteToOther = () => {
    navigate('/letter/anon/draft');
  };

  const isPageLoading = summaryLoading || isOtherLettersLoading || isFriendLettersLoading;

  if (isPageLoading) {
    return <MainPageSkeleton />;
  }

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)] pb-22 pt-5'>
      {/* 오늘의 질문 섹션 */}
      <section className='ty-title2'>
        <QuestionCard
          question={formattedQuestionText}
          timeLeft={timeLeft}
          profileImageUrl={
            homeSummary?.user?.profileImageUrl
              ? `${homeSummary.user.profileImageUrl}?t=${profileImageCacheBuster}`
              : 'https://placehold.co/47x48'
          }
        />
      </section>

      {/* 편지 쓰기 버튼 섹션 */}
      <section>
        <WriteLetterButtons onWriteToSelf={handleWriteToSelf} onWriteToOther={handleWriteToOther} />
      </section>

      {/* 편지 여행 섹션 */}
      <section>
        <LetterJourney
          userName={homeSummary?.user?.nickname || ''}
          weekLabel={homeSummary?.letterStats?.reportPeriod || ''}
          receivedCount={homeSummary?.letterStats?.stats?.receivedCount || 0}
          sentCount={homeSummary?.letterStats?.stats?.sentCount || 0}
          totalCount={homeSummary?.letterStats?.stats?.totalSentCount || 0}
          progressMessage={homeSummary?.letterStats?.message || ''}
        />
      </section>

      {/* 공개 편지 섹션 */}
      <section className='pt-2.5 pb-2.5'>
        {/* 헤더 */}
        <div className='flex items-center justify-between px-4 py-1.5'>
          <h2 className='ty-body2'>공개 편지</h2>
          <button
            onClick={() => navigate('/feed/public-all')}
            className='flex items-center gap-2 ty-body5 text-[var(--color-text-alternative)] hover:text-gray-700 transition-colors'
          >
            <span>전체보기</span>
            <svg width='12' height='12' viewBox='0 0 12 12' fill='none' className='rotate-180'>
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

        {/* 편지 캐러셀 */}
        <LetterCarousel
          letters={otherLetters}
          emptyMessage='현재 공개된 편지가 더이상 없어요.'
          onLetterClick={(l) => {
            // TODO : 캐러셀 눌렀을 때 어디로 이동하는지 주소 재확인
            console.log('public letter click:', l.letterId);
          }}
        />
      </section>

      {/* 친구 편지 섹션 */}
      <section className='pt-2.5 pb-2.5'>
        {/* 헤더 */}
        <div className='flex items-center justify-between px-4 py-1.5'>
          <h2 className='ty-body2'>친구 편지</h2>
          <button
            onClick={() => navigate('/feed/friend-all')}
            className='flex items-center gap-2 ty-body5 text-[var(--color-text-alternative)] hover:text-gray-700 transition-colors'
          >
            <span>전체보기</span>
            <svg width='12' height='12' viewBox='0 0 12 12' fill='none' className='rotate-180'>
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

        {/* 편지 캐러셀 */}
        <LetterCarousel
          letters={friendLetters}
          emptyMessage='친구의 편지가 아직 없어요.'
          onLetterClick={(l) => {
            // TODO : 캐러셀 눌렀을 때 어디로 이동하는지 주소 재확인
            console.log('friend letter click:', l.letterId);
          }}
        />
      </section>
    </div>
  );
};

export default MainPage;

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterCarousel from '../../components/letters/LetterCarousel';
import QuestionCard from '../../components/common/QuestionCard';
import WriteLetterButtons from './WriteLetterButtons';
import LetterJourney from './LetterJourney';
import MainPageSkeleton from '../../components/skeleton/MainPageSkeleton';
import type { Letter } from '../../types/letter';
import type { LetterItem } from '../../types/dto/letter';
import useHomeSummary from '../../hooks/useHomeSummary';
import usePublicLetters from '../../hooks/usePublicLetters';
import useFriendLetters from '../../hooks/useFriendLetters';

// API color 값을 variant로 매핑 (임시: 추후 백엔드와 협의 필요)
const colorToVariant = (color?: string): Letter['variant'] => {
  if (!color) return 'blue';
  // Color_1~4: blue, Color_5~8: pink, 나머지: yellow 등 임시 매핑
  const colorNum = parseInt(color.replace('Color_', ''), 10);
  if (colorNum <= 4) return 'blue';
  if (colorNum <= 8) return 'pink';
  return 'yellow';
};

// LetterItem을 Letter 타입으로 변환
const convertToLetter = (item: LetterItem): Letter => ({
  id: String(item.id),
  title: item.title,
  date: item.deliveredAt ?? '',
  variant: colorToVariant(item.design?.paper?.color),
  link: `/letter/${item.id}`,
});

const MainPage = () => {
  const navigate = useNavigate();

  // 홈 요약 API 연동 (오늘의 질문, 편지 통계, 유저 정보)
  const { data: homeSummary, isLoading: summaryLoading, timeLeft } = useHomeSummary();

  // 공개 편지 API 연동
  const { letters: publicLettersData } = usePublicLetters({
    questionId: homeSummary?.todayQuestion?.id ?? null,
  });

  // 친구 편지 API 연동
  const { letters: friendLettersData } = useFriendLetters({
    questionId: homeSummary?.todayQuestion?.id ?? null,
  });

  // API 데이터를 Letter 타입으로 변환
  const publicLetters: Letter[] = useMemo(() => {
    return (publicLettersData ?? []).map(convertToLetter);
  }, [publicLettersData]);

  const friendLetters: Letter[] = useMemo(() => {
    return (friendLettersData ?? []).map(convertToLetter);
  }, [friendLettersData]);

  const handleWriteToSelf = () => {
    navigate('/letter/self/draft');
  };

  const handleWriteToOther = () => {
    navigate('/letter/anon/draft');
  };

  if (summaryLoading) {
    return <MainPageSkeleton />;
  }

  return (
    <div className='min-h-dvh bg-white pb-24'>
      {/* 오늘의 질문 섹션 */}
      <section>
        <QuestionCard
          question={homeSummary?.todayQuestion?.content || ''}
          timeLeft={timeLeft}
          profileImageUrl={homeSummary?.user?.profileImageUrl || 'https://placehold.co/47x48'}
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
          <h2 className='text-base font-semibold text-[#171717]'>공개 편지</h2>
          <button
            onClick={() => navigate('/feed/public')}
            className='flex items-center gap-2 text-sm font-medium text-[#595959] hover:text-gray-700 transition-colors'
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
        <LetterCarousel letters={publicLetters} emptyMessage='현재 공개된 편지가 더이상 없어요.' />
      </section>

      {/* 친구 편지 섹션 */}
      <section className='pt-2.5 pb-2.5'>
        {/* 헤더 */}
        <div className='flex items-center justify-between px-4 py-1.5'>
          <h2 className='text-base font-semibold text-[#171717]'>친구 편지</h2>
          <button
            onClick={() => navigate('/feed/friend')}
            className='flex items-center gap-2 text-sm font-medium text-[#595959] hover:text-gray-700 transition-colors'
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
        <LetterCarousel letters={friendLetters} emptyMessage='친구의 편지가 아직 없어요.' />
      </section>
    </div>
  );
};

export default MainPage;

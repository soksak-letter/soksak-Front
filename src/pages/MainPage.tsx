import { useState } from 'react';
import LetterCarousel from '../components/letters/LetterCarousel';
import QuestionCard from '../components/mainpage/QuestionCard';
import WriteLetterButtons from '../components/mainpage/WriteLetterButtons';
import LetterJourney from '../components/mainpage/LetterJourney';
import type { Letter } from '../types/letter';

const MainPage = () => {
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const [publicLetters] = useState<Letter[]>([
    {
      id: '1',
      title: '이지영 선생님',
      date: '2025. 9. 17.',
      variant: 'blue',
      link: '/letter/1',
    },
    {
      id: '2',
      title: '요즘 아이돌에 빠져',
      date: '2025. 6. 23.',
      variant: 'pink',
      link: '/letter/2',
    },
    {
      id: '3',
      title: '우리 아빠',
      date: '2025. 12. 14.',
      variant: 'yellow',
      link: '/letter/3',
    },
  ]);

  const handleWriteToSelf = () => {
    console.log('나에게 편지 쓰기');
    // 실제로는 페이지 이동 또는 모달 열기
  };

  const handleWriteToOther = () => {
    console.log('상대에게 편지 쓰기');
    // 실제로는 페이지 이동 또는 모달 열기
  };

  return (
    <div className="min-h-dvh bg-white">
      {/* 오늘의 질문 섹션 */}
      <section>
        <QuestionCard
          question={`당신의 인생에 가장 큰 영감을\n주는 사람은 누구인가요?`}
          timeLeft="13시간 32초"
          profileImageUrl="https://via.placeholder.com/47x48"
        />
      </section>

      {/* 편지 쓰기 버튼 섹션 */}
      <section>
        <WriteLetterButtons
          onWriteToSelf={handleWriteToSelf}
          onWriteToOther={handleWriteToOther}
        />
      </section>

      {/* 편지 여행 섹션 */}
      <section>
        <LetterJourney
          userName="개굴"
          weekLabel="1월 2주차"
          receivedCount={16}
          sentCount={12}
          totalCount={32}
          progressMessage="새벽별처럼 빛나는 금성에 도착했어요! 8통의 마음을 더 보내면 지구에 닿을 수 있어요."
        />
      </section>

      {/* 공개 편지 섹션 */}
      <section className="pt-2.5 pb-2.5">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-1.5">
          <h2 className="text-base font-semibold text-[#171717]">공개 편지</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-[#595959] hover:text-gray-700 transition-colors">
            <span>전체보기</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M7.5 9L4.5 6L7.5 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 편지 캐러셀 */}
        <LetterCarousel
          letters={publicLetters}
          emptyMessage="현재 공개된 편지가 더이상 없어요."
        />
      </section>

      {/* 친구 편지 섹션 */}
      <section className="pt-2.5 pb-2.5">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-1.5">
          <h2 className="text-base font-semibold text-[#171717]">친구 편지</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-[#595959] hover:text-gray-700 transition-colors">
            <span>전체보기</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M7.5 9L4.5 6L7.5 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 편지 캐러셀 */}
        <LetterCarousel
          letters={publicLetters}
          emptyMessage="현재 공개된 편지가 더이상 없어요."
        />
      </section>
    </div>
  );
};

export default MainPage;

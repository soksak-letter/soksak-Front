/**
 * 편지 스레드(2열 그리드) 페이지 공통 로딩 스켈레톤 UI
 * 사용처: FriendPostPage, LetterPostOtherPage
 * Figma: 스켈레톤/개인편지함 (node 3804-37543)
 */

interface ThreadSkeletonProps {
  title?: string;
}

export default function ThreadSkeleton({ title = '편지함' }: ThreadSkeletonProps) {
  return (
    <div className='min-h-screen bg-[#fafafa] animate-pulse'>
      {/* 헤더 */}
      <div className='flex items-center justify-center py-2.5 px-2.5'>
        <span className='ty-title3 text-black'>{title}</span>
      </div>

      <main className='px-5 pb-[110px]'>
        {/* 부제목 (144 x 19) */}
        <div className='mt-2 h-[19px] w-[144px] rounded bg-gray-200' />

        {/* 질문 제목 (276 x 50) */}
        <div className='mt-1 h-[50px] w-[276px] rounded bg-gray-200' />

        {/* 2열 그리드 카드 */}
        <div className='mt-6 grid grid-cols-2 gap-x-[34px] items-start'>
          {/* 왼쪽 레인 */}
          <div className='flex flex-col gap-[41px]'>
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>

          {/* 오른쪽 레인 (상단 41px 오프셋) */}
          <div className='flex flex-col gap-[41px] pt-[41px]'>
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div>
      {/* 봉투 (140 x 100) */}
      <div className='w-[140px] h-[100px] rounded bg-gray-200' />
      {/* 제목 (140 x 16) */}
      <div className='mt-[14px] w-[140px] h-[16px] rounded bg-gray-200' />
      {/* 날짜 (47 x 14) */}
      <div className='mt-[10px] w-[47px] h-[14px] rounded bg-gray-200' />
    </div>
  );
}

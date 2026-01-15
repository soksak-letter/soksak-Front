/**
 * 메인 페이지 로딩 스켈레톤 UI
 */
export default function MainPageSkeleton() {
  return (
    <div className='min-h-dvh bg-white animate-pulse'>
      {/* 오늘의 질문 섹션 스켈레톤 */}
      <QuestionCardSkeleton />

      {/* 편지 쓰기 버튼 섹션 스켈레톤 */}
      <WriteLetterButtonsSkeleton />

      {/* 편지 여행 섹션 스켈레톤 */}
      <LetterJourneySkeleton />

      {/* 공개 편지 섹션 스켈레톤 */}
      <LetterSectionSkeleton />

      {/* 친구 편지 섹션 스켈레톤 */}
      <LetterSectionSkeleton />
    </div>
  );
}

/** 오늘의 질문 카드 스켈레톤 */
function QuestionCardSkeleton() {
  return (
    <div className='w-full px-4 py-2.5' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='flex items-center gap-10'>
        {/* 질문 텍스트 영역 */}
        <div className='flex-1 flex flex-col gap-2'>
          {/* 질문 텍스트 */}
          <div className='space-y-2'>
            <div className='h-6 bg-gray-200 rounded w-full' />
            <div className='h-6 bg-gray-200 rounded w-4/5' />
          </div>
          {/* 타이머 */}
          <div className='h-5 bg-gray-200 rounded w-48 mt-1' />
        </div>
        {/* 프로필 이미지 */}
        <div
          className='flex-shrink-0 rounded-full bg-gray-200'
          style={{ width: '47px', height: '48px' }}
        />
      </div>
    </div>
  );
}

/** 편지 쓰기 버튼 스켈레톤 */
function WriteLetterButtonsSkeleton() {
  return (
    <div className='w-full flex gap-3 px-4 py-2.5'>
      {/* 나에게 편지 보내기 버튼 */}
      <div className='flex-1 rounded-lg bg-gray-200' style={{ width: '160px', height: '160px' }} />
      {/* 상대에게 편지 보내기 버튼 */}
      <div className='flex-1 rounded-lg bg-gray-200' style={{ width: '160px', height: '160px' }} />
    </div>
  );
}

/** 편지 여행 섹션 스켈레톤 */
function LetterJourneySkeleton() {
  return (
    <div className='w-full px-4 py-2.5'>
      {/* 헤더 */}
      <div className='flex items-center justify-between mb-3'>
        <div className='h-6 bg-gray-200 rounded w-32' />
      </div>

      {/* 전체 컨테이너 */}
      <div
        className='relative rounded-lg overflow-hidden px-4 py-4'
        style={{
          backgroundColor: '#FFF9F6',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 기간 태그 */}
        <div className='mb-[5px]'>
          <div className='h-6 bg-gray-200 rounded-2xl w-20' />
        </div>

        {/* 통계 섹션 */}
        <div className='mb-1 flex flex-col items-center'>
          {/* 받은/보낸 편지 */}
          <div
            className='flex items-center gap-4 py-1.5 w-full justify-center'
            style={{ borderBottom: '1px solid #FFC9C6' }}
          >
            <div className='h-5 bg-gray-200 rounded w-24' />
            <div className='h-5 bg-gray-200 rounded w-24' />
          </div>

          {/* 총 편지 수 */}
          <div className='flex items-center justify-center gap-1.5 py-1 mt-1'>
            <div className='h-6 bg-gray-200 rounded w-40' />
          </div>
        </div>

        {/* 진행 메시지 */}
        <div className='flex items-center justify-center gap-2 mt-1'>
          <div className='space-y-1'>
            <div className='h-4 bg-gray-200 rounded w-52' />
            <div className='h-4 bg-gray-200 rounded w-48' />
          </div>
          <div className='flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full' />
        </div>
      </div>
    </div>
  );
}

/** 편지 섹션 (공개 편지 / 친구 편지) 스켈레톤 */
function LetterSectionSkeleton() {
  return (
    <section className='pt-2.5 pb-2.5'>
      {/* 헤더 */}
      <div className='flex items-center justify-between px-4 py-1.5'>
        <div className='h-5 bg-gray-200 rounded w-20' />
        <div className='h-4 bg-gray-200 rounded w-16' />
      </div>

      {/* 편지 캐러셀 스켈레톤 */}
      <div className='w-full py-1.5'>
        <div className='overflow-hidden'>
          <div className='flex gap-[13px] pl-4'>
            {[1, 2, 3].map((i) => (
              <LetterCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 개별 편지 카드 스켈레톤 */
function LetterCardSkeleton() {
  return (
    <div
      className='flex-shrink-0 rounded-lg bg-gray-200'
      style={{ width: '130px', height: '180px' }}
    />
  );
}

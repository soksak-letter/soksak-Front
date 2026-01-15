/**
 * 메인 페이지 로딩 스켈레톤 UI
 */
export default function MainPageSkeleton() {
  return (
    <div className='min-h-dvh bg-white animate-pulse'>
      {/* 오늘의 질문 섹션 스켈레톤 */}
      <section>
        <QuestionCardSkeleton />
      </section>

      {/* 편지 쓰기 버튼 섹션 스켈레톤 */}
      <section>
        <WriteLetterButtonsSkeleton />
      </section>

      {/* 편지 여행 섹션 스켈레톤 */}
      <section>
        <LetterJourneySkeleton />
      </section>

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
          {/* 질문 텍스트 (fontSize: 20px, lineHeight: 24px, 2줄) */}
          <div className='space-y-1'>
            <div className='bg-gray-200 rounded w-3/4' style={{ height: '48px' }} />
          </div>
          {/* 타이머 (fontSize: 16px, lineHeight: 25.6px) */}
          <div className='bg-gray-200 rounded' style={{ height: '26px', width: '200px' }} />
        </div>
      </div>
    </div>
  );
}

/** 편지 쓰기 버튼 스켈레톤 */
function WriteLetterButtonsSkeleton() {
  return (
    <div className='w-full flex gap-3 px-4 py-2.5'>
      {/* 나에게 편지 보내기 버튼 */}
      <div
        className='flex-1 rounded-lg bg-gray-200'
        style={{ height: '160px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
      />
      {/* 상대에게 편지 보내기 버튼 */}
      <div
        className='flex-1 rounded-lg bg-gray-200'
        style={{ height: '160px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
      />
    </div>
  );
}

/** 편지 여행 섹션 스켈레톤 */
function LetterJourneySkeleton() {
  return (
    <div className='w-full px-4 py-2.5'>
      {/* 헤더 (fontSize: 16px, lineHeight: 25.6px) */}
      <div className='flex items-center justify-between mb-3'>
        <div className='bg-gray-200 rounded' style={{ height: '26px', width: '120px' }} />
      </div>

      {/* 전체 컨테이너 - 통계 섹션 전체를 박스로 덮음 (px-4 py-4 + 내부 콘텐츠 높이) */}
      <div
        className='rounded-lg bg-gray-200'
        style={{
          height: '176px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
}

/** 편지 섹션 (공개 편지 / 친구 편지) 스켈레톤 */
function LetterSectionSkeleton() {
  return (
    <section className='pt-2.5 pb-2.5'>
      {/* 헤더 (text-base = 16px font-semibold) */}
      <div className='flex items-center justify-between px-4 py-1.5'>
        <div className='bg-gray-200 rounded' style={{ height: '26px', width: '119px' }} />
      </div>

      {/* 편지 캐러셀 스켈레톤 */}
      <div className='w-full py-1.5'>
        <div className='overflow-hidden'>
          <div className='flex' style={{ gap: '13px', paddingLeft: '16px' }}>
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
      style={{ width: '130px', height: '100px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
    />
  );
}

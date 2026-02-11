/**
 * 편지함(나에게) 페이지 로딩 스켈레톤 UI
 * Figma: 스켈레톤/편지함 (node 3804-37403)
 */
export default function InboxSelfSkeleton() {
  return (
    <div className='min-h-screen bg-[var(--color-bg-500)] animate-pulse'>
      {/* 헤더 영역 (실제 TitleHeader와 동일한 높이) */}
      <div className='flex items-center justify-center py-2.5 px-2.5'>
        <span className='ty-title3 text-black'>편지함</span>
      </div>

      <main className='px-5 pb-[95px]'>
        <div className='mx-auto w-full max-w-[343px]'>
          {/* 탭 영역 스켈레톤 (343 x 44) */}
          <div className='h-[44px] w-full rounded-lg bg-gray-200' />

          {/* 검색 바 스켈레톤 (343 x 40), gap 24px */}
          <div className='mt-[24px] h-[40px] w-full rounded-lg bg-gray-200' />

          {/* 편지 카드 스켈레톤 4개 (343 x 120), 첫 카드 gap 35px, 이후 12px */}
          <div className='mt-[35px] space-y-[12px]'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-[120px] w-full rounded-lg bg-gray-200' />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

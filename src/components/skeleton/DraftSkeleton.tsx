/**
 * 편지 작성 페이지 공통 로딩 스켈레톤 UI
 * Figma: 스켈레톤/편지작성 (node 3804-37543)
 */

interface DraftSkeletonProps {
  title?: string;
}

export default function DraftSkeleton({ title = '편지 작성' }: DraftSkeletonProps) {
  return (
    <div className='relative flex flex-col animate-pulse pt-2'>
      {/* 헤더 (BackHeader 동일 높이) */}
      <div className='flex items-center py-2.5 px-2.5'>
        <div className='flex-1 flex justify-center'>
          <span className='ty-title3 text-[var(--color-text-strong)]'>{title}</span>
        </div>
      </div>
      {/* 질문 영역 */}
      <div className='flex flex-col items-start p-5 -mt-3 gap-2'>
        <div className='w-[251px] h-[50px] rounded bg-[var(--color-grey-100)]' />
        <div className='w-[200px] h-[20px] rounded bg-[var(--color-grey-100)]' />
      </div>
      {/* 편지 텍스트 박스 */}
      <div className='px-4'>
        <div className='w-[343px] h-[394px] rounded-xl bg-[var(--color-grey-100)]' />
      </div>
      {/* 토글 영역 */}
      <div className='flex items-center justify-end p-5 mt-8 gap-2'>
        <div className='w-[170px] h-[16px] rounded bg-[var(--color-grey-100)]' />
      </div>
      {/* 안내 텍스트 영역*/}
      <div className='flex flex-col gap-1 px-5 -mt-3'>
        <div className='flex p-5 -mt-3 ty-detailMedium text-[var(--color-text-assistive)] flex-col gap-1'>
          <div className='w-[220px] h-[14px] rounded bg-[var(--color-grey-100)] mb-1' />
          <div className='w-[180px] h-[14px] rounded bg-[var(--color-grey-100)]' />
        </div>
      </div>
    </div>
  );
}

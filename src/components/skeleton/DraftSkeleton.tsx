/**
 * 편지 작성 페이지 공통 로딩 스켈레톤 UI
 */

interface DraftSkeletonProps {
  title?: string;
}

export default function DraftSkeleton({ title = '편지 작성' }: DraftSkeletonProps) {
  return (
    <div className='flex flex-col min-h-screen animate-pulse'>
      {/* 헤더 (BackHeader 동일 높이) */}
      <div className='flex items-center justify-between py-2.5 px-2.5'>
        <div className='h-6 w-6 rounded bg-gray-200' />
        <span className='ty-title3 text-black'>{title}</span>
        <div className='h-5 w-10 rounded bg-gray-200' />
      </div>

      {/* 질문 영역 */}
      <div className='flex flex-col items-start p-5 -mt-3 gap-3'>
        <div className='w-[251px] h-[50px] rounded bg-gray-200' />
        <div className='w-[200px] h-[20px] rounded bg-gray-200' />
      </div>

      {/* 편지 텍스트 박스 */}
      <div className='px-4'>
        <div className='w-[343px] h-[394px] rounded-xl bg-gray-200' />
      </div>

      {/* 토글 영역 */}
      <div className='flex items-center justify-end p-5 -mt-5 gap-2'>
        <div className='w-[170px] h-[16px] rounded bg-gray-200' />
        <div className='w-[40px] h-[20px] rounded-full bg-gray-200' />
      </div>

      {/* 안내 텍스트 */}
      <div className='flex flex-col gap-1 px-5 -mt-3'>
        <div className='w-[250px] h-[14px] rounded bg-gray-200' />
        <div className='w-[300px] h-[14px] rounded bg-gray-200' />
      </div>
    </div>
  );
}

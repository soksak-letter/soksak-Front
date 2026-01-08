interface EmptyStateCardProps {
  message?: string;
}

export default function EmptyStateCard({
  message = '현재 공개된 편지가 더이상 없어요.',
}: EmptyStateCardProps) {
  return (
    <div
      className='flex items-center justify-center rounded-lg'
      style={{
        width: '130px',
        height: '100px',
        backgroundColor: '#F6F6F6', // rgb(246, 246, 246) - 피그마: rgb(0.964, 0.964, 0.964)
      }}
    >
      {/* 안내 문구 */}
      <p
        className='text-center px-4'
        style={{
          color: 'rgba(0, 0, 0, 0.4)',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,
          fontFamily: 'Pretendard',
        }}
      >
        {message}
      </p>
    </div>
  );
}

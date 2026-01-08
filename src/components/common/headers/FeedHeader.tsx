import { useNavigate } from 'react-router-dom';

interface FeedHeaderProps {
  title?: string;
}

export default function FeedHeader({ title = '공개 편지' }: FeedHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header
      className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-4 py-3'
      style={{
        backgroundColor: '#F9F9F9',
        height: '50px',
        width: '375px',
        transform: 'translateX(-50%)',
      }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className='absolute left-4 flex items-center justify-center'
        aria-label='뒤로가기'
        style={{
          width: '18px',
          height: '18px',
        }}
      >
        <svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
          <path
            d='M7.5 13.5L1.5 7.5L7.5 1.5'
            stroke='#171717'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 제목 */}
      <h1
        style={{
          fontFamily: 'Pretendard',
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '28.8px',
          color: '#171717',
        }}
      >
        {title}
      </h1>
    </header>
  );
}

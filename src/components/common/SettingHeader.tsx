import React from 'react';

interface SettingHeaderProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  bgColor?: string;
}

const SettingHeader: React.FC<SettingHeaderProps> = ({
  title,
  onBack,
  right,
  bgColor = 'var(--color-bg-500)',
}) => {
  return (
    <header
      className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-[21px] py-[13px]'
      style={{
        backgroundColor: bgColor,
        height: '50px',
        width: '100%',
        maxWidth: '375px',
        transform: 'translateX(-50%)',
      }}
    >
      {/* 뒤로가기 버튼 */}
      {onBack && (
        <button
          onClick={onBack}
          className='absolute left-[21px] flex items-center justify-center'
          aria-label='뒤로가기'
          style={{ width: '18px', height: '18px' }}
        >
          <svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
            <path
              d='M7.5 13.5L1.5 7.5L7.5 1.5'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}
      {/* 제목 */}
      <h1
        className='text-center'
        style={{
          fontFamily: 'Pretendard',
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '28.8px',
          color: '#000000',
        }}
      >
        {title}
      </h1>
      {/* 우측 영역 (옵션) */}
      {right && <div className='absolute right-[21px]'>{right}</div>}
    </header>
  );
};

export default SettingHeader;

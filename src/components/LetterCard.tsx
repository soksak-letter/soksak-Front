import type { Letter } from '../types/letter';

interface LetterCardProps {
  letter: Letter;
  onClick: () => void;
}

const variantStyles = {
  blue: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    flap: 'bg-blue-200',
    flapBorder: 'border-blue-400',
    shadow: 'shadow-blue-200/50',
  },
  pink: {
    bg: 'bg-pink-100',
    border: 'border-pink-300',
    flap: 'bg-pink-200',
    flapBorder: 'border-pink-400',
    shadow: 'shadow-pink-200/50',
  },
  yellow: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    flap: 'bg-yellow-200',
    flapBorder: 'border-yellow-400',
    shadow: 'shadow-yellow-200/50',
  },
};

export default function LetterCard({ letter, onClick }: LetterCardProps) {
  const variant = letter.variant || 'blue';
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className='relative w-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      aria-label={`${letter.title} 편지 열기`}
      style={{ aspectRatio: '1.5 / 1' }}
    >
      {/* 편지봉투 본체 */}
      <div
        className={`relative ${styles.bg} ${styles.border} border-2 rounded-lg p-4 shadow-lg ${styles.shadow} overflow-hidden h-full`}
      >
        {/* 봉투 윗부분 삼각형 플랩 */}
        <div className='absolute top-0 left-0 right-0 h-0'>
          <div
            className={`absolute top-0 left-0 w-0 h-0 border-l-[calc(50%-1px)] border-l-transparent border-r-[calc(50%-1px)] border-r-transparent border-t-[40px] ${styles.flapBorder}`}
            style={{
              borderTopColor: 'inherit',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <div
            className={`absolute top-0 left-0 w-0 h-0 border-l-[50%] border-l-transparent border-r-[50%] border-r-transparent border-t-[38px] ${styles.flap}`}
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '2px',
            }}
          />
        </div>

        {/* 편지 내용 영역 - 오른쪽 하단 */}
        <div className='absolute bottom-3 right-3 z-10 text-right'>
          {/* 제목 - 5자 제한 */}
          <h3 className='text-sm font-semibold text-gray-800 mb-1'>
            {letter.title.length > 5 ? `${letter.title.slice(0, 5)}...` : letter.title}
          </h3>

          {/* 날짜 */}
          <p className='text-xs text-gray-600'>{letter.date}</p>
        </div>

        {/* 봉투 테두리 라인 효과 */}
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30'></div>
      </div>
    </button>
  );
}

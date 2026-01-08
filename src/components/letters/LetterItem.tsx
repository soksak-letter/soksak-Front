import type { Letter } from '../../types/letter';

interface LetterCardProps {
  letter: Letter;
  onClick: () => void;
}

// 피그마 디자인에서 추출한 정확한 색상값
const variantStyles = {
  blue: {
    bg: '#E2F3FE', // rgb(226, 243, 254) - 피그마: rgb(0.884, 0.953, 0.996)
    line: '#AEDEFA', // rgb(174, 222, 250) - 피그마: rgb(0.682, 0.871, 0.988)
  },
  pink: {
    bg: '#FFC8C6', // rgb(255, 200, 198) - 피그마: rgb(0.999, 0.786, 0.776)
    line: '#FFA39E', // rgb(255, 163, 158) - 피그마: rgb(0.999, 0.639, 0.621)
  },
  yellow: {
    bg: '#F3EFB9', // rgb(243, 239, 185) - 피그마: rgb(0.951, 0.936, 0.747)
    line: '#D9D6AA', // rgb(217, 214, 170) - 피그마: rgb(0.854, 0.840, 0.666)
  },
};

export default function LetterCard({ letter, onClick }: LetterCardProps) {
  const variant = letter.variant || 'blue';
  const colors = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className="relative w-full transition-all duration-300 ease-out hover:scale-105 focus:outline-none"
      aria-label={`${letter.title} 편지 열기`}
      style={{
        width: '130px',
        height: '100px',
      }}
    >
      {/* 편지봉투 본체 */}
      <div
        className="relative rounded-lg overflow-hidden h-full"
        style={{
          backgroundColor: colors.bg,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 봉투 플랩 라인 (사선) */}
        <svg
          className="absolute"
          style={{
            left: '2.5px',
            top: '2.5px',
            width: '125px',
            height: '45px',
          }}
          viewBox="0 0 125 45"
          fill="none"
        >
          <path
            d="M0 0 L62.5 45 L125 0"
            stroke={colors.line}
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* 편지 내용 영역 - 오른쪽 하단 */}
        <div
          className="absolute flex flex-col items-end"
          style={{
            bottom: '12px',
            right: '12px',
            width: '78px',
          }}
        >
          {/* 제목 */}
          <h3
            className="text-sm font-semibold text-right w-full overflow-hidden"
            style={{
              color: '#171717',
              fontSize: '14px',
              lineHeight: '23.8px',
              fontWeight: 600,
              fontFamily: 'Pretendard',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {letter.title}
          </h3>

          {/* 날짜 */}
          <p
            className="text-xs text-right w-full overflow-hidden"
            style={{
              color: '#171717',
              fontSize: '12px',
              lineHeight: '19.2px',
              fontWeight: 500,
              fontFamily: 'Pretendard',
              marginTop: '0px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {letter.date}
          </p>
        </div>
      </div>
    </button>
  );
}

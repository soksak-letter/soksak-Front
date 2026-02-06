import type { FeedLetter } from '../../types/letter';

interface ReportLetterItemProps {
  letter: FeedLetter;
  onClick: () => void;
}

const variantStyles = {
  blue: { bg: '#E2F3FE', line: '#AEDEFA' },
  pink: { bg: '#FFC8C6', line: '#FFA39E' },
  yellow: { bg: '#F3EFB9', line: '#D9D6AA' },
};

type VariantKey = keyof typeof variantStyles; // 'blue' | 'pink' | 'yellow'

const paperIdToVariant = (paperId?: number): VariantKey => {
  switch (paperId) {
    case 1:
      return 'blue';
    case 2:
      return 'pink';
    case 3:
      return 'yellow';
    default:
      return 'blue';
  }
};

export default function ReportLetterItem({ letter, onClick }: ReportLetterItemProps) {
  const variant = paperIdToVariant(letter.paperId);
  const colors = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className='relative w-[104px] h-[80px] transition-all duration-300 ease-out hover:brightness-95 active:scale-95'
      aria-label={`${letter.title} 편지 열기`}
      style={{
        width: '104px',
        height: '80px',
      }}
    >
      <div
        className='relative rounded-lg overflow-hidden h-full w-full'
        style={{
          backgroundColor: colors.bg,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)', // 리포트에서는 그림자를 더 연하게
        }}
      >
        {/* 봉투 플랩 라인: 104x80 비율에 맞게 좌표 재설정 */}
        <svg className='absolute left-0 top-0 w-full h-full' viewBox='0 0 104 80' fill='none'>
          <path
            d='M2 2 L48 32 Q52 35 56 32 L102 2' // 중앙 뾰족한 부분을 35px 정도로 조절
            stroke={colors.line}
            strokeWidth='1.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

        {/* 텍스트 영역: 패딩 최소화 및 폰트 사이즈 하향 */}
        <div className='absolute flex flex-col items-end right-2.5 bottom-2.5 left-2.5'>
          <h3
            className='ty-detailMedium w-full overflow-hidden truncate '
            style={{
              lineHeight: '1.4',
            }}
          >
            {letter.title}
          </h3>
        </div>
      </div>
    </button>
  );
}

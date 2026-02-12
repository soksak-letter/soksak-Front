import { DEFAULT_THEME, makeEnvelopeLineColor, PAPER_THEME } from '@/constants/paperTheme';
import type { FeedLetter } from '@/types/letter';
import { formatDate } from '@/utils/date';

interface LetterItemProps {
  letter: FeedLetter;
  // eslint-disable-next-line no-unused-vars
  onClick: (letterId: number) => void;
}

export default function LetterItem({ letter, onClick }: LetterItemProps) {
  const theme = PAPER_THEME[letter.paperId ?? 1] ?? DEFAULT_THEME;
  const lineColor = makeEnvelopeLineColor(theme.bg);

  return (
    <button
      onClick={() => onClick(letter.letterId)}
      className='relative w-full transition-all duration-300 ease-out hover:scale-105 focus:outline-none'
      aria-label={`${letter.title} 편지 열기`}
      style={{
        width: '130px',
        height: '100px',
      }}
    >
      {/* 편지봉투 본체 */}
      <div
        className='relative rounded-lg overflow-hidden h-full'
        style={{
          backgroundColor: theme.bg,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 봉투 플랩 라인 (사선) */}
        <svg
          className='absolute'
          style={{
            left: '2.5px',
            top: '2.5px',
            width: '125px',
            height: '45px',
          }}
          viewBox='0 0 125 45'
          fill='none'
        >
          <path
            d='M0 0 L62.5 45 L125 0'
            stroke={lineColor}
            strokeWidth='1'
            strokeLinecap='round'
            fill='none'
          />
        </svg>

        {/* 편지 내용 영역 - 오른쪽 하단 */}
        <div
          className='absolute flex flex-col items-end'
          style={{
            bottom: '12px',
            right: '12px',
            width: '78px',
          }}
        >
          {/* 제목 */}
          <h3
            className='text-sm font-semibold text-right w-full overflow-hidden'
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
            className='text-xs text-right w-full overflow-hidden'
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
            {formatDate(letter.deliveredAt)}
          </p>
        </div>
      </div>
    </button>
  );
}

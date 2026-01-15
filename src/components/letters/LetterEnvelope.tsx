type LetterEnvelopeProps = {
  paperColor: string;
  stampSrc: string;
  stampAlt: string;
  className?: string;
};

export default function LetterEnvelope({
  paperColor,
  stampSrc,
  stampAlt,
  className,
}: LetterEnvelopeProps) {
  return (
    <div
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        width: 296.45,
        height: 162.52,
        backgroundColor: paperColor,
        border: '1px solid rgba(0,0,0,0.15)',
      }}
    >
      {/* 우표 */}
      {stampSrc && (
        <div
          className='absolute'
          style={{
            top: 70,
            right: 15,
            width: 56,
            height: 76,
            transform: 'rotate(3deg)',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          <img
            src={stampSrc}
            alt={stampAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}
      {/* V자 봉투 플랩 */}
      <svg
        className='absolute left-1/2 top-0 -translate-x-1/2'
        width={297}
        height={101.7}
        viewBox='0 0 325 111.5'
        fill='none'
        style={{ pointerEvents: 'none' }}
      >
        {/* 좌상단 -> 중앙하단 */}
        <path d='M 0 0 L 162.5 111.5' stroke='rgba(0,0,0,0.20)' strokeWidth={1} />
        {/* 우상단 -> 중앙하단 */}
        <path d='M 325 0 L 162.5 111.5' stroke='rgba(0,0,0,0.20)' strokeWidth={1} />
      </svg>
    </div>
  );
}

type LetterEnvelopeProps = {
  paperColor: string;
  stampColor: string;
  className?: string;
};

export default function LetterEnvelope({ paperColor, stampColor, className }: LetterEnvelopeProps) {
  return (
    <div
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        width: 326,
        height: 183,
        backgroundColor: paperColor,
        border: '1px solid rgba(0,0,0,0.15)',
      }}
    >
      {/* V자 봉투 플랩 */}
      <svg
        className='absolute left-1/2 top-0 -translate-x-1/2'
        width={325}
        height={111.5}
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

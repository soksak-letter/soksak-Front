type LetterCardProps = {
  paperColor: string;
  font: string;
  value: { title: string; content: string };
  className?: string;
};

const CARD_W = 309.52;
const CARD_H = 493.72;

const PADDING_TOP = 56;
const PADDING_X = 22;
const PADDING_BOTTOM = 24;

const LetterCard = ({ paperColor, font, value, className }: LetterCardProps) => {
  return (
    <div className='flex justify-center'>
      <div
        className={['relative overflow-hiden', className].filter(Boolean).join(' ')}
        style={{
          width: CARD_W,
          height: CARD_H,
          backgroundColor: paperColor,
          border: '1px solid rgba(0,0,0,0.15)',
          fontFamily: font,
        }}
      >
        <div className='absolute inset-0 pointer-events-none'>
          {/* TODO: 여기에 SVG/패턴 넣기 */}
        </div>

        {/* 고정 라인 레이어 */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            paddingTop: PADDING_TOP,
            paddingLeft: PADDING_X,
            paddingRight: PADDING_X,
            paddingBottom: PADDING_BOTTOM,
            opacity: 0.35,
          }}
        >
          <Lines />
        </div>

        {/* 텍스트 레이어 (라인 위) */}
        <div
          className='relative z-10'
          style={{
            paddingTop: 18,
            paddingLeft: PADDING_X,
            paddingRight: PADDING_X,
            paddingBottom: PADDING_BOTTOM,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 제목 */}
          <div style={{ marginBottom: 14 }}>
            <p
              className='font-semibold'
              style={{
                fontSize: 18,
                lineHeight: '24px',
                color: '#171717',
                wordBreak: 'break-word',
              }}
            >
              {value.title}
            </p>
          </div>

          {/* 내용 */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p
              style={{
                fontSize: 14,
                lineHeight: '24px',
                color: '#171717',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {value.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;

function Lines() {
  // 카드 높이에서 padding 영역을 제외한 라인 영역 높이
  const availableH = CARD_H - PADDING_TOP - PADDING_BOTTOM;
  const lineHeight = 24;
  const count = Math.floor(availableH / lineHeight);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: lineHeight,
            borderBottom: '1px solid rgba(0,0,0,0.22)',
          }}
        />
      ))}
    </div>
  );
}

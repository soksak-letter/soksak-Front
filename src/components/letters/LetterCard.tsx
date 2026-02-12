import React from 'react';

type LetterCardProps = {
  PaperBg: React.ComponentType<{ className?: string }>;
  font: string;
  fontStyle: {
    titleSize: number;
    bodySize: number;
    lineHeight: number;
    letterSpacing?: number;
  };
  value: { title: string; content: string };
  className?: string;
};

const CARD_W = 309.52;
const CARD_H = 493.72;

const PADDING_X = 40;
const PADDING_BOTTOM = 24;

const LetterCard = ({ PaperBg, font, fontStyle, value, className }: LetterCardProps) => {
  const titleTextStyle: React.CSSProperties = {
    fontFamily: `${font}, var(--font-pretendard)`,
    fontSize: fontStyle.titleSize,
    lineHeight: fontStyle.lineHeight,
    letterSpacing: fontStyle.letterSpacing,
  };

  const bodyTextStyle: React.CSSProperties = {
    fontFamily: `${font}, var(--font-pretendard)`,
    fontSize: fontStyle.bodySize,
    lineHeight: fontStyle.lineHeight,
    letterSpacing: fontStyle.letterSpacing,
  };

  return (
    <div className='flex justify-center'>
      <div
        className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
        style={{
          width: CARD_W,
          height: CARD_H,
          border: 'none',
          fontFamily: font,
        }}
      >
        <div className='absolute inset-0 pointer-events-none'>
          {PaperBg && <PaperBg className='absolute inset-0 w-full h-full' />}
        </div>

        {/* 텍스트 레이어 */}
        <div
          className='relative z-10'
          style={{
            paddingTop: 40,
            paddingLeft: PADDING_X,
            paddingRight: PADDING_X,
            paddingBottom: PADDING_BOTTOM,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 제목 */}
          <div style={{ marginBottom: 5 }}>
            <p className='font-semibold' style={titleTextStyle}>
              {value.title}
            </p>
          </div>

          {/* 내용 */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={bodyTextStyle}>{value.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;

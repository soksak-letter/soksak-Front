import React from 'react';

type LetterCardProps = {
  PaperBg: React.ComponentType<{ className?: string }>;
  font: string;
  value: { title: string; content: string };
  className?: string;
};

const CARD_W = 309.52;
const CARD_H = 493.72;

const PADDING_X = 40;
const PADDING_BOTTOM = 24;

const LetterCard = ({ PaperBg, font, value, className }: LetterCardProps) => {
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

        {/* 텍스트 레이어 (라인 위) */}
        <div
          className='relative z-10'
          style={{
            paddingTop: 28,
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
                lineHeight: '19px',
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

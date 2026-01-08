import { useState } from 'react';

export type LetterPreviewVariant = 'blue' | 'green' | 'yellow';

interface LetterPreviewCardProps {
  title: string;
  content: string;
  likes: number;
  variant?: LetterPreviewVariant;
  isExpandable?: boolean;
  onLike?: () => void;
}

const variantColors: Record<LetterPreviewVariant, string> = {
  blue: '#E1F2FD',
  green: '#D8F3EE',
  yellow: '#FFF9E2',
};

const variantTitleColors: Record<LetterPreviewVariant, string> = {
  blue: '#171717',
  green: '#000000',
  yellow: '#000000',
};

export default function LetterPreviewCard({
  title,
  content,
  likes,
  variant = 'blue',
  isExpandable = false,
  onLike,
}: LetterPreviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const backgroundColor = variantColors[variant];
  const titleColor = variantTitleColors[variant];

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='w-full rounded-lg overflow-hidden shadow-sm'>
      {/* 제목 섹션 */}
      <div
        className='px-4 py-2.5'
        style={{
          backgroundColor,
        }}
      >
        <h3
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '23.8px',
            color: titleColor,
          }}
        >
          {title}
        </h3>
      </div>

      {/* 본문 섹션 */}
      <div
        className='px-4 py-2.5'
        style={{
          backgroundColor: '#FFFFFF',
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '23.8px',
            color: '#171717',
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : 6,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {content}
        </p>
      </div>

      {/* 하단 섹션 (펼치기/좋아요) */}
      <div
        className='px-4 pb-2.5'
        style={{
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 펼치기 버튼 (내용이 긴 경우에만) */}
        {isExpandable && (
          <div className='mb-2'>
            <button
              onClick={handleExpand}
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#8C8C8C',
              }}
            >
              {isExpanded ? '접기' : '펼치기'}
            </button>
          </div>
        )}

        {/* 구분선 */}
        <div
          className='w-full mb-2'
          style={{
            height: '1px',
            backgroundColor: '#CBCCCD',
          }}
        />

        {/* 좋아요 */}
        <div className='flex items-center gap-1'>
          <button onClick={handleLike} className='flex items-center justify-center w-[22px] h-[22px]'>
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M11 19.5L9.55 18.2C5.4 14.5 2.75 12.14 2.75 9.25C2.75 6.89 4.49 5.15 6.85 5.15C8.18 5.15 9.46 5.77 10.34 6.74H11.66C12.54 5.77 13.82 5.15 15.15 5.15C17.51 5.15 19.25 6.89 19.25 9.25C19.25 12.14 16.6 14.5 12.45 18.2L11 19.5Z'
                fill={isLiked ? '#F55449' : '#FFFFFF'}
                stroke={isLiked ? '#F55449' : '#8C8C8C'}
                strokeWidth='1.5'
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '19.2px',
              color: '#595959',
            }}
          >
            {likes}
          </span>
        </div>
      </div>
    </div>
  );
}

import { memo, useState } from 'react';
import { PAPER_THEME, DEFAULT_THEME } from '@/constants/paperTheme';

interface LetterPreviewCardProps {
  letterId: number;
  title: string;
  content: string;
  paperId: number;
  likes: number;
  isLiked: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggleLike?: (letterId: number, isLiked: boolean) => void;
  disabled?: boolean;
  isLikeLoading?: boolean;
}

function LetterPreviewCard({
  letterId,
  title,
  content,
  paperId,
  likes,
  isLiked,
  onToggleLike,
  disabled,
  isLikeLoading,
}: LetterPreviewCardProps) {
  console.log('LetterPreviewCard 렌더', {
    letterId,
    title,
    likes,
    isLiked,
    isLikeLoading,
    disabled,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = PAPER_THEME[paperId] ?? DEFAULT_THEME;
  const backgroundColor = theme.bg;
  const titleColor = theme.title;

  // 글자 수가 230자 이상인 경우 펼치기 버튼 표시
  const isExpandable = content.length >= 230;

  const handleExpand = () => setIsExpanded((p) => !p);

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
          <div className='mb-2 flex justify-end'>
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
        <div className='flex items-center gap-1 justify-end'>
          <button
            onClick={() => {
              console.log('LetterPreviewCard 좋아요 클릭', { letterId, isLiked });
              if (onToggleLike) {
                onToggleLike(letterId, isLiked);
              }
            }}
            disabled={disabled}
            className='flex items-center justify-center w-[22px] h-[22px] disabled:opacity-50'
          >
            {isLikeLoading ? (
              <svg className='animate-spin' width='18' height='18' viewBox='0 0 24 24' fill='none'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='#F55449'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='#F55449'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                />
              </svg>
            ) : (
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
                <path
                  d='M11 19.5L9.55 18.2C5.4 14.5 2.75 12.14 2.75 9.25C2.75 6.89 4.49 5.15 6.85 5.15C8.18 5.15 9.46 5.77 10.34 6.74H11.66C12.54 5.77 13.82 5.15 15.15 5.15C17.51 5.15 19.25 6.89 19.25 9.25C19.25 12.14 16.6 14.5 12.45 18.2L11 19.5Z'
                  fill={isLiked ? '#F55449' : '#FFFFFF'}
                  stroke='#F55449'
                  strokeWidth='1.5'
                />
              </svg>
            )}
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

function areEqual(prevProps: LetterPreviewCardProps, nextProps: LetterPreviewCardProps) {
  return (
    prevProps.letterId === nextProps.letterId &&
    prevProps.title === nextProps.title &&
    prevProps.content === nextProps.content &&
    prevProps.paperId === nextProps.paperId &&
    prevProps.likes === nextProps.likes &&
    prevProps.isLiked === nextProps.isLiked &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.isLikeLoading === nextProps.isLikeLoading
  );
}

export default memo(LetterPreviewCard, areEqual);

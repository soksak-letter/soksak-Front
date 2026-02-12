import { useCallback, useMemo, useState } from 'react';
import FeedHeader from '../common/headers/FeedHeader';
import LetterPreviewCard from './LetterPreviewCard';
import EmptyFeedCard from './EmptyFeedCard';
import FloatingButton from '../common/FloatingButton';
import { LoadingDots } from '@/components/LoadingDots';
import useCountdown from '@/hooks/auth/useCountdown';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import LoadingPage from '@/pages/system/LoadingPage';
import ErrorPage from '@/pages/system/ErrorPage';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import { useCreateLike, useDeleteLike } from '@/hooks/useCreateLetterLike';
import type { PublicFeedDetail } from '@/types/dto/feed';
import type { FeedLetter } from '@/types/letter';

const PAGE_SIZE = 10;

interface FeedPageLetter extends FeedLetter {
  content: string;
  likes: number;
  isLiked: boolean;
}

interface FeedPageTemplateProps {
  title: string;
  navigateTo: string;
  letters: PublicFeedDetail[] | undefined;
  isLettersLoading: boolean;
}

export default function FeedPageTemplate({
  title,
  navigateTo,
  letters: rawLetters,
  isLettersLoading,
}: FeedPageTemplateProps) {
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useDailyQuestion();

  const createLike = useCreateLike();
  const deleteLike = useDeleteLike();

  const letters = useMemo<FeedPageLetter[]>(
    () =>
      rawLetters?.map((l) => ({
        letterId: l.id,
        title: l.title ?? '',
        content: l.content ?? '',
        likes: l.likes ?? 0,
        isLiked: l.isLiked ?? false,
        deliveredAt: l.deliveredAt ?? '',
        paperId: l.design?.paper?.id ?? 1,
      })) ?? [],
    [rawLetters],
  );

  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const hasMore = displayCount < letters.length;

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, letters.length));
  }, [letters.length]);

  const sentinelRef = useIntersectionObserver({
    onIntersect: handleLoadMore,
    enabled: hasMore,
    resetKey: displayCount,
  });

  const visibleLetters = useMemo(() => letters.slice(0, displayCount), [letters, displayCount]);

  const handleToggleLike = (letterId: number, isLiked: boolean) => {
    if (createLike.isPending || deleteLike.isPending) return;

    if (isLiked) deleteLike.mutate(letterId);
    else createLike.mutate(letterId);
  };

  const deadlineMs = useMemo(() => {
    if (!questionData?.expiredAt) return null;
    const t = new Date(questionData.expiredAt).getTime();
    return Number.isNaN(t) ? null : t;
  }, [questionData?.expiredAt]);

  const { formattedTime } = useCountdown(deadlineMs ?? Date.now() + 60000);

  const isLoading = isQuestionLoading || isLettersLoading;
  const isError = isQuestionError;

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const formattedQuestionText = (questionData?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  return (
    <div className='min-h-dvh pb-24 bg-[var(--color-bg-500)]'>
      {/* 고정 상단바 */}
      <FeedHeader title={title} />
      {/* 상단바 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 상단 질문 섹션 */}
      <div className='flex flex-col items-start p-5 -mt-3 gap-2'>
        <p className='text-[var(--color-primary-heavy)] ty-title2 w-[251px] whitespace-pre-line'>
          {formattedQuestionText}
        </p>
        <div className='flex items-center ty-body2'>
          <span className='text-[var(--color-primary-500)]'>{formattedTime}</span>
          <span className='text-[var(--color-primary-heavy)] ml-1'>후에 질문이 사라져요.</span>
        </div>
      </div>

      {/* 편지 리스트 섹션 */}
      <section className='px-4 py-4 space-y-4'>
        {visibleLetters.map((l) => (
          <LetterPreviewCard
            key={l.letterId}
            title={l.title}
            content={l.content}
            paperId={l.paperId}
            likes={l.likes}
            isLiked={l.isLiked}
            disabled={createLike.isPending || deleteLike.isPending}
            isLikeLoading={
              (createLike.isPending && createLike.variables === l.letterId) ||
              (deleteLike.isPending && deleteLike.variables === l.letterId)
            }
            onToggleLike={() => handleToggleLike(l.letterId, l.isLiked)}
          />
        ))}
        {!hasMore && letters.length <= 1 && <EmptyFeedCard />}

        {hasMore && (
          <div className='flex justify-center py-4'>
            <LoadingDots fillIntervalMs={350} />
          </div>
        )}
        <div ref={sentinelRef} className='h-1' />
      </section>

      {/* 플로팅 버튼 */}
      <FloatingButton text='나도 편지 작성하기' navigateTo={navigateTo} />
    </div>
  );
}

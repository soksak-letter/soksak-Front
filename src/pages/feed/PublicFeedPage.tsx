import { useMemo } from 'react';
import FeedHeader from '../../components/common/headers/FeedHeader';
import LetterPreviewCard from '../../components/feed/LetterPreviewCard';
import FloatingButton from '../../components/common/FloatingButton';
import LoadingPage from '../system/LoadingPage';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import useCountdown from '@/hooks/useCountdown';
import ErrorPage from '../system/ErrorPage';
import { useOtherPublicFeed } from '@/hooks/usePublicFeed';
import { useCreateLike, useDeleteLike } from '@/hooks/useCreateLetterLike';
import EmptyFeedCard from '@/components/feed/EmptyFeedCard';

interface FeedLetter {
  letterId: number; // =letterId, 좋아요 클릭시 해당 id 기반으로 요청
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  deliveredAt: string;
  paperId: number;
}

export default function FeedPage() {
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useDailyQuestion();

  const { data: publicLetters, isLoading: isLettersLoading } = useOtherPublicFeed();
  const createLike = useCreateLike();
  const deleteLike = useDeleteLike();

  const letters = useMemo<FeedLetter[]>(
    () =>
      publicLetters?.map((l) => ({
        letterId: l.id,
        title: l.title ?? '',
        content: l.content ?? '',
        likes: l.likes ?? 0,
        isLiked: l.isLiked ?? false,
        deliveredAt: l.deliveredAt ?? '',
        paperId: l.design?.paper?.id ?? 1,
      })) ?? [],
    [publicLetters],
  );

  const handleLike = (letterId: number, nextLiked: boolean) => {
    if (createLike.isPending || deleteLike.isPending) return;
    if (nextLiked) createLike.mutate(letterId);
    else deleteLike.mutate(letterId);
  };

  const deadlineMs = useMemo(() => {
    if (!questionData?.expiredAt) return null;
    const t = new Date(questionData.expiredAt).getTime();
    return Number.isNaN(t) ? null : t;
  }, [questionData?.expiredAt]);

  const { mmss } = useCountdown(deadlineMs ?? Date.now() + 60000);

  const isLoading = isQuestionLoading || isLettersLoading;
  const isError = isQuestionError;

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const formattedQuestionText = (questionData?.content ?? '').replace(/^질문\s*#\d+:\s*/, '');

  return (
    <div className='min-h-dvh' style={{ backgroundColor: '#FAFAFA' }}>
      {/* 고정 상단바 */}
      <FeedHeader title='공개 편지' />

      {/* 상단바 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 상단 질문 섹션 */}
      <div className='flex flex-col items-start p-5 -mt-3 gap-2'>
        {isQuestionLoading ? (
          <>
            <LoadingPage />
          </>
        ) : (
          <>
            <p className='text-black ty-title2 w-[251px] whitespace-pre-line'>
              {formattedQuestionText}
            </p>
            <div className='flex items-center ty-body2'>
              <span className='text-[#F2261C]'>{mmss}</span>
              <span className='text-black ml-1'>후에 질문이 사라져요.</span>
            </div>
          </>
        )}
      </div>

      {/* 편지 리스트 섹션 */}
      <section className='px-4 py-4 space-y-4'>
        {letters.map((l) => (
          <LetterPreviewCard
            key={l.letterId}
            title={l.title}
            content={l.content}
            paperId={l.paperId}
            likes={l.likes}
            isLikedInitial={l.isLiked}
            onLike={(nextLiked) => handleLike(l.letterId, nextLiked)}
          />
        ))}
        {letters.length <= 1 && <EmptyFeedCard />}
      </section>

      {/* 플로팅 버튼 */}
      <FloatingButton text='나도 편지 작성하기' navigateTo='/letter/anon/draft' />
    </div>
  );
}

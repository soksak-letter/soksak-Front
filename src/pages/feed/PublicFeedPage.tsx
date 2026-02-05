import { useMemo } from 'react';
import FeedHeader from '../../components/common/headers/FeedHeader';
import LetterPreviewCard from '../../components/feed/LetterPreviewCard';
import FloatingButton from '../../components/common/FloatingButton';
import type { LetterPreviewVariant } from '../../components/feed/LetterPreviewCard';
import LoadingPage from '../system/LoadingPage';
import { useDailyQuestion } from '@/hooks/letters/useDailyQuestion';
import useCountdown from '@/hooks/useCountdown';
import ErrorPage from '../system/ErrorPage';
import { useOtherPublicFeed } from '@/hooks/usePublicFeed';

interface FeedLetter {
  id: string;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  deliveredAt: string;
  paperId: number;
  variant: LetterPreviewVariant;
}

export default function FeedPage() {
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useDailyQuestion();

  const { data: publicLetters, isLoading: isLettersLoading } = useOtherPublicFeed();

  const handleLike = (id: string) => {
    // TODO : 좋아요 연동
    console.log('좋아요', id);
  };
  const letters = useMemo<FeedLetter[]>(
    () =>
      publicLetters?.map((l) => ({
        id: String(l.id),
        title: l.title ?? '',
        content: l.content ?? '',
        likes: l.likes ?? 0,
        isLiked: l.isLiked ?? false,
        deliveredAt: l.deliveredAt ?? '',
        paperId: l.design?.paper?.id ?? 1,
        variant: 'public' as LetterPreviewVariant,
      })) ?? [],
    [publicLetters],
  );

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
            key={l.id}
            title={l.title}
            content={l.content}
            likes={l.likes}
            variant={l.variant}
            onLike={() => handleLike}
          />
        ))}
      </section>

      {/* 플로팅 버튼 */}
      <FloatingButton text='나도 편지 작성하기' navigateTo='/letter/anon/draft' />
    </div>
  );
}

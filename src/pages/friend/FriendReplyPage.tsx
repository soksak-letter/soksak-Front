import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLetterDetail } from '@/hooks/letters/useLetterDetail';
import { useMemo } from 'react';

import BackHeader from '@/components/common/headers/BackHeader';
import { Button } from '@/components/common/Button';
import { LoadingDots } from '@/components/LoadingDots';
import NotFoundPage from '../system/NotFoundPage';
import LetterCard from '@/components/letters/LetterCard';
import { DEFAULT_FONT_ID, FONT_ASSET_MAP } from '@/constants/fontAssets';
import { DEFAULT_PAPER_ID, PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { useLetterStore } from '@/stores/letterStore';
import { getParseSentAt } from '@/utils/date';

type ReplyData = {
  title: string;
  sentAtText: string;
  question: string;
  content: string;
  paperId: number;
  fontId: number;
  stampId: number;
  stampUrl: string;
};

export default function FriendReplyPage() {
  const navigate = useNavigate();

  // letterId, friendId Param으로 불러오기
  const { letterId: letterIdParam, friendId: friendIdParam } = useParams();
  const letterId = letterIdParam ? Number(letterIdParam) : 0;
  const friendId = friendIdParam ? Number(friendIdParam) : 0;

  const { data, isLoading, isError, refetch } = useLetterDetail(letterId);
  const { setActiveTarget, patchDraft } = useLetterStore();

  // FriendName 불러오기
  const location = useLocation();
  const friendName = (location.state as { friendName?: string } | null)?.friendName ?? '친구';
  const direction = (location.state as { direction?: string } | null)?.direction ?? '';

  const view = useMemo<ReplyData | null>(() => {
    if (!data) return null;

    return {
      title: data.title,
      sentAtText: getParseSentAt(data.deliveredAt),
      question: data.question,
      content: data.content,
      paperId: (data.design.paper.id ?? 0) + 1,
      fontId: data.design.font.id ?? 0,
      stampId: data.design.stamp.id ?? 0,
      stampUrl: data.design.stamp.assetUrl ?? '',
    };
  }, [data]);

  const formattedQuestionTitle = (data?.question ?? '').replace(/^질문\s*#\d+:\s*/, '');

  const assets = useMemo(() => {
    if (!view) return null;

    const font = FONT_ASSET_MAP[view.fontId] ?? FONT_ASSET_MAP[DEFAULT_FONT_ID];
    const paper = PAPER_ASSET_MAP[view.paperId] ?? PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

    return { font, paper };
  }, [view]);

  // 잘못된 접근 - 404 처리
  if (!letterIdParam || !friendIdParam || Number.isNaN(friendId)) return <NotFoundPage />;

  const handleReport = () => {
    navigate('/letter/report');
  };

  const handleReply = () => {
    setActiveTarget('friend');

    patchDraft({
      receiverUserId: friendId,
    });

    navigate('/friend/draft', {
      state: {
        friendName,
      },
    });
  };

  const content = isLoading ? (
    <div className='flex flex-col items-center justify-center gap-8 py-70'>
      <LoadingDots fillIntervalMs={350} />
      <p className='ty-title2'>로딩 중...</p>
    </div>
  ) : isError || !view || !assets ? (
    <div className='flex flex-col items-center justify-center gap-8 py-30 text-center'>
      <p className='ty-title3'>편지를 불러오지 못했어요.</p>
      <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
        다시 시도
      </Button>
    </div>
  ) : (
    <>
      {/* 날짜/시간 + 질문 */}
      <p className='ty-body5 text-[var(--color-text-normal)]'>{view.sentAtText}</p>

      <h1 className='mt-1 whitespace-pre-line ty-title2 leading-[140%] text-[var(--color-text-normal)]'>
        {formattedQuestionTitle}
      </h1>

      {/* 편지지 컴포넌트 */}
      <LetterCard
        PaperBg={assets.paper.Preview}
        font={assets.font.fontFamily}
        value={{ title: view.title, content: view.content }}
        className='mt-5'
      />
      {direction === 'received' && (
        <Button className='w-full mt-6' onClick={handleReply}>
          답장하기
        </Button>
      )}
    </>
  );

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader
        title={direction === 'received' ? `${friendName}님의 편지` : '내가 쓴 편지'}
        rightElement={
          direction === 'received' ? (
            <button
              type='button'
              onClick={handleReport}
              className='ty-body5 font-medium text-[var(--color-primary-500)]'
            >
              신고하기
            </button>
          ) : null
        }
      />
      <main className='px-5 pb-[28px]'>{content}</main>
    </div>
  );
}

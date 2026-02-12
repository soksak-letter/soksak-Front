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
import { useModalStore } from '@/stores/modalStore';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { useDiscardSession } from '@/hooks/useDiscardSession';
import { useGlobalToast } from '@/components/toast/ToastProvider';
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

type LetterReplyNavState = {
  isMine?: boolean;
  remainingCount?: number;
};

export default function LetterReplyPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();

  const { letterId: letterIdParam } = useParams();
  const letterId = letterIdParam ? Number(letterIdParam) : 0;
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';
  const senderId = useThreadFlowStore((s) => s.senderId);

  const { data, isLoading, isError, refetch } = useLetterDetail(letterId);
  const discardSession = useDiscardSession();
  const sessionId = useThreadFlowStore((t) => t.sessionId);

  const location = useLocation();
  const navState = (location.state ?? null) as LetterReplyNavState | null;

  const isMine = navState?.isMine ?? false;
  const storedLetterCount = useThreadFlowStore((s) => s.letterCount) ?? 0;
  const fallbackRemaining = Math.max(0, 10 - storedLetterCount);

  const remainingCount = navState?.remainingCount ?? fallbackRemaining;

  const view = useMemo<ReplyData | null>(() => {
    if (!data) return null;

    return {
      title: data.title,
      sentAtText: getParseSentAt(data.deliveredAt),
      question: data.question,
      content: data.content,
      paperId: data.design.paper.id ?? 0,
      fontId: data.design.font.id ?? 0,
      stampId: data.design.stamp.id ?? 0,
      stampUrl: data.design.stamp.assetUrl ?? '',
    };
  }, [data]);

  const stripQuestionPrefix = (s: string) => s.replace(/^질문\s*#\d+:\s*/, '');

  const formattedQuestionTitle = useMemo(() => {
    const q = view?.question ?? data?.question ?? '';
    return stripQuestionPrefix(q);
  }, [view?.question, data?.question]);

  const assets = useMemo(() => {
    if (!view) return null;

    const font = FONT_ASSET_MAP[view.fontId] ?? FONT_ASSET_MAP[DEFAULT_FONT_ID];
    const paper = PAPER_ASSET_MAP[view.paperId] ?? PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

    return { font, paper };
  }, [view]);

  // 잘못된 접근 - 404 처리
  if (!letterIdParam) return <NotFoundPage />;

  const handleReport = () => {
    if (!view) {
      showToast('편지를 불러오는 중이에요. 잠시만 기다려주세요.', 'error');
      return;
    }
    navigate('/letter/report', {
      state: {
        letterId: Number(letterIdParam),
        stampUrl: view?.stampUrl,
        targetUserId: senderId,
      },
    }); //신고페이지로 letterId, targetUserId 보내기
  };

  const handleReply = () => {
    if (!view) {
      showToast('편지를 불러오는 중이에요. 잠시만 기다려주세요.', 'error');
      return;
    }

    if (remainingCount <= 0) {
      navigate(`/letter/sent-transition/${sessionId}`, {
        state: {
          paperId: view.paperId,
          stampUrl: view.stampUrl,
          stampId: view.stampId,
        },
      });
      return;
    }

    navigate('/letter/other/draft', { state: { remainingCount } });
  };

  const handleEnd = () => {
    openModal('conversationRemaining', {
      friendName: senderName,
      remainingCount,
      onContinueConversation: () => {
        // 그냥 닫히고 계속 작성
      },
      onStopConversation: () => {
        if (!sessionId) {
          navigate('/error/404', { replace: true });
          return;
        }

        // patch 요청
        discardSession.mutate(
          { sessionId },
          {
            onSuccess: (res) => {
              if (res.resultType !== 'SUCCESS' || !res.success) {
                showToast('요청에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
                return;
              }
              navigate('/letter/other-stop', {
                state: {
                  paperId: view?.paperId ?? 1,
                  stampId: view?.stampId ?? 1,
                  stampUrl: view?.stampUrl ?? '',
                },
              });
            },
            onError: (err) => {
              console.error(err);
              showToast('요청을 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
            },
          },
        );
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
        paperSrc={assets.paper.src}
        font={assets.font.fontFamily}
        fontStyle={assets.font.style}
        value={{ title: view.title, content: view.content }}
        className='rotate-1 mt-5'
      />

      {!isMine && (
        <div className='mt-6 grid grid-cols-2 gap-3'>
          <Button className='w-full' color='grey' onClick={handleEnd}>
            편지 끝내기
          </Button>
          <Button className='w-full' onClick={handleReply}>
            답장하기
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader
        title={isMine ? '내가 쓴 편지' : `${senderName}님의 편지`}
        rightElement={
          !isMine ? (
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

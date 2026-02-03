import { useNavigate, useParams } from 'react-router-dom';
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

const parseSentAt = (isoOrNull: string | null) => {
  if (!isoOrNull) return '-';

  const d = new Date(isoOrNull);
  if (Number.isNaN(d.getTime())) return '-';

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  let hours = d.getHours(); // 0 ~ 23
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const isPM = hours >= 12;
  const ampm = isPM ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const hh = String(hours).padStart(2, '0');

  return `${y}.${m}.${day} ${hh}:${minutes} ${ampm}`;
};

export default function LetterReplyPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { showToast } = useGlobalToast();

  const { letterId: letterIdParam } = useParams();
  const letterId = letterIdParam ? Number(letterIdParam) : 0;
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';

  const { data, isLoading, isError, refetch } = useLetterDetail(letterId);
  const discardSession = useDiscardSession();
  const threadId = useThreadFlowStore((t) => t.threadId);

  const view = useMemo<ReplyData | null>(() => {
    if (!data) return null;

    return {
      title: data.title,
      sentAtText: parseSentAt(data.deliveredAt),
      question: data.question,
      content: data.content,
      paperId: (data.design.paper.id ?? 0) + 1,
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
    navigate('/letter/report');
  };

  const handleReply = () => {
    navigate('/letter/other/draft');
  };

  const handleEnd = () => {
    openModal('conversationRemaining', {
      friendName: senderName,
      remainingCount: 4,
      onContinueConversation: () => {
        // 그냥 닫히고 계속 작성
      },
      onStopConversation: () => {
        if (!threadId) {
          navigate('/error/404', { replace: true });
          return;
        }

        // patch 요청
        discardSession.mutate(
          { threadId },
          {
            onSuccess: (res) => {
              if (res.resultType !== 'SUCCESS' || !res.success) {
                showToast('요청에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
                return;
              }

              // patch 성공시 응답으로 주고받은 횟수를 받음(maxTurns) > totalCount로 넘김
              const totalCount = res.success.result.data.maxTurns;
              navigate('/letter/other-stop', { state: { totalCount } });
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
        PaperBg={assets.paper.Preview}
        font={assets.font.fontFamily}
        value={{ title: view.title, content: view.content }}
        className='rotate-1 mt-5'
      />

      <div className='mt-6 grid grid-cols-2 gap-3'>
        <Button className='w-full' color='grey' onClick={handleEnd}>
          편지 끝내기
        </Button>
        <Button className='w-full' onClick={handleReply}>
          답장하기
        </Button>
      </div>
    </>
  );

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader
        title={`${senderName}님의 편지`}
        rightElement={
          <button
            type='button'
            onClick={handleReport}
            className='ty-body5 font-medium text-[var(--color-primary-500)]'
          >
            신고하기
          </button>
        }
      />
      <main className='px-5 pb-[28px]'>{content}</main>
    </div>
  );
}

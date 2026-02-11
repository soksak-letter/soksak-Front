import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import PenIcon from '@/assets/icons/PenIcon.svg?react';
import NotFoundPage from '../system/NotFoundPage';
import { useAnonThread } from '@/hooks/mails/useAnonThread';
import { Button } from '@/components/common/Button';
import ThreadSkeleton from '@/components/skeleton/ThreadSkeleton';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { formatDate } from '@/utils/date';

type PostItem = {
  letterId: number;
  title: string;
  deliveredAt: string; // ISO
  dateText: string; // '2026.1.3'
  isMine: boolean; // true: sent, false: received
  isUnread: boolean;
  paperId: number;
  stampId: number;
  stampUrl: string;
};

export default function LetterPostOtherPage() {
  const navigate = useNavigate();
  const { sessionId: sessionIdParam } = useParams();
  const sessionId = sessionIdParam ? Number(sessionIdParam) : 0;

  const setFlow = useThreadFlowStore((s) => s.setFlow);
  const resetFlow = useThreadFlowStore((s) => s.resetFlow);
  const senderName = useThreadFlowStore((s) => s.senderName) ?? '익명';

  const { data, isLoading, isError, refetch } = useAnonThread(sessionId);

  const formattedQuestionTitle = (data?.firstQuestion ?? '').replace(/^질문\s*#\d+:\s*/, '');

  const posts = useMemo<PostItem[]>(() => {
    const letters = data?.letters ?? [];
    return letters.map((l) => ({
      letterId: l.id,
      title: l.title,
      deliveredAt: l.deliveredAt,
      dateText: formatDate(l.deliveredAt),
      isMine: l.isMine,
      isUnread: l.readAt === null,
      paperId: l.design?.paperId ?? 0,
      stampId: l.design?.stampId ?? 0,
      stampUrl: (l.design?.stampUrl ?? '').trim(),
    }));
  }, [data?.letters]);

  // store에 컨텍스트 동기화 (새로고침 대비, 다음 페이지에서 사용하기 위해)
  useEffect(() => {
    setFlow({
      target: 'other',
      sessionId,
      senderName: senderName,
    });
  }, [setFlow, sessionId, senderName]);

  // 레인 분리 + 각 레인 내부는 시간순 유지
  const leftLane = useMemo(() => posts.filter((p) => p.isMine === false), [posts]);
  const rightLane = useMemo(() => posts.filter((p) => p.isMine === true), [posts]);

  // 잘못된 접근 - 404 처리
  if (!sessionIdParam || !sessionId) return <NotFoundPage />;
  if (isLoading) return <ThreadSkeleton title='익명 편지' />;

  const handleOpenLetterDetail = (item: PostItem) => {
    navigate(`/letter/reply/${sessionId}/${item.letterId}`, {
      state: { sessionId, letterId: item.letterId, senderName, isMine: item.isMine },
    });
  };

  const handleWriteReply = () => {
    // 우측 하단 플로팅 펜: 답장 작성(익명 상대에게 보내는 편지 작성)
    navigate('/letter/other/draft');
    // senderName, sessionId는 letterContext store에 저장되어 있다.
  };

  const handleBack = () => {
    // store에 저장해둔 sessionId, letterCount, senderName 삭제
    // flow가 이어져야만 저장 가능
    resetFlow();
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <BackHeader title='익명 편지' onBack={handleBack} />

      <main className='px-5 pb-[110px]'>
        <div className='mt-2 text-[13px] text-[#6F6F6F]'>{senderName}님과 이어진 질문</div>

        <h2 className='mt-1 ty-title1 leading-[30px] text-[#171717] whitespace-pre-line'>
          {formattedQuestionTitle}
        </h2>

        {isError ? (
          <div className='flex flex-col items-center justify-center gap-8 py-30 text-center'>
            <p className='ty-title3'>목록을 불러오지 못했어요.</p>
            <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
              다시 시도
            </Button>
          </div>
        ) : (
          /* 3) 정상 */
          <>
            {/* 바깥은 2열, 안쪽은 각 레인 flex-col */}
            <div className='mt-6 grid grid-cols-2 gap-x-[34px] items-start'>
              {/* 왼쪽 레인 (received) */}
              <div className='flex flex-col gap-[41px]'>
                {leftLane.map((p) => {
                  const envelopeAsset = ENVELOPE_ASSET_MAP[p.paperId];
                  const EnvelopePreview = envelopeAsset?.Preview;

                  return (
                    <PostCard
                      key={p.letterId}
                      item={p}
                      EnvelopePreview={EnvelopePreview}
                      onClick={() => handleOpenLetterDetail(p)}
                    />
                  );
                })}
              </div>

              {/* 오른쪽 레인 (sent) - 상단 41px 오프셋 */}
              <div className='flex flex-col gap-[41px] pt-[41px]'>
                {rightLane.map((p) => {
                  const envelopeAsset = ENVELOPE_ASSET_MAP[p.paperId];
                  const EnvelopePreview = envelopeAsset?.Preview;

                  return (
                    <PostCard
                      key={p.letterId}
                      item={p}
                      EnvelopePreview={EnvelopePreview}
                      onClick={() => handleOpenLetterDetail(p)}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>

      {/* 플로팅 작성 버튼 */}
      <button
        type='button'
        onClick={handleWriteReply}
        className='fixed bottom-[112px] right-[calc(50%-187px+20px)] z-50
          h-[56px] w-[56px] rounded-full bg-[var(--color-primary-500)] text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
      >
        <PenIcon className='ml-3.5' />
      </button>
    </div>
  );
}

function PostCard({
  item,
  EnvelopePreview,
  onClick,
}: {
  item: PostItem;
  EnvelopePreview?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <button type='button' onClick={onClick} className='text-left'>
      <div className='relative w-full aspect-[13/10] max-w-[160px]'>
        {EnvelopePreview ? (
          <EnvelopePreview className='h-full w-full' />
        ) : (
          <div className='h-full w-full rounded-xl bg-[#F2F2F2]' />
        )}

        {/* 우표(백엔드 assetUrl로) */}
        {!!item.stampUrl && (
          <img
            src={item.stampUrl}
            alt='우표'
            className='
              absolute
              right-[14px] bottom-[14px]
              h-[34px] w-[34px]
              pointer-events-none
            '
          />
        )}
      </div>
      <div className='ml-3'>
        <p className='mt-3 line-clamp-1 ty-body4'>{item.title}</p>

        <div className='mt-1 flex items-center gap-1'>
          <p className='ty-detailMedium'>{item.dateText}</p>
          {item.isUnread && <span className='-mt-3 h-[8px] w-[8px] rounded-full bg-[#E06856]' />}
        </div>
      </div>
    </button>
  );
}

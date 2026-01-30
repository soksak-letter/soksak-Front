import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import PenIcon from '@/assets/icons/PenIcon.svg?react';
import NotFoundPage from '../system/NotFoundPage';
import { useAnonThread } from '@/hooks/mails/useAnonTreads';
import { Button } from '@/components/common/Button';
import { LoadingDots } from '@/components/LoadingDots';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

type PostItem = {
  letterId: number;
  title: string;
  deliveredAt: string; // ISO
  dateText: string; // '2026.1.3'
  isMine: boolean; // true: sent, false: received
  isUnread: boolean;
  paperId: number;
  stampId: number;
  stampUrl?: string; // TODO : 백엔드에서 받으면 ? 제거
};

const parseDate = (iso: string) => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
};

export default function LetterPostOtherPage() {
  const navigate = useNavigate();
  const { threadId: threadIdParam } = useParams();
  const location = useLocation();

  const threadId = threadIdParam ? Number(threadIdParam) : 0;
  const { data, isLoading, isError, refetch } = useAnonThread(threadId);
  const { senderName } = location.state as { senderName?: string };

  const questionTitle = data?.firstQuestion ?? '첫번째로 받은 질문입니다.';

  const DUMMY_POSTS: PostItem[] = [
    {
      letterId: 1,
      title: '첫 번째 편지예요',
      deliveredAt: '2026-01-01T10:00:00.000Z',
      dateText: '2026.01.01',
      isMine: false,
      isUnread: true,
      paperId: 1,
      stampId: 1,
    },
    {
      letterId: 2,
      title: '답장을 보냈어요',
      deliveredAt: '2026-01-02T12:30:00.000Z',
      dateText: '2026.01.02',
      isMine: true,
      isUnread: false,
      paperId: 2,
      stampId: 2,
    },
    {
      letterId: 3,
      title: '또 다른 편지',
      deliveredAt: '2026-01-03T18:20:00.000Z',
      dateText: '2026.01.03',
      isMine: false,
      isUnread: false,
      paperId: 1,
      stampId: 3,
    },
  ];

  const posts: PostItem[] = useMemo(() => {
    if (data?.letters && data.letters.length > 0) {
      return data.letters.map((l) => ({
        letterId: l.id,
        title: l.title,
        deliveredAt: l.deliveredAt,
        dateText: parseDate(l.deliveredAt),
        isMine: false,
        isUnread: false,
        paperId: l.design.paper.id + 1,
        stampId: l.design.stamp.id,
      }));
    }
    return DUMMY_POSTS;
  }, [data?.letters]);

  // 레인 분리 + 각 레인 내부는 시간순 유지
  const leftLane = useMemo(() => posts.filter((p) => p.isMine === false), [posts]);
  const rightLane = useMemo(() => posts.filter((p) => p.isMine === true), [posts]);

  // 잘못된 접근 - 404 처리
  if (!threadIdParam) return <NotFoundPage />;

  const handleOpenLetterDetail = (letterId: number) => {
    navigate(`/letter/reply/${threadId}/${letterId}`, {
      state: { threadId, letterId, senderName },
    });
  };

  const handleWriteReply = () => {
    // 우측 하단 플로팅 펜: 답장 작성(익명 상대에게 보내는 편지 작성)
    navigate('/letter/other/draft', {
      state: { threadId, senderName },
    });
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <BackHeader title='익명 편지' />

      <main className='px-5 pb-[110px]'>
        <div className='mt-2 text-[13px] text-[#6F6F6F]'>{senderName}님과 이어진 질문</div>

        <h2 className='mt-1 ty-title1 leading-[30px] text-[#171717] whitespace-pre-line'>
          {questionTitle}
        </h2>

        {/* 1) 로딩 */}
        {isLoading ? (
          <div className='flex flex-col items-center justify-center gap-8 py-50'>
            <LoadingDots fillIntervalMs={350} />
            <p className='ty-title2'>로딩 중...</p>
          </div>
        ) : /* 2) 에러 */ isError ? (
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
                      onClick={() => handleOpenLetterDetail(p.letterId)}
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
                      onClick={() => handleOpenLetterDetail(p.letterId)}
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
        aria-label='답장 작성'
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
          {/* TODO : Unread 상태 전역으로 관리? */}
          {item.isUnread && <span className='-mt-3 h-[8px] w-[8px] rounded-full bg-[#E06856]' />}
        </div>
      </div>
    </button>
  );
}

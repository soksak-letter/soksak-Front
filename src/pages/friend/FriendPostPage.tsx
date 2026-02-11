import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import PenIcon from '@/assets/icons/PenIcon.svg?react';
import { useFriendThread } from '@/hooks/friend/useFriendThread';
import NotFoundPage from '../system/NotFoundPage';
import { LoadingDots } from '@/components/LoadingDots';
import { Button } from '@/components/common/Button';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { formatDate } from '@/utils/date';

type Direction = 'received' | 'sent';

type PostItem = {
  letterId: number;
  title: string;
  deliveredAt: string; // ISO
  dateText: string; // '2026.01.03'
  direction: Direction; // received=friendLetters, sent=letters
  isUnread: boolean;

  paperId: number;
  stampId: number;
  stampUrl?: string;
};

export default function FriendPostPage() {
  const navigate = useNavigate();

  const { friendId: friendIdParam } = useParams();
  const friendId = Number(friendIdParam);
  const { data, isLoading, isError, refetch } = useFriendThread(friendId);

  // friendName 불러오기 (friendId는 Param에서 불러옴)
  const location = useLocation();
  const friendName = (location.state as { friendName?: string } | null)?.friendName ?? '친구';

  const formattedQuestionTitle = (data?.firstQuestion ?? '').replace(/^질문\s*#\d+:\s*/, '');

  const posts: PostItem[] = useMemo(() => {
    if (!data) return [];

    const received: PostItem[] = (data.friendLetters ?? []).map((l) => ({
      letterId: l.id,
      title: l.title,
      deliveredAt: l.deliveredAt,
      dateText: formatDate(l.deliveredAt),
      direction: 'received',
      isUnread: l.readAt === null,
      paperId: (l.design.paper.id ?? 0) + 1,
      stampId: l.design.stamp.id ?? 0,
      stampUrl: l.design.stamp.assetUrl ?? '',
    }));

    const sent: PostItem[] = (data.userLetters ?? []).map((l) => ({
      letterId: l.id,
      title: l.title,
      deliveredAt: l.deliveredAt,
      dateText: formatDate(l.deliveredAt),
      direction: 'sent',
      isUnread: false,
      paperId: (l.design.paper.id ?? 0) + 1,
      stampId: l.design.stamp.id ?? 0,
      stampUrl: l.design.stamp.assetUrl ?? '',
    }));

    const merged = [...received, ...sent];

    return merged.sort(
      (a, b) => new Date(a.deliveredAt).getTime() - new Date(b.deliveredAt).getTime(),
    );
  }, [data]);

  // 레인 분리 + 각 레인 내부는 시간순 유지
  const leftLane = useMemo(() => posts.filter((p) => p.direction === 'received'), [posts]);
  const rightLane = useMemo(() => posts.filter((p) => p.direction === 'sent'), [posts]);

  // 잘못된 접근 - 404 처리
  if (!friendIdParam || !Number.isFinite(friendId) || friendId <= 0) return <NotFoundPage />;

  const handleOpenLetterDetail = (letterId: number, direction: Direction) => {
    navigate(`/friend/thread/${friendId}/${letterId}`, {
      state: { friendId, friendName, letterId, direction },
    });
  };

  const handleWriteReply = () => {
    // 우측 하단 플로팅 펜: 새 편지 작성(친구에게 보내는 편지 작성)
    navigate('/friend/draft', {
      state: { friendId, friendName },
    });
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <BackHeader title={`${friendName}님과 나눈 편지`} />

      <main className='px-5 pb-[110px]'>
        <div className='mt-2 ty-body4 text-[var(--color-text-alternative)]'>
          {friendName}님과 이어진 질문
        </div>

        <h2 className='mt-1 ty-title1 leading-[30px] text-[#171717] whitespace-pre-line'>
          {formattedQuestionTitle}
        </h2>

        {/* 1) 로딩 */}
        {isLoading ? (
          <div className='flex flex-col items-center justify-center gap-8 py-70'>
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
                      onClick={() => handleOpenLetterDetail(p.letterId, p.direction)}
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
                      onClick={() => handleOpenLetterDetail(p.letterId, p.direction)}
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
              right-[14px] bottom-[18px]
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

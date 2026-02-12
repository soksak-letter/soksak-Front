import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import FriendTopTabs from '@/components/FriendTopTabs';
import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useFriends } from '@/hooks/friend/useFriend';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { formatDate } from '@/utils/date';
import InboxSkeleton from '@/components/skeleton/InboxSkeleton';

type FriendInboxItem = {
  id: number;
  friendUserId: number;
  profileImageUrl: string | null;
  name: string;
  exchangeCount: number;
  lastDate: string; // '2026.1.3'
  lastAtMs: number;
  paperId: string | number;
  stampId: string | number;
  stampUrl: string;
};

type SortOrder = 'latest' | 'oldest';

export default function FriendInboxPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebouncedValue(keyword, 300);
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest'); // 최신순 기본

  // 컴포넌트가 처음 생성될 때 한 번만 현재 시간을 저장 (캐시 버스터 고정)
  const cacheBuster = useMemo(() => Date.now(), []);

  const { data: friends = [], isLoading } = useFriends();

  const items = useMemo<FriendInboxItem[]>(
    () =>
      friends.map((f) => {
        const iso = f.recentLetter?.createdAt ?? null;
        const ms = iso ? new Date(iso).getTime() : 0;
        const paperColor = f.recentLetter?.design?.paper?.color;
        const paperId = f.recentLetter?.design?.paper?.id;
        const stampColor = f.recentLetter?.design?.paper?.color;
        const stampId = f.recentLetter?.design?.paper?.id;

        return {
          id: f.id,
          friendUserId: f.friendUserId,
          profileImageUrl: f.profileImageUrl,
          name: (f.nickname ?? '').trim(),
          exchangeCount: f.letterCount,

          lastDate: iso ? formatDate(iso) : '-', // UI용
          lastAtMs: Number.isNaN(ms) ? 0 : ms, // 정렬용

          paperId: paperColor || (paperId !== undefined ? paperId + 1 : 1),
          stampId: stampColor || (stampId !== undefined ? stampId + 1 : 1),
          stampUrl: (f.recentLetter?.design?.stamp?.assetUrl ?? '').trim(),
        };
      }),
    [friends],
  );

  const handleOpenThread = (item: FriendInboxItem) => {
    navigate(`/friend/thread/${item.friendUserId}`, {
      state: { friendId: item.friendUserId, friendName: item.name },
    });
  };

  const filtered = useMemo(() => {
    const k = debouncedKeyword.trim().toLowerCase();

    const result = !k ? items : items.filter((x) => (x.name ?? '').toLowerCase().includes(k));

    return [...result].sort((a, b) =>
      sortOrder === 'latest' ? b.lastAtMs - a.lastAtMs : a.lastAtMs - b.lastAtMs,
    );
  }, [items, debouncedKeyword, sortOrder]);

  const isEmptyFriends = !isLoading && items.length === 0;
  const isEmptySearch = !isLoading && items.length > 0 && filtered.length === 0;

  if (isLoading) return <InboxSkeleton title='친구' cardHeight={144} />;

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
      <TitleHeader title='친구' />

      <main className='px-5 pb-[95px]'>
        <FriendTopTabs
          value='inbox'
          onChange={(tab) => {
            if (tab === 'request') {
              navigate('/friend/request');
            }
          }}
        />

        {/* 검색 */}
        <div className='mt-[16px] flex items-center gap-3'>
          <div className='flex h-11 flex-1 w-[229px] items-center gap-2 rounded-xl bg-[var(--color-bg-secondary)] px-4'>
            <AiOutlineSearch className='w-[20px] h-[20px] text-[var(--color-grey-500)]' />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='키워드를 검색해보세요'
              className='w-full bg-transparent ty-body5 outline-none placeholder:text-[var(--color-text-assistive)]'
            />
          </div>

          <button
            type='button'
            onClick={() => setSortOrder((p) => (p === 'latest' ? 'oldest' : 'latest'))}
            className='h-11 w-11 flex items-center justify-center'
          >
            <SortIcon className='w-[24px] h-[24px] text-[var(--color-grey-500)]' />
          </button>
        </div>

        {/* 리스트 */}
        <div className='mt-4 space-y-4'>
          {filtered.map((f) => {
            const envelopeAsset = ENVELOPE_ASSET_MAP[f.paperId];
            const EnvelopePreview = envelopeAsset?.Preview;

            return (
              <button
                key={f.id}
                type='button'
                onClick={() => handleOpenThread(f)}
                className='w-full h-[144px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
              >
                {/* 상단: 프로필 + 봉투 */}
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex flex-col items-start gap-3 mt-2 ml-1'>
                    {/* 프로필 이미지 원형 컨테이너 */}
                    <div className='h-12 w-12 shrink-0 rounded-full bg-[var(--color-primary-100)] overflow-hidden flex items-center justify-center'>
                      {f.profileImageUrl ? (
                        <img
                          src={`${f.profileImageUrl}?t=${cacheBuster}`}
                          alt='프로필'
                          className='w-full h-full object-cover '
                        />
                      ) : (
                        /* 이미지가 없을 때 보여줄 빈 화면 */
                        <div className='w-full h-full bg-[var(--color-primary-100)]' />
                      )}
                    </div>
                    <div>
                      <p className='ty-body2'>{f.name}</p>
                      <p className='mt-1 ty-detailMedium'>편지를 나눈 횟수 {f.exchangeCount}회</p>
                    </div>
                  </div>

                  {/* 오른쪽: 봉투 + 스탬프 + 날짜 */}
                  <div className='flex flex-col gap-1'>
                    <div className='relative h-25 w-27 shrink-0 flex items-center justify-center -mt-3'>
                      {EnvelopePreview ? (
                        <EnvelopePreview className='h-full w-full' />
                      ) : (
                        <div className='h-full w-full rounded-xl bg-[#F2F2F2]' />
                      )}

                      {f.stampUrl ? (
                        <img
                          src={f.stampUrl}
                          className='absolute right-2.5 bottom-6 h-6 w-6 object-contain'
                          draggable={false}
                        />
                      ) : null}
                    </div>

                    <div className='flex justify-end pr-2 ty-detailMedium text-[var(--color-text-normal)]'>
                      {f.lastDate}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {isEmptyFriends && (
            <div className='mt-4 flex items-center justify-center py-[180px] ty-body3 text-[var(--color-text-assistive)]'>
              아직 친구가 없어요
            </div>
          )}

          {isEmptySearch && (
            <div className='mt-4 flex items-center justify-center py-[180px] ty-body3 text-[var(--color-text-assistive)]'>
              검색 결과가 없어요
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import FriendTopTabs from '@/components/FriendTopTabs';
import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useFriends } from '@/hooks/friend/useFriend';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

type FriendInboxItem = {
  id: number;
  friendUserId: number;
  name: string;
  exchangeCount: number;
  lastDate: string; // '2026.1.3'
  paperId: number;
  stampId: number;
  stampUrl: string;
};

type SortOrder = 'latest' | 'oldest';

const parseDotDate = (s: string) => {
  // '2026.1.3' -> Date
  const [y, m, d] = s.split('.').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
};

export default function FriendInboxPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest'); // 최신순 기본

  const { data: friends = [], isLoading } = useFriends();

  const items = useMemo<FriendInboxItem[]>(
    () =>
      friends.map((f) => ({
        id: f.id, // id는 threadId의 역할을 합니다.
        friendUserId: f.friendUserId,
        name: f.nickname,
        exchangeCount: f.letterCount,
        lastDate: f.recentLetter.createdAt.split('T')[0].replaceAll('-', '.'),
        paperId: Number(f.recentLetter.design.paper?.id ?? 0), // TODO : 백엔드 필드 수정 예정, DTO 수정 필요
        stampId: Number(f.recentLetter.design.stamp?.id ?? 0), // TODO : 백엔드 필드 수정 예정, DTO 수정 필요
        stampUrl: f.recentLetter.design.stamp?.assetUrl,
      })),
    [friends],
  );

  const handleOpenThread = (item: FriendInboxItem) => {
    navigate(`/friend/thread/${item.id}`, {
      state: { friendUserId: item.friendUserId, friendName: item.name },
    });
  };

  const filtered = useMemo(() => {
    const k = keyword.trim();

    const result = !k ? items : items.filter((x) => x.name.includes(k));

    // 정렬 (최신순 기본 / 역순)
    return [...result].sort((a, b) => {
      const ta = parseDotDate(a.lastDate);
      const tb = parseDotDate(b.lastDate);
      return sortOrder === 'latest' ? tb - ta : ta - tb;
    });
  }, [items, keyword, sortOrder]);

  const isEmptyFriends = !isLoading && items.length === 0;
  const isEmptySearch = !isLoading && items.length > 0 && filtered.length === 0;

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
          {isLoading && <div className='text-sm text-gray-400'>불러오는 중...</div>}
          {!isLoading &&
            filtered.map((f) => {
              const envelopeAsset = ENVELOPE_ASSET_MAP[f.paperId];
              const EnvelopePreview = envelopeAsset?.Preview;

              return (
                <button
                  key={f.id}
                  type='button'
                  onClick={() => handleOpenThread(f)}
                  className='w-[343px] h-[144px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                >
                  {/* 상단: 프로필 + 봉투 */}
                  <div className='flex items-center justify-between gap-3'>
                    <div className='flex flex-col items-start gap-3'>
                      {/* 프로필 사진 */}
                      <div className='h-10 w-10 rounded-full bg-[#EDEDED]' />
                      <div>
                        <p className='ty-body2'>{f.name}</p>
                        <p className='mt-1 ty-detailMedium'>편지를 나눈 횟수 {f.exchangeCount}회</p>
                      </div>
                    </div>

                    {/* 오른쪽: 봉투 + 스탬프 + 날짜 */}
                    <div className='flex flex-col gap-2 mt-2'>
                      <div className='relative h-23 w-25 shrink-0 flex items-center justify-center -mt-3'>
                        {EnvelopePreview ? (
                          <EnvelopePreview className='h-full w-full' />
                        ) : (
                          <div className='h-full w-full rounded-xl bg-[#F2F2F2]' />
                        )}

                        {f.stampUrl ? (
                          <img
                            src={f.stampUrl}
                            alt=''
                            className='absolute right-1 bottom-3 h-7 w-7 object-contain'
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
            <div className='mt-8 px-4 py-10 text-center ty-body3 text-[var(--color-text-assistive)]'>
              아직 친구가 없어요
            </div>
          )}

          {isEmptySearch && (
            <div className='mt-8 px-4 py-10 text-center ty-body3 text-[var(--color-text-assistive)]'>
              검색 결과가 없어요
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

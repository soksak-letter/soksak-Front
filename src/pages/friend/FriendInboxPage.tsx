import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import FriendTopTabs from '@/components/FriendTopTabs';
import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';

type FriendInboxItem = {
  id: number;
  name: string;
  exchangeCount: number;
  lastDate: string; // '2026.1.3'
};

type TabKey = 'list' | 'request';

type SortOrder = 'latest' | 'oldest';

const parseDotDate = (s: string) => {
  // '2026.1.3' -> Date
  const [y, m, d] = s.split('.').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
};

export default function FriendInboxPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('list');
  const [keyword, setKeyword] = useState('');

  const items = useMemo<FriendInboxItem[]>(
    () => [
      { id: 1, name: '파란수박', exchangeCount: 22, lastDate: '2026.1.3' },
      { id: 2, name: '파란수박', exchangeCount: 22, lastDate: '2026.1.3' },
    ],
    [],
  );

  const [sortOrder, setSortOrder] = useState<SortOrder>('latest'); // 최신순 기본

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

  return (
    <div className='min-h-screen bg-white'>
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
          {filtered.map((f) => (
            <button
              key={f.id}
              type='button'
              onClick={() => navigate(`/friend/${f.id}/posts`)} // TODO 여기 유저 id 생기면 수정
              className='w-[343px] h-[144px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
            >
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-full bg-[#EDEDED]' />
                  <div>
                    <p className='text-[16px] font-semibold text-[#171717]'>{f.name}</p>
                    <p className='mt-1 text-[12px] '>편지를 나눈 횟수 {f.exchangeCount}회</p>
                  </div>
                </div>

                {/* 봉투 썸네일 자리(나중에 이미지로 교체) */}
                <div className='h-12 w-16 rounded-xl bg-[#F2F2F2]' />
              </div>

              <div className='mt-3 flex justify-end text-[12px]'>{f.lastDate}</div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className='mt-8 rounded-2xl border border-dashed border-[#E6E6E6] bg-[#FAFAFA] px-4 py-10 text-center text-sm text-[#9B9B9B]'>
              검색 결과가 없어요
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

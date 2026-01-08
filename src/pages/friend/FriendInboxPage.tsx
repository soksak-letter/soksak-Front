import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import FriendTopTabs from '@/components/FriendTopTabs';

type FriendInboxItem = {
  id: number;
  name: string;
  exchangeCount: number;
  lastDate: string; // '2026.1.3'
};

type TabKey = 'list' | 'request';

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

  const filtered = useMemo(() => {
    const k = keyword.trim();
    if (!k) return items;
    return items.filter((x) => x.name.includes(k));
  }, [items, keyword]);

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
        <div className='mt-4 flex items-center gap-3'>
          <div className='flex h-11 flex-1 items-center gap-2 rounded-xl bg-[#F2F2F2] px-4'>
            <span className='text-[#9B9B9B]'>🔍</span>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='키워드를 검색해보세요'
              className='w-full bg-transparent text-sm outline-none placeholder:text-[#9B9B9B]'
            />
          </div>

          <button
            type='button'
            className='h-11 w-11 rounded-xl bg-[#F2F2F2] text-[#9B9B9B]'
            aria-label='filter'
          >
            ☰
          </button>
        </div>

        {/* 리스트 */}
        <div className='mt-4 space-y-4'>
          {filtered.map((f) => (
            <button
              key={f.id}
              type='button'
              onClick={() => navigate(`/friend/${f.id}/posts`)}
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

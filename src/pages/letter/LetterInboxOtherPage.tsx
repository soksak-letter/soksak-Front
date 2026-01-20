import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import LetterInboxTabs, { type LetterInboxTabKey } from '@/components/LetterInboxTabs';

import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';

type SortOrder = 'latest' | 'oldest';

type InboxOtherLetterItem = {
  //   id: number;
  letterId: number;
  threadId: number;
  question: string;
  senderName: string;
  receivedAt: string;
  isUnread: boolean;
  // 나중에 봉투 컬러/썸네일이 필요하면 추가
  // colorKey?: 'cream' | 'blue' | 'pink' | 'mint';
};

const parseDotDate = (s: string) => {
  const [y, m, d] = s.split('.').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
};

export default function LetterInboxOtherPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<LetterInboxTabKey>('other');
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // mock data
  const items = useMemo<InboxOtherLetterItem[]>(
    () => [
      {
        id: 1,
        question: '당신의 인생에 가장 큰 영감을 주는 사람은 누구인가요?',
        senderName: '파란수박',
        receivedAt: '2026.1.3',
        isUnread: true,
      },
      {
        id: 2,
        question: '요즘 가장 뿌듯했던 순간은 언제였나요?',
        senderName: '익명',
        receivedAt: '2026.1.2',
        isUnread: false,
      },
      {
        id: 3,
        question: '최근에 스스로 칭찬해주고 싶은 일은 뭐였어요?',
        senderName: '파란수박',
        receivedAt: '2026.1.1',
        isUnread: true,
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const k = keyword.trim();

    const result = !k
      ? items
      : items.filter((x) => x.question.includes(k) || x.senderName.includes(k));

    return [...result].sort((a, b) => {
      const ta = parseDotDate(a.receivedAt);
      const tb = parseDotDate(b.receivedAt);
      return sortOrder === 'latest' ? tb - ta : ta - tb;
    });
  }, [items, keyword, sortOrder]);

  const handleTabChange = (next: LetterInboxTabKey) => {
    setTab(next);

    // 라우트 분기: received 탭은 "나에게 받은 편지함" 페이지로 이동시키는 식으로
    // (프로젝트 라우팅에 맞게 경로만 바꿔주면 됨)
    if (next === 'received') {
      navigate('/letter/inbox-received'); // TODO: 실제 라우트로 교체
    }
  };

  const handleOpenLetter = (item: InboxOtherLetterItem) => {
    navigate(`/letter/${item.letterId}/thread/${item.threadId}`);
  };

  return (
    <div className='min-h-screen bg-white'>
      <TitleHeader title='편지함' />

      <main className='px-5 pb-[95px]'>
        <LetterInboxTabs value={tab} onChange={handleTabChange} />

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
            aria-label='정렬 변경'
          >
            <SortIcon className='w-[24px] h-[24px] text-[var(--color-grey-500)]' />
          </button>
        </div>

        {/* 리스트 */}
        <div className='mt-4 space-y-[10px]'>
          {filtered.map((it) => (
            <button
              key={it.id}
              type='button'
              onClick={() => handleOpenLetter(it.id)}
              className='w-[343px] h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
            >
              <div className='flex items-start justify-between gap-3'>
                {/* 왼쪽 텍스트 */}
                <div className='min-w-0'>
                  <p className='ty-body5 text-[var(--color-text-normal)] line-clamp-2'>
                    {it.question}
                  </p>

                  <div className='mt-4 flex items-center gap-1'>
                    <p className='text-[12px] text-[#171717]'>{it.senderName}</p>
                    {it.isUnread && (
                      <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#F5544C]' />
                    )}
                  </div>
                </div>

                {/* 오른쪽 봉투 썸네일 자리 */}
                <div className='h-12 w-16 shrink-0 rounded-xl bg-[#F2F2F2]' />
              </div>

              <div className='mt-3 flex justify-end text-[12px] text-[var(--color-text-normal)]'>
                {it.receivedAt}
              </div>
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

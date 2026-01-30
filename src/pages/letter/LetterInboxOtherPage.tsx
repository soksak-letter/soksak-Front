import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import LetterInboxTabs, { type LetterInboxTabKey } from '@/components/LetterInboxTabs';

import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useAnonMailbox } from '@/hooks/mails/useAnonMailbox';
import { LoadingDots } from '@/components/LoadingDots';
import { Button } from '@/components/common/Button';

type SortOrder = 'latest' | 'oldest';

type InboxOtherLetterItem = {
  letterId: number;
  threadId: number;
  question: string;
  senderName: string;
  receivedAt: string; // 화면 표시용 (YYYY.MM.DD)
  receivedAtMs: number; // Sorting용
  isUnread: boolean;
  paperId: number; // paperAsset에서 변환 필요할 듯
};

const parseDate = (iso: string) => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
};

export default function LetterInboxOtherPage() {
  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useAnonMailbox();

  const [tab, setTab] = useState<LetterInboxTabKey>('other');
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // 서버 응답을 화면 아이템으로 변환 (isUnread 제외)
  const items: InboxOtherLetterItem[] = useMemo(() => {
    const raw = data?.items ?? [];
    return raw.map((x) => ({
      letterId: x.lastLetterId,
      threadId: x.threadId,
      question: x.lastLetterTitle,
      senderName: x.sender.nickname,
      receivedAt: parseDate(x.updatedAt),
      receivedAtMs: new Date(x.updatedAt).getTime(),
      isUnread: false,
      paperId: x.paperId,
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const k = keyword.trim();

    const result = !k
      ? items
      : items.filter((x) => x.question.includes(k) || x.senderName.includes(k));

    return [...result].sort((a, b) => {
      return sortOrder === 'latest'
        ? b.receivedAtMs - a.receivedAtMs
        : a.receivedAtMs - b.receivedAtMs;
    });
  }, [items, keyword, sortOrder]);

  const handleTabChange = (next: LetterInboxTabKey) => {
    setTab(next);

    if (next === 'received') {
      navigate('/letter/inbox-self');
    }
  };

  const handleOpenLetter = (item: InboxOtherLetterItem) => {
    navigate(`/letter/${item.letterId}/thread/${item.threadId}`);
  };

  const isEmpty = !isLoading && !isError && filtered.length === 0;

  return (
    <div className='min-h-screen bg-white'>
      <TitleHeader title='편지함' />

      <main className='px-5 pb-[95px]'>
        <div className='mx-auto w-full max-w-[343px]'>
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
                key={it.letterId}
                type='button'
                onClick={() => handleOpenLetter(it)}
                className='w-full h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
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
            <div className='mt-4 space-y-[10px]'>
              {/* 1) 로딩 */}
              {isLoading ? (
                <div className='flex flex-col items-center justify-center gap-8 py-10'>
                  <LoadingDots fillIntervalMs={350} />
                  <p className='ty-title2'>로딩 중...</p>
                </div>
              ) : /* 2) 에러 */ isError ? (
                <div className='flex flex-col items-center justify-center gap-10 py-10 text-center'>
                  <p className='ty-title2'>목록을 불러오지 못했어요.</p>
                  <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
                    다시 시도
                  </Button>
                </div>
              ) : (
                /* 3) 정상 */ <>
                  {filtered.map((it) => (
                    <button
                      key={`${it.threadId}-${it.letterId}`}
                      type='button'
                      onClick={() => handleOpenLetter(it)}
                      className='w-full h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                    >
                      ...
                    </button>
                  ))}

                  {isEmpty && (
                    <div className='mt-8 rounded-2xl border border-dashed border-[#E6E6E6] bg-[#FAFAFA] px-4 py-10 text-center text-sm text-[#9B9B9B]'>
                      검색 결과가 없어요
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

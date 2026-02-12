import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { LoadingDots } from '@/components/LoadingDots';

import TitleHeader from '@/components/common/headers/TitleHeader';
import LetterInboxTabs, { type LetterInboxTabKey } from '@/components/LetterInboxTabs';

import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useSelfMailbox } from '@/hooks/mails/useSelfMailbox';
import InboxSkeleton from '@/components/skeleton/InboxSkeleton';
import { Button } from '@/components/common/Button';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { formatDate } from '@/utils/date';

type SortOrder = 'latest' | 'oldest';

type InboxSelfLetterItem = {
  letterId: number;
  question: string;
  title: string;
  receivedAt: string; // 화면 표시용 (YYYY.MM.DD)
  receivedAtMs: number; // Sorting용
  paperId: number;
  stampId: number;
  stampUrl: string;
};

export default function LetterInboxSelfPage() {
  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useSelfMailbox();

  const [tab, setTab] = useState<LetterInboxTabKey>('received');
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebouncedValue(keyword, 300);
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // 서버 응답 -> 화면 아이템으로 변환 (isUnread 제외)
  const items: InboxSelfLetterItem[] = useMemo(() => {
    const raw = data?.letters ?? [];

    return raw.map((x) => ({
      letterId: x.id,
      question: x.questionTitle ?? '오늘의 질문',
      title: x.title,
      receivedAt: formatDate(x.createdAt),
      receivedAtMs: new Date(x.createdAt).getTime(),
      paperId: x.paperId + 1,
      stampId: x.stampId,
      stampUrl: x.stampUrl,
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const k = debouncedKeyword.trim();

    const result = !k ? items : items.filter((x) => x.title.includes(k) || x.question.includes(k));

    return [...result].sort((a, b) => {
      return sortOrder === 'latest'
        ? b.receivedAtMs - a.receivedAtMs
        : a.receivedAtMs - b.receivedAtMs;
    });
  }, [items, debouncedKeyword, sortOrder]);

  const handleTabChange = (next: LetterInboxTabKey) => {
    setTab(next);

    if (next === 'other') {
      navigate('/letter/inbox-other');
    }
  };

  const handleOpenLetter = (letterId: number) => {
    navigate(`/letter/post-self/${letterId}`, {
      state: { letterId },
    });
  };

  const PAGE_SIZE = 10;
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [debouncedKeyword, sortOrder]);
  const hasMore = displayCount < filtered.length;

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  const sentinelRef = useIntersectionObserver({
    onIntersect: handleLoadMore,
    enabled: hasMore,
    resetKey: displayCount,
  });

  const visibleItems = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount],
  );

  const isEmpty = !isLoading && !isError && filtered.length === 0;

  if (isLoading) return <InboxSkeleton />;

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
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

          <div className='mt-4 space-y-[10px]'>
            {/* 1) 에러 */}
            {isError ? (
              <div className='flex flex-col items-center justify-center gap-8 py-30 text-center'>
                <p className='ty-title3'>목록을 불러오지 못했어요.</p>
                <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
                  다시 시도
                </Button>
              </div>
            ) : /* 3) 비었을 때 */ isEmpty ? (
              <div className='mt-8 flex items-center justify-center py-[180px] ty-body3 text-[var(--color-text-assistive)]'>
                검색 결과가 없어요
              </div>
            ) : (
              /* 4) 정상 */ <>
                {visibleItems.map((it) => {
                  const envelopeAsset = ENVELOPE_ASSET_MAP[it.paperId];
                  const EnvelopePreview = envelopeAsset?.Preview;

                  return (
                    <button
                      key={it.letterId}
                      type='button'
                      onClick={() => handleOpenLetter(it.letterId)}
                      className='relative w-full h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        {/* 왼쪽 텍스트  */}
                        <div className='min-w-0 flex flex-col gap-8 mt-2 ml-1'>
                          <p className='ty-body5 text-[var(--color-text-normal)] line-clamp-2'>
                            {it.question}
                          </p>

                          <div className='mt-4 flex items-center gap-1'>
                            <p className='text-[12px] text-[#171717]'>{it.title}</p>
                          </div>
                        </div>

                        <div className='flex flex-col'>
                          {/* 오른쪽 봉투 썸네일 */}
                          <div className='h-25 w-27 shrink-0 flex items-center justify-center -mt-3'>
                            {EnvelopePreview ? (
                              <EnvelopePreview className='h-full w-full' />
                            ) : (
                              <div className='h-full w-full rounded-xl bg-[#F2F2F2]' />
                            )}
                          </div>

                          {!!it.stampUrl && (
                            <img
                              src={it.stampUrl}
                              alt=''
                              className='absolute  right-6.5 bottom-12.5 h-6 w-6 object-contain pointer-events-none'
                              draggable={false}
                            />
                          )}

                          {/* 오른쪽 하단 날짜 */}
                          <div className='flex justify-end pr-2 -mt-2 ty-detailMedium text-[var(--color-text-normal)]'>
                            {it.receivedAt}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {hasMore && (
                  <div className='flex justify-center py-4'>
                    <LoadingDots fillIntervalMs={350} />
                  </div>
                )}
                <div ref={sentinelRef} className='h-1' />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

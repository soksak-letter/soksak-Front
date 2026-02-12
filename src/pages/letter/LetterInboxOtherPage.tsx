import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import LetterInboxTabs, { type LetterInboxTabKey } from '@/components/LetterInboxTabs';

import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useAnonMailbox } from '@/hooks/mails/useAnonMailbox';
import InboxSkeleton from '@/components/skeleton/InboxSkeleton';
import { Button } from '@/components/common/Button';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { formatDate } from '@/utils/date';
import { getAnonNickname } from '@/utils/anonNickname';

type SortOrder = 'latest' | 'oldest';

type InboxOtherLetterItem = {
  letterId: number;
  sessionId: number;
  senderId: number;
  letterTitle: string;
  senderName: string;
  receivedAt: string;
  receivedAtMs: number;
  letterCount: number;
  isUnread: boolean;
  paperId: number;
  stampId: number;
  stampUrl: string;
};

export default function LetterInboxOtherPage() {
  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useAnonMailbox();
  const setFlow = useThreadFlowStore((s) => s.setFlow);

  const [tab, setTab] = useState<LetterInboxTabKey>('other');
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebouncedValue(keyword, 300);
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  const items: InboxOtherLetterItem[] = useMemo(() => {
    const serverLetters = data?.letters ?? [];

    return serverLetters.map((x) => {
      const deliveredAt = x.deliveredAt;

      return {
        letterId: x.lastLetterId,
        sessionId: x.sessionId,
        senderId: x.sender.id,
        letterTitle: x.lastLetterTitle,
        senderName: getAnonNickname(x.sender.id),
        receivedAt: formatDate(deliveredAt),
        receivedAtMs: new Date(deliveredAt).getTime(),
        letterCount: x.sender.letterCount,
        isUnread: x.hasUnread,
        paperId: x.design?.paperId ?? 0,
        stampId: x.design?.stampId ?? 0,
        stampUrl: (x.design?.stampUrl ?? '').trim(),
      };
    });
  }, [data]);

  const filtered = useMemo(() => {
    const k = debouncedKeyword.trim();

    const result = !k
      ? items
      : items.filter((x) => x.letterTitle.includes(k) || x.senderName.includes(k));

    return [...result].sort((a, b) =>
      sortOrder === 'latest' ? b.receivedAtMs - a.receivedAtMs : a.receivedAtMs - b.receivedAtMs,
    );
  }, [items, debouncedKeyword, sortOrder]);

  const handleTabChange = (next: LetterInboxTabKey) => {
    setTab(next);
    if (next === 'received') navigate('/letter/inbox-self');
  };

  const handleOpenThread = (item: InboxOtherLetterItem) => {
    setFlow({
      target: 'other',
      sessionId: item.sessionId,
      senderId: item.senderId,
      senderName: item.senderName,
      friendName: null,
      letterCount: item.letterCount,
    });

    navigate(`/letter/thread/${item.sessionId}`);
  };

  const hasKeyword = debouncedKeyword.trim().length > 0;
  const isSearchEmpty = !isLoading && !isError && hasKeyword && filtered.length === 0;
  const isInboxEmpty = !isLoading && !isError && !hasKeyword && items.length === 0;

  if (isLoading) return <InboxSkeleton />;

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
      <TitleHeader title='편지함' />

      <main className='px-5 pb-[95px]'>
        <div className='mx-auto w-full max-w-[343px]'>
          <LetterInboxTabs value={tab} onChange={handleTabChange} />

          <div className='mt-[16px] flex items-center gap-3'>
            <div className='flex h-11 flex-1 items-center gap-2 rounded-xl bg-[var(--color-bg-secondary)] px-4'>
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

          <div className='mt-4 space-y-[10px]'>
            {isError ? (
              <div className='flex flex-col items-center gap-8 py-30 text-center'>
                <p className='ty-title3'>목록을 불러오지 못했어요.</p>
                <Button onClick={() => refetch()} className='w-full max-w-[240px]'>
                  다시 시도
                </Button>
              </div>
            ) : (
              <>
                {isSearchEmpty && (
                  <div className='py-[180px] text-center ty-body3 text-[var(--color-text-assistive)]'>
                    검색 결과가 없어요
                  </div>
                )}

                {isInboxEmpty && (
                  <div className='py-[180px] text-center ty-body3 text-[var(--color-text-assistive)]'>
                    받은 편지가 없어요
                  </div>
                )}
                {!isSearchEmpty &&
                  !isInboxEmpty &&
                  filtered.map((it) => {
                    const EnvelopePreview = ENVELOPE_ASSET_MAP[it.paperId]?.Preview;

                    return (
                      <button
                        key={it.letterId}
                        onClick={() => handleOpenThread(it)}
                        className='relative w-full h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                      >
                        <div className='flex items-start justify-between gap-3'>
                          <div className='min-w-0 flex flex-col gap-8 mt-2 ml-1'>
                            <p className='ty-body5 text-[var(--color-text-normal)] line-clamp-2'>
                              {it.letterTitle}
                            </p>

                            <div className='mt-4 flex items-center gap-1'>
                              <p className='ty-detailMedium text-[var(--color-text-normal)]'>
                                {it.senderName}
                              </p>
                              {it.isUnread && (
                                <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#F5544C]' />
                              )}
                            </div>
                          </div>

                          <div className='flex flex-col'>
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
                                className='absolute right-6 bottom-12 h-6 w-6 object-contain pointer-events-none'
                                draggable={false}
                              />
                            )}

                            <div className='flex justify-end pr-2 -mt-2 ty-detailMedium text-[var(--color-text-normal)]'>
                              {it.receivedAt}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                {isSearchEmpty && (
                  <div className='mt-4 flex items-center justify-center py-[180px] ty-body3 text-[var(--color-text-assistive)]'>
                    검색 결과가 없어요
                  </div>
                )}

                {isInboxEmpty && (
                  <div className='mt-4 flex items-center justify-center py-[180px] ty-body3 text-[var(--color-text-assistive)]'>
                    받은 편지가 없어요
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

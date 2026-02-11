import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleHeader from '@/components/common/headers/TitleHeader';
import LetterInboxTabs, { type LetterInboxTabKey } from '@/components/LetterInboxTabs';

import { AiOutlineSearch } from 'react-icons/ai';
import SortIcon from '@/assets/icons/SortIcon.svg?react';
import { useAnonMailbox } from '@/hooks/mails/useAnonMailbox';
import { LoadingDots } from '@/components/LoadingDots';
import { Button } from '@/components/common/Button';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { formatDate } from '@/utils/date';
import { getAnonNickname } from '@/utils/anonNickname';

type SortOrder = 'latest' | 'oldest';

type InboxOtherLetterItem = {
  letterId: number;
  sessionId: number;
  senderId: number; // 상대방 userId (신고/차단 시 필요)
  letterTitle: string;
  senderName: string; // 랜덤 익명 닉네임
  receivedAt: string; // 화면 표시용 (YYYY.MM.DD)
  receivedAtMs: number; // Sorting용
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
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // 서버 응답을 화면 아이템으로 변환
  const items: InboxOtherLetterItem[] = useMemo(() => {
    const serverLetters = data?.letters ?? [];

    return serverLetters.map((x) => {
      const deliveredAt = x.deliveredAt; // ISO string

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
    const k = keyword.trim();

    const result = !k
      ? items
      : items.filter((x) => x.letterTitle.includes(k) || x.senderName.includes(k));

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

  const handleOpenThread = (item: InboxOtherLetterItem) => {
    // Store에 아래 항목 저장
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

  const isEmpty = !isLoading && !isError && filtered.length === 0;

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
              /* 3) 정상 */ <>
                {filtered.map((it) => {
                  const envelopeAsset = ENVELOPE_ASSET_MAP[it.paperId];
                  const EnvelopePreview = envelopeAsset?.Preview;

                  return (
                    <button
                      key={it.letterId}
                      type='button'
                      onClick={() => handleOpenThread(it)}
                      className='relative w-full h-[129px] rounded-xl bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        {/* 왼쪽 텍스트 */}
                        <div className='min-w-0 flex flex-col gap-8 mt-2 ml-1'>
                          <p className='ty-body5 text-[var(--color-text-normal)] line-clamp-2'>
                            {it.letterTitle}
                          </p>
                          <div className='mt-4 flex items-center gap-1'>
                            <p className='text-[12px] text-[#171717]'>{it.senderName}</p>
                            {it.isUnread && (
                              <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#F5544C]' />
                            )}
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
                              className='absolute right-6.5 bottom-12.5 h-6 w-6 object-contain pointer-events-none'
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
                {isEmpty && (
                  <div className='mt-8 rounded-2xl border border-dashed border-[#E6E6E6] bg-[#FAFAFA] px-4 py-10 text-center text-sm text-[#9B9B9B]'>
                    검색 결과가 없어요
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

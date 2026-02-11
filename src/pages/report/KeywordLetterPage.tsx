import React, { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import LetterCard from '@/components/letters/LetterCard';
import { LoadingDots } from '@/components/LoadingDots';
import ModalFrame from '@/components/modal/ModalFrame';

import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';
import { DEFAULT_FONT_ID, FONT_ASSET_MAP } from '@/constants/fontAssets';
import { DEFAULT_PAPER_ID, PAPER_ASSET_MAP } from '@/constants/paperAssets';

import { useLetterDetail } from '@/hooks/letters/useLetterDetail';
import { useLetterDetails } from '@/hooks/letters/useLetterDetails';
import { useLettersByKeyword } from '@/hooks/weeklyReport/useLettersByKeyword';
import { useModalStore } from '@/stores/modalStore';

import { formatDate } from '@/utils/date';

type KeywordLetterItem = {
  letterId: number;
  title: string;
  senderName: string;
  receivedAt: string; // ISO
  dateText: string; // 'YYYY.MM.DD'
  stampId: number;
  stampUrl?: string;
  paperId: number; // 봉투 디자인 결정을 위해 필요 (1-base)
};

type UnknownRecord = Record<string, unknown>;
const isRecord = (v: unknown): v is UnknownRecord => typeof v === 'object' && v !== null;

type KeywordLetterBase = {
  letterId: number;
  title: string;
  receivedAt: string;
};

function parseKeywordLetterBase(raw: unknown): KeywordLetterBase | null {
  if (!isRecord(raw)) return null;

  const letterId = Number(raw.id ?? raw.letterId);
  if (!Number.isFinite(letterId) || letterId <= 0) return null;

  const title = typeof raw.title === 'string' ? raw.title : '제목 없음';

  const receivedAt =
    (typeof raw.deliveredAt === 'string' && raw.deliveredAt) ||
    (typeof raw.delivered === 'string' && raw.delivered) ||
    (typeof raw.receivedAt === 'string' && raw.receivedAt) ||
    (typeof raw.createdAt === 'string' && raw.createdAt) ||
    '';

  return { letterId, title, receivedAt };
}

function getSenderDisplayName(detail: unknown): string {
  if (!isRecord(detail)) return '';

  // 1) top-level
  if (typeof detail.senderName === 'string') return detail.senderName;
  if (typeof detail.senderNickname === 'string') return detail.senderNickname;

  // 2) sender 객체
  const sender = detail.sender;
  if (isRecord(sender)) {
    if (typeof sender.nickname === 'string') return sender.nickname;
    if (typeof sender.name === 'string') return sender.name;
  }

  return '';
}

function parseDotDate(s: string) {
  const date = new Date(s);
  const t = date.getTime();
  return Number.isNaN(t) ? 0 : t;
}

export default function KeywordLetterPage() {
  const location = useLocation();
  const { openModal, activeModal, payload } = useModalStore();

  // location.state가 비어도(새로고침/직접 접근) URL 쿼리로 복원 가능하게 처리
  const [searchParams] = useSearchParams();

  const keywordFromQuery = searchParams.get('keyword') ?? undefined;
  const countFromQueryRaw = searchParams.get('count'); // string | null
  const countFromQuery = countFromQueryRaw ? Number(countFromQueryRaw) : undefined;

  const selectedKeyword =
    keywordFromQuery ?? (location.state as { keyword?: string } | null)?.keyword ?? '피곤';

  const keywordCount =
    (Number.isFinite(countFromQuery) ? (countFromQuery as number) : undefined) ??
    (location.state as { count?: number } | null)?.count ??
    0;
  const sortOrder: 'latest' | 'oldest' = 'latest';

  // 1) 키워드 목록 조회 (list 반환하는 훅)
  const {
    data: keywordQuery,
    isLoading: isKeywordLoading,
    isError: isKeywordError,
  } = useLettersByKeyword(selectedKeyword);

  const keywordList: unknown[] = (keywordQuery?.list as unknown[]) ?? [];

  // 2) letterId 배열 (any 제거)
  const letterIds = useMemo(() => {
    return keywordList
      .map(parseKeywordLetterBase)
      .filter((v): v is KeywordLetterBase => v !== null)
      .map((v) => v.letterId);
  }, [keywordList]);

  // 3) 병렬 상세 조회 → map<number, detail>
  const { map: detailMap } = useLetterDetails(letterIds);

  // 4) 최종 items (목록 + 상세 보강) - any 제거 + sender 빨간줄 제거
  const items = useMemo<KeywordLetterItem[]>(() => {
    return keywordList
      .map(parseKeywordLetterBase)
      .filter((base): base is KeywordLetterBase => base !== null)
      .map((base) => {
        const { letterId, title, receivedAt } = base;

        const dateText = formatDate(receivedAt);
        const detail = detailMap.get(letterId) as unknown; // detail DTO가 확정되면 여기 타입 교체 가능

        // design 정보는 DTO 확정 전까지 unknown에서 안전 접근
        let paperId = DEFAULT_PAPER_ID;
        let stampId = 0;
        let stampUrl: string | undefined;

        if (isRecord(detail)) {
          const design = detail.design;
          if (isRecord(design)) {
            const paper = design.paper;
            if (isRecord(paper)) {
              const paper0 = Number(paper.id);
              paperId = Number.isFinite(paper0) ? paper0 + 1 : DEFAULT_PAPER_ID;
            }

            const stamp = design.stamp;
            if (isRecord(stamp)) {
              stampId = Number(stamp.id) || 0;
              stampUrl = typeof stamp.assetUrl === 'string' ? stamp.assetUrl : undefined;
            }
          }
        }

        const senderName = getSenderDisplayName(detail);

        return {
          letterId,
          title,
          senderName,
          receivedAt,
          dateText,
          paperId,
          stampId,
          stampUrl,
        };
      });
  }, [keywordList, detailMap]);

  // 정렬 로직(그대로)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const ta = parseDotDate(a.receivedAt);
      const tb = parseDotDate(b.receivedAt);
      return sortOrder === 'latest' ? tb - ta : ta - tb;
    });
  }, [items, sortOrder]);

  // 모달 핸들러(그대로)
  const handleOpenDetail = (item: KeywordLetterItem) => {
    openModal('letterDetail', {
      letterId: item.letterId,
    });
  };

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
      <BackHeader title='키워드별 편지 조각' />

      <main className='px-5 py-6'>
        {/* 2. 키워드 태그 섹션 */}
        <div className='flex items-center gap-2 mb-8'>
          <div className='h-[28px] px-3 flex items-center justify-center rounded-full border border-[var(--color-primary-400)] bg-[var(--color-primary-100)] ty-detailMedium shadow-sm'>
            # {selectedKeyword} ({keywordCount})
          </div>
          <span className='ty-body1'>이 담긴 편지</span>
        </div>

        {/* 3. 편지 그리드 섹션 */}
        {isKeywordLoading ? (
          <div className='py-20'>
            <LoadingDots />
          </div>
        ) : isKeywordError ? (
          <div className='p-6'>데이터를 불러오지 못했습니다.</div>
        ) : sortedItems.length === 0 ? (
          <div className='p-6'>아직 이 키워드로 모인 편지조각이 없어요.</div>
        ) : (
          <div className='grid grid-cols-2 gap-x-[36px] gap-y-[20px] justify-items-center'>
            {sortedItems.map((item) => {
              const envelopeAsset = ENVELOPE_ASSET_MAP[item.paperId];
              const EnvelopePreview = envelopeAsset?.Preview;
              return (
                <PostCard
                  key={item.letterId}
                  item={item}
                  EnvelopePreview={EnvelopePreview}
                  onClick={() => handleOpenDetail(item)}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* 5. 편지 상세 모달 렌더링 */}
      {activeModal === 'letterDetail' && payload?.letterId && (
        <ModalFrame>
          <LetterDetailModalContent letterId={payload.letterId} />
        </ModalFrame>
      )}
    </div>
  );
}

/**
 * 🎨 PostCard 컴포넌트
 */
function PostCard({
  item,
  EnvelopePreview,
  onClick,
}: {
  item: KeywordLetterItem;
  EnvelopePreview?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <button type='button' onClick={onClick} className='text-left w-full max-w-[160px]'>
      <div className='relative w-full aspect-[13/10]'>
        {/* 봉투 이미지 */}
        {EnvelopePreview ? (
          <EnvelopePreview className='h-full w-full' />
        ) : (
          <div className='h-full w-full rounded-xl bg-[#F2F2F2]' />
        )}

        {/* 우표 이미지 */}
        {!!item.stampUrl && (
          <img
            src={item.stampUrl}
            alt='우표'
            className='absolute right-[14px] bottom-[14px] h-[34px] w-[34px] pointer-events-none'
          />
        )}
      </div>

      {/* 하단 텍스트 정보 */}
      <div className='ml-[10px]'>
        <p className='mt-[12px] line-clamp-1 ty-body4'>{item.title}</p>
        <div className='mt-1 flex items-center '>
          <p className='ty-detailMedium'>{item.dateText}</p>
        </div>
      </div>
    </button>
  );
}

/**
 * LetterDetailModalContent: 모달 내부
 */
function LetterDetailModalContent({ letterId }: { letterId: number }) {
  const { data, isLoading, isError } = useLetterDetail(letterId);

  if (isLoading)
    return (
      <div className='py-20'>
        <LoadingDots />
      </div>
    );
  if (isError || !data) return <div className='p-6'>데이터를 불러오지 못했습니다.</div>;

  const font = FONT_ASSET_MAP[data.design.font.id] ?? FONT_ASSET_MAP[DEFAULT_FONT_ID];
  const paper = PAPER_ASSET_MAP[data.design.paper.id + 1] ?? PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

  return (
    <div className='flex flex-col items-center animate-in fade-in zoom-in duration-300'>
      <div onClick={(e) => e.stopPropagation()}>
        <LetterCard
          PaperBg={paper.Preview}
          font={font.fontFamily}
          value={{ title: data.title, content: data.content }}
          className='-rotate-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
        />
      </div>
    </div>
  );
}

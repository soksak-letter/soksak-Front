import BackHeader from '@/components/common/headers/BackHeader';

import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type KeywordLetterItem = {
  letterId: number;
  title: string;
  senderName: string;
  receivedAt: string; // ISO
  dateText: string; // '2026.1.3'
  stampId: number;
  stampUrl?: string; // TODO : 백엔드에서 받으면 ? 제거
  paperId: number; // 봉투 디자인 결정을 위해 필요
};

const parseDotDate = (s: string) => {
  const [y, m, d] = s.split('.').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
};

export default function KeywordLetterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지(리포트)에서 전달받은 키워드 정보가 있다고 가정 (예: { keyword: '피곤', count: 5 })
  const selectedKeyword = location.state?.keyword || '피곤';
  const keywordCount = location.state?.count || 5;

  // 정렬 상태 (최신순 기본)
  const [sortOrder] = useState<'latest' | 'oldest'>('latest');

  // mock data (나에게 받은 편지)
  const items = useMemo<KeywordLetterItem[]>(
    () => [
      {
        letterId: 11,
        title: '이지영선생님러브러브..',
        senderName: '파란수박',
        receivedAt: '2026-01-02T12:30:00.000Z',
        dateText: '2026.01.02',
        paperId: 1,
        stampId: 2,
      },
      {
        letterId: 12,
        title: '이지영선생님러브러브..',
        senderName: '파란수박',
        receivedAt: '2026-01-02T12:30:00.000Z',
        dateText: '2026.01.02',
        paperId: 2,
        stampId: 3,
      },
      {
        letterId: 3,
        title: '이지영선생님러브러브..',
        senderName: '노란귤',
        receivedAt: '2026-01-03T18:20:00.000Z',
        dateText: '2026.01.03',
        paperId: 1,
        stampId: 2,
      },
      {
        letterId: 4,
        title: '이지영선생님러브러브..',
        senderName: '분홍자몽',
        receivedAt: '2026-01-04T18:20:00.000Z',
        dateText: '2026.01.04',
        paperId: 1,
        stampId: 2,
      },
      {
        letterId: 5,
        title: '이지영선생님러브러브..',
        senderName: '파란수박',
        receivedAt: '2026-01-020T10:00:00.000Z',
        dateText: '2026.01.20',
        paperId: 1,
        stampId: 1,
      },
    ],
    [],
  );
  // 정렬 로직
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const ta = parseDotDate(a.receivedAt);
      const tb = parseDotDate(b.receivedAt);
      return sortOrder === 'latest' ? tb - ta : ta - tb;
    });
  }, [items, sortOrder]);

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
      <BackHeader title='키워드별 편지 조각' />

      <main className='px-5 py-6'>
        {/* 2. 키워드 태그 섹션 */}
        <div className='flex items-center gap-2 mb-8'>
          <div className='h-[28px] px-3 flex items-center justify-center rounded-full border border-[var(--color-primary-400)] bg-[#var(--color-primary-100)] text-[#var(--color-black)] ty-detailMedium shadow-sm'>
            # {selectedKeyword} ({keywordCount})
          </div>
          <span className='ty-body1 text-[var(--color-black)]'>이 담긴 편지</span>
        </div>

        {/* 3. 편지 그리드 섹션 (2열 배치) */}
        <div className='grid grid-cols-2 gap-x-[36px] gap-y-[20px] justify-items-center'>
          {sortedItems.map((item) => {
            // ENVELOPE_ASSET_MAP에서 디자인 에셋 추출
            const envelopeAsset = ENVELOPE_ASSET_MAP[item.paperId];
            const EnvelopePreview = envelopeAsset?.Preview;
            return (
              <PostCard
                key={item.letterId}
                item={item}
                EnvelopePreview={EnvelopePreview}
                onClick={() => navigate(`/letter/${item.letterId}`)}
              />
            );
          })}
          ;
        </div>
      </main>
    </div>
  );
}
/**
 * 🎨 PostCard 컴포넌트 (디자인 이식)
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
        <p className='mt-[12px] line-clamp-1 ty-body4 text-[var(--color-black)]'>{item.title}</p>
        <div className='mt-1 flex items-center '>
          <p className='ty-detailMedium text-[var(--color-black)]'>{item.dateText}</p>
        </div>
      </div>
    </button>
  );
}

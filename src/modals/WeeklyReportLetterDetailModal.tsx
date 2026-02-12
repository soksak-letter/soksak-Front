import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';

import LetterCard from '@/components/letters/LetterCard';
import { LoadingDots } from '@/components/LoadingDots';
import { useLetterDetail } from '@/hooks/letters/useLetterDetail';

import { DEFAULT_FONT_ID, FONT_ASSET_MAP } from '@/constants/fontAssets';
import { DEFAULT_PAPER_ID, PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { useEffect } from 'react';

export default function WeeklyReportLetterDetailModal() {
  const closeModal = useModalStore((s) => s.closeModal);
  const payload = useModalStore((s) => s.payload);

  const letterId = payload?.letterId;

  const isInvalid = !letterId || !Number.isFinite(letterId);

  useEffect(() => {
    if (isInvalid) closeModal();
  }, [isInvalid, closeModal]);

  if (isInvalid) return null;

  return (
    <ModalFrame>
      <WeeklyReportLetterDetailModalContent letterId={letterId} />
    </ModalFrame>
  );
}

export function WeeklyReportLetterDetailModalContent({ letterId }: { letterId: number }) {
  const closeModal = useModalStore((s) => s.closeModal);

  const { data, isLoading, isError } = useLetterDetail(letterId);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center animate-in fade-in zoom-in duration-300'>
        <div className='py-20'>
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='w-[343px] rounded-xl bg-[var(--color-bg-500)] p-6 text-center'>
        <p className='ty-body2 text-[var(--color-text-normal)]'>편지를 불러오지 못했어요.</p>
        <button
          type='button'
          onClick={closeModal}
          className='mt-4 h-[44px] w-full rounded-lg bg-[var(--color-primary-500)] ty-body2 text-white'
        >
          닫기
        </button>
      </div>
    );
  }

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

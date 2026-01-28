import { useMemo } from 'react';
import StyleTabs from './StyleTabs';
import { FontList } from './FontList/FontList';
import type { FontOption } from './FontList/FontItem';
import { FONT_ASSET_MAP } from '@/constants/fontAssets';
import { PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { PaperPreview, StampPreview } from './Previews';

type StyleTab = 'font' | 'paper' | 'stamp';

type LetterStyle = {
  paperId: number | null;
  stampId: number | null;
  fontId: number | null;
};

interface LetterStyleContentProps {
  selectedTab: StyleTab;
  onChangeTab: (tab: StyleTab) => void;

  value: LetterStyle;
  onChange?: (next: Partial<LetterStyle>) => void;

  papers: { id: number; color: string }[];
  fonts: { id: number; font: string }[];
  stamps: { id: number; name: string; assetUrl: string }[];
}

export default function LetterStyleContent({
  selectedTab,
  onChangeTab,
  value,
  onChange,
  papers,
  fonts,
  stamps,
}: LetterStyleContentProps) {
  const fontViewModels: FontOption[] = useMemo(() => {
    return fonts.map((f) => {
      const asset = FONT_ASSET_MAP[f.font]; // name으로 asset 찾기 -> 추후 id로 변경 가능성

      return {
        id: f.id,
        name: f.font,
        fontFamily: asset?.fontFamily ?? 'Pretendard, sans-serif',
        sampleKo: asset?.sampleKo ?? '샘플 문구',
        sampleEn: asset?.sampleEn ?? 'Sample text',
      };
    });
  }, [fonts]);

  const paperViewModels = useMemo(() => {
    return papers.map((p) => {
      const asset = PAPER_ASSET_MAP[p.color];

      return {
        id: p.id,
        name: p.color,
        Preview: asset?.Preview,
      };
    });
  }, [papers]);

  const cardClass = (isSelected: boolean) =>
    [
      'aspect-[3/4] rounded-xl bg-white shadow-sm hover:shadow-md transition-all',
      'ring-1 ring-transparent hover:ring-2 hover:ring-[var(--color-primary-500)]',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2',
      isSelected ? 'ring-2 ring-[var(--color-primary-500)] ring-offset-2' : '',
    ].join(' ');

  return (
    <div className='p-4'>
      {/* 탭바 */}
      <StyleTabs selectedTab={selectedTab} onChangeTab={onChangeTab} />

      {/* 글씨체 목록 뷰 */}
      {selectedTab === 'font' && (
        <FontList
          fonts={fontViewModels}
          selectedFontId={value.fontId != null ? value.fontId : 0}
          onChange={(id) => onChange?.({ fontId: Number(id) })}
        />
      )}

      {/* 편지지 그리드 뷰 */}
      {selectedTab === 'paper' && (
        <div className='grid grid-cols-3 gap-4'>
          {paperViewModels.map((p) => (
            <button
              key={p.id}
              type='button'
              onClick={() => onChange?.({ paperId: p.id })}
              className={cardClass(value.paperId === p.id)}
            >
              {p.Preview ? (
                <PaperPreview Preview={p.Preview} name={p.name} />
              ) : (
                <div className='w-full h-full rounded-xl bg-gray-100' />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 우표 그리드 뷰 */}
      {selectedTab === 'stamp' && (
        <div className='grid grid-cols-3 gap-3'>
          {stamps.map((s) => (
            <button
              key={s.id}
              type='button'
              onClick={() => onChange?.({ stampId: s.id })}
              className={cardClass(value.stampId === s.id)}
            >
              <StampPreview src={s.assetUrl} alt={s.name} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

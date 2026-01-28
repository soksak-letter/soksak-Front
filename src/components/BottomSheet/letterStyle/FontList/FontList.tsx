// 리스트 렌더링 (매핑 + 구분선)
import { Divider } from './Divider';
import { FontItem, type FontOption } from './FontItem';

interface FontListProps {
  fonts: FontOption[];
  selectedFontId: number;
  onChange: (id: string) => void;
}

export function FontList({ fonts, selectedFontId, onChange }: FontListProps) {
  return (
    <div className='flex flex-col'>
      {fonts.map((font, index) => (
        <div key={font.id}>
          <FontItem font={font} selected={font.id === selectedFontId} onSelect={onChange} />
          {index < fonts.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}

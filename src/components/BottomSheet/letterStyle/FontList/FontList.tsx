// 리스트 렌더링 (매핑 + 구분선)
import { Divider } from './divider';
import { FontItem, type FontOption } from './FontItem';

interface FontListProps {
  fonts: FontOption[];
  selectedFontId: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (id: number) => void;
}

export function FontList({ fonts, selectedFontId, onChange }: FontListProps) {
  return (
    <div className='flex flex-col'>
      {fonts.map((font, index) => (
        <div key={font.id}>
          <FontItem
            font={font}
            selected={font.id === selectedFontId}
            onSelect={() => onChange(font.id)}
          />
          {index < fonts.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}

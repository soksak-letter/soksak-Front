// 리스트 개별 아이템 (이름/샘플/체크 표시)
import { IoMdCheckmark } from 'react-icons/io';

export type FontOption = {
  id: number;
  name: string;
  fontFamily: string;
  sampleKo: string;
  sampleEn: string;
};

interface FontItemProps {
  font: FontOption;
  selected: boolean;
  onSelect: (id: number) => void;
}

export function FontItem({ font, selected, onSelect }: FontItemProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(font.id)}
      className='flex w-full items-center justify-between py-4 text-left'
    >
      {/* 왼쪽: 폰트 정보 */}
      <div className='flex flex-col gap-1'>
        <p className='ty-body2' style={{ fontFamily: font.fontFamily }}>
          {font.name}
        </p>

        <p
          className='ty-caption text-(--color-text-assistive)'
          style={{ fontFamily: font.fontFamily }}
        >
          {font.sampleKo}
        </p>

        <p
          className='ty-caption text-(--color-text-assistive)'
          style={{ fontFamily: font.fontFamily }}
        >
          {font.sampleEn}
        </p>
      </div>

      {/* 오른쪽: 체크 아이콘 */}
      {selected && <IoMdCheckmark className='shrink-0 text-(--color-primary-500)' />}
    </button>
  );
}

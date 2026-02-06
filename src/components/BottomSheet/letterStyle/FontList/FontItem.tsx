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
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: number) => void;
}

export function FontItem({ font, selected, onSelect }: FontItemProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(font.id)}
      className='flex w-full items-center justify-between py-4 text-left'
    >
      {/* 좌측 : 폰트 이름 */}
      <div className='min-w-[110px]'>
        <p
          className={[
            'ty-body5',
            selected ? 'text-[var(--color-primary-500)]' : 'text-black/80',
          ].join(' ')}
          style={{ fontFamily: font.fontFamily }}
        >
          {font.name}
        </p>
      </div>

      {/* 우측 : 샘플 문구 */}
      <div className='flex-1 flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <p
            className={[
              'ty-body5',
              selected ? 'text-[var(--color-primary-500)]' : 'text-black/80',
            ].join(' ')}
            style={{ fontFamily: font.fontFamily }}
          >
            {font.sampleKo}
          </p>
          <p
            className={[
              'ty-body5',
              selected ? 'text-[var(--color-primary-500)]' : 'text-black/80',
            ].join(' ')}
            style={{ fontFamily: font.fontFamily }}
          >
            {font.sampleEn}
          </p>
        </div>
        {/* 우측 : 체크 */}
        <span className='mt-3 inline-flex h-6 w-6 items-center justify-center'>
          {selected ? (
            <IoMdCheckmark className='h-5 w-5 text-[var(--color-primary-500)]' />
          ) : (
            <IoMdCheckmark className='h-5 w-5 text-[var(--color-grey-100)]' />
          )}
        </span>{' '}
      </div>
    </button>
  );
}

import clsx from 'clsx';

export type LetterInboxTabKey = 'other' | 'received';

export default function LetterInboxTabs({
  value,
  onChange,
}: {
  value: LetterInboxTabKey;
  onChange: (v: LetterInboxTabKey) => void;
}) {
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-2 rounded-md bg-[#E5E6E6]'>
        <button
          type='button'
          onClick={() => onChange('other')}
          className={clsx(
            'h-[44px] rounded-md ty-body4 transition',
            value === 'other'
              ? 'bg-white text-[#F5544C] shadow-sm border border-[#F5544C]'
              : 'text-[#8C8C8C]',
          )}
        >
          익명 편지
        </button>

        <button
          type='button'
          onClick={() => onChange('received')}
          className={clsx(
            'h-[44px] rounded-md ty-body4 transition',
            value === 'received'
              ? 'bg-white text-[#F5544C] shadow-sm border border-[#F5544C]'
              : 'text-[#8C8C8C]',
          )}
        >
          나에게 받은 편지
        </button>
      </div>
    </div>
  );
}

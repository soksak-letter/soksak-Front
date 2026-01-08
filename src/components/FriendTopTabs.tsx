import clsx from 'clsx';

type TabKey = 'inbox' | 'request';

export default function FriendTopTabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (v: TabKey) => void;
}) {
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-2 rounded-md bg-[#E5E6E6]'>
        <button
          type='button'
          onClick={() => onChange('inbox')}
          className={clsx(
            'h-[40px] rounded-md text-sm font-medium transition',
            value === 'inbox'
              ? 'bg-white text-[#F5544C] shadow-sm border border-[#F5544C]'
              : 'text-[#8C8C8C]',
          )}
        >
          친구 목록
        </button>
        <button
          type='button'
          onClick={() => onChange('request')}
          className={clsx(
            'h-[40px] rounded-md text-sm font-medium transition',
            value === 'request'
              ? 'bg-white text-[#F5544C] shadow-sm border border-[#F5544C]'
              : 'text-[#8C8C8C]',
          )}
        >
          친구 신청
        </button>
      </div>
    </div>
  );
}

// 토클 on/off 버튼

import clsx from 'clsx';

type Props = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export default function ToggleSwitch({ checked, onCheckedChange, disabled, className }: Props) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={clsx(
        'relative inline-flex h-[24px] w-[48px] items-center rounded-full transition',
        checked ? 'bg-[#FFC9C6]' : 'bg-[#646668]',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <span
        className={clsx(
          'absolute left-[2px] h-[20px] w-[20px] rounded-full transition',
          checked ? 'translate-x-[24px] bg-[#F5544C]' : 'bg-white',
        )}
      />
    </button>
  );
}

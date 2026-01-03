import clsx from 'clsx';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export default function CheckButton({ checked, onChange, disabled = false, className }: Props) {
  return (
    <button
      type='button'
      aria-pressed={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        'flex h-[18px] w-[18px] items-center justify-center rounded-full transition',
        checked
          ? 'bg-[#F5544C]' // Primary/500
          : 'border border-[#B1B3B4] bg-white',
        disabled && 'cursor-not-allowed opacity-40',
        className,
      )}
    >
      {checked && (
        <svg
          width='10'
          height='8'
          viewBox='0 0 10 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 4L4 7L9 1'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}

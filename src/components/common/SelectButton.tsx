// src/components/common/SelectButton.tsx
import React from 'react';
import clsx from 'clsx';

type SelectButtonSize = 'large' | 'medium';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  size?: SelectButtonSize;
};

const base =
  'inline-flex items-center justify-center rounded-full font-medium transition ' +
  'disabled:cursor-not-allowed';

const sizeMap: Record<SelectButtonSize, string> = {
  large: 'h-[44px] w-[96px] text-sm',
  medium: 'h-[44px] w-[80px] text-sm',
};

const variant = {
  default: 'bg-white text-[#171717] border border-[#DEDEDE]',
  selected: 'bg-[#FFEEED] text-[#171717] border border-[#FF7D77]',
};

export function SelectButton({
  selected = false,
  size = 'large',
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      disabled={disabled}
      className={clsx(
        base,
        sizeMap[size],
        selected ? variant.selected : variant.default,
        disabled && 'opacity-50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

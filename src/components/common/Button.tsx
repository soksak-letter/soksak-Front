// 기본 버튼

import React from 'react';
import clsx from 'clsx';

type ButtonColor = 'primary' | 'white' | 'grey' | 'black';
type ButtonSize = 'large' | 'medium' | 'small' | 'small2' | 'small3';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor;
  size?: ButtonSize;
  selected?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition active:scale-[0.99] disabled:cursor-not-allowed ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const sizeMap: Record<ButtonSize, string> = {
  large: 'h-[48px] w-[343px] px-5 text-base',
  medium: 'h-[56px] w-[160px] px-4 text-sm',
  small: 'h-[48px] w-[95px] px-3 text-sm',
  small2: 'h-[44px] w-[100px] px-3 text-sm',
  small3: 'h-[44px] w-[72px] px-3 text-xs',
};

const colorMap: Record<ButtonColor, { normal: string; selected: string }> = {
  primary: {
    normal: 'bg-[#F5544C] text-white hover:bg-[#E4473F]',
    selected: 'bg-[#B12D27] text-white',
  },
  white: {
    normal: 'bg-white text-[#F5544C] border-[1px] border-[#FF7D77] hover:bg-[#FFEEED]',
    selected: 'bg-[#FFC9C6] text-[#F5544C] border-[1px] border-[#FF7D77]',
  },
  grey: {
    normal: 'bg-[#B1B3B4] text-white hover:bg-[#97999B]',
    selected: 'bg-[#7D8082] text-white',
  },
  black: {
    normal: 'bg-[#191A1A] text-white hover:bg-[#323334]',
    selected: 'bg-[#4B4D4E] text-white',
  },
};

export function Button({
  color = 'primary',
  size = 'large',
  selected = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: Props) {
  const styles = colorMap[color];

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={clsx(
        base,
        sizeMap[size],
        selected ? styles.selected : styles.normal,
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      <span className='leading-none'>{children}</span>
    </button>
  );
}

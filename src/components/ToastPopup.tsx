import type { ReactNode } from 'react';

import { Icon } from '@iconify/react';

export type ToastStatus = 'success' | 'error';

export type ToastPopupProps = {
  status: ToastStatus;
  message: ReactNode;
};

const ICON_MAP: Record<ToastStatus, ReactNode> = {
  success: (
    <Icon
      icon='lets-icons:check-fill'
      // TODO : var 사용 하지 않기
      className='text-[var(--color-primary-500)] w-[24px] h-[24px]'
    />
  ),
  error: (
    <Icon
      icon='zondicons:exclamation-solid'
      // TODO : var 사용 하지 않기
      className='text-[var(--color-primary-500)] w-[24px] h-[24px]'
    />
  ),
};

const ToastPopup = ({ status, message }: ToastPopupProps) => {
  return (
    // TODO : var 사용 하지 않기
    <div className='flex items-center w-[343px] h-[56px] gap-2 px-4 py-3 rounded-lg shadow-md bg-[var(--color-primary-100)]'>
      {ICON_MAP[status]}
      <span className='text-sm font-medium'>{message}</span>
    </div>
  );
};

export default ToastPopup;

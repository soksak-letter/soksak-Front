import type { ReactNode } from 'react';

import { Icon } from '@iconify/react';

export type ToastStatus = 'success' | 'error';

export type ToastPopupProps = {
  status: ToastStatus;
  message: ReactNode;
};

const ICON_MAP: Record<ToastStatus, ReactNode> = {
  success: (
    <Icon icon='lets-icons:check-fill' className='text-(--color-primary-500) w-[24px] h-[24px]' />
  ),
  error: (
    <Icon
      icon='zondicons:exclamation-solid'
      className='text-(--color-primary-500) w-[24px] h-[24px]'
    />
  ),
};

const ToastPopup = ({ status, message }: ToastPopupProps) => {
  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg shadow-md
        ${status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
      `}
    >
      {ICON_MAP[status]}
      <span className='text-sm font-medium'>{message}</span>
    </div>
  );
};

export default ToastPopup;

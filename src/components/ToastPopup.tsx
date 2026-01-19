import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';

export type ToastStatus = 'success' | 'error';

export type ToastPopupProps = {
  status: ToastStatus;
  message: ReactNode;
  visible: boolean;
  onClose: () => void;
};

const ICON_MAP: Record<ToastStatus, ReactNode> = {
  success: (
    <Icon icon='lets-icons:check-fill' className='text-(--color-primary-500) w-[18px] h-[18px]' />
  ),
  error: (
    <Icon
      icon='zondicons:exclamation-solid'
      className='text-(--color-primary-500) w-[18px] h-[18px]'
    />
  ),
};

const ToastPopup = ({ status, message, visible, onClose }: ToastPopupProps) => {
  return (
    <div
      className={`flex items-center w-[343px] h-[56px] gap-3 px-4 py-3 rounded-[32px] shadow-md bg-(--color-primary-100) transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      onClick={onClose}
    >
      {ICON_MAP[status]}
      <span className='ty-body5'>{message}</span>
    </div>
  );
};

export default ToastPopup;

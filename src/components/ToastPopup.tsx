import type { ReactNode } from 'react';

import { FaCheckCircle } from 'react-icons/fa';
import { TbAlertCircleFilled } from 'react-icons/tb';

export type ToastStatus = 'success' | 'error';

export type ToastPopupProps = {
  status: ToastStatus;
  message: ReactNode;
};

const ICON_MAP: Record<ToastStatus, ReactNode> = {
  success: <FaCheckCircle size={24} className='text-(--color-primary-500)' />,
  error: <TbAlertCircleFilled size={24} className='text-(--color-primary-500)' />,
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

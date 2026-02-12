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
    <Icon
      icon='lets-icons:check-fill'
      className='text-[var(--color-primary-500)] w-[18px] h-[18px]'
    />
  ),
  error: (
    <Icon
      icon='zondicons:exclamation-solid'
      className='text-[var(--color-primary-500)] w-[18px] h-[18px]'
    />
  ),
};

const ToastPopup = ({ status, message, visible, onClose }: ToastPopupProps) => {
  return (
    <div
      onClick={onClose}
      className={[
        'relative overflow-hidden',
        'flex items-center w-[343px] h-[56px] gap-3 px-4 py-3 rounded-[32px]',
        'shadow-md bg-[var(--color-primary-100)]/60',

        // blur 레이어 (컨텐츠 아래)
        "before:content-[''] before:absolute before:inset-0",
        'before:backdrop-blur-sm',
        'before:pointer-events-none',
        'before:z-0',

        // 컨텐츠를 별도 레이어로 (blur 영향 방지)
        'isolate', // 중요: 내부 stacking context 분리

        'transition-all duration-300 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      ].join(' ')}
    >
      <div className='relative z-[999] flex items-center gap-3'>
        {ICON_MAP[status]}
        <span className='ty-body5'>{message}</span>
      </div>
    </div>
  );
};

export default ToastPopup;

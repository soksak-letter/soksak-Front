import { useEffect, type ReactNode } from 'react';
import { useModalStore } from '@/stores/modalStore';

type Props = {
  children: ReactNode;
};

export default function ModalFrame({ children }: Props) {
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    // esc 버튼으로 모달 닫기 가능
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeModal]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      {children}
    </div>
  );
}

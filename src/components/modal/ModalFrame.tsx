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
    <div
      className='fixed inset-0 z-50 z-[9999] flex items-center justify-center bg-black/60'
      onClick={closeModal} //배경 클릭시 닫기
    >
      {/* 이벤트 전파 방지: 편지(children) 부분을 눌렀을 때는 
         닫히지 않게 e.stopPropagation()을 자식 요소에 걸어주는 것이 좋습니다.
      */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

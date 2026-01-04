import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';

export default function ExitConfirmModal() {
  const { closeModal, payload } = useModalStore();

  const handleStay = () => closeModal();

  const handleExit = () => {
    payload?.onConfirmExit?.();
    closeModal();
  };

  return (
    <ModalFrame>
      <div
        className='w-[340px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 본문 */}
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-3'>
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px]'>
            이 창에서 나가면 질문이 바뀌어요.
            <br />
            그래도 나가시겠습니까?
          </p>
          <SadModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleStay}
            className='h-14 bg-[#B1B3B4] text-white text-[16px] font-medium'
          >
            그대로 작성하기
          </button>

          <button
            type='button'
            onClick={handleExit}
            className='h-14 bg-[#F5544C] text-white text-[16px] font-medium'
          >
            나가기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';

export default function LetterSendingFailedModal() {
  const { closeModal, payload } = useModalStore();

  const handleStay = () => {
    closeModal();
  };

  const handleSubmit = () => {
    // TODO : 재시도 로직 -> n번 이상 반복될 경우 처리 어떻게 할 것인지
    payload?.onConfirmSendingAgain?.();
    closeModal();
  };

  return (
    <ModalFrame>
      <div
        className='w-[320px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 본문 */}
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-4'>
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px]'></p>

          <SadModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleStay}
            className='h-14 bg-[#B1B3B4] text-white ty-body3'
          >
            취소
          </button>

          <button
            type='button'
            onClick={handleSubmit}
            className='h-14 bg-[#F5544C] text-white ty-body3'
          >
            다시 전송할게요
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

export default function LetterSendingConfirm() {
  const { closeModal, payload } = useModalStore();

  const handleStay = () => closeModal();

  const handleSubmit = () => {
    payload?.onConfirmSending?.();
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
            익명 편지를
            <br />
            이대로 보내시겠어요?
          </p>
          <HappyModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleStay}
            className='h-14 bg-[#B1B3B4] text-white text-[16px] font-medium'
          >
            계속 꾸미기
          </button>

          <button
            type='button'
            onClick={handleSubmit}
            className='h-14 bg-[#F5544C] text-white text-[16px] font-medium'
          >
            이대로 전송하기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

import ModalFrame from '@/components/modal/ModalFrame';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { useModalStore } from '@/stores/modalStore';

export default function StorageConfirmModal() {
  const { closeModal, payload } = useModalStore();

  const handleExit = () => {
    payload?.onExit?.();
    closeModal();
  };

  const handleStorage = () => {
    payload?.onConfirmStorage?.();
    closeModal();
  };

  return (
    <ModalFrame>
      <div
        className='w-[320px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 본문 */}
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-3'>
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px]'>
            이 창에서 나가면 작성한 내용이 삭제돼요.
            <br />
            내용을 임시저장 하시겠어요?
          </p>
          <SadModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleExit}
            className='h-14 bg-[#B1B3B4] text-white text-[16px] font-medium'
          >
            나가기
          </button>

          <button
            type='button'
            onClick={handleStorage}
            className='h-14 bg-[#F5544C] text-white text-[16px] font-medium'
          >
            저장할게요
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

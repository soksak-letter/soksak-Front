import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';

export default function WithdrawalConfirmModal() {
  const { closeModal, payload } = useModalStore();

  const handleCancel = () => closeModal();
  const handleWithdraw = () => {
    payload?.onConfirmWithdraw?.();
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
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px] whitespace-pre-line'>
            정말 탈퇴하시겠어요?{'\n'}모든 편지가 영구 삭제됩니다.
          </p>
          <SadModalIcon />
        </div>
        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleCancel}
            className='h-14 bg-[#B1B3B4] text-white text-[16px] font-medium'
          >
            취소
          </button>
          <button
            type='button'
            onClick={handleWithdraw}
            className='h-14 bg-[#F5544C] text-white text-[16px] font-medium'
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

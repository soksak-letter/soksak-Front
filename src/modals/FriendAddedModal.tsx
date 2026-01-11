import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';

import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

export default function FriendAddedModal() {
  const { closeModal, payload } = useModalStore();

  const friendName = payload?.friendName ?? '친구';

  const handleConfirm = () => {
    closeModal();
    payload?.onConfirm?.();
  };

  const handleWriteLetter = () => {
    closeModal();
    payload?.onWriteLetter?.();
  };

  return (
    <ModalFrame>
      <div
        className='w-[320px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 본문 */}
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-4'>
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px]'>
            {friendName}님과 친구가 되었어요!
          </p>

          <HappyModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleConfirm}
            className='h-14 bg-[#B1B3B4] text-white text-[16px] font-medium'
          >
            확인
          </button>

          <button
            type='button'
            onClick={handleWriteLetter}
            className='h-14 bg-[#F5544C] text-white text-[16px] font-medium'
          >
            친구에게 편지 쓰기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

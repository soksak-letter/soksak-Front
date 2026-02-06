import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

export default function FriendRequestModal() {
  const { closeModal, payload } = useModalStore();

  const receiver = payload?.receiverName ?? '친구';

  const handleStay = () => closeModal();

  const handleSubmit = () => {
    payload?.onConfirmFriendRequest?.();
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
          <p className='ty-title3'>
            {receiver}님께
            <br />
            친구 신청을 하시겠어요?
          </p>
          <HappyModalIcon />
        </div>

        {/* 하단 버튼 바 */}
        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleStay}
            className='h-14 bg-[#B1B3B4] ty-body3 text-[var(--color-white)]'
          >
            나가기
          </button>

          <button
            type='button'
            onClick={handleSubmit}
            className='h-14 bg-[#F5544C] ty-body3 text-[var(--color-white)]'
          >
            친구 신청하기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

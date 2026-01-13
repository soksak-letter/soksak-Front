import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';
import { useLocation } from 'react-router-dom';

export default function LetterSendingConfirm() {
  const { closeModal, payload } = useModalStore();
  const { pathname } = useLocation();

  const handleStay = () => closeModal();

  const handleSubmit = () => {
    payload?.onConfirmSending?.();
    closeModal();
  };

  const getTargetText = () => {
    if (pathname.includes('/letter/other/decorate') || pathname.includes('/letter/anon/decorate'))
      return '익명 편지를';
    if (pathname.includes('/letter/self/decorate')) return '나에게 편지를';
    if (pathname.includes('/letter/friend/decorate')) return '친구에게 편지를';
    return '편지를';
  };

  const targetText = getTargetText();

  return (
    <ModalFrame>
      <div
        className='w-[320px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 본문 */}
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-3'>
          <p className='text-[18px] font-semibold text-[#000] leading-[28.8px]'>
            {targetText}
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

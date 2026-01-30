import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';

export default function ConversationRemainingModal() {
  const { closeModal, payload } = useModalStore();

  const friendName = payload?.friendName ?? '친구';
  const remainingCount = typeof payload?.remainingCount === 'number' ? payload.remainingCount : 0;

  const handleContinue = () => {
    payload?.onContinueConversation?.();
    closeModal();
  };

  const handleStop = () => {
    payload?.onStopConversation?.();
    closeModal();
  };

  return (
    <ModalFrame>
      <div
        className='w-[320px] max-w-[92vw] overflow-hidden rounded-xl bg-[#F2F2F2] shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='px-6 py-6 pt-8 text-center flex flex-col items-center justify-center gap-3'>
          <p className='ty-title3 leading-[28.8px]'>
            대화가 <span className='text-[#F5544C]'>{remainingCount}회</span> 남았어요.
            <br />
            <span>{friendName}</span>님과의 편지를 끝낼까요?
          </p>

          <SadModalIcon />
        </div>

        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleContinue}
            className='h-14 bg-[#B1B3B4] text-white ty-body3'
          >
            이어가기
          </button>

          <button
            type='button'
            onClick={handleStop}
            className='h-14 bg-[#F5544C] text-white ty-body3'
          >
            끝내기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

import ModalFrame from '@/components/modal/ModalFrame';
import { useModalStore } from '@/stores/modalStore';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';

export default function OnboardingSkipConfirmModal() {
  const { closeModal, payload } = useModalStore();

  const handleContinue = () => closeModal();

  const handleSkip = () => {
    payload?.onConfirmSkip?.();
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
          <p className='ty-body2 text-(--color-text-strong) leading-[28.8px]'>
            선택을 건너뛰면 개인화된 관련 질문을
            <br />
            받을 수 없어요. 그래도 건너뛰시겠어요?
          </p>
          <SadModalIcon />
        </div>

        <div className='grid grid-cols-2'>
          <button
            type='button'
            onClick={handleContinue}
            className='h-14 bg-(--color-grey-300) text-white ty-body3'
          >
            계속 선택하기
          </button>

          <button
            type='button'
            onClick={handleSkip}
            className='h-14 bg-(--color-primary-500) text-white ty-body3'
          >
            건너뛰기
          </button>
        </div>
      </div>
    </ModalFrame>
  );
}

import ExitConfirmModal from '@/modals/ExitConfirmModal';
import OnboardingSkipConfirmModal from '@/modals/OnboardingSkipConfirmModal';
import { useModalStore } from '@/stores/modalStore';

export default function ModalRoot() {
  const { activeModal } = useModalStore();

  switch (activeModal) {
    case 'exitConfirm':
      return <ExitConfirmModal />;

    case 'onboardingSkipConfirm':
      return <OnboardingSkipConfirmModal />;

    default:
      return null;
  }
}

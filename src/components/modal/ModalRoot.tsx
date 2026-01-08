import ExitConfirmModal from '@/modals/ExitConfirmModal';
import OnboardingSkipConfirmModal from '@/modals/OnboardingSkipConfirmModal';
import FriendAddedModal from '@/modals/FriendAddedModal';

import { useModalStore } from '@/stores/modalStore';

export default function ModalRoot() {
  const { activeModal } = useModalStore();

  switch (activeModal) {
    case 'exitConfirm':
      return <ExitConfirmModal />;

    case 'onboardingSkipConfirm':
      return <OnboardingSkipConfirmModal />;

    case 'friendAdded':
      return <FriendAddedModal />;

    default:
      return null;
  }
}

import ExitConfirmModal from '@/modals/ExitConfirmModal';
import OnboardingSkipConfirmModal from '@/modals/OnboardingSkipConfirmModal';
import FriendAddedModal from '@/modals/FriendAddedModal';

import { useModalStore } from '@/stores/modalStore';
import LetterSendingConfirm from '@/modals/LetterSendingConfirmModal';
import FriendRequestModal from '@/modals/FriendRequestModal';

export default function ModalRoot() {
  const { activeModal } = useModalStore();

  switch (activeModal) {
    case 'exitConfirm':
      return <ExitConfirmModal />;

    case 'onboardingSkipConfirm':
      return <OnboardingSkipConfirmModal />;

    case 'friendAdded':
      return <FriendAddedModal />;

    case 'letterSendingConfirm':
      return <LetterSendingConfirm />;

    case 'friendRequest':
      return <FriendRequestModal />;

    default:
      return null;
  }
}

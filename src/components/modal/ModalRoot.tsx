import ExitConfirmModal from '@/modals/ExitConfirmModal';
import OnboardingSkipConfirmModal from '@/modals/OnboardingSkipConfirmModal';
import FriendAddedModal from '@/modals/FriendAddedModal';

import { useModalStore } from '@/stores/modalStore';
import LetterSendingConfirmModal from '@/modals/LetterSendingConfirmModal';
import FriendRequestModal from '@/modals/FriendRequestModal';
import FriendRequestFailedModal from '@/modals/FriendRequestFailedModal';
import LetterSendingFailedModal from '@/modals/LetterSendingFailedModal';
import LogoutConfirmModal from '@/modals/LogoutConfirmModal';

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
      return <LetterSendingConfirmModal />;

    case 'letterSendingFailed':
      return <LetterSendingFailedModal />;

    case 'friendRequest':
      return <FriendRequestModal />;

    case 'friendRequestFailed':
      return <FriendRequestFailedModal />;

    case 'logoutConfirm':
      return <LogoutConfirmModal />;

    default:
      return null;
  }
}

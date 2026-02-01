import { create } from 'zustand';

export type ModalType =
  | 'exitConfirm'
  | 'onboardingSkipConfirm'
  | 'friendAdded'
  | 'letterSendingConfirm'
  | 'letterSendingFailed'
  | 'friendRequest'
  | 'friendRequestFailed'
  | 'conversationRemaining'
  | 'storageConfirm'
  | null;

export type ModalPayload = {
  // exitConfirm
  onConfirmExit?: () => void;

  // 온보딩 건너뛰기 확인에서 쓸 콜백
  onConfirmSkip?: () => void;

  // friendAdded
  friendName?: string;
  onConfirm?: () => void;
  onWriteLetter?: () => void;

  // letterSendingConfirm
  onConfirmSending?: () => void;
  onConfirmCancelSending?: () => void;

  // letterSendingFailed
  onConfirmSendingAgain?: () => void;

  // friendRequest
  onConfirmFriendRequest?: () => void;
  receiverName?: string;

  // friendRequestFailed
  onConfirmRequestAgain?: () => void;

  // conversationRemaining (대화 n회 남음)
  remainingCount?: number;
  onContinueConversation?: () => void;
  onStopConversation?: () => void;

  // storageConfirm
  onConfirmStorage?: () => void;
  onExit?: () => void;
};

interface ModalState {
  activeModal: ModalType;
  payload: ModalPayload | null;
  // eslint-disable-next-line no-unused-vars
  openModal: (modal: Exclude<ModalType, null>, payload?: ModalPayload) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  payload: null,
  openModal: (modal, payload) => set({ activeModal: modal, payload: payload ?? null }),
  closeModal: () => set({ activeModal: null, payload: null }),
}));

import { create } from 'zustand';

export type ModalType =
  | 'exitConfirm'
  | 'onboardingSkipConfirm'
  | 'friendAdded'
  | 'LetterSendingConfirm'
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

  // LetterSendingConfirm
  onConfirmSending?: () => void;
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

import { create } from 'zustand';

export type ModalType = 'delete' | 'success' | 'exitConfirm' | null;

export type ModalPayload = {
  onConfirmExit?: () => void;
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

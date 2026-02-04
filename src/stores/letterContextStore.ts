import { create } from 'zustand';
import type { Target } from './letterStore';

type ThreadFlow = {
  target: Target | null;

  // 한 사람과의 대화방(세션/스레드) 식별자
  sessionId: number | null;

  // UI 표시용
  friendName: string | null; // friend 모드에서 상대 이름
  senderName: string | null; // other/anon에서 보여줄 상대 이름

  letterCount?: number | null;

  // eslint-disable-next-line no-unused-vars
  setFlow: (partial: Partial<Omit<ThreadFlow, 'setFlow' | 'resetFlow'>>) => void;
  resetFlow: () => void;
};

const initialState = {
  target: null,
  sessionId: null,
  friendName: null,
  senderName: null,
};

export const useThreadFlowStore = create<ThreadFlow>((set) => ({
  ...initialState,

  setFlow: (partial) => set((s) => ({ ...s, ...partial })),
  resetFlow: () => set(initialState),
}));

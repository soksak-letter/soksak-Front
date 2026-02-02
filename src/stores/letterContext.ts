import { create } from 'zustand';
import type { Target } from './letterStore';

type ThreadFlow = {
  target: Target | null;

  // 한 사람과의 대화방(세션/스레드) 식별자
  // 근데 백엔드 코드에 의하면 receiverUserId와 같다.
  threadId: number | null;

  // UI 표시용
  friendName: string | null; // friend 모드에서 상대 이름
  senderName: string | null; // other/anon에서 보여줄 상대 이름

  // 필요하면 나중에 추가
  // lastLetterId?: number | null;
  // letterCount?: number | null;

  setFlow: (partial: Partial<Omit<ThreadFlow, 'setFlow' | 'resetFlow'>>) => void;
  resetFlow: () => void;
};

const initialState = {
  target: null,
  threadId: null,
  friendName: null,
  senderName: null, // 나
};

export const useThreadFlowStore = create<ThreadFlow>((set) => ({
  ...initialState,

  setFlow: (partial) => set((s) => ({ ...s, ...partial })),
  resetFlow: () => set(initialState),
}));

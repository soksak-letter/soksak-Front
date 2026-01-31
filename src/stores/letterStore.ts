import { DEFAULT_FONT_ID } from '@/constants/fontAssets';
import { DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import { create } from 'zustand';

export type Target = 'self' | 'anon' | 'other' | 'friend';

type LetterDraft = {
  questionId: number | null;
  receiverUserId: number | null;
  title: string;
  content: string;
  isPublic: boolean;
};

type LetterStyle = {
  paperId: number | null;
  stampId: number | null;
  fontId: number | null;
};

const createInitialDraft = (): LetterDraft => ({
  questionId: null,
  receiverUserId: null,
  title: '',
  content: '',
  isPublic: false,
});

const createInitialStyle = (): LetterStyle => ({
  paperId: DEFAULT_PAPER_ID,
  stampId: null, // TODO : AssetUrl 연동 후 초기값 정의
  fontId: DEFAULT_FONT_ID,
});

type LetterStore = {
  // 현재 작성 모드
  activeTarget: Target;
  setActiveTarget: (t: Target) => void;

  // target별 상태
  draftByTarget: Record<Target, LetterDraft>;
  styleByTarget: Record<Target, LetterStyle>;

  // 현재 target의 draft/style 접근자
  getDraft: () => LetterDraft;
  getStyle: () => LetterStyle;

  // 현재 target에만 patch
  patchDraft: (partial: Partial<LetterDraft>) => void;
  patchStyle: (partial: Partial<LetterStyle>) => void;

  // reset도 현재 target만 / 전체 다 가능
  resetCurrent: () => void;
  resetAll: () => void;
};

export const useLetterStore = create<LetterStore>((set, get) => ({
  activeTarget: 'self',
  setActiveTarget: (t) => set({ activeTarget: t }),

  draftByTarget: {
    self: createInitialDraft(),
    anon: createInitialDraft(),
    other: createInitialDraft(),
    friend: createInitialDraft(),
  },
  styleByTarget: {
    self: createInitialStyle(),
    anon: createInitialStyle(),
    other: createInitialStyle(),
    friend: createInitialStyle(),
  },

  getDraft: () => get().draftByTarget[get().activeTarget],
  getStyle: () => get().styleByTarget[get().activeTarget],

  patchDraft: (partial) =>
    set((state) => {
      const t = state.activeTarget;
      return {
        draftByTarget: {
          ...state.draftByTarget,
          [t]: { ...state.draftByTarget[t], ...partial },
        },
      };
    }),

  patchStyle: (partial) =>
    set((state) => {
      const t = state.activeTarget;
      return {
        styleByTarget: {
          ...state.styleByTarget,
          [t]: { ...state.styleByTarget[t], ...partial },
        },
      };
    }),

  resetCurrent: () =>
    set((state) => {
      const t = state.activeTarget;
      return {
        draftByTarget: { ...state.draftByTarget, [t]: createInitialDraft() },
        styleByTarget: { ...state.styleByTarget, [t]: createInitialStyle() },
      };
    }),

  resetAll: () =>
    set({
      draftByTarget: {
        self: createInitialDraft(),
        anon: createInitialDraft(),
        other: createInitialDraft(),
        friend: createInitialDraft(),
      },
      styleByTarget: {
        self: createInitialStyle(),
        anon: createInitialStyle(),
        other: createInitialStyle(),
        friend: createInitialStyle(),
      },
    }),
}));

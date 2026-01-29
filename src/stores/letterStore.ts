import { DEFAULT_FONT_ID } from '@/constants/fontAssets';
import { DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import { create } from 'zustand';

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

const initialDraft: LetterDraft = {
  questionId: null,
  receiverUserId: null,

  title: '',
  content: '',
  isPublic: false,
};

const initialStyle: LetterStyle = {
  paperId: DEFAULT_PAPER_ID,
  stampId: DEFAULT_FONT_ID,
  fontId: null,
};

type LetterStore = {
  draft: LetterDraft;
  style: LetterStyle;

  patchDraft: (partial: Partial<LetterDraft>) => void;
  patchStyle: (partial: Partial<LetterStyle>) => void;

  resetAll: () => void;
  resetDraft: () => void;
  resetStyle: () => void;
};

export const useLetterStore = create<LetterStore>((set) => ({
  draft: initialDraft,
  style: initialStyle,

  patchDraft: (partial) =>
    set((state) => ({
      draft: { ...state.draft, ...partial },
    })),

  patchStyle: (partial) =>
    set((state) => ({
      style: { ...state.style, ...partial },
    })),

  resetAll: () => set({ draft: initialDraft, style: initialStyle }),
  resetDraft: () => set({ draft: initialDraft }),
  resetStyle: () => set({ style: initialStyle }),
}));

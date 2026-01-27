import { create } from 'zustand';

type LetterDraft = {
  questionId: number | null;
  receiverUserId: number | null;
  title: string;
  content: string;
  isPublic: boolean;

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

  paperId: null,
  stampId: null,
  fontId: null,
};

type LetterDraftStore = {
  draft: LetterDraft;
  patch: (partial: Partial<LetterDraft>) => void;
  reset: () => void;
};

export const useLetterDraftStore = create<LetterDraftStore>((set) => ({
  draft: initialDraft,

  patch: (partial) =>
    set((state) => ({
      draft: { ...state.draft, ...partial },
    })),

  reset: () => set({ draft: initialDraft }),
}));

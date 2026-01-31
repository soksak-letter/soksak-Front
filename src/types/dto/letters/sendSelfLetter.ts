export type CreateSelfLetterBody = {
  questionId?: number;
  title: string;
  content: string;
  isPublic: boolean;

  paperId: number;
  fontId: number;
  stampId: number;
  scheduledAt: string;
};

export type CreateSelfLetterResult = {
  letter: {
    id: number;
    deliveredAt: string | null;
  };
};

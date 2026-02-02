type BaseCreateLetterBody = {
  questionId?: number;
  title: string;
  content: string;
  isPublic: boolean;
  paperId: number;
  fontId: number;
  stampId: number;
};

export type CreateLetterBody = BaseCreateLetterBody & {
  receiverUserId?: number;
};

export type CreateSelfLetterBody = BaseCreateLetterBody & {
  scheduledAt: string; // ISO
};

export type CreateLetterResult = {
  letter: {
    id: number;
    deliveredAt: string | null;
  };
};

export type CreateSelfLetterResult = {
  letter: {
    id: number;
    deliveredAt: string | null;
  };
};

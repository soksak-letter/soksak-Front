export type CreateLetterBody = {
  questionId?: number;
  title: string;
  content: string;
  isPublic: boolean;

  paperId: number;
  fontId: number;
  stampId: number;
  receiverUserId?: number;
};

export type CreateLetterResult = {
  letter: {
    id: number;
    deliveredAt: string | null;
  };
};

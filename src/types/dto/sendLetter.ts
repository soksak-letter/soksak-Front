export type CreateLetterBody = {
  questionId: number | null;
  title: string;
  content: string;
  isPublic: boolean;

  paperId: number;
  fontId: number;
  stampId: number;
  receiverUserId: number;
};

export type CreateLetterResult = null;

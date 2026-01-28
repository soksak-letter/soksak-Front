export type CreateLetterBody = {
  target: 'anon' | 'other' | 'self' | 'friend';
  title: string;
  content: string;
  isPublic: boolean;

  paperId: number;
  fontId: number;
  stampId: number;
};

export type CreateLetterResult = null;

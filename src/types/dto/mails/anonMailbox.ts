import type { ApiError } from '../common';

export type AnonMailboxLetter = {
  sessionId: number;

  sender: {
    id: number;
    nickname: string;
    letterCount: number;
  };

  lastLetterId: number;
  lastLetterTitle: string;
  lastLetterPreview: string;
  deliveredAt: string;

  design: {
    paperId: number;
    stampId: number;
    stampUrl: string;
  };
};

export type AnonMailboxSuccess = {
  letters: AnonMailboxLetter[];
};

export type AnonMailboxResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: AnonMailboxSuccess | null;
};

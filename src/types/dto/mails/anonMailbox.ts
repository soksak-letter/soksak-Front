import type { ApiError } from '../common';

export type AnonMailboxLetter = {
  sessionId: number;

  sender: {
    id: number;
    nickname: string;
  };

  lastLetterId: number;
  lastLetterTitle: string;
  lastLetterPreview: string;
  deliveredAt: string;

  // design도 paper만 옴 (stamp는 별도 필드)
  design: {
    paper: {
      id: number;
      name: string;
    };
  };

  stampId: number;
  stampUrl: string;
};

export type AnonMailboxSuccess = {
  letters: AnonMailboxLetter[];
};

export type AnonMailboxResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: AnonMailboxSuccess | null;
};

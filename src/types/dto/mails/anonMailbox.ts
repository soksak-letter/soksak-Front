import type { ApiError } from '../common';

export type AnonMailboxSuccess = {
  items: [
    {
      threadId: number;
      sender: {
        id: number;
        nickname: string;
      };
      lastLetterId: number;
      lastLetterTitle: string;
      lastLetterPreview: string;
      updatedAt: string;
      paperId: number;
    },
  ];
};

export type AnonMailboxResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: AnonMailboxSuccess | null;
};

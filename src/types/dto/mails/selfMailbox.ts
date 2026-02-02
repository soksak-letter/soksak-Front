import type { ApiError } from '../common';

export type SelfMailboxSuccess = {
  letters: {
    id: number;
    questionId: number;
    title: string;
    createdAt: string;
    paperId: number;
    stampId: number;
    stampUrl: string;
  }[];
};

export type SelfMailboxResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: SelfMailboxSuccess | null;
};

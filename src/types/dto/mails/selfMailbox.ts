import type { ApiError } from '../common';

export type SelfMailboxSuccess = {
  letters: {
    id: number;
    title: string;
    questionTitle: string;
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

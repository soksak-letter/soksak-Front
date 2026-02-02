import type { ApiError } from '../common';

export type SelfMailboxSuccess = {
  items: {
    id: number;
    title: string;
    createdAt: string;
    paperId: number;
  }[];
};

export type SelfMailboxResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: SelfMailboxSuccess | null;
};

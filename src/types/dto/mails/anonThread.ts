import type { ApiError } from '../common';

export type AnonThreadLetter = {
  id: number;
  title: string;
  deliveredAt: string;
  isMine: boolean;

  paperId: number;
  stampId: number;
  stampUrl: string;
};

export type AnonThreadSuccess = {
  firstQuestion: string;
  letters: AnonThreadLetter[];
};

export type AnonThreadResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: AnonThreadSuccess | null;
};

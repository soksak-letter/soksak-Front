import type { ApiError } from '../common';

export type LetterDetailSuccess = {
  id: number;
  title: string;
  content: string;
  deliveredAt: string | null;
  question: string;
  design: {
    paper: { id: number; color: string };
    stamp: { id: number; name: string; assetUrl: string };
    font: { id: number; font: string };
  };
};

export type LetterDetailResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: LetterDetailSuccess | null;
};

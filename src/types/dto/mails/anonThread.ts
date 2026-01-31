import type { ApiError } from '../common';

export type AnonThreadSuccess = {
  firstQuestion: string;
  letters: {
    id: number;
    title: string;
    deliveredAt: string;
    design: {
      paper: {
        id: number;
        name: string;
      };
      stamp: {
        id: number;
        name: string;
        assetUrl: string;
      };
    };
  }[];
};

export type AnonThreadResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: AnonThreadSuccess | null;
};

import type { ApiError } from './common';

export type PublicFeedDetail = {
  id: number;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  deliveredAt: string;
  design: {
    paper: {
      id: number;
      name: string;
    };
  };
};

export type PublicFeedResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: PublicFeedDetail[] | null;
};

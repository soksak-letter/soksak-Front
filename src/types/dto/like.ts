import type { CommonResponse } from './common';

export type CreateLikeSuccess = {
  letterId: number;
  isLiked: boolean;
};

export type CreateLikeResponse = CommonResponse<CreateLikeSuccess>;

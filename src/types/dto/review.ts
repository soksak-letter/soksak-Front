import type { CommonResponse } from './common';

export type CreateReviewBody = {
  temperatureScore: number;
  reviewTag: string;
};

export type Review = {
  id: number;
  sessionId: number;
  reviewerUserId: number;
  targetUserId: number;
  temperatureScore: number;
  reviewTag: string;
};

export type CreateReviewSuccess = {
  message: string;
  result: {
    data: Review;
  };
};

// API 레벨에서 사용할 때
export type CreateReviewResponse = CommonResponse<CreateReviewSuccess>;

import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/dto/common';
import type { CreateReviewBody, CreateReviewSuccess } from '@/types/dto/review';
import { postCreateReview } from '@/api/review';

type CreateReviewVars = {
  sessionId: number;
  body: CreateReviewBody;
};

export function useCreateReview() {
  return useMutation<CreateReviewSuccess, ApiError, CreateReviewVars>({
    mutationFn: ({ sessionId, body }) => postCreateReview(sessionId, body),
    retry: 0,
  });
}

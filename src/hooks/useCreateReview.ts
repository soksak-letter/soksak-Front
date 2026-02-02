import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/dto/common';
import type { CreateReviewBody, CreateReviewResponse } from '@/types/dto/review';
import { postCreateReview } from '@/api/review';

type CreateReviewVars = {
  threadId: number;
  body: CreateReviewBody;
};

export function useCreateReview() {
  return useMutation<CreateReviewResponse, ApiError, CreateReviewVars>({
    mutationFn: ({ threadId, body }) => postCreateReview(threadId, body),
    retry: 0,
  });
}

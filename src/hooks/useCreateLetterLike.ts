import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/dto/common';
import type { CreateLikeSuccess } from '@/types/dto/like';
import { deleteLetterLike, postLetterLike } from '@/api/like';

export function useCreateLike() {
  return useMutation<CreateLikeSuccess, ApiError, number>({
    mutationFn: (letterId) => postLetterLike(letterId),
    retry: 0,
  });
}

export function useDeleteLike() {
  return useMutation<CreateLikeSuccess, ApiError, number>({
    mutationFn: (letterId) => deleteLetterLike(letterId),
    retry: 0,
  });
}

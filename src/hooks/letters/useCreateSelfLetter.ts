import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/dto/common';
import type { CreateSelfLetterBody, CreateSelfLetterResult } from '@/types/dto/letters/sendetter';
import { postCreateSelfLetter } from '@/api/letters/sendSelfLetter';

export function useCreateSelfLetter() {
  return useMutation<CreateSelfLetterResult, ApiError, CreateSelfLetterBody>({
    mutationFn: postCreateSelfLetter,
    retry: 0,
    retryDelay: 0,
  });
}

import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/dto/common';
import { postCreateSelfLetter } from '@/api/letters/sendSelfLetter';
import type { CreateSelfLetterBody, CreateSelfLetterResult } from '@/types/dto/letters/sendLetter';

export function useCreateSelfLetter() {
  return useMutation<CreateSelfLetterResult, ApiError, CreateSelfLetterBody>({
    mutationFn: postCreateSelfLetter,
    retry: 0,
    retryDelay: 0,
  });
}

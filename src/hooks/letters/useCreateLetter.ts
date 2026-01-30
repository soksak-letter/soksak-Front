import { useMutation } from '@tanstack/react-query';
import { postCreateLetter } from '@/api/sendLetter';
import type { CreateLetterBody, CreateLetterResult } from '@/types/dto/sendLetter';
import type { ApiError } from '@/types/dto/common';

export function useCreateLetter() {
  return useMutation<CreateLetterResult, ApiError, CreateLetterBody>({
    mutationFn: postCreateLetter,
    retry: 0,
    retryDelay: 0,
  });
}

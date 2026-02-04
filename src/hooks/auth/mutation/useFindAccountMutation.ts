import { useMutation } from '@tanstack/react-query';
import {
  postVerificationCodes,
  postVerificationCodesConfirm,
  postFindId,
  type FindAccountType,
} from '@/api/findAccount';

export const useAuthCodeMutation = () => {
  return useMutation({
    mutationFn: ({ type, email }: { type: FindAccountType; email: string }) =>
      postVerificationCodes(type, { email }),
  });
};

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: ({ type, email, code }: { type: FindAccountType; email: string; code: string }) =>
      postVerificationCodesConfirm(type, { email, code }),
  });
};

export const useFindIdMutation = () => {
  return useMutation({
    mutationFn: (email: string) => postFindId({ email }),
  });
};

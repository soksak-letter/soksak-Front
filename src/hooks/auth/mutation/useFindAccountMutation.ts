import { useMutation } from '@tanstack/react-query';
import {
  postVerificationCodes,
  postVerificationCodesConfirm,
  postFindId,
  type FindAccountType,
  patchResetPassword,
} from '@/api/findAccount';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useNavigate } from 'react-router-dom';

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

//비밀번호 재설정 Mutation
export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    // 비밀번호와 토큰을 인자로 받음
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      patchResetPassword({ password }, token),
    onSuccess: (response) => {
      if (response.resultType === 'SUCCESS') {
        navigate('/auth/signin');
      } else {
        showToast(response.error?.reason || '비밀번호 변경에 실패했습니다.', 'error');
      }
    },
    onError: () => {
      showToast('네트워크 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    },
  });
};

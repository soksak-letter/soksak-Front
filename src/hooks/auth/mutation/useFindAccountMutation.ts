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
import axios from 'axios';

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
// 에러 응답 인터페이스 정의
interface ApiErrorResponse {
  error: {
    errorCode: string;
    reason: string;
    data: Record<string, unknown> | Array<{ field: string; message: string }>; // 빈 객체 {} 도 포함 가능하도록
  };
}

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
    onError: (err: unknown) => {
      // any 제거 -> unknown 적용
      let message = '비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.';

      //  Axios 에러 타입 가드 (401 등 서버 응답 에러 처리)
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const status = err.response?.status;
        const errorData = err.response?.data?.error;

        // 401 인증 실패 또는 토큰 만료 상황 상세 처리
        if (status === 401) {
          message = errorData?.reason || '인증 세션이 만료되었습니다. 다시 시도해 주세요.';
        }
      }

      showToast(message, 'error');
    },
  });
};

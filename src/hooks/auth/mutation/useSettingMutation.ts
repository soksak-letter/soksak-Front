import { useMutation } from '@tanstack/react-query';
import { patchChangePassword } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { ROUTES } from '@/routes/paths';
import axios from 'axios';

// 에러 응답 인터페이스 정의
interface ApiErrorResponse {
  error: {
    errorCode: string;
    reason: string;
    data: Record<string, unknown> | Array<{ field: string; message: string }>; // 빈 객체 {} 도 포함 가능하도록
  };
}
//비밀번호 변경
export const useChangePasswordMutation = () => {
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    mutationFn: ({ currentPassword, password }: { currentPassword: string; password: string }) =>
      patchChangePassword({
        oldPassword: currentPassword,
        newPassword: password,
      }),
    onSuccess: (response) => {
      if (response.resultType === 'SUCCESS') {
        navigate(ROUTES.setting.setting); // 설정 메인으로 이동
      } else {
        // 200 OK 응답이지만 내부 에러가 포함된 경우 처리
        showToast('비밀번호 변경에 실패했습니다.', 'error');
      }
    },
    onError: (error: unknown) => {
      let message = '비밀번호 변경 중 오류가 발생했습니다.';

      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const errorData = error.response?.data?.error;
        const status = error.response?.status;

        // 특정 에러 코드에 따른 맞춤형 메시지 처리
        if (errorData?.errorCode === 'PASSWORD_NOT_FOUND') {
          message = '기존 비밀번호를 찾을 수 없습니다. 소셜 로그인 유저인지 확인해주세요.';
        } else if (status === 401) {
          message = errorData?.reason || '인증이 만료되었습니다. 다시 로그인해주세요.';
        } else {
          message = errorData?.reason || message;
        }
      }

      showToast(message, 'error');
    },
  });
};

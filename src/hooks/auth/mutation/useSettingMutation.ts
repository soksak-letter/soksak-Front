import { useMutation } from '@tanstack/react-query';
import { patchChangePassword } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { ROUTES } from '@/routes/paths';
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
        showToast(response.error?.reason || '비밀번호 변경에 실패했습니다.', 'error');
      }
    },
    onError: (error: unknown) => {
      let message = '현재 비밀번호가 일치하지 않거나 오류가 발생했습니다.';

      if (error instanceof Error) {
        const axiosError = error as any;
        message = axiosError.response?.data?.error?.reason || error.message || message;
      }
      showToast(message, 'error');
    },
  });
};

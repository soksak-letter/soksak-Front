import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { SignUpRequest } from '@/types/dto/auth';
import { useGlobalToast } from '@/components/toast/ToastProvider';

export const useSignupMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    mutationFn: (requestBody: SignUpRequest) => postSignup(requestBody),
    onSuccess: (response) => {
      if (response.resultType === 'SUCCESS') {
        const { jwtAccessToken, jwtRefreshToken } = response.success.result.tokens;
        // 토큰 저장
        // (Store가 내부적으로 localStorage 저장도 하고, isLoggedIn 상태도 true로 바꿈)
        login(jwtAccessToken, jwtRefreshToken);
        navigate('/auth/profile-setup');
      } else {
        // API 레벨의 에러 처리
        showToast(response.error?.reason || '회원가입에 실패했습니다.', 'error');
      }
    },
    onError: () => {
      // 네트워크 에러 처리
      showToast('네트워크 오류입니다', 'error');
      navigate('/error/500');
    },
  });
};

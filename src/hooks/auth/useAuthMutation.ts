import { useMutation } from '@tanstack/react-query';
import { postSignin, postSignup } from '@/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { SignInRequest, SignUpRequest } from '@/types/dto/auth';
import { useGlobalToast } from '@/components/toast/ToastProvider';

//---회원가입----
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
//--로그인----

export const useSigninMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    mutationFn: (requestData: SignInRequest) => postSignin(requestData),
    onSuccess: (response) => {
      if (response.resultType === 'SUCCESS' && response.success) {
        const { jwtAccessToken, jwtRefreshToken } = response.success.result;
        login(jwtAccessToken, jwtRefreshToken);
        navigate('/');
      } else {
        showToast('아이디 또는 비밀번호를 확인해주세요.', 'error');
      }
    },
    onError: (err: any) => {
      if (err === '401') {
        showToast('아이디 또는 비밀번호를 확인해주세요.', 'error');
      } else {
        const errorMessage = err.response?.data?.error?.reason || '서버 오류가 발생했습니다.';
        showToast(errorMessage, 'error');
      }
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { postSignin, postSignup, postSocialLogin, type SocialProvider } from '@/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { SignInRequest, SignUpRequest } from '@/types/dto/auth';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { ROUTES } from '@/routes/paths';
import axios from 'axios';

// 에러 응답 인터페이스 정의 (예시)
interface ApiErrorResponse {
  error: {
    errorCode: string;
    reason: string;
    data: Record<string, unknown> | Array<{ field: string; message: string }>; // 빈 객체 {} 도 포함 가능하도록
  };
}

//---회원가입----
export const useSignupMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    mutationFn: (requestBody: SignUpRequest) => postSignup(requestBody),
    onSuccess: (response) => {
      if (response.resultType === 'SUCCESS' && response.success) {
        const { jwtAccessToken, jwtRefreshToken } = response.success.result.tokens;
        // 토큰 저장
        // (Store가 내부적으로 localStorage 저장도 하고, isLoggedIn 상태도 true로 바꿈)
        login({ accessToken: jwtAccessToken, refreshToken: jwtRefreshToken });
        navigate('/auth/profile-setup');
      } else {
        // 안전장치
        showToast(response.error?.reason || '회원가입에 실패했습니다.', 'error');
      }
    },
    onError: (err: unknown) => {
      let message = '네트워크 오류가 발생했습니다.';
      showToast(message, 'error');
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
        login({ accessToken: jwtAccessToken, refreshToken: jwtRefreshToken });
        navigate('/');
      } else {
        //서버 실수 등 안전장치 역할
        showToast('아이디 또는 비밀번호를 확인해주세요.', 'error');
      }
    },
    onError: (err: unknown) => {
      let message = '네트워크 연결이 원활하지 않습니다.';

      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        //  response 객체 자체가 없을 때를 대비해 안전하게 꺼내기
        const status = err.response?.status;
        const errorData = err.response?.data?.error;

        // 3. HTTP 상태 코드 401 또는 특정 에러 코드(AUTH_BAD_REQUEST) 처리
        if (status === 401 || errorData?.errorCode === 'AUTH_BAD_REQUEST') {
          message = '아이디 또는 비밀번호를 확인해주세요.';
        } else if (errorData?.reason) {
          // 4. 서버에서 보내준 구체적인 실패 사유가 있다면 활용
          message = errorData.reason;
        }
      }
      showToast(message, 'error');
    },
  });
};
//-------소셜로그인---------
export const useSocialLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    // mutationFn: 소셜 로그인 API 호출
    mutationFn: ({ provider, code }: { provider: SocialProvider; code: string }) =>
      postSocialLogin(provider, code),
    onSuccess: (data) => {
      if (data.resultType === 'SUCCESS' && data.success) {
        const { isNewUser, tokens } = data.success;

        // 토큰 저장
        login({
          accessToken: tokens.jwtAccessToken,
          refreshToken: tokens.jwtRefreshToken,
        });

        // 신규/기존 유저 분기 처리
        if (isNewUser) {
          navigate(ROUTES.auth.terms, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        throw new Error('로그인 처리 실패');
      }
    },
    onError: (err: unknown) => {
      let message = '인증 정보가 만료되었습니다.';
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        message = err.response?.data?.error?.reason || message;
      }
      // state를 담아 SocialErrorPage로 이동
      navigate('/error/social', { replace: true, state: { message } });
    },
  });
};

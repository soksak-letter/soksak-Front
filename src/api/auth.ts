import type {
  EmailExistsRequest,
  EmailExistsResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SocialLoginResponse,
  UsernameExistsRequest,
  UsernameExistsResponse,
} from '@/types/dto/auth';
import { axiosInstance } from './axios'; // axios 설정 파일 경로

/**
 * 회원가입 API
 * @param body 회원가입 입력 정보
 */
export const postSignup = async (body: SignUpRequest) => {
  const { data } = await axiosInstance.post<SignUpResponse>(
    '/auth/signup', // 서버 API 명세에 맞는 URL 입력
    body,
  );
  return data;
};
/**
 * 이메일 중복 확인 API
 * @param body 이메일 중복확인 입력 정보 (이메일)
 */
export const postCheckEmailExists = async (body: EmailExistsRequest) => {
  const { data } = await axiosInstance.post<EmailExistsResponse>('/auth/email/exists', body);
  return data;
};

/**
 * 아이디 중복 확인 API
 * @param body 아이디 중복확인 입력 정보 (아이디)
 */
export const postCheckUsernameExists = async (body: UsernameExistsRequest) => {
  const { data } = await axiosInstance.post<UsernameExistsResponse>('/auth/username/exists', body);
  return data;
};
/**
 * 로그인 API
 * @param body 로그인 입력 정보 (아이디, 비번)
 */
export const postSignin = async (body: SignInRequest) => {
  const { data } = await axiosInstance.post<SignInResponse>('/auth/login', body);
  return data;
};
/**
 * 소셜 로그인 (인가 코드 -> 토큰 교환)
 * @param provider 'google' | 'kakao' | 'naver' | 'apple'
 * @param code 소셜 측에서 받은 인가 코드
 */
export const socialLogin = async (provider: string, code: string) => {
  const response = await axiosInstance.post<SocialLoginResponse>(
    `/auth/login/${provider}`, // /auth/login/kakao
    { code }, // Request Body: { "code": "..." }
  );
  return response.data;
};

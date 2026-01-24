import type {
  EmailExistsRequest,
  EmailExistsResponse,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
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
 * @param body 이메일 중복확인 입력 정보 (이메일)
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
 * 토큰 재발급 (Refresh) API
 * 보통 쿠키에 담긴 리프레시 토큰을 사용하므로 body가 없는 경우가 많습니다.
 * 응답으로 새로운 AccessToken을 받습니다 (RefreshTokenResult)
 */
export const postRefreshToken = async () => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh');
  return data;
};

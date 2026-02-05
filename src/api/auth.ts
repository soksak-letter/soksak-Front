import type {
  AgreementsRequest,
  AgreementsResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  EmailExistsRequest,
  EmailExistsResponse,
  LogoutResponse,
  NicknameSetUpRequest,
  NicknameSetUpResponse,
  ProfileImageResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SocialLoginResponse,
  UsernameExistsRequest,
  UsernameExistsResponse,
  WithdrawResponse,
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
 * 로그아웃 API
 * POST /auth/logout
 */
export const postLogout = async () => {
  // 로그아웃은 보통 Body({})가 비어있어도 됩니다.
  const { data } = await axiosInstance.post<LogoutResponse>('/auth/logout');
  return data;
};

/**
 * 회원탈퇴 API
 * DELETE /users
 */
export const deleteWithdraw = async () => {
  const { data } = await axiosInstance.delete<WithdrawResponse>('/users');
  return data;
};

/**
 * 비밀번호 재설정(설정 페이지)API
 * PATCH /auth/change-password
 */
export const patchChangePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.patch<ChangePasswordResponse>('/auth/change-password', data);
  return response.data;
};

/**
 * 소셜 로그인 (인가 코드 -> 토큰 교환)
 * @param provider 'google' | 'kakao' | 'naver'
 * @param code 소셜 측에서 받은 인가 코드
 */
export type SocialProvider = 'google' | 'kakao' | 'naver';

export const postSocialLogin = async (provider: SocialProvider, code: string) => {
  const response = await axiosInstance.post<SocialLoginResponse>(
    `/auth/login/${provider}`, // /auth/login/kakao
    { code }, // Request Body: { "code": "..." }
  );
  return response.data;
};
/**
 * 약관 동의 API
 * @param data 회원가입 입력 정보
 */
export const patchAgreements = async (data: AgreementsRequest) => {
  const response = await axiosInstance.patch<AgreementsResponse>(
    '/users/me/consents', // 서버 API 명세에 맞는 URL 입력
    data,
  );
  return response.data;
};

/**
 * 닉네임 설정 API
 * @param data 닉네임
 */

export const patchNickname = async (data: NicknameSetUpRequest) => {
  const response = await axiosInstance.patch<NicknameSetUpResponse>('/users/me/profile', data);
  return response.data;
};
/**
 * 프로필 이미지 업로드 API
 * @param file 파일
 */
export const postProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post<ProfileImageResponse>(
    '/users/me/profile/image',
    formData,
    {
      headers: {},
    },
  );
  return response.data;
};

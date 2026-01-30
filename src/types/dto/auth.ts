import type { CommonResponse } from './common';

// Auth API DTO
//회원가입

// 1. 내가 서버로 보낼 데이터 (Request Dto)
export interface SignUpRequest {
  email: string;
  username: string;
  name: string;
  phoneNumber: string; // 혹은 phone (서버 명세에 따름)
  password: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  ageOver14Agreed: boolean;
  marketingPushAgreed?: boolean;
  marketingEmailAgreed?: boolean;
}

// 2. 서버가 응답으로 줄 데이터 (Response DTO)
export interface SignUpResult {
  result: {
    id: number;
    email: string;
    name: string;
    tokens: {
      jwtAccessToken: string;
      jwtRefreshToken: string;
    };
  };
}

// 최종 응답 타입 정의
export type SignUpResponse = CommonResponse<SignUpResult>;

//로그인
// 1. 내가 서버로 보낼 데이터 (Request)
export interface SignInRequest {
  username: string;
  password: string;
}

//서버가 응답으로 줄 데이터 (Response DTO)
export interface SignInResult {
  result: {
    jwtAccessToken: string;
    jwtRefreshToken: string;
  };
}
export type SignInResponse = CommonResponse<SignInResult>;

//소셜로그인
// 내가 서버로 보낼 데이터 (Request)
export interface SocialLoginRequest {
  code: string;
}

//서버가 응답으로 줄 데이터 (Response DTO)
export interface SocialLoginResult {
  userId: number;
  tokens: {
    jwtAccessToken: string;
    jwtRefreshToken: string;
  };
}
export type SocialLoginResponse = CommonResponse<SocialLoginResult>;

//약관동의 API
// 1. 내가 서버로 보낼 데이터 (Request Dto)
export interface AgreementsRequest {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  ageOver14Agreed: boolean;
  marketingPushAgreed?: boolean;
  marketingEmailAgreed?: boolean;
}

// 2. 서버가 응답으로 줄 데이터 (Response DTO)
export interface AgreementsResult {
  result: {};
  updated: boolean;
}
export type AgreementsResponse = CommonResponse<AgreementsResult>;

//이메일 중복확인
// 내가 서버로 보낼 데이터 (Request)
export interface EmailExistsRequest {
  email: string;
}

//서버가 응답으로 줄 데이터 (Response DTO)
export interface EmailExistsResult {
  exists: boolean;
}
export type EmailExistsResponse = CommonResponse<EmailExistsResult>;

//아이디 중복확인
// 내가 서버로 보낼 데이터 (Request)
export interface UsernameExistsRequest {
  username: string;
}

//서버가 응답으로 줄 데이터 (Response DTO)
export interface UsernameExistsResult {
  exists: boolean;
}
export type UsernameExistsResponse = CommonResponse<UsernameExistsResult>;

// Refresh Token Response
//서버가 응답으로 줄 데이터 (Response DTO)
export interface RefreshTokenResult {
  jwtAccessToken: string;
}
export type RefreshTokenResponse = CommonResponse<RefreshTokenResult>;

// Logout Response
export type LogoutResponse = CommonResponse<null>;

//Profile-setUp 페이지
//프로필 닉네임 수정
// 내가 서버로 보낼 데이터 (Request)
export interface NicknameSetUpRequest {
  //닉네임 (서버 명세상 선택이나, 초기 설정 시에는 필수 권장)
  nickname?: string;
}
//서버가 응답으로 줄 데이터 (Response DTO)
export interface NicknameSetUpResult {
  updated: boolean;
}
export type NicknameSetUpResponse = CommonResponse<NicknameSetUpResult>;

// 프로필 이미지 업로드
// Request: FormData를 사용하므로 인터페이스보다는 API 함수에서 File 타입을 받음
//서버가 응답으로 줄 데이터 (Response DTO)
export interface ProfileImageResult {
  updated: boolean;
  profileImageUrl: string;
}
export type ProfileImageResponse = CommonResponse<ProfileImageResult>;

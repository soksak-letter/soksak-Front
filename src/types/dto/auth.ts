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
  marketingAgreed?: boolean;
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
  userName: string;
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

// Refresh Token Response
export type RefreshTokenResponse = CommonResponse<null>;

// Logout Response
export type LogoutResponse = CommonResponse<null>;

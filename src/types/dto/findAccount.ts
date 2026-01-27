import type { CommonResponse } from './common';
//계정 아이디 찾기/비밀번호 재설정 dto
//이메일 인증번호 전송
// 1. 내가 서버로 보낼 데이터 (Request)
export interface VerificationCodesRequest {
  email: string;
}

//2.서버가 응답으로 줄 데이터 (Response DTO)
export interface VerificationCodesResult {
  expiredAt: string;
  expiredInSeconds: number;
}
export type VerificationCodesResponse = CommonResponse<VerificationCodesResult>;

//이메일 인증번호 확인
// 1. 내가 서버로 보낼 데이터 (Request)
export interface VerificationCodesConfirmRequest {
  email: string;
  code: string;
}

//2.서버가 응답으로 줄 데이터 (Response DTO)
export interface VerificationCodesConfirmResult {
  verified: boolean;
  jwtAccessToken?: string;
}
export type VerificationCodesConfirmResponse = CommonResponse<VerificationCodesConfirmResult>;

//아이디 찾기
// 1. 내가 서버로 보낼 데이터 (Request)
export interface FindIdRequest {
  email: string;
}

//2.서버가 응답으로 줄 데이터 (Response DTO)
export interface FindIdResult {
  username: string;
  createdAt: string;
}
export type FindIdResponse = CommonResponse<FindIdResult>;

//비밀번호 재설정
//1.서버로 보낼 데이터(Request)
export interface ResetPasswordRequest {
  password: string;
}
//2.서버가 응답으로 줄 데이터(Response DTO)
export interface ResetPasswordResult {
  message: string;
}
export type ResetPasswordResponse = CommonResponse<ResetPasswordResult>;

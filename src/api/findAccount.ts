import type {
  FindIdRequest,
  FindIdResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerificationCodesConfirmRequest,
  VerificationCodesConfirmResponse,
  VerificationCodesRequest,
  VerificationCodesResponse,
} from '@/types/dto/findAccount';
import { axiosInstance } from './axios';

export type FindAccountType = 'find-id' | 'reset-password';

/**
 * 이메일 인증번호 전송 API
 * @param type 'find-id' (아이디 찾기) 또는 'reset-password' (비밀번호 재설정)
 * @param body 이메일
 */
export const postVerificationCodes = async (
  type: FindAccountType,
  body: VerificationCodesRequest,
) => {
  const { data } = await axiosInstance.post<VerificationCodesResponse>(
    `/auth/${type}/verification-codes`,
    body,
  );
  return data;
};

/**
 * 이메일 인증번호 확인 API
 * @param type 'find-id' (아이디 찾기) 또는 'reset-password' (비밀번호 재설정)
 * @param body 이메일,code
 */
export const postVerificationCodesConfirm = async (
  type: FindAccountType,
  body: VerificationCodesConfirmRequest,
) => {
  const { data } = await axiosInstance.post<VerificationCodesConfirmResponse>(
    `/auth/${type}/verification-codes/confirm`,
    body,
  );
  return data;
};

/**
 * 아이디 찾기 결과 조회 API
 * (이메일 인증 완료 후 호출하여 아이디를 받아옴)
 * @param query { email: string }
 */
export const postFindId = async (body: FindIdRequest) => {
  const { data } = await axiosInstance.post<FindIdResponse>('/auth/find-id', body);
  return data;
};

/**
 * 바말번호 초기화(비빌번호 재설정페이지) API
 * (이메일 인증 완료 후 호출하여 아이디를 받아옴)
 * @param body { email: string }
 */

export const patchResetPassword = async (body: ResetPasswordRequest, token: string) => {
  const { data } = await axiosInstance.patch<ResetPasswordResponse>('/auth/reset-password', body, {
    headers: {
      // 스웨거에 'Bearer Token'이 필요하다고 되어있으므로 추가해야 합니다.
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

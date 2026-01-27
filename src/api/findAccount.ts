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
export const getFindId = async (body: FindIdRequest) => {
  const { data } = await axiosInstance.get<FindIdResponse>('/auth/find-id', { data: body });
  return data;
};

/**
 * 바말번호 재설정ㄴ API
 * (이메일 인증 완료 후 호출하여 아이디를 받아옴)
 * @param body { email: string }
 */

export const postresetpassword = async (body: ResetPasswordRequest) => {
  const { data } = await axiosInstance.patch<ResetPasswordResponse>('/auth/reset-password', body);
  return data;
};

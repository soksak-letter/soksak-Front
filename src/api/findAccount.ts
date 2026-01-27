import type {
  VerificationCodesConfirmRequest,
  VerificationCodesConfirmResponse,
} from '@/types/dto/findAccount';
import { axiosInstance } from './axios';

/**
 * 이메일 인증번호 전송 API
 * @param body 회원가입 입력 정보
 */
export const postVerificationCodes = async (body: VerificationCodesConfirmRequest) => {
  const { data } = await axiosInstance.post<VerificationCodesConfirmResponse>(
    '/auth/{type}/verification-codes', // 서버 API 명세에 맞는 URL 입력
    body,
  );
  return data;
};

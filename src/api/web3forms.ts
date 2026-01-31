import { axiosInstance } from './axios';

export interface Web3FormsInquiryRequest {
  email: string;
  subject: string;
  message: string;
  botcheck?: string;
}

export interface Web3FormsInquiryResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  error?: unknown;
  [key: string]: unknown;
}

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
if (
  !WEB3FORMS_ACCESS_KEY ||
  WEB3FORMS_ACCESS_KEY === 'undefined' ||
  WEB3FORMS_ACCESS_KEY.trim() === ''
) {
  throw new Error(
    '[web3forms] VITE_WEB3FORMS_ACCESS_KEY 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.',
  );
}

/**
 * Web3Forms 문의 전송
 * @param req Web3FormsInquiryRequest
 */
export async function postWeb3FormsInquiry(
  req: Web3FormsInquiryRequest,
): Promise<Web3FormsInquiryResponse> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('email', req.email);
  formData.append('subject', req.subject);
  formData.append('message', req.message);
  formData.append('botcheck', req.botcheck ?? '');

  // axiosInstance로 외부 API 호출
  const response = await axiosInstance.post('https://api.web3forms.com/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: false, // CORS 문제 방지: Web3Forms는 인증 필요 없음
  });
  return response.data;
}

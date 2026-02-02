import type { CommonResponse } from './common';

// 이용약관 API 응답 타입
export interface TermsOfServiceSuccess {
  title: string;
  content: string;
}

export type TermsOfServiceResponse = CommonResponse<TermsOfServiceSuccess>;

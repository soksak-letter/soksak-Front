import type { CommonResponse } from './common';

// 정책 문서 공통 타입
export interface PolicySuccess {
  title: string;
  content: string;
}

// 이용약관 API 응답 타입
export type TermsOfServiceSuccess = PolicySuccess;
export type TermsOfServiceResponse = CommonResponse<TermsOfServiceSuccess>;

// 개인정보 처리방침 API 응답 타입
export type PrivacyPolicySuccess = PolicySuccess;
export type PrivacyPolicyResponse = CommonResponse<PrivacyPolicySuccess>;

// 커뮤니티 가이드라인 API 응답 타입
export type CommunityGuidelineSuccess = PolicySuccess;
export type CommunityGuidelineResponse = CommonResponse<CommunityGuidelineSuccess>;

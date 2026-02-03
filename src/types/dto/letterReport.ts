import type { CommonResponse } from './common';

// 신고
export const REPORT_REASONS = [
  '욕설/비하',
  '혐오 표현',
  '성적 불쾌감',
  '스팸/광고',
  '도배/반복',
  '폭력/학대표현',
  '불법 행위 유도',
  '사칭/허위정보',
] as const;

// 배열의 값들을 유니온 타입으로 추출.
export type ReportReason = (typeof REPORT_REASONS)[number];
//신고하기
//1. 서버로 보내는
export interface LetterReportRequest {
  letterId: number;
  reasons: ReportReason[];
}
//2.서버에서 보내오는
export interface LetterReportResult {
  message: string;
}

export type LetterReportResponse = CommonResponse<LetterReportResult>;

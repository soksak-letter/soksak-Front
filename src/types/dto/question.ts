import type { CommonResponse } from './common';

// 오늘의 질문 조회 Response DTO
export interface TodayQuestionResult {
  id: number;
  content: string;
  expiredAt: string; // ISO 8601 형식 (예: "2026-01-27T23:59:59.999Z")
}

export type TodayQuestionResponse = CommonResponse<TodayQuestionResult>;

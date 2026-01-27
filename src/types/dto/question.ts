import type { CommonResponse } from './common';

// 오늘의 질문 조회 Response DTO
export interface TodayQuestionResult {
  questionId: number;
  content: string;
  validUntil: string; // ISO 8601 형식 (예: "2025-12-29T23:59:59+09:00")
}

export type TodayQuestionResponse = CommonResponse<TodayQuestionResult>;

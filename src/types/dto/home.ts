import type { CommonResponse } from './common';

// Home Summary API DTO

// 유저 정보
export interface HomeSummaryUser {
  nickname: string;
  profileImageUrl: string;
}

// 오늘의 질문
export interface TodayQuestion {
  id: number;
  content: string;
  expiredAt: string;
}

// 편지 통계
export interface LetterStatsData {
  receivedCount: number;
  sentCount: number;
  totalSentCount: number;
}

// 편지 여행 카드 데이터
export interface LetterStats {
  reportPeriod: string;
  stats: LetterStatsData;
  message: string;
}

// Home Summary 응답 데이터
export interface HomeSummaryResult {
  user: HomeSummaryUser;
  todayQuestion: TodayQuestion;
  letterStats: LetterStats;
  sessionCount: number;
}

// 최종 응답 타입
export type HomeSummaryResponse = CommonResponse<HomeSummaryResult>;

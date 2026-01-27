import type { HomeSummaryResponse } from '@/types/dto/home';
import { axiosInstance } from './axios';

/**
 * 홈 요약 정보 조회 API
 * GET /home/summary
 * - 오늘의 질문
 * - 편지 여행 카드 데이터 (통계)
 * - 유저 프로필 사진, 닉네임
 */
export const getHomeSummary = async () => {
  const { data } = await axiosInstance.get<HomeSummaryResponse>('/home/summary');
  console.log('홈 요약 정보 API 응답:', data);
  return data;
};

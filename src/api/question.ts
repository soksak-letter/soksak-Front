import type { TodayQuestionResponse } from '@/types/dto/question';
import { axiosInstance } from './axios';

/**
 * 오늘의 질문 조회 API
 * GET /questions/today
 */
export const getTodayQuestion = async () => {
  const { data } = await axiosInstance.get<TodayQuestionResponse>('/questions/today');
  return data;
};

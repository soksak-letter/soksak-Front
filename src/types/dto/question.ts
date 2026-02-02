import type { ApiError } from '@/types/dto/common';

export type DailyQuestionSuccess = {
  id: number;
  content: string;
  expiredAt: string;
};

export type DailyQuestionResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: DailyQuestionSuccess | null;
};

import { axiosInstance } from '@/api/axios';

export type DailyQuestionSuccess = {
  id: number;
  content: string;
  expiredAt: string;
};

export type DailyQuestionResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: unknown | null;
  success: DailyQuestionSuccess | null;
};

export async function getDailyQuestion(): Promise<DailyQuestionSuccess> {
  const { data } = await axiosInstance.get<DailyQuestionResponse>('/questions/today');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error('Failed to fetch daily question');
  }

  return data.success;
}

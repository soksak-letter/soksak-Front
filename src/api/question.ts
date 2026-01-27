import { axiosInstance } from '@/api/axios';
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

export async function getDailyQuestion(): Promise<DailyQuestionSuccess> {
  const { data } = await axiosInstance.get<DailyQuestionResponse>('/questions/today');

  // 실패 처리
  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw (
      data.error ?? {
        errorCode: 'DAILY_QUESTION_FAIL',
        reason: '질문을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        data: {},
      }
    );
  }

  return data.success;
}

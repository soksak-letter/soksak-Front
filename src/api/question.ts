import { axiosInstance } from '@/api/axios';
import type { DailyQuestionResponse, DailyQuestionSuccess } from '@/types/dto/question';

export async function getDailyQuestion(): Promise<DailyQuestionSuccess> {
  const { data } = await axiosInstance.get<DailyQuestionResponse>('/questions/today');

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

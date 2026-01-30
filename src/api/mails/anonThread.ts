import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';
import type { AnonThreadResponse, AnonThreadSuccess } from '@/types/dto/mails/anonThread';

export async function getAnonThread(threadId: number): Promise<AnonThreadSuccess> {
  const { data } = await axiosInstance.get<AnonThreadResponse>(
    `/mailbox/anonymous/threads/${threadId}/letters`,
  );

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'ANON_THREAD',
      reason: data.error?.reason ?? '익명 대화를 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

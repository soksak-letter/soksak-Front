import { axiosInstance } from '@/api/axios';
import type { AnonMailboxResponse, AnonMailboxSuccess } from '@/types/dto/mails/anonMailbox';

export async function getAnonMailbox(): Promise<AnonMailboxSuccess> {
  const { data } = await axiosInstance.get<AnonMailboxResponse>('/mailbox/anonymous');

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

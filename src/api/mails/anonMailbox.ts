import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';
import type { AnonMailboxResponse, AnonMailboxSuccess } from '@/types/dto/mails/anonMailbox';

export async function getAnonMailbox(): Promise<AnonMailboxSuccess> {
  const { data } = await axiosInstance.get<AnonMailboxResponse>('/mailbox/anonymous');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'ANON_MAILBOX_FAIL',
      reason: data.error?.reason ?? '익명 편지함을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

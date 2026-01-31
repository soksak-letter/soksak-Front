import type { SelfMailboxResponse, SelfMailboxSuccess } from '@/types/dto/mails/selfMailbox';
import { axiosInstance } from '../axios';
import type { ApiError } from '@/types/dto/common';

export async function getSelfMailbox(): Promise<SelfMailboxSuccess> {
  const { data } = await axiosInstance.get<SelfMailboxResponse>('/mailbox/self');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'SELF_MAILBOX_FAIL',
      reason: data.error?.reason ?? '나에게 쓴 편지함 목록을 불러오지 못했어요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

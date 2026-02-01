import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';
import type { FriendThreadResponse, FriendThreadSuccess } from '@/types/dto/mails/friendThread';

export async function getFriendThread(friendId: number): Promise<FriendThreadSuccess> {
  const { data } = await axiosInstance.get<FriendThreadResponse>(
    `/mailbox/friends/threads/${friendId}/letters`,
  );

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'FRIEND_THREAD',
      reason: data.error?.reason ?? '친구와의 대화를 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

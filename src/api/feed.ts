import { type PublicFeedDetail, type PublicFeedResponse } from '@/types/dto/feed';
import { axiosInstance } from './axios';
import type { ApiError } from '@/types/dto/common';
import { getNowKSTIsoString } from '@/utils/date';

export async function getOtherPublicFeed(): Promise<PublicFeedDetail[]> {
  const nowKst = getNowKSTIsoString();

  const { data } = await axiosInstance.get<PublicFeedResponse>('/letters/others/public', {
    params: { date: nowKst, detail: true },
  });

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'OTHERS_PUBLIC_FEED_FAIL',
      reason: data.error?.reason ?? '익명 공개 편지 목록을 불러오지 못했어요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

export async function getFriendPublicFeed(): Promise<PublicFeedDetail[]> {
  const nowKst = getNowKSTIsoString();

  const { data } = await axiosInstance.get<PublicFeedResponse>('/letters/friends/public', {
    params: { date: nowKst, detail: true },
  });

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'FRIENDS_PUBLIC_FEED_FAIL',
      reason: data.error?.reason ?? '친구 공개 편지 목록을 불러오지 못했어요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

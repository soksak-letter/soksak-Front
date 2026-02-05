// feed와 같은 API 요청 - detail: boolean값에 따라 다른 응답
// 해당 API는 detail: false로 요청하는 경우로,
// 피드가 아닌 메인페이지에 사용되는 간소화된 정보를 받습니다.

import type { PublicLetterItem, PublicLettersResponse } from '@/types/dto/letter';
import { getNowKSTIsoString } from '@/utils/date';
import { axiosInstance } from './axios';
import type { ApiError } from '@/types/dto/common';

export async function getOtherPublicLetters(): Promise<PublicLetterItem[]> {
  const nowKst = getNowKSTIsoString();

  const { data } = await axiosInstance.get<PublicLettersResponse>('/letters/others/public', {
    params: { date: nowKst, detail: false },
  });

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'OTHERS_PUBLIC_CAROUSEL_FAIL',
      reason: data.error?.reason ?? '익명 공개 편지 캐러셀을 불러오지 못했어요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

export async function getFriendPublicLetters(): Promise<PublicLetterItem[]> {
  const nowKst = getNowKSTIsoString();

  const { data } = await axiosInstance.get<PublicLettersResponse>('/letters/friends/public', {
    params: { date: nowKst, detail: false },
  });

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'FRIENDS_PUBLIC_CAROUSEL_FAIL',
      reason: data.error?.reason ?? '친구 공개 편지 캐러셀을 불러오지 못했어요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }
  return data.success;
}

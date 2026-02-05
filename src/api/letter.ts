// feed와 같은 API 요청 - detail: boolean값에 따라 다른 응답
// 해당 API는 detail: false로 요청하는 경우로,
// 피드가 아닌 메인페이지에 사용되는 간소화된 정보를 받습니다.

import type {
  PublicLettersParams,
  PublicLettersResponse,
  FriendLettersParams,
  FriendLettersResponse,
} from '@/types/dto/letter';
import { axiosInstance } from './axios';

/**
 * 공개 편지 캐러셀 목록 조회 API
 * GET /letters/others/public?isDetail=true
 */
export const getPublicLetters = async (params: PublicLettersParams) => {
  const { data } = await axiosInstance.get<PublicLettersResponse>('/letters/others/public', {
    params: {
      isDetail: true,
      questionId: params.questionId,
      cursor: params.cursor,
      size: params.size ?? 10,
    },
  });
  return data;
};

/**
 * 친구 편지 캐러셀 목록 조회 API
 * GET /letters/friends/public=...&cursor=...&size=...
 */
export const getFriendLetters = async (params: FriendLettersParams) => {
  const { data } = await axiosInstance.get<FriendLettersResponse>('/letters/friends/public', {
    params: {
      questionId: params.questionId,
      cursor: params.cursor,
      size: params.size ?? 10,
    },
  });
  return data;
};

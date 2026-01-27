import type { PublicLettersParams, PublicLettersResponse } from '@/types/dto/letter';
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
  console.log('공개 편지 API 응답:', data);
  return data;
};

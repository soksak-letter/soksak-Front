import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';

export type LetterDetailSuccess = unknown;

export type LetterDetailResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: LetterDetailSuccess | null;
};

export async function getLetterDetail(letterId: number): Promise<LetterDetailSuccess> {
  const { data } = await axiosInstance.get<LetterDetailResponse>(`/letters/${letterId}`);

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'LETTER_DETAIL_FAIL',
      reason: data.error?.reason ?? '상세 편지를 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }

  return data.success;
}

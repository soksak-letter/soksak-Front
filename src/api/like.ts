import type { CreateLikeResponse, CreateLikeSuccess } from '@/types/dto/like';
import { axiosInstance } from './axios';
import type { CommonResponse } from '@/types/dto/common';

export async function postLetterLike(letterId: number): Promise<CreateLikeSuccess> {
  const res = await axiosInstance.post(`/letters/${letterId}/like`);

  const data = res.data as CommonResponse<CreateLikeResponse>;

  if (data.resultType !== 'SUCCESS') {
    throw (
      data.error ?? {
        errorCode: 'CREATE_REVIEW_FAIL',
        reason: '후기 전송에 실패했어요. 잠시 후 다시 시도해주세요.',
        data: null,
      }
    );
  }

  return data.success;
}

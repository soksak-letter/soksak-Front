import type { CreateReviewBody, CreateReviewSuccess } from '@/types/dto/review';
import { axiosInstance } from './axios';
import type { CommonResponse } from '@/types/dto/common';

export async function postCreateReview(
  sessionId: number,
  body: CreateReviewBody,
): Promise<CreateReviewSuccess> {
  const res = await axiosInstance.post(`/matching/sessions/${sessionId}/reviews`, body);

  const data = res.data as CommonResponse<CreateReviewSuccess>;

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

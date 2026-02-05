import type { CreateLikeResponse, CreateLikeSuccess } from '@/types/dto/like';
import { axiosInstance } from './axios';

export async function postLetterLike(letterId: number): Promise<CreateLikeSuccess> {
  const res = await axiosInstance.post(`/letters/${letterId}/like`);

  const data = res.data as CreateLikeResponse;

  if (data.resultType !== 'SUCCESS') {
    throw (
      data.error ?? {
        errorCode: 'CREATE_LIKE_FAIL',
        reason: '좋아요 누르기에 실패했어요. 잠시 후 다시 시도해주세요.',
        data: null,
      }
    );
  }

  return data.success;
}

export async function deleteLetterLike(letterId: number): Promise<CreateLikeSuccess> {
  const res = await axiosInstance.delete(`/letters/${letterId}/like`);

  const data = res.data as CreateLikeResponse;

  if (data.resultType !== 'SUCCESS') {
    throw (
      data.error ?? {
        errorCode: 'DELETE_LIKE_FAIL',
        reason: '좋아요 삭제에 실패했어요. 잠시 후 다시 시도해주세요.',
        data: null,
      }
    );
  }

  return data.success;
}

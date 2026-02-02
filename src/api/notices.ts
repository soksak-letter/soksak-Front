import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';
import type { NoticesResponse, NoticesSuccess } from '@/types/dto/notices';

export async function getNotices(): Promise<NoticesSuccess> {
  const { data } = await axiosInstance.get<NoticesResponse>('/notices');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'NOTICES_FETCH_FAIL',
      reason: data.error?.reason ?? '공지사항을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }

  return data.success;
}

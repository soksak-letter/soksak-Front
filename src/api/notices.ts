import { axiosInstance } from '@/api/axios';
import type { NoticesResponse, NoticesSuccess } from '@/types/dto/notices';

export async function getNotices(): Promise<NoticesSuccess> {
  const { data } = await axiosInstance.get<NoticesResponse>('/notices');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw (
      data.error ?? {
        errorCode: 'NOTICES_FETCH_FAIL',
        reason: '공지사항을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        data: {},
      }
    );
  }

  return data.success;
}

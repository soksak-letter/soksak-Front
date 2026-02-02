import { axiosInstance } from '@/api/axios';
import type { ApiError } from '@/types/dto/common';
import type { TermsOfServiceResponse, TermsOfServiceSuccess } from '@/types/dto/policies';

export async function getTermsOfService(): Promise<TermsOfServiceSuccess> {
  const { data } = await axiosInstance.get<TermsOfServiceResponse>('/policies/terms');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw {
      errorCode: data.error?.errorCode ?? 'TERMS_FETCH_FAIL',
      reason: data.error?.reason ?? '이용약관을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
      data: data.error?.data ?? {},
    } satisfies ApiError;
  }

  return data.success;
}

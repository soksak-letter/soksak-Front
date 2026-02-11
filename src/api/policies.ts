import { axiosInstance } from '@/api/axios';
import type {
  TermsOfServiceResponse,
  TermsOfServiceSuccess,
  PrivacyPolicyResponse,
  PrivacyPolicySuccess,
} from '@/types/dto/policies';

export async function getTermsOfService(): Promise<TermsOfServiceSuccess> {
  const { data } = await axiosInstance.get<TermsOfServiceResponse>('/policies/terms');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw (
      data.error ?? {
        errorCode: 'TERMS_FETCH_FAIL',
        reason: '이용약관을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        data: {},
      }
    );
  }

  return data.success;
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicySuccess> {
  const { data } = await axiosInstance.get<PrivacyPolicyResponse>('/policies/privacy');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw (
      data.error ?? {
        errorCode: 'PRIVACY_FETCH_FAIL',
        reason: '개인정보 처리방침을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        data: {},
      }
    );
  }

  return data.success;
}

import { useQuery } from '@tanstack/react-query';
import { onboardingKeys } from './keys';
import { getMyConsents } from '@/api/onboardingSettings';
import type { ApiError } from '@/types/dto/common';
import type { GetConsentsResult } from '@/types/dto/onboardingSettings';

/**
 * GET /users/me/consents
 * 기능: 사용자 정보 동의 설정을 조회합니다.
 * 반환: GetConsentsResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw → query.error로 처리
 */

export function useMyConsents(enabled: boolean = true) {
  return useQuery<
    GetConsentsResult, // TQueryFnData (queryFn 반환)
    ApiError, // TError
    GetConsentsResult // TData
  >({
    queryKey: onboardingKeys.consents,
    queryFn: async () => {
      const res = await getMyConsents();
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
}

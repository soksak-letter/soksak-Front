import { useQuery } from '@tanstack/react-query';
import { onboardingKeys } from './keys';
import { getMyConsents } from '@/api/onboardingSettings';
import type { ApiError, CommonResponse } from '@/types/dto/common';
import type { GetConsentsResult } from '@/types/dto/onboardingSettings';

/**
 * GET /users/me/consents
 * 기능: 사용자 정보 동의 설정을 조회합니다.
 * 반환: GetConsentsResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw → query.error로 처리
 */

export function useMyConsents(enabled: boolean = true) {
  return useQuery<
    CommonResponse<GetConsentsResult>, // TQueryFnData (queryFn 반환)
    ApiError, // TError
    GetConsentsResult // TData (select 이후)
  >({
    queryKey: onboardingKeys.consents,
    queryFn: () => getMyConsents(),
    enabled,
    retry: 0,
    select: (res) => {
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
  });
}

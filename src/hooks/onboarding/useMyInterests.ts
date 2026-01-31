// 내가 선택한 관심사 목록 조회 훅
// GET /interests 호출 (인증 필요)

import { useQuery } from '@tanstack/react-query';
import { onboardingApi } from '@/api/onboarding';
import { onboardingKeys } from './keys';

export const useMyInterests = (enabled: boolean) =>
  useQuery({
    queryKey: onboardingKeys.myInterests,
    queryFn: onboardingApi.getMyInterests,
    enabled,
    select: (res) => {
      if (res.resultType === 'SUCCESS') return res.success.items;
      throw res.error;
    },
  });

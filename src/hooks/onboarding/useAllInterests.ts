// 전체 관심사 목록 조회 훅
// GET /interests/all 호출

import { useQuery } from '@tanstack/react-query';
import { onboardingApi } from '@/api/onboarding';
import { onboardingKeys } from './keys';

export const useAllInterests = () =>
  useQuery({
    queryKey: onboardingKeys.allInterests,
    queryFn: onboardingApi.getAllInterests,
    select: (res) => {
      if (res.resultType === 'SUCCESS') return res.success.items;
      throw res.error;
    },
    staleTime: 1000 * 60 * 30,
  });

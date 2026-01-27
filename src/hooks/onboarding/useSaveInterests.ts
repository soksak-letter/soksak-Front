// 관심사 저장(온보딩 토픽 선택 완료) mutation 훅
// PUT /users/me/onboarding/interests 호출

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingApi } from '@/api/onboarding';
import { onboardingKeys } from './keys';

export const useSaveInterests = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: onboardingApi.saveInterests,
    onSuccess: (res) => {
      if (res.resultType === 'SUCCESS') {
        qc.invalidateQueries({ queryKey: onboardingKeys.myInterests });
      }
    },
  });
};

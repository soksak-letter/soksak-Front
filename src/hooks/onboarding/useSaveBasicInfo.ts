// 관심사 저장(온보딩 토픽 선택 완료) mutation 훅
// PUT /users/me/onboarding/interests 호출

import { useMutation } from '@tanstack/react-query';
import { onboardingApi } from '@/api/onboarding';

export const useSaveBasicInfo = () =>
  useMutation({
    mutationFn: onboardingApi.saveBasicInfo,
  });

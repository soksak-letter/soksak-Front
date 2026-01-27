// 기본 정보 저장(온보딩 프로필 선택 완료) mutation 훅
// PATCH /users/me/onboarding 호출

import { useMutation } from '@tanstack/react-query';
import { onboardingApi } from '@/api/onboarding';

export const useSaveBasicInfo = () =>
  useMutation({
    mutationFn: onboardingApi.saveBasicInfo,
  });

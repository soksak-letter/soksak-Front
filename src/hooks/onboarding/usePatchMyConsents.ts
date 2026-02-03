import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingKeys } from './keys';
import { patchMyConsents } from '@/api/onboardingSettings';
import type { ApiError } from '@/types/dto/common';
import type { PatchConsentsBody, PatchConsentsResult } from '@/types/dto/onboardingSettings';

/**
 * ✅ PATCH /users/me/consents
 * 기능: 정보 동의 설정을 갱신합니다.
 * 반환: PatchConsentsResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw → mutation.error로 처리
 */
export function usePatchMyConsents() {
  const qc = useQueryClient();

  return useMutation<PatchConsentsResult, ApiError, PatchConsentsBody>({
    mutationFn: async (body) => {
      const res = await patchMyConsents(body);
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: onboardingKeys.consents });
    },
  });
}

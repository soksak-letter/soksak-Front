import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingKeys } from './keys';
import { patchMyNotificationSettings } from '@/api/onboardingSettings';
import type { ApiError } from '@/types/dto/common';
import type {
  PatchNotificationSettingsBody,
  PatchNotificationSettingsResult,
} from '@/types/dto/onboardingSettings';

/**
 * ✅ PATCH /users/me/notification-settings
 * 기능: 알림 설정을 갱신합니다.
 * 반환: PatchNotificationSettingsResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw
 */
export function usePatchMyNotificationSettings() {
  const qc = useQueryClient();

  return useMutation<PatchNotificationSettingsResult, ApiError, PatchNotificationSettingsBody>({
    mutationFn: async (body) => {
      const res = await patchMyNotificationSettings(body);
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: onboardingKeys.notificationSettings });
    },
  });
}

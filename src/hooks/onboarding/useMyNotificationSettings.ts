/**
 * GET /users/me/notification-settings
 * 기능: 알림 설정을 조회합니다.
 * 반환: GetNotificationSettingsResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw
 */

import { useQuery } from '@tanstack/react-query';
import { onboardingKeys } from './keys';
import { getMyNotificationSettings } from '@/api/onboardingSettings';
import type { CommonResponse, ApiError } from '@/types/dto/common';
import type { GetNotificationSettingsResult } from '@/types/dto/onboardingSettings';

export function useMyNotificationSettings(enabled: boolean = true) {
  return useQuery<
    CommonResponse<GetNotificationSettingsResult>,
    ApiError,
    GetNotificationSettingsResult
  >({
    queryKey: onboardingKeys.notificationSettings,
    queryFn: () => getMyNotificationSettings(),
    enabled,
    retry: 0,
    select: (res) => {
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
  });
}

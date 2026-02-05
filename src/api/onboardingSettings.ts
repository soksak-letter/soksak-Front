import type { CommonResponse } from '@/types/dto/common';
import {
  type GetConsentsResult,
  type PatchConsentsBody,
  type PatchConsentsResult,
  type GetNotificationSettingsResult,
  type PatchNotificationSettingsBody,
  type PatchNotificationSettingsResult,
  type PostActivityBody,
  type PostActivityResult,
} from '@/types/dto/onboardingSettings';
import { axiosInstance } from './axios';

/**
 * GET /users/me/consents
 * - 사용자 정보 동의 설정 조회
 */
export async function getMyConsents(): Promise<CommonResponse<GetConsentsResult>> {
  const { data } = await axiosInstance.get<CommonResponse<GetConsentsResult>>('/users/me/consents');
  return data;
}

/**
 * PATCH /users/me/consents
 * - 사용자 정보 동의 설정 갱신
 */
export async function patchMyConsents(
  body: PatchConsentsBody,
): Promise<CommonResponse<PatchConsentsResult>> {
  const { data } = await axiosInstance.patch<CommonResponse<PatchConsentsResult>>(
    '/users/me/consents',
    body,
  );
  return data;
}

/**
 * GET /users/me/notification-settings
 * - 사용자 알림 설정 조회
 */
export async function getMyNotificationSettings(): Promise<
  CommonResponse<GetNotificationSettingsResult>
> {
  const { data } = await axiosInstance.get<CommonResponse<GetNotificationSettingsResult>>(
    '/users/me/notification-settings',
  );
  return data;
}

/**
 * PATCH /users/me/notification-settings
 * - 사용자 알림 설정 갱신
 */
export async function patchMyNotificationSettings(
  body: PatchNotificationSettingsBody,
): Promise<CommonResponse<PatchNotificationSettingsResult>> {
  const { data } = await axiosInstance.patch<CommonResponse<PatchNotificationSettingsResult>>(
    '/users/me/notification-settings',
    body,
  );
  return data;
}

/**
 * POST /users/me/activity
 * - 사용자 활동 시간 갱신 (request body: {} 가능)
 */
export async function postMyActivity(
  body: PostActivityBody = {},
): Promise<CommonResponse<PostActivityResult>> {
  const { data } = await axiosInstance.post<CommonResponse<PostActivityResult>>(
    '/users/me/activity',
    body,
  );
  return data;
}

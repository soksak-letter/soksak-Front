import type { CommonResponse } from '@/types/dto/common';

/**
 * 푸시 알림 구독 요청 바디
 * PUT /users/me/push-subscriptions
 */
export type PutPushSubscriptionBody = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

/**
 * 성공 시 반환 데이터
 * Response Sample: { "updated": true }
 */
export type PutPushSubscriptionSuccess = {
  updated: boolean;
};

/**
 * 최종 응답 타입 (공통 래퍼 적용)
 */
export type PutPushSubscriptionResponse = CommonResponse<PutPushSubscriptionSuccess>;

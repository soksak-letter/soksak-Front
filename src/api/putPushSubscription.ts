// - PUT /users/me/push-subscriptions API 연결
// - 푸시 구독 정보 서버 저장 처리

import type { PutPushSubscriptionBody, PutPushSubscriptionResponse } from '@/types/dto/push';
import { axiosInstance } from './axios';

export function putPushSubscription(body: PutPushSubscriptionBody) {
  return axiosInstance.put<PutPushSubscriptionResponse>('/users/me/push-subscriptions', body);
}

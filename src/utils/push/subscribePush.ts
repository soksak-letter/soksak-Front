import type { PutPushSubscriptionBody } from '@/types/dto/push';

/**
 * VAPID public key(base64url)를 Uint8Array로 변환
 * - PushManager.subscribe의 applicationServerKey는 Uint8Array를 요구함
 */
function urlBase64ToUint8Array(base64UrlString: string) {
  const padding = '='.repeat((4 - (base64UrlString.length % 4)) % 4);
  const base64 = (base64UrlString + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export type SubscribePushResult =
  | { ok: true; body: PutPushSubscriptionBody }
  | {
      ok: false;
      reason:
        | 'INSECURE_CONTEXT'
        | 'NO_SW'
        | 'NO_NOTIFICATION'
        | 'DENIED'
        | 'MISSING_VAPID'
        | 'NO_KEYS';
    };

export async function subscribePush(): Promise<SubscribePushResult> {
  // 0) Secure Context 확인 (https 또는 일부 브라우저의 localhost 예외)
  if (!window.isSecureContext) return { ok: false, reason: 'INSECURE_CONTEXT' };

  // 1) 필수 API 지원 체크
  if (!('serviceWorker' in navigator)) return { ok: false, reason: 'NO_SW' };
  if (!('Notification' in window)) return { ok: false, reason: 'NO_NOTIFICATION' };

  // 2) VAPID 공개키 체크
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
  if (!vapidPublicKey) return { ok: false, reason: 'MISSING_VAPID' };

  // 3) 권한 요청 (⚠️ 반드시 사용자 액션(버튼 클릭)에서 호출되어야 함)
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return { ok: false, reason: 'DENIED' };

  // 4) 서비스 워커 등록 (public/sw.js → /sw.js 로 서빙됨)
  const registration = await navigator.serviceWorker.register('/sw.js');

  // 5) 기존 구독 재사용 or 새 구독
  const existing = await registration.pushManager.getSubscription();
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    }));

  // 6) 백엔드 스펙에 맞는 request body로 변환
  const json = subscription.toJSON();

  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    return { ok: false, reason: 'NO_KEYS' };
  }

  const body: PutPushSubscriptionBody = {
    endpoint: json.endpoint,
    keys: {
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
  };

  return { ok: true, body };
}

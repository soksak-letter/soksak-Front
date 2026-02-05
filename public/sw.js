// 푸시 수신 시 알림
// 표시 브라우저 인프라 레벨 (푸시, 캐시, 알림) -> /public에 위치

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title || '속삭편지', {
      body: data.body || '새 알림이 도착했어요',
      icon: '/icons/icon-192.png',
      data: { url: data.url || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = event.notification.data?.url ?? '/';
  let target = '/';
  try {
    const u = new URL(rawUrl, self.location.origin);
    if (u.origin === self.location.origin) target = u.href;
  } catch {}
  event.waitUntil(clients.openWindow(target));
});

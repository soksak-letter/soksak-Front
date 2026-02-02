// 푸시 구독 생성 및 서버 등록 로직 추상화

import { useMutation } from '@tanstack/react-query';
import { subscribePush } from '@/utils/push/subscribePush';
import { putPushSubscription } from '@/api/putPushSubscription';

export function usePushSubscription() {
  return useMutation({
    mutationFn: async () => {
      const result = await subscribePush();
      if (!result.ok) return result;

      const res = await putPushSubscription(result.body);

      return {
        ok: true as const,
        updated: res.data.success?.updated ?? false,
      };
    },
  });
}

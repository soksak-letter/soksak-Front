/**
 * 역할
 * - "받은 친구 요청 거절" Mutation 훅
 * - targetUserId(요청 보낸 사람 / 거절 대상)를 path로 받아 거절 처리
 *
 * 사용하는 API
 * - POST /friends/requests/reject/{targetUserId} (rejectFriendRequest)
 *
 * 성공 시 기대 효과
 * - 받은 요청 목록에서 제거되어야 함 → incoming 목록 갱신
 *
 * 캐시 정책
 * - onSuccess → friendKeys.incoming() invalidate
 */

import { rejectFriendRequest } from '@/api/friend';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendKeys } from './keys';

export const useRejectFriendRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) => rejectFriendRequest(targetUserId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: friendKeys.incoming() });
    },
  });
};

/**
 * 역할
 * - "보낸 친구 요청 취소" Mutation 훅
 * - targetUserId(요청을 보낸 대상)를 path로 받아 요청 취소(삭제) 처리
 *
 * 사용하는 API
 * - DELETE /friends/requests/{targetUserId} (cancelFriendRequest)
 *
 * 성공 시 기대 효과
 * - 보낸 요청 목록에서 제거되어야 함 → outgoing 목록 갱신
 *
 * 캐시 정책
 * - onSuccess → friendKeys.outgoing() invalidate
 */

import { cancelFriendRequest } from '@/api/friend';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendKeys } from './keys';

export const useCancelFriendRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) => cancelFriendRequest(targetUserId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: friendKeys.outgoing() });
    },
  });
};

/**
 * 역할
 * - "받은 친구 요청 수락" Mutation 훅
 * - requesterUserId(요청 보낸 사람)를 path로 받아 수락 처리
 *
 * 사용하는 API
 * - POST /friends/requests/accept/{requesterUserId} (acceptFriendRequest)
 *
 * 성공 시 기대 효과
 * - 친구 관계 생성 → friends 목록 갱신 필요
 * - 받은 요청에서 해당 요청 사라짐 → incoming 목록 갱신 필요
 *
 * 캐시 정책
 * - onSuccess → friendKeys.friends() + friendKeys.incoming() invalidate
 */

import { acceptFriendRequest } from '@/api/friend';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendKeys } from './keys';

export const useAcceptFriendRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (requesterUserId: number) => acceptFriendRequest(requesterUserId),
    onSuccess: async (res) => {
      if (res.data.resultType === 'SUCCESS') {
        await Promise.all([
          qc.invalidateQueries({ queryKey: friendKeys.friends() }),
          qc.invalidateQueries({ queryKey: friendKeys.incoming() }),
        ]);
      }
    },
  });
};

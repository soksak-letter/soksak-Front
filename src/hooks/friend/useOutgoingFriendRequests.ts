/**
 * 역할
 * - "보낸 친구 요청 목록"을 조회하는 Query 훅
 * - 요청 취소 버튼, 대기중 상태 UI 등에 사용
 *
 * 사용하는 API
 * - GET /friends/requests/outgoing (getOutgoingRequests)
 *
 * 반환 데이터(성공 시)
 * - FriendRequestItem[]
 *
 * 예외/에러 처리 정책(권장)
 * - FRIEND_REQUESTNOTFOUND_ERROR(404 성격) → 빈 배열([]) 반환
 * - 그 외 에러 → throw
 *
 * 캐시 키
 * - friendKeys.outgoing()
 */

import { useQuery } from '@tanstack/react-query';
import { friendKeys } from './keys';
import { getOutgoingRequests } from '@/api/friend';

export const useOutgoingFriendRequests = () =>
  useQuery({
    queryKey: friendKeys.outgoing(),
    queryFn: async () => {
      const res = await getOutgoingRequests();
      const data = res.data;

      if (data.resultType === 'SUCCESS') {
        return data.success.result.data;
      }

      if (data.error.errorCode === 'FRIEND_REQUESTNOTFOUND_ERROR') {
        return [];
      }

      throw data.error;
    },
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60_000,
  });

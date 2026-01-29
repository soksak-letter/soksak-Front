/**
 * 역할
 * - "친구 목록"을 조회하는 Query 훅
 * - 화면에서 친구 리스트 렌더링에 사용
 *
 * 사용하는 API
 * - GET /friends (getFriends)
 *
 * 반환 데이터(성공 시)
 * - FriendItem[]
 *
 * 예외/에러 처리 정책(권장)
 * - FRIEND_NOTFOUND_ERROR(404 성격) → 빈 배열([]) 반환 (빈 상태 UI로 처리)
 * - 그 외 에러 → throw (React Query error로 위임)
 *
 * 캐시 키
 * - friendKeys.friends()
 */

import { useQuery } from '@tanstack/react-query';
import { friendKeys } from './keys';
import { getFriends } from '@/api/friend';

export const useFriends = () =>
  useQuery({
    queryKey: friendKeys.friends(),
    queryFn: async () => {
      const res = await getFriends();
      const data = res.data;

      if (data.resultType === 'SUCCESS') {
        return data.success.result.data;
      }

      if (data.error.errorCode === 'FRIEND_NOTFOUND_ERROR') {
        return [];
      }

      // React Query error로 넘기기
      throw data.error;
    },
  });

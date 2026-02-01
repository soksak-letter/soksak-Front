/**
 * 친구(friend) 도메인 React Query queryKey 모음
 *
 * - friends(): 친구 목록 조회 캐시 키
 * - incoming(): 받은 친구 요청 목록 캐시 키
 * - outgoing(): 보낸 친구 요청 목록 캐시 키
 *
 * 캐시 무효화(invalidate) 규칙
 * - 친구 요청 보내기 성공 → outgoing invalidate
 * - 친구 요청 수락 성공 → friends + incoming invalidate
 * - 친구 요청 거절 성공 → incoming invalidate
 * - 친구 요청 취소 성공 → outgoing invalidate
 */

export const friendKeys = {
  all: ['friend'] as const,
  friends: () => [...friendKeys.all, 'friends'] as const,
  incoming: () => [...friendKeys.all, 'incoming'] as const,
  outgoing: () => [...friendKeys.all, 'outgoing'] as const,
};

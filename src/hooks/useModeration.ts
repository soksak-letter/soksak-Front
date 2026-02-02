import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blockUser, getBlockedUsers, getReportDetail, getRestrictList } from '@/api/moderation';
import type { BlockedUser, ReportedUser, RestrictedUser } from '@/types/dto/moderation';

/**
 * moderation 도메인 React Query queryKey 모음
 *
 * 캐시 무효화(invalidate) 규칙
 * - 유저 차단 성공 → blocked invalidate
 */
export const moderationKeys = {
  all: ['moderation'] as const,
  blocked: () => [...moderationKeys.all, 'blocked'] as const,
  report: (reportId: number) => [...moderationKeys.all, 'report', reportId] as const,
  restricted: () => [...moderationKeys.all, 'restricted'] as const,
};

/**
 * 차단 목록 조회 훅
 * - GET /block (getBlockedUsers)
 */
export function useBlockedUsers() {
  return useQuery<BlockedUser[]>({
    queryKey: moderationKeys.blocked(),
    queryFn: getBlockedUsers,
  });
}

/**
 * 유저 차단 훅
 * - POST /block/{targetUserId} (blockUser)
 * - 성공 시 차단 목록(blocked) invalidate
 */
export function useBlockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) => blockUser(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moderationKeys.blocked() });
    },
  });
}

/**
 * 신고 내역 조회 훅
 * - GET /reports/{reportId} (getReportDetail)
 * - reportId가 유효할 때만 쿼리 실행
 */
export function useReportDetail(reportId: number | null) {
  return useQuery<ReportedUser>({
    queryKey: moderationKeys.report(reportId!),
    queryFn: () => getReportDetail(reportId!),
    enabled: reportId !== null,
  });
}

/**
 * 이용 제한 내역 조회 훅
 * - GET /restrict (getRestrictList)
 */
export function useRestrictList() {
  return useQuery<RestrictedUser[]>({
    queryKey: moderationKeys.restricted(),
    queryFn: getRestrictList,
  });
}

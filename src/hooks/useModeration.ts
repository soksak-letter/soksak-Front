import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blockUser } from '@/api/moderation';
import { postLetterReport } from '@/api/letterReport';
import type { LetterReportRequest } from '@/types/dto/letterReport';

/**
 * moderation 도메인 React Query queryKey 모음
 */
export const moderationKeys = {
  all: ['moderation'] as const,
  blocked: () => [...moderationKeys.all, 'blocked'] as const,
};

/**
 * 유저 차단 훅
 * - POST /block/{targetUserId} (blockUser)
 * - 성공 시 차단 목록(blocked) invalidate
 */
export function useBlockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetUserId: number) => {
      const res = await blockUser(targetUserId);
      const data = res.data;

      if (data.resultType === 'SUCCESS') {
        return {
          result: data.success.result,
          message: data.success.message,
        };
      }

      throw new Error(data.error?.reason ?? '유저 차단에 실패했습니다.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moderationKeys.blocked() });
    },
  });
}

/**
 * 편지 신고 훅
 * - POST /reports (postLetterReport)
 */
export function useLetterReport() {
  return useMutation({
    mutationFn: async (body: LetterReportRequest) => {
      const data = await postLetterReport(body);

      if (data.resultType === 'SUCCESS') {
        return {
          message: data.success.message,
        };
      }

      throw new Error(data.error?.reason ?? '신고에 실패했습니다.');
    },
  });
}

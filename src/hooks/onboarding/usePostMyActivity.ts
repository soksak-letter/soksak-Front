import { useMutation } from '@tanstack/react-query';
import { postMyActivity } from '@/api/onboardingSettings';
import type { ApiError } from '@/types/dto/common';
import type { PostActivityBody, PostActivityResult } from '@/types/dto/onboardingSettings';

/**
 * ✅ POST /users/me/activity
 * 기능: 사용자 활동 시간을 갱신(ping)합니다.
 * 반환: PostActivityResult (SUCCESS 언랩)
 * 에러: FAIL이면 ApiError throw
 */
export function usePostMyActivity() {
  return useMutation<PostActivityResult, ApiError, PostActivityBody>({
    mutationFn: async (body) => {
      const res = await postMyActivity(body);
      if (res.resultType === 'SUCCESS') return res.success;
      throw res.error;
    },
  });
}

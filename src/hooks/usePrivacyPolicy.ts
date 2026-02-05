import { getPrivacyPolicy } from '@/api/policies';
import { useQuery } from '@tanstack/react-query';

export function usePrivacyPolicy() {
  return useQuery({
    queryKey: ['privacy-policy'],
    queryFn: getPrivacyPolicy,
    staleTime: 1000 * 60 * 30, // 30분간 fresh 상태 유지 (정책 문서는 자주 변경되지 않음)
    retry: false,
  });
}

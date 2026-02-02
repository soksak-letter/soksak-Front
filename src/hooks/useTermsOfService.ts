import { getTermsOfService } from '@/api/policies';
import { useQuery } from '@tanstack/react-query';

export function useTermsOfService() {
  return useQuery({
    queryKey: ['terms-of-service'],
    queryFn: getTermsOfService,
    staleTime: 1000 * 60 * 30, // 30분간 fresh 상태 유지 (정책 문서는 자주 변경되지 않음)
    retry: 1,
  });
}

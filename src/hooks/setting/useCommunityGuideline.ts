// import { getCommunityGuideline } from '@/api/policies';
import { useQuery } from '@tanstack/react-query';

export function useCommunityGuideline() {
  return useQuery({
    queryKey: ['community-guideline'],
    // queryFn: getCommunityGuideline, todo: API 연결 후 주석 해제
    staleTime: 1000 * 60 * 30, // 30분간 fresh 상태 유지 (정책 문서는 자주 변경되지 않음)
    retry: false,
  });
}

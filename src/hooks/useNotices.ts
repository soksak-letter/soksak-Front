import { getNotices } from '@/api/notices';
import { useQuery } from '@tanstack/react-query';

export function useNotices() {
  return useQuery({
    queryKey: ['notices'],
    queryFn: getNotices,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지 (공지사항은 비교적 자주 확인될 수 있음)
    retry: 1,
  });
}

import { getNotices } from '@/api/notices';
import { useQuery } from '@tanstack/react-query';

export function useNotices() {
  return useQuery({
    queryKey: ['notices'],
    queryFn: getNotices,
  });
}

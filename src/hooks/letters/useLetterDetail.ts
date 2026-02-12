import { getLetterDetail } from '@/api/letters/letterDetail';
import { useQuery } from '@tanstack/react-query';

export function useLetterDetail(letterId: number) {
  return useQuery({
    queryKey: ['letter-detail', letterId],
    queryFn: () => getLetterDetail(letterId),
    enabled: Number.isFinite(letterId) && letterId > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

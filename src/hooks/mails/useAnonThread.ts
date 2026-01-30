import { getAnonThread } from '@/api/mails/anonThread';
import { useQuery } from '@tanstack/react-query';

export function useAnonThread(threadId: number) {
  return useQuery({
    queryKey: ['anon-thread', threadId],
    queryFn: () => getAnonThread(threadId),
    enabled: Number.isFinite(threadId) && threadId > 0,
    retry: false,
  });
}

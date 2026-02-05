import { getAnonThread } from '@/api/mails/anonThread';
import { useQuery } from '@tanstack/react-query';

export function useAnonThread(sessionId: number) {
  return useQuery({
    queryKey: ['anon-thread', sessionId],
    queryFn: () => getAnonThread(sessionId),
    enabled: Number.isFinite(sessionId) && sessionId > 0,
    retry: false,
  });
}

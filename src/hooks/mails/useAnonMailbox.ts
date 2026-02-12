import { getAnonMailbox } from '@/api/mails/anonMailbox';
import { useQuery } from '@tanstack/react-query';

export function useAnonMailbox() {
  return useQuery({
    queryKey: ['anon-mailbox'],
    queryFn: getAnonMailbox,
    staleTime: 1000 * 60,
    retry: false,
  });
}

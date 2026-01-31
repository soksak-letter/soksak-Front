import { getAnonMailbox } from '@/api/mails/anonMailbox';
import { useQuery } from '@tanstack/react-query';

export function useAnonMailbox() {
  return useQuery({
    queryKey: ['anon-mailbox'],
    queryFn: getAnonMailbox,
    retry: false,
  });
}

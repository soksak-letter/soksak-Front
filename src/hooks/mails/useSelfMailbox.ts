import { getSelfMailbox } from '@/api/mails/selfMailbox';
import { useQuery } from '@tanstack/react-query';

export function useSelfMailbox() {
  return useQuery({
    queryKey: ['self-mailbox'],
    queryFn: getSelfMailbox,
    staleTime: 1000 * 60,
    retry: false,
  });
}

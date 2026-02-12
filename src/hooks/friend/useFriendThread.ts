import { getFriendThread } from '@/api/mails/friendThread';
import { useQuery } from '@tanstack/react-query';

export function useFriendThread(friendId: number) {
  return useQuery({
    queryKey: ['friend-thread', friendId],
    queryFn: () => getFriendThread(friendId),
    enabled: Number.isFinite(friendId) && friendId > 0,
    staleTime: 1000 * 30,
    retry: false,
  });
}

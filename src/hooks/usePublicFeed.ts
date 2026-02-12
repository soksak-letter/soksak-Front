import { getFriendPublicFeed, getOtherPublicFeed } from '@/api/feed';
import { getTodayKstKey } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

export function useOtherPublicFeed() {
  const todayKey = getTodayKstKey();

  return useQuery({
    queryKey: ['other-public-feed', todayKey],
    queryFn: getOtherPublicFeed,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

export function useFriendPublicFeed() {
  const todayKey = getTodayKstKey();

  return useQuery({
    queryKey: ['friend-public-feed', todayKey],
    queryFn: getFriendPublicFeed,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

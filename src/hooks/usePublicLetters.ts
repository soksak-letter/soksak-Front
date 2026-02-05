import { getFriendPublicLetters, getOtherPublicLetters } from '@/api/letter';
import { getTodayKstKey } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

export function useOtherPublicLetters() {
  const todayKey = getTodayKstKey();

  return useQuery({
    queryKey: ['other-public-letters', todayKey],
    queryFn: getOtherPublicLetters,
    retry: false,
  });
}

export function useFriendPublicLetters() {
  const todayKey = getTodayKstKey();

  return useQuery({
    queryKey: ['friend-public-letters', todayKey],
    queryFn: getFriendPublicLetters,
    retry: false,
  });
}

import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/api/profile';

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    select: (response) => response.success,
    staleTime: 1000 * 60 * 5, // 5분 동안은 신선한 데이터로 간주
  });
};

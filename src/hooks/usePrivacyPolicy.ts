import { getPrivacyPolicy } from '@/api/policies';
import { useQuery } from '@tanstack/react-query';

export function usePrivacyPolicy() {
  return useQuery({
    queryKey: ['privacy-policy'],
    queryFn: getPrivacyPolicy,
  });
}

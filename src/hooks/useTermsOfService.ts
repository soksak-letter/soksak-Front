import { getTermsOfService } from '@/api/policies';
import { useQuery } from '@tanstack/react-query';

export function useTermsOfService() {
  return useQuery({
    queryKey: ['terms-of-service'],
    queryFn: getTermsOfService,
  });
}

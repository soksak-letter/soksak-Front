import { useQuery } from '@tanstack/react-query';
import { getDailyQuestion } from '@/api/question';

export function useDailyQuestion() {
  return useQuery({
    queryKey: ['daily-question'],
    queryFn: getDailyQuestion,
    retry: false,
  });
}

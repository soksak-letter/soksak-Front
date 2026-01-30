import { useQuery } from '@tanstack/react-query';
import { getDailyQuestion } from '@/api/question';

const todayKST = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul',
}).format(new Date());

export function useDailyQuestion() {
  return useQuery({
    queryKey: ['daily-question', todayKST],
    queryFn: () => getDailyQuestion(todayKST),
    retry: false,
  });
}

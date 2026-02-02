import { useQuery } from '@tanstack/react-query';
import { getDailyQuestion } from '@/api/question';
import { getNowKSTIsoString } from '@/utils/date';
import { useMemo } from 'react';

export function useDailyQuestion() {
  const nowKstIso = useMemo(() => getNowKSTIsoString(), []);

  return useQuery({
    queryKey: ['daily-question'],
    queryFn: () => getDailyQuestion(nowKstIso),
    retry: false,
  });
}

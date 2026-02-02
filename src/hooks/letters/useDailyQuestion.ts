import { useQuery } from '@tanstack/react-query';
import { getDailyQuestion } from '@/api/question';
import { getNowKSTIsoString, getTodayKstKey } from '@/utils/date';
import { useMemo } from 'react';

export function useDailyQuestion() {
  const nowKstIso = useMemo(() => getNowKSTIsoString(), []);
  const todayKstKey = useMemo(() => getTodayKstKey(), []); // "YYYY-MM-DD"

  return useQuery({
    queryKey: ['daily-question', todayKstKey],
    queryFn: () => getDailyQuestion(nowKstIso),
    retry: false,
  });
}

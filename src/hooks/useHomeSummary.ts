import { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomeSummary } from '@/api/home';
import { getNowKSTIsoString, getTodayKstKey } from '@/utils/date';
import useCountdown from './auth/useCountdown';

export function useHomeSummary() {
  const nowKstIso = useMemo(() => getNowKSTIsoString(), []);
  const todayKstKey = useMemo(() => getTodayKstKey(), []);

  const query = useQuery({
    queryKey: ['home-summary', todayKstKey],
    queryFn: () => getHomeSummary(nowKstIso),
    staleTime: 1000 * 60 * 2,
    retry: false,
    select: (res) => {
      if (res.resultType !== 'SUCCESS' || !res.success) {
        throw new Error(res.error?.reason || '홈 정보를 불러오는데 실패했습니다.');
      }
      return res.success;
    },
  });

  const deadlineMs = useMemo(() => {
    const iso = query.data?.todayQuestion?.expiredAt;
    if (!iso) return null;
    const t = new Date(iso).getTime();
    return Number.isNaN(t) ? null : t;
  }, [query.data?.todayQuestion?.expiredAt]);

  const { isExpired, formattedTime } = useCountdown(deadlineMs ?? Date.now() + 60000);

  useEffect(() => {
    if (!isExpired) return;
    query.refetch();
  }, [isExpired]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    error: query.error ? (query.error as Error).message : null,
    timeLeft: formattedTime,
    isExpired,
    refetch: query.refetch,
  };
}

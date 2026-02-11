import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getLetterDetail } from '@/api/letters/letterDetail';

type LetterDetailData = Awaited<ReturnType<typeof getLetterDetail>>;

export function useLetterDetails(letterIds: number[]) {
  // 1) 중복 제거 + 유효한 id만 남김
  const uniqueIds = useMemo(() => {
    const set = new Set<number>();
    for (const id of letterIds) {
      if (Number.isFinite(id) && id > 0) set.add(id);
    }
    return Array.from(set);
  }, [letterIds]);

  // 2) useQueries는 uniqueIds 기준으로만 생성
  const queries = useQueries({
    queries: uniqueIds.map((letterId) => ({
      queryKey: ['letter-detail', letterId] as const,
      queryFn: () => getLetterDetail(letterId),
      enabled: uniqueIds.length > 0, // id별 enabled 대신 한번에 켜도 됨
      retry: false,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  // 3) letterId -> detail data 매핑 (uniqueIds와 queries 인덱스 정합 보장)
  const map = useMemo(() => {
    const m = new Map<number, LetterDetailData>();
    uniqueIds.forEach((id, idx) => {
      const data = queries[idx]?.data;
      if (data) m.set(id, data);
    });
    return m;
  }, [uniqueIds, queries]);

  return { queries, isLoading, isError, map };
}

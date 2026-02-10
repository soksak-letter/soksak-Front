import { useQueries } from '@tanstack/react-query';
import { getLetterDetail } from '@/api/letters/letterDetail';

type LetterDetailData = Awaited<ReturnType<typeof getLetterDetail>>;

export function useLetterDetails(letterIds: number[]) {
  const queries = useQueries({
    queries: letterIds.map((letterId) => ({
      queryKey: ['letter-detail', letterId], // 기존 useLetterDetail과 동일
      queryFn: () => getLetterDetail(letterId), // 기존 useLetterDetail과 동일
      enabled: Number.isFinite(letterId) && letterId > 0,
      retry: false, // 기존 useLetterDetail과 동일
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  // letterId -> detail data 매핑
  const map = new Map<number, LetterDetailData>();

  queries.forEach((q, idx) => {
    const id = letterIds[idx];
    if (q.data) map.set(id, q.data);
  });

  return { queries, isLoading, isError, map };
}

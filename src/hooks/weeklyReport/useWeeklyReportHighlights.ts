import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getLetterDetail } from '@/api/weeklyReport';
import type { CommonResponse } from '@/types/dto/common';
import type { GetLetterSuccess } from '@/types/dto/weeklyReport';
import type { FeedLetter } from '@/types/letter';

function toFeedLetter(letter: GetLetterSuccess): FeedLetter {
  return {
    letterId: letter.id,
    title: letter.title ?? '편지',
    deliveredAt: letter.deliveredAt ?? '',
    paperId: (letter.design?.paper?.id ?? 0) + 1,
  };
}

export function useWeeklyReportHighlights(letterIds: number[]) {
  const uniqueIds = useMemo(
    () => Array.from(new Set(letterIds)).filter((n) => Number.isFinite(n) && n > 0),
    [letterIds],
  );

  const queries = useQueries({
    queries: uniqueIds.map((id) => ({
      queryKey: ['letter-detail', id],
      queryFn: () => getLetterDetail(id) as Promise<CommonResponse<GetLetterSuccess>>,
      enabled: uniqueIds.length > 0,
      staleTime: 60_000,
      retry: 0,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const letters = useMemo(() => {
    return queries
      .map((q) => q.data?.success)
      .filter((x): x is GetLetterSuccess => Boolean(x))
      .map(toFeedLetter);
  }, [queries]);

  return { letters, isLoading, isError };
}

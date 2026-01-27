import { useState, useEffect, useCallback } from 'react';
import { getPublicLetters } from '@/api/letter';
import type { LetterItem } from '@/types/dto/letter';

interface UsePublicLettersParams {
  questionId: number | null;
  size?: number;
}

interface UsePublicLettersReturn {
  letters: LetterItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

function usePublicLetters({
  questionId,
  size = 10,
}: UsePublicLettersParams): UsePublicLettersReturn {
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchLetters = useCallback(
    async (cursor?: string) => {
      if (!questionId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getPublicLetters({
          questionId,
          cursor,
          size,
        });

        if (response.resultType === 'SUCCESS' && response.success) {
          // success가 배열 직접 반환
          const items = response.success ?? [];
          if (cursor) {
            // 추가 로드 (페이지네이션)
            setLetters((prev) => [...prev, ...items]);
          } else {
            // 초기 로드
            setLetters(items);
          }
          // TODO: 페이지네이션 cursor가 응답에 없음 - 백엔드 확인 필요
          setNextCursor(null);
        } else {
          setError(response.error?.reason || '편지를 불러오는데 실패했습니다.');
        }
      } catch {
        setError('편지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [questionId, size],
  );

  // 초기 로드
  useEffect(() => {
    if (questionId) {
      fetchLetters();
    }
  }, [questionId, fetchLetters]);

  // 더 불러오기
  const loadMore = useCallback(async () => {
    if (nextCursor && !isLoading) {
      await fetchLetters(nextCursor);
    }
  }, [nextCursor, isLoading, fetchLetters]);

  // 새로고침
  const refetch = useCallback(async () => {
    setLetters([]);
    setNextCursor(null);
    await fetchLetters();
  }, [fetchLetters]);

  return {
    letters,
    isLoading,
    error,
    hasMore: !!nextCursor,
    loadMore,
    refetch,
  };
}

export default usePublicLetters;

import { useState, useEffect, useCallback } from 'react';
import { getFriendPublicLetters } from '@/api/letter';
import type { PublicLetterItem } from '@/types/dto/letter';

interface UseFriendLettersParams {
  questionId: number | null;
  size?: number; // TODO: 백엔드에서 size 지원되면 사용
}

interface UseFriendLettersReturn {
  letters: PublicLetterItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

function useFriendLetters({
  questionId,
  // size = 10,
}: UseFriendLettersParams): UseFriendLettersReturn {
  const [letters, setLetters] = useState<PublicLetterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 현재 API가 cursor 기반 페이지네이션을 안 내려주는 상태라 고정 false 처리
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchLetters = useCallback(
    async (cursor?: string) => {
      if (!questionId) return;

      setIsLoading(true);
      setError(null);

      try {
        // API가 배열을 직접 반환한다고 가정
        // (cursor/size 파라미터는 API 시그니처에 맞춰 조정해야 함)
        const items = await getFriendPublicLetters();

        // const response = await getFriendPublicLetters({
        // questionId,
        // cursor,
        // size,
        // });

        // if (response.resultType === 'SUCCESS' && response.success) {
        // success가 배열 직접 반환
        // const items = response.success ?? [];
        if (cursor) {
          // 추가 로드 (페이지네이션)
          setLetters((prev) => [...prev, ...items]);
        } else {
          // 초기 로드
          setLetters(items);
        }
        // TODO: 페이지네이션 cursor가 응답에 없음 - 백엔드 확인 필요
        setNextCursor(null);
      } catch {
        setError('친구 편지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [questionId],
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

export default useFriendLetters;

import { useState, useEffect, useCallback } from 'react';
import { getTodayQuestion } from '@/api/question';
import type { TodayQuestionResult } from '@/types/dto/question';
import useCountdown from './useCountdown';

interface UseTodayQuestionReturn {
  question: TodayQuestionResult | null;
  isLoading: boolean;
  error: string | null;
  timeLeft: string;
  isExpired: boolean;
  refetch: () => Promise<void>;
}

function useTodayQuestion(): UseTodayQuestionReturn {
  const [question, setQuestion] = useState<TodayQuestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const response = await getTodayQuestion();
      if (response.resultType === 'SUCCESS') {
        setQuestion(response.success);
      } else {
        setError(response.error?.reason || '질문을 불러오는데 실패했습니다.');
      }
    } catch {
      setError('질문을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  // validUntil을 밀리초로 변환
  const deadlineMs = question?.validUntil ? new Date(question.validUntil).getTime() : 0;

  const { mmss: timeLeft, isExpired } = useCountdown(deadlineMs, {
    onExpire: () => {
      // 만료 시 새 질문 불러오기 (스켈레톤 표시 안 함)
      if (deadlineMs > 0) {
        fetchQuestion(false);
      }
    },
  });

  return {
    question,
    isLoading,
    error,
    timeLeft,
    isExpired,
    refetch: fetchQuestion,
  };
}

export default useTodayQuestion;

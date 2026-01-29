import { useState, useEffect, useCallback } from 'react';
import { getHomeSummary } from '@/api/home';
import type { HomeSummaryResult } from '@/types/dto/home';
import useCountdown from './useCountdown';

interface UseHomeSummaryReturn {
  data: HomeSummaryResult | null;
  isLoading: boolean;
  error: string | null;
  timeLeft: string;
  isExpired: boolean;
  refetch: () => Promise<void>;
}

function useHomeSummary(): UseHomeSummaryReturn {
  const [data, setData] = useState<HomeSummaryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const response = await getHomeSummary();
      if (response.resultType === 'SUCCESS') {
        setData(response.success);
      } else {
        setError(response.error?.reason || '홈 정보를 불러오는데 실패했습니다.');
      }
    } catch {
      setError('홈 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // expiredAt을 밀리초로 변환
  const deadlineMs = data?.todayQuestion?.expiredAt
    ? new Date(data.todayQuestion.expiredAt).getTime()
    : 0;

  const { mmss: timeLeft, isExpired } = useCountdown(deadlineMs, {
    onExpire: () => {
      // 만료 시 새 데이터 불러오기 (스켈레톤 표시 안 함)
      if (deadlineMs > 0) {
        fetchSummary(false);
      }
    },
  });

  return {
    data,
    isLoading,
    error,
    timeLeft,
    isExpired,
    refetch: fetchSummary,
  };
}

export default useHomeSummary;

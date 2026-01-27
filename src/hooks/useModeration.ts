import { useState, useEffect, useCallback } from 'react';
import { blockUser, getBlockedUsers, getReportList, getRestrictList } from '@/api/moderation';
import type { BlockedUser, ReportedUser, RestrictedUser } from '@/types/dto/moderation';

// 차단 목록 조회 훅
interface UseBlockedUsersReturn {
  blockedUsers: BlockedUser[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBlockedUsers(): UseBlockedUsersReturn {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockedUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBlockedUsers();
      setBlockedUsers(result);
    } catch {
      setError('차단 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

  return {
    blockedUsers,
    isLoading,
    error,
    refetch: fetchBlockedUsers,
  };
}

// 유저 차단 훅
export function useBlockUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const block = useCallback(
    async (targetUserId: number): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      setError(null);
      try {
        const { result, message } = await blockUser(targetUserId);
        console.log('[useBlockUser] API 응답 message:', message);
        return { success: result, message };
      } catch {
        setError('유저 차단에 실패했습니다.');
        return { success: false, message: '유저 차단에 실패했습니다.' };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    block,
    isLoading,
    error,
  };
}

// 신고 내역 조회 훅
export function useReportList() {
  const [report, setReport] = useState<ReportedUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (reportId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getReportList(reportId);
      setReport(result);
    } catch {
      setError('신고 내역을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    report,
    isLoading,
    error,
    fetchReport,
  };
}

// 이용 제한 내역 조회 훅
interface UseRestrictListReturn {
  restrictedUsers: RestrictedUser[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRestrictList(): UseRestrictListReturn {
  const [restrictedUsers, setRestrictedUsers] = useState<RestrictedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestrictList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getRestrictList();
      setRestrictedUsers(result);
    } catch {
      setError('이용 제한 내역을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestrictList();
  }, [fetchRestrictList]);

  return {
    restrictedUsers,
    isLoading,
    error,
    refetch: fetchRestrictList,
  };
}

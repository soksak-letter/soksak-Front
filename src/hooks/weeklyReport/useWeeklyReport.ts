import { useQuery } from '@tanstack/react-query';
import { getWeeklyReport } from '@/api/weeklyReport';
import type { ApiError, CommonResponse } from '@/types/dto/common';
import type { WeeklyReportSuccessPayload } from '@/types/dto/weeklyReport';

export function useWeeklyReport() {
  return useQuery<CommonResponse<WeeklyReportSuccessPayload>, ApiError>({
    queryKey: ['weeklyReport'],
    queryFn: getWeeklyReport,
    staleTime: 60_000,
    retry: 0,
  });
}

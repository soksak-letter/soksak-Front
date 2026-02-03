import type { LetterReportRequest, LetterReportResponse } from '@/types/dto/letterReport';
import { axiosInstance } from './axios';

/**
 *신고하기 API
 @param body letterId,reason[]
 * Post /reports
 */
export const postLetterReport = async (body: LetterReportRequest) => {
  const { data } = await axiosInstance.post<LetterReportResponse>(`/reports`, body);
  return data;
};

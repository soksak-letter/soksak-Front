import type { LetterReportRequest, LetterReportResponse } from '@/types/dto/letterReport';
import { axiosInstance } from './axios';

/**
 *신고하기 API
 * @param body 신고 요청 데이터 (편지 ID와 신고 사유 배열)
 * Post /reports
 */
export const postLetterReport = async (body: LetterReportRequest) => {
  const { data } = await axiosInstance.post<LetterReportResponse>(`/reports`, body);
  return data;
};

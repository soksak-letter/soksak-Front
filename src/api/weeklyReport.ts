import { axiosInstance } from '@/api/axios';
import type { CommonResponse } from '@/types/dto/common';
import type {
  WeeklyReportSuccessPayload,
  GetLetterSuccess,
  LettersByKeywordSuccessPayload,
} from '@/types/dto/weeklyReport';

const WEEKLY_REPORT_PATH = '/weekly/reports';
const LETTER_DETAIL_PATH = (letterId: number) => `/letters/${letterId}`;
const LETTERS_BY_KEYWORD_PATH = (aiKeyword: string) =>
  `/letters/keywords/${encodeURIComponent(aiKeyword)}`;

export async function getWeeklyReport() {
  const res =
    await axiosInstance.get<CommonResponse<WeeklyReportSuccessPayload>>(WEEKLY_REPORT_PATH);
  return res.data;
}

export async function getLetterDetail(letterId: number) {
  const res = await axiosInstance.get<CommonResponse<GetLetterSuccess>>(
    LETTER_DETAIL_PATH(letterId),
  );
  return res.data;
}

export async function getLettersByKeyword(aiKeyword: string) {
  const res = await axiosInstance.get<CommonResponse<LettersByKeywordSuccessPayload>>(
    LETTERS_BY_KEYWORD_PATH(aiKeyword),
  );
  return res.data;
}

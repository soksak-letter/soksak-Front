// 신고 / 차단 / 제재 관련 API 함수들

import type {
  BlockUserResponse,
  BlockedUser,
  BlockListResponse,
  ReportedUser,
  ReportDetailResponse,
  RestrictedUser,
  RestrictListResponse,
} from '@/types/dto/moderation';
import { axiosInstance } from './axios';

/**
 * 유저 차단 API
 * POST /block/{targetUserId}
 */
export const blockUser = async (
  targetUserId: number,
): Promise<{ result: boolean; message: string }> => {
  const { data } = await axiosInstance.post<BlockUserResponse>(`/block/${targetUserId}`);

  if (data.resultType === 'SUCCESS' && data.success) {
    return {
      result: data.success.result,
      message: data.success.message,
    };
  }

  const errorMessage = data.error?.reason ?? '유저 차단에 실패했습니다.';
  throw new Error(errorMessage);
};

/**
 * 차단 목록 조회 API
 * GET /block
 */
export const getBlockedUsers = async (): Promise<BlockedUser[]> => {
  const { data } = await axiosInstance.get<BlockListResponse>('/block');

  if (data.resultType === 'SUCCESS' && data.success) {
    return data.success.result;
  }

  const errorMessage = data.error?.reason ?? '차단 목록 조회에 실패했습니다.';
  throw new Error(errorMessage);
};

/**
 * 신고 내역 조회 API
 * GET /reports/{reportId}
 */
export const getReportDetail = async (reportId: number): Promise<ReportedUser> => {
  const { data } = await axiosInstance.get<ReportDetailResponse>(`/reports/${reportId}`);

  if (data.resultType === 'SUCCESS' && data.success) {
    return data.success.result;
  }

  const errorMessage = data.error?.reason ?? '신고 내역 조회에 실패했습니다.';
  throw new Error(errorMessage);
};

/**
 * 이용 제한 내역 조회 API
 * GET /restrict
 */
export const getRestrictList = async (): Promise<RestrictedUser[]> => {
  const { data } = await axiosInstance.get<RestrictListResponse>('/restrict');

  if (data.resultType === 'SUCCESS' && data.success) {
    return data.success.result;
  }

  const errorMessage = data.error?.reason ?? '이용 제한 내역 조회에 실패했습니다.';
  throw new Error(errorMessage);
};

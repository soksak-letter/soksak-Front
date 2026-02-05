// 신고 / 차단 / 제재 관련 API 함수들

import type {
  BlockUserResponse,
  BlockListResponse,
  ReportDetailResponse,
  RestrictListResponse,
} from '@/types/dto/moderation';
import { axiosInstance } from './axios';

/**
 * 유저 차단 API
 * POST /block/{targetUserId}
 */
export const blockUser = (targetUserId: number) =>
  axiosInstance.post<BlockUserResponse>(`/block/${targetUserId}`);

/**
 * 차단 목록 조회 API
 * GET /block
 */
export const getBlockedUsers = () => axiosInstance.get<BlockListResponse>('/block');

/**
 * 신고 내역 조회 API
 * GET /reports/{reportId}
 */
export const getReportDetail = (reportId: number) =>
  axiosInstance.get<ReportDetailResponse>(`/reports/${reportId}`);

/**
 * 이용 제한 내역 조회 API
 * GET /restrict
 */
export const getRestrictList = () => axiosInstance.get<RestrictListResponse>('/restrict');

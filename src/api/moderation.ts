// 신고 / 차단 / 제재 관련 API 함수들

import type { BlockUserResponse } from '@/types/dto/moderation';
import { axiosInstance } from './axios';

/**
 * 유저 차단 API
 * POST /block/{targetUserId}
 */
export const blockUser = (targetUserId: number) =>
  axiosInstance.post<BlockUserResponse>(`/block/${targetUserId}`);

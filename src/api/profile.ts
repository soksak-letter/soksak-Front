import type { MyProfileResponse } from '@/types/dto/profile';
import { axiosInstance } from './axios';

/**
 * 사용자의 프로필 정보를 조회
 * GET /users/me/profile
 */
export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const { data } = await axiosInstance.get<MyProfileResponse>('/users/me/profile');
  return data;
};

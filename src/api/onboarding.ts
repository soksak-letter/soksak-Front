import type {
  GetAllInterestsResponse,
  GetMyInterestsResponse,
  SaveBasicInfoRequest,
  SaveBasicInfoResponse,
  SaveInterestsReqeust,
  SaveInterestsResponse,
} from '@/types/dto/onboarding';
import { axiosInstance } from './axios';

export const onboardingApi = {
  /** 전체 관심사 목록 (로그인 불필요) */
  getAllInterests: async () => {
    const res = await axiosInstance.get<GetAllInterestsResponse>('/interests/all');
    return res.data;
  },

  /** 내가 선택한 관심사 */
  getMyInterests: async () => {
    const res = await axiosInstance.get<GetMyInterestsResponse>('/interests');
    return res.data;
  },

  /** 관심사 저장 */
  saveInterests: async (payload: SaveInterestsReqeust) => {
    const res = await axiosInstance.put<SaveInterestsResponse>(
      '/users/me/onboarding/interests',
      payload,
    );
    return res.data;
  },

  /** 기본 정보 저장 */
  saveBasicInfo: async (payload: SaveBasicInfoRequest) => {
    const res = await axiosInstance.patch<SaveBasicInfoResponse>('/users/me/onboarding', payload);
    return res.data;
  },
};

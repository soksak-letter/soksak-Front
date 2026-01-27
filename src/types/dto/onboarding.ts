import type { CommonResponse } from './common';

/* ---------- 관심사 ---------- */
export interface Interest {
  id: number;
  name: string;
}

export type GetAllInterestsResponse = CommonResponse<{
  items: Interest[];
}>;

export type GetMyInterestsResponse = CommonResponse<{
  items: Interest[];
}>;

export interface SaveInterestsReqeust {
  interestIds: number[];
}

export type SaveInterestsResponse = CommonResponse<{
  updated: boolean;
}>;

export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';
export type Job = 'WORKER' | 'STUDENT' | 'HOUSEWIFE' | 'FREELANCER' | 'UNEMPLOYED' | 'OTHER';

export interface SaveBasicInfoRequest {
  gender: Gender;
  job: Job;
}

export type SaveBasicInfoResponse = CommonResponse<{
  updated: boolean;
}>;

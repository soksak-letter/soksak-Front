import type { CommonResponse } from './common';

export interface Interest {
  id: number;
  name: string;
}

export interface MyProfileResult {
  id: string;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  interests: Interest[];
  sentLettersCount: number;
  receivedLettersCount: number;
  temperatureAvg: number;
  totalUsageMinutes: number;
}
export type MyProfileResponse = CommonResponse<MyProfileResult>;

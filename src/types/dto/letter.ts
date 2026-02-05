import type { CommonResponse } from './common';

// 공개/친구 편지 아이템 (API 응답 형태)
export interface PublicLetterItem {
  id: number;
  title: string;
  deliveredAt: string | null;
  design: {
    paper: {
      id: number;
      name: string;
    };
  };
}

export type PublicLettersResponse = CommonResponse<PublicLetterItem[]>;

// 친구 편지 캐러셀 목록 Request Params
export interface FriendLettersParams {
  questionId: number;
  cursor?: string;
  size?: number;
}

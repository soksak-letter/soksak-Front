import type { CommonResponse } from './common';

// 편지 디자인 (paper)
export interface LetterDesign {
  paper: {
    id?: number;
    color?: string;
    assetUrl?: string;
  };
}

// 공개/친구 편지 아이템 (API 응답 형태)
export interface LetterItem {
  id: number;
  title: string;
  deliveredAt: string | null;
  design: LetterDesign;
}

// 공개 편지 캐러셀 목록 Request Params
export interface PublicLettersParams {
  questionId: number;
  cursor?: string;
  size?: number;
}

// 공개 편지 캐러셀 목록 Response DTO
// success가 배열 직접 반환
export type PublicLettersResponse = CommonResponse<LetterItem[]>;

// 친구 편지 캐러셀 목록 Request Params
export interface FriendLettersParams {
  questionId: number;
  cursor?: string;
  size?: number;
}

// 친구 편지 캐러셀 목록 Response DTO
// success가 배열 직접 반환 (공개 편지와 동일한 구조)
export type FriendLettersResponse = CommonResponse<LetterItem[]>;

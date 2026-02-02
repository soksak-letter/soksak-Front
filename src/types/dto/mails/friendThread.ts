import type { ApiError } from '../common';

// design
export type PaperDesign = {
  id: number;
  color: string;
  assetUrl: string;
};

export type StampDesign = {
  id: number;
  name: string;
  assetUrl: string;
};

export type LetterDesign = {
  paper: PaperDesign;
  stamp: StampDesign;
};

// 친구가 보낸 편지
export type FriendLetterItem = {
  id: number;
  title: string;
  deliveredAt: string;
  readAt: string | null;
  design: LetterDesign;
};

// 사용자가 보낸 편지
export type UserLetterItem = {
  id: number;
  title: string;
  deliveredAt: string;
  readAt: string | null;
  question: {
    content: string;
  };
  design: LetterDesign;
};

// 최종 응답
export type FriendThreadSuccess = {
  friendName: string;
  firstQuestion: string;

  friendLetters: FriendLetterItem[];

  userLetters: UserLetterItem[];
};

export type FriendThreadResponse = {
  resultType: 'SUCCESS' | 'FAIL';
  error: ApiError | null;
  success: FriendThreadSuccess | null;
};

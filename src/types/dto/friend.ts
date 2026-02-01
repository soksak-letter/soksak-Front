import type { CommonResponse } from './common';

export type FriendApiResponse<T> = CommonResponse<{
  message: string;
  result: { data: T };
}>;

export type RecentLetter = {
  createdAt: string;
  design: {
    paper: { id: number; color: string };
    stamp: { id: number; name: string; assetUrl: string };
  };
};

export type FriendItem = {
  id: number;
  friendUserId: number;
  nickname: string;
  letterCount: number;
  recentLetter: RecentLetter;
};

export type FriendRequestStatus = 'PENDING' | 'REJECTED' | 'DELETED';

export type FriendRequestItem = {
  id: number;
  requesterUserId: number;
  receiverUserId: number;
  sessionId: number;
  status: FriendRequestStatus;
};

export type SendFriendRequestBody = {
  targetUserId: number;
  sessionId: number;
};

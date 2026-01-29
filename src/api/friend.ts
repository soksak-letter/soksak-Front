import { axiosInstance } from './axios';
import type {
  FriendApiResponse,
  FriendItem,
  FriendRequestItem,
  SendFriendRequestBody,
} from '@/types/dto/friend';

/**
 * 친구 목록 조회
 * GET /friends
 */
export const getFriends = () => axiosInstance.get<FriendApiResponse<FriendItem[]>>('/friends');

/**
 * 받은 친구 요청 목록 조회
 * GET /friends/requests/incoming
 */
export const getIncomingRequests = () =>
  axiosInstance.get<FriendApiResponse<FriendRequestItem[]>>('/friends/requests/incoming');

/**
 * 보낸 친구 요청 목록 조회
 * GET /friends/requests/outgoing
 */
export const getOutgoingRequests = () =>
  axiosInstance.get<FriendApiResponse<FriendRequestItem[]>>('/friends/requests/outgoing');

/**
 * 친구 요청 보내기
 * POST /friends/requests
 */
export const sendFriendRequest = (body: SendFriendRequestBody) =>
  axiosInstance.post<FriendApiResponse<FriendRequestItem>>('/friends/requests', body);

/**
 * 친구 요청 수락
 * POST /friends/requests/accept/{requesterUserId}
 */
export const acceptFriendRequest = (requesterUserId: number) =>
  axiosInstance.post<FriendApiResponse<unknown>>(`/friends/requests/accept/${requesterUserId}`);

/**
 * 친구 요청 거절
 * POST /friends/requests/reject/{targetUserId}
 */
export const rejectFriendRequest = (targetUserId: number) =>
  axiosInstance.post<FriendApiResponse<FriendRequestItem>>(
    `/friends/requests/reject/${targetUserId}`,
  );

/**
 * 친구 요청 취소
 * DELETE /friends/requests/{targetUserId}
 */
export const cancelFriendRequest = (targetUserId: number) =>
  axiosInstance.delete<FriendApiResponse<{ id: number; status: 'DELETED' }>>(
    `/friends/requests/${targetUserId}`,
  );

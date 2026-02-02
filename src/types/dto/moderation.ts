// 신고 / 차단 / 제재 관련 DTO

// 공통 에러 타입
interface ApiError {
  errorCode: string;
  reason: string;
}

// 차단 관련
export interface BlockedUser {
  blockedUserId: number;
  createdAt: string;
}

export type BlockUserResponse =
  | { resultType: 'SUCCESS'; error: null; success: { message: string; result: boolean } }
  | { resultType: 'ERROR'; error: ApiError; success: null };

export type BlockListResponse =
  | { resultType: 'SUCCESS'; error: null; success: { message: string; result: BlockedUser[] } }
  | { resultType: 'ERROR'; error: ApiError; success: null };

// 신고 관련
export interface ReportedUser {
  id: number;
  letterId: number;
  reasons: string[];
  createdAt: string;
}

export type ReportDetailResponse =
  | { resultType: 'SUCCESS'; error: null; success: { message: string; result: ReportedUser } }
  | { resultType: 'ERROR'; error: ApiError; success: null };

// 이용 제한 관련
export interface RestrictedUser {
  id: number;
  userId: number;
  reason: string;
  startsAt: string;
  endsAt: string;
}

export type RestrictListResponse =
  | { resultType: 'SUCCESS'; error: null; success: { message: string; result: RestrictedUser[] } }
  | { resultType: 'ERROR'; error: ApiError; success: null };

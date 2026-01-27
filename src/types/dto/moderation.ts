// 신고 / 차단 / 제재 관련 DTO

export interface BlockUserResponse {
  resultType: 'SUCCESS' | 'ERROR';
  error: null;
  success: {
    message: string;
    result: boolean;
  };
}

export interface BlockedUser {
  blockedUserId: number;
  createdAt: string;
}

export interface BlockListResponse {
  resultType: 'SUCCESS' | 'ERROR';
  error: null;
  success: {
    message: string;
    result: BlockedUser[];
  };
}

export interface ReportedUser {
  id: number;
  letterId: number;
  reasons: string[];
  createdAt: string;
}

export interface ReportListResponse {
  resultType: 'SUCCESS' | 'ERROR';
  error: null;
  success: {
    message: string;
    result: ReportedUser;
  };
}

export interface RestrictedUser {
  id: number;
  userId: number;
  reason: string;
  startsAt: string;
  endsAt: string;
}

export interface RestrictListResponse {
  resultType: 'SUCCESS' | 'ERROR';
  error: null;
  success: {
    message: string;
    result: RestrictedUser[];
  };
}

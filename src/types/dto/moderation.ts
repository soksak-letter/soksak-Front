// 신고 / 차단 / 제재 관련 DTO

import type { ApiError } from './common';

// 차단 관련
export type BlockUserResponse =
  | { resultType: 'SUCCESS'; error: null; success: { message: string; result: boolean } }
  | { resultType: 'FAIL'; error: ApiError; success: null };

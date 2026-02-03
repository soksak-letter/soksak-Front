// 공통 API 응답 DTO
// 모든 API 응답의 기본 구조를 정의합니다.

// 1. 결과 타입 상수
export type ResultType = 'SUCCESS' | 'FAIL';

// 서버가 응답으로 줄 데이터 (Response DTO)
// 2. 에러 구조 (실패 시 항상 이 형태)
export interface ApiError {
  errorCode: string;
  reason: string;
  data: Record<string, unknown> | Array<{ field: string; message: string }>; // 빈 객체 {} 도 포함 가능하도록
}

/**
 * 3. 공통 응답 래퍼 (Wrapper)
 * T: 성공 시 반환될 실제 데이터의 타입 (예: SignUpResult)
 */
export type CommonResponse<T> =
  | {
      resultType: 'SUCCESS';
      error: null;
      success: T;
    }
  | {
      resultType: 'FAIL';
      error: ApiError;
      success: null;
    };

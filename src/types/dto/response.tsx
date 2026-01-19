// 1. 내가 서버로 보낼 데이터 (Request DTO)
export interface SignUpRequest {
  email: string;
  username: string;
  name: string;
  phoneNumber: string; // 혹은 phone (서버 명세에 따름)
  password: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  ageOver14Agreed: boolean;
  marketingAgreed: boolean;
}

export type ResultType = "SUCCESS" | "FAIL";
// 2. 서버가 응답으로 줄 데이터 (Response DTO)
export interface SignUpResponse {
  userId: number;
  message: string;
  // 토큰이 응답 바디에 온다면 여기 추가
  accessToken?: string; 
  resultType:ResultType,
  error: {
    "errorCode": "TERM_400_01",
    "reason": "필수 약관에 모두 동의해주세요.",
    "data": {}
  }|null,
  "success": null
}

// 3. 로그인 등 다른 API 타입도 여기에 정의
export interface LoginRequest { ... }
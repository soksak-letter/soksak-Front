import type { LoginRequest, SignUpRequest, SignUpResponse } from "@/types/dto/common";
import { axiosInstance } from "./axios";


// 회원가입 API 함수
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  // 제네릭 <SignUpResponse>를 사용하여 응답 타입을 명시합니다.
  const response = await axiosInstance.post<SignUpResponse>('/auth/signup', data);
  return response.data; // axios의 data 객체만 반환
};

// 로그인 API 함수
export const login = async (data: LoginRequest) => { ... }
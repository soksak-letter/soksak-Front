// 의도: 로그인 여부는 “토큰 존재 여부”로만 판단

import { create } from 'zustand';

type LoginPayload = {
  accessToken?: string;
  refreshToken?: string;
};

interface AuthState {
  // “로그인 상태 = 토큰 존재 여부”로 관리
  isLoggedIn: boolean;
  hasToken: boolean;

  // localStorage와 스토어 상태 재동기화
  sync: () => void;

  // 토큰 저장(선택) + 상태 갱신
  // eslint-disable-next-line no-unused-vars
  login: (payload: LoginPayload) => void;

  // 토큰 제거 + 상태 갱신
  logout: () => void;
}

const TOKEN_KEY = 'token';
const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

const readHasToken = () =>
  Boolean(localStorage.getItem(TOKEN_KEY) || localStorage.getItem(ACCESS_KEY));

export const useAuthStore = create<AuthState>((set) => {
  const initialHasToken = readHasToken();

  return {
    isLoggedIn: initialHasToken,
    hasToken: initialHasToken,

    sync: () => {
      const next = readHasToken();
      set({ isLoggedIn: next, hasToken: next });
    },

    login: ({ accessToken, refreshToken }) => {
      // 필요할 때만 저장
      if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);

      // “토큰 존재 여부” 기준으로 상태 확정
      const next = readHasToken();
      set({ isLoggedIn: next, hasToken: next }); // 전역 알림: 로그인
    },

    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);

      set({ isLoggedIn: false, hasToken: false }); // 전역 알림: 로그아웃
    },
  };
});

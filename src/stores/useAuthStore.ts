import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean; // 전역에서 바라볼 로그인 상태

  // App.tsx에서 쓰기 쉬운 별칭(리뷰 의도: localStorage 직접 안 봄)
  hasToken: boolean;
  // localStorage 값과 스토어 상태를 다시 맞추는 용도
  sync: () => void;

  login: (accessToken: string, refreshToken: string) => void; // 인자 추가
  logout: () => void;
}

// 프로젝트가 token 단일키/ accessToken 키가 섞일 수 있어서 안전하게 OR 체크
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

    login: (accessToken, refreshToken) => {
      localStorage.setItem(ACCESS_KEY, accessToken);

      if (refreshToken !== undefined) {
        localStorage.setItem(REFRESH_KEY, refreshToken);
      }

      set({ isLoggedIn: true, hasToken: true }); // 전역 알림: 로그인
    },

    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);

      set({ isLoggedIn: false, hasToken: false }); // 전역 알림: 로그아웃
    },
  };
});

import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean; // 전역에서 바라볼 로그인 상태
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기값: 로컬스토리지에 토큰이 있으면 true
  isLoggedIn: Boolean(localStorage.getItem('accessToken')),

  login: (token) => {
    localStorage.setItem('accessToken', token);
    set({ isLoggedIn: true }); // 전역 알림: 로그인
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isLoggedIn: false }); // 전역 알림: 로그아웃
  },
}));

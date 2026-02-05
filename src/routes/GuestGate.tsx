import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

/**
 * 비로그인: allow prefixes만 접근 허용 (splash/auth/signup 등)
 *  비로그인 허용 정책
 *      - prefix: 그룹 단위 허용
 *      - exact: 특정 페이지만 허용
 * 로그인: 제한 없음
 */
const ALLOW_PREFIXES = ['/splash', '/auth', '/onboarding', '/error', '/loading'];

const ALLOW_EXACT_PATHS = ['/setting/terms', '/setting/privacy'];

export default function GuestGate() {
  const { pathname } = useLocation();
  // 스토어에서 로그인 상태 가져오기
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 로그인 사용자는 전부 통과
  if (isLoggedIn) return <Outlet />;

  // 1. exact match 허용
  if (ALLOW_EXACT_PATHS.includes(pathname)) {
    return <Outlet />;
  }

  // 2. prefix match 허용
  const isPrefixAllowed = ALLOW_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isPrefixAllowed) {
    return <Outlet />;
  }

  // 나머지는 splash로
  return <Navigate to='/splash' replace state={{ from: pathname }} />;
}

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

// 첫 진입(/)일 때 어디로 보낼지 결정
export default function EntryRoute() {
  const { pathname } = useLocation();

  // 스토어에서 로그인 상태 가져오기 (실시간 감지)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // 이미 다른 경로로 들어온 경우엔 건드리지 않음 (안전장치)
  if (pathname !== '/') return null;

  // 로그인 상태면 홈
  if (isLoggedIn) return <Navigate to='/home/main' replace />;

  // 비로그인이면 스플래시
  return <Navigate to='/splash' replace />;
}

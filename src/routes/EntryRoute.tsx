import { Navigate, useLocation } from 'react-router-dom';
import { hasAuthToken } from '@/utils/auth';

// 첫 진입(/)일 때 어디로 보낼지 결정
export default function EntryRoute() {
  const { pathname } = useLocation();

  // 이미 다른 경로로 들어온 경우엔 건드리지 않음 (안전장치)
  if (pathname !== '/') return null;

  // 로그인 상태면 홈
  if (hasAuthToken()) return <Navigate to='/home/main' replace />;

  // 비로그인이면 스플래시
  return <Navigate to='/splash' replace />;
}

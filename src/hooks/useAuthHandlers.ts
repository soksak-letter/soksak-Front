import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { postLogout, deleteWithdraw } from '@/api/auth'; //TODO: 회원탈퇴 API
export const useAuthHandlers = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // 1. 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await postLogout(); // 서버에 "나 간다" 알림
      console.log('로그아웃성공');
    } catch (error) {
      console.error('로그아웃 실패(토큰만료 등)');
    } finally {
      // 성공하든 실패하든 클라이언트는 무조건 로그아웃 처리
      logout();
      navigate('/splash', { replace: true });
    }
  };

  // 2. 회원탈퇴 핸들러
  const handleWithdraw = async () => {
    try {
      // 회원탈퇴 API 호출
      await deleteWithdraw();

      console.log('회원탈퇴 성공');

      // 탈퇴 후에도 로그아웃 처리와 동일하게 청소 필요
      logout();
      navigate('/splash', { replace: true });
    } catch (error) {
      console.error('회원탈퇴 실패');
    }
  };
  return { handleLogout, handleWithdraw };
};

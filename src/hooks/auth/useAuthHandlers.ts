import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { postLogout, deleteWithdraw } from '@/api/auth'; //TODO: 회원탈퇴 API
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useQueryClient } from '@tanstack/react-query';
export const useAuthHandlers = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { showToast } = useGlobalToast();
  const queryClient = useQueryClient(); // 2. 추가

  // 1. 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await postLogout(); // 서버에 "나 간다" 알림
    } catch (error) {
      showToast('로그아웃 실패했어요. 잠시 후 다시 요청해주세요.', 'error');
    } finally {
      queryClient.clear();
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
      queryClient.clear();

      // 탈퇴 후에도 로그아웃 처리와 동일하게 청소 필요
      logout();
      navigate('/splash', { replace: true });
    } catch (error) {
      showToast('회원 탈퇴에 실패했어요. 잠시 후 다시 요청해주세요.', 'error');
    }
  };
  return { handleLogout, handleWithdraw };
};

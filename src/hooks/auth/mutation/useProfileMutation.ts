import { useMutation } from '@tanstack/react-query';
import { patchNickname, postProfileImage } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useGlobalToast } from '@/components/toast/ToastProvider';

export const useProfileSetupMutation = () => {
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  return useMutation({
    mutationFn: async ({
      nickname,
      profileImage,
    }: {
      nickname: string;
      profileImage: File | null;
    }) => {
      // 1. 닉네임 변경 (필수)
      await patchNickname({ nickname });

      // 2. 프로필 이미지가 있다면 업로드 (선택)
      if (profileImage) {
        await postProfileImage(profileImage);
      }
    },
    onSuccess: () => {
      showToast('프로필 설정이 완료되었습니다!', 'success');
      navigate(ROUTES.onboarding.start);
    },
    onError: (error: any) => {
      console.error('프로필 설정 실패:', error);
      showToast(error.response?.data?.error?.reason || '설정 중 오류가 발생했습니다.', 'error');
    },
  });
};

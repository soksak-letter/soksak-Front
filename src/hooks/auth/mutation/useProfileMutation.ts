import { useMutation } from '@tanstack/react-query';
import { patchNickname, postProfileImage } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export const useProfileSetupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    // 닉네임과 이미지를 한 번에 받아서 순차적으로 실행
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
      navigate(ROUTES.onboarding.start);
    },
    onError: () => {
      console.error('프로필 설정 실패');
    },
  });
};

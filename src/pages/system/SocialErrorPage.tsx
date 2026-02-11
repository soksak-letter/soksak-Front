import { useLocation, useNavigate } from 'react-router-dom';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/routes/paths';

export default function SocialErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // state로 전달받은 구체적인 에러 메시지, 없으면 기본 메시지 노출
  const errorMessage = location.state?.message || '소셜 인증에 실패했습니다.';

  const handleRetry = () => {
    // 다시 로그인 시도를 위해 welcome 페이지로 이동
    navigate(ROUTES.auth.welcome, { replace: true });
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4'>
      {/* 네트워크 에러와 동일한 아이콘 사용으로 일관성 유지 */}
      <SadModalIcon className='mb-6 h-[87px] w-[82px]' />

      <div className='mb-8 text-center'>
        <p className='mb-4 ty-title2 text-[var(--color-text-strong)]'>로그인에 실패했습니다.</p>
        <p className='ty-body5 text-[var(--color-text-strong)]'>
          {errorMessage}
          <br />
          잠시 후 다시 시도해주시기 바랍니다.
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        {/* '다시 시도' 버튼: 웰컴 페이지로 이동하여 다시 소셜 버튼을 누를 수 있게 함 */}
        <Button color='white' size='cta150' onClick={handleRetry}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}

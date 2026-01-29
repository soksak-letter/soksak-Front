import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LoadingPage from '../system/LoadingPage';
import { socialLogin } from '@/api/auth';
import { useEffect, useRef } from 'react';

const SocialLoginCallBackPage = () => {
  const navigate = useNavigate();
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // React 18 StrictMode에서 useEffect가 두 번 실행되는 것 방지
  const isCalled = useRef(false);

  useEffect(() => {
    // 1. provider나 code가 없으면 바로 쫓아냄
    if (!provider || !code) {
      navigate('/auth/welcome');
      return;
    }

    // 2. 이미 실행된 적이 있다면 중단 (중복 호출 방지)
    if (isCalled.current) return;
    isCalled.current = true; // 실행됨 표시

    // 3. 로그인 함수 실행
    handleLogin(provider, code);
  }, [provider, code, navigate]);

  const handleLogin = async (provider: string, code: string) => {
    try {
      const data = await socialLogin(provider, code);
      if (data.resultType === 'SUCCESS') {
        // 토큰 저장 및 이동
        const { jwtAccessToken } = data.success.tokens;
        localStorage.setItem('accessToken', jwtAccessToken);
        navigate('/', { replace: true });
      } else {
        // 성공은 했지만 서버 응답이 FAIL인 경우 (예: 가입 안 된 유저 등)
        throw new Error('로그인 처리 실패');
      }
    } catch (error) {
      console.error('소셜 로그인 에러:', error);
      navigate('/auth/welcome', { replace: true });
    }
  };

  return (
    <div>
      <LoadingPage />
    </div>
  );
};
export default SocialLoginCallBackPage;

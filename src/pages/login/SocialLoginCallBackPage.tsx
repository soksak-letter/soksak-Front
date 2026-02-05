import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LoadingPage from '../system/LoadingPage';
import { type SocialProvider } from '@/api/auth';
import { useEffect } from 'react';
import { ROUTES } from '@/routes/paths';

import { useSocialLoginMutation } from '@/hooks/auth/mutation/useAuthMutation';

const SocialLoginCallBackPage = () => {
  const navigate = useNavigate();

  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // React 18 StrictMode에서 useEffect가 두 번 실행되는 것 방지

  // TanStack Query Mutation 도입
  const { mutate: socialLoginMutate, isPending } = useSocialLoginMutation();

  useEffect(() => {
    const validProviders: SocialProvider[] = ['google', 'kakao', 'naver'];
    const currentProvider = provider as SocialProvider;
    // 1. provider나 code가 없으면 바로 쫓아냄
    if (!provider || !code || !validProviders.includes(currentProvider)) {
      navigate(ROUTES.auth.welcome, { replace: true });
      return;
    }
    // 이미 요청 중이거나 성공했다면 실행 방지
    if (isPending) return;

    // [핵심] mutate는 기본적으로 한 번만 실행되도록 보장하기 쉬움
    // strict mode에서도 로직이 꼬이지 않도록 처리
    socialLoginMutate({ provider: currentProvider, code });
  }, [provider, code, navigate, socialLoginMutate]);
  return <LoadingPage />;
};
export default SocialLoginCallBackPage;

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingPage from '../system/LoadingPage';

const SocailLoginCallBackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code_id = searchParams.get('code_id');

  useEffect(() => {
    // 코드가 없으면 로그인 실패 처리 (누군가 URL을 직접 쳐서 들어온 경우 등)
    if (!code_id) {
      alert('잘못된 접근입니다.');
      navigate('/auth/welcome');
      return;
    }
  });
  return (
    <div>
      <LoadingPage />
    </div>
  );
};
export default SocailLoginCallBackPage;

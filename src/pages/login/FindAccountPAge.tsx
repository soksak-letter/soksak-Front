import BackHeader from '@/components/common/headers/BackHeader';
import PwFindPage from './PwFindPage';
import { useLocation, useNavigate } from 'react-router-dom';
import IdVerifyPage from './IdVerifyPage';
import IdFindPage from './IdFindPage';
import PwResetPAge from './PwResetPage';

const FindAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 'id-find'를 포함하면 아이디 찾기 모드, 아니면 비밀번호 찾기 모드
  const isIdTab = location.pathname.includes('id-find') || location.pathname.includes('id-verify');

  // 결과 페이지인지 확인
  const isVerifyPage = location.pathname.includes('id-verify');
  const isReset = location.pathname.includes('pw-reset');

  // 탭 클릭 핸들러 (클릭 시 URL 이동 -> 리렌더링 -> 탭 스타일 변경됨)
  const handleTabClick = (type: 'id' | 'pw') => {
    if (type === 'id') navigate('/auth/id-find');
    else navigate('/auth/pw-find');
  };

  return (
    <div className='w-[375px] h-screen bg-[#FAFAFA]! mx-auto flex flex-col'>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='아이디 및 비밀번호 찾기' />
      </div>

      {/* 탭 영역 */}
      <div className='flex w-full h-[48px] bg-white'>
        {/* 아이디 찾기 탭 */}
        <button
          onClick={() => handleTabClick('id')}
          className={`flex-1 text-[16px] font-medium transition-colors border-b-2 
            ${
              isIdTab
                ? 'text-[#F5544C] border-[#F5544C]' // 활성 상태 (빨강)
                : 'text-[#8C8C8C] border-transparent' // 비활성 상태 (회색)
            }`}
        >
          아이디 찾기
        </button>

        {/* 비밀번호 재설정 탭 */}
        <button
          onClick={() => handleTabClick('pw')}
          className={`flex-1 text-[16px] font-medium transition-colors border-b-2
            ${!isIdTab ? 'text-[#F5544C] border-[#F5544C]' : 'text-[#8C8C8C] border-transparent'}`}
        >
          비밀번호 재설정
        </button>
      </div>

      {/* 컨텐츠 영역 (조건부 렌더링) */}
      <div className='flex-1 px-4 py-6 bg-white'>
        {/* 1. 아이디 찾기 영역 (ID 탭일 때만 보임) */}
        <div className={isIdTab ? 'block h-full' : 'hidden'}>
          {/* 아이디 찾기 입력창 vs 결과창은 서로 대체되어도 되므로 조건부 렌더링 유지 */}
          {isVerifyPage ? <IdVerifyPage /> : <IdFindPage />}
        </div>

        {/* 2. 비밀번호 재설정 영역 (PW 탭일 때만 보임) */}
        <div className={!isIdTab ? 'block h-full' : 'hidden'}>
          {isReset ? <PwResetPAge /> : <PwFindPage />}
        </div>
      </div>
    </div>
  );
};
export default FindAccountPage;

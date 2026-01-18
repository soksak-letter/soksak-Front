import BackHeader from '@/components/common/headers/BackHeader';
import PwFindPage from './PwFindPage';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailFindPage from './IdFindPage';

const FindAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 'find-id'를 포함하면 아이디 찾기 모드, 아니면 비밀번호 찾기 모드
  const isIdTab = location.pathname.includes('id-find');

  // 탭 클릭 핸들러 (클릭 시 URL 이동 -> 리렌더링 -> 탭 스타일 변경됨)
  const handleTabClick = (type: 'id' | 'pw') => {
    if (type === 'id') navigate('/auth/id-find');
    else navigate('/auth/pw-find');
  };

  return (
    <div className='w-[375px] h-screen bg-[#FAFAFA]! mx-auto flex flex-col'>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        {/* 헤더 제목은 탭에 따라 바뀔 수도 있고 고정일 수도 있음 (사진상 '아이디 및 비밀번호 찾기' 고정) */}
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
        {/* 현재 탭에 따라 다른 컴포넌트를 보여줌 */}
        {isIdTab ? <EmailFindPage /> : <PwFindPage />}
      </div>
    </div>
  );
};
export default FindAccountPage;

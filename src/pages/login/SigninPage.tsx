import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  // 페이지 이동 핸들러
  const handleFindId = () => navigate('/auth/email-find'); // 아이디 찾기 페이지 경로
  const handleFindPw = () => navigate('/auth/pw-find'); // 비밀번호 찾기 페이지 경로
  const handleLogin = () => {
    // 로그인 로직 처리
    console.log('로그인 시도');
    navigate('/'); // 로그인 성공 시 메인으로 이동
  };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <BackHeader title='로그인' />
      <div className='mx-auto flex flex-col items-center justify-center gap-[16px] py-[16px]'>
        <input
          type='text'
          placeholder='아이디'
          className='w-[342px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
        />
        <input
          type='text'
          placeholder='비밀번호(영문,숫자 포함 최대 16자리)'
          className='w-[342px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
        />
        <Button onClick={handleLogin} className='w-[342px] h-[48px]'>
          로그인
        </Button>
        <div className='w-[342px] flex justify-end items-end gap-3 mb-10'>
          <button
            onClick={handleFindId}
            className='text-[13px] text-[#595959] hover:text-[#171717] font-medium'
          >
            아이디 찾기
          </button>
          {/* 세로 구분선 */}
          <div className='w-[1px] h-[12px] bg-[#E5E6E6]' />
          <button
            onClick={handleFindPw}
            className='text-[13px] text-[#595959] hover:text-[#171717] font-medium'
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;

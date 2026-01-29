import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Soksakletter from '@/assets/icons/Soksakletter.svg?react';
import Kakao from '@/assets/icons/Kakao.svg?react';

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[375px] bg-[#FAFAFA]! h-screen mx-auto flex flex-col items-center px-6 relative'>
      {/* 상단 로고 및 타이틀 영역 */}
      <div className='mt-24 flex flex-col items-center mb-10'>
        <h1 className='ty-largeTitle text-[var(--color-primary-500)] mb-3 tracking-tight'>
          속삭편지
        </h1>
        <p className='ty-body3'>나를 만나는 질문, 타인과 나누는 익명 편지</p>
      </div>

      {/* 중앙 로고 이미지 */}
      <div className='mb-[57px]'>
        <Soksakletter className='w-[155px],h-[129px]' />
      </div>

      {/* 메인 버튼 영역 (로그인 / 회원가입) */}
      <div className='w-full space-y-3 mb-10'>
        <button
          onClick={() => navigate('/auth/signin')}
          className='w-full h-[52px] bg-[var(--color-primary-500)] text-[var(--color-bg-primary)] text-ty-body3
        rounded-lg hover:bg-[#E4473F] transition-colors'
        >
          로그인
        </button>
        <button
          onClick={() => navigate('/auth/signup')}
          className='w-full h-[52px] bg-[var(--color-bg-primary)] border border-[var(--color-primary-400)] text-[#F5544C] text-ty-body3 rounded-lg hover:bg-red-50 transition-colors'
        >
          회원가입
        </button>
      </div>

      {/* 소셜 로그인 구분선 */}
      <div className='w-full flex items-center justify-between mb-6'>
        <div className='h-[1px] bg-[var(--color-text-assistive)] flex-1'></div>
        <span className='text-ty-detail text-[var(--color-text-assistive)] px-4'>
          SNS 계정으로 로그인
        </span>
        <div className='h-[1px] bg-[var(--color-text-assistive)] flex-1'></div>
      </div>

      {/* SNS 소셜 로그인 버튼들 */}
      <div className='flex justify-center gap-5 pb-10'>
        {/* 네이버 */}
        <button className='w-[46px] h-[46px] bg-[#03A94D] rounded-full flex justify-center items-center shadow-sm hover:opacity-90 transition-opacity'>
          <SiNaver className='text-[var(--color-bg-primary)]' />
        </button>

        {/* 카카오 */}
        <button className='w-[46px] h-[46px] bg-[#FEE500] rounded-full flex justify-center items-center shadow-sm hover:opacity-90 transition-opacity'>
          <Kakao />
        </button>

        {/* 구글 */}
        <button className='w-[46px] h-[46px] bg-[var(--color-bg-primary)] border border-gray-200 rounded-full flex justify-center items-center shadow-sm hover:bg-gray-50 transition-colors'>
          <FcGoogle className='w-[24px] h-[24px]' />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

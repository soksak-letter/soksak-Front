import { useNavigate } from 'react-router-dom';

export default function PasswordChangePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      {/* 헤더 */}
      <header
        className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-[21px] py-[13px]'
        style={{
          backgroundColor: '#FAFAFA',
          height: '50px',
          width: '375px',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className='absolute left-[21px] flex items-center justify-center'
          aria-label='뒤로가기'
          style={{
            width: '18px',
            height: '18px',
          }}
        >
          <svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
            <path
              d='M7.5 13.5L1.5 7.5L7.5 1.5'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* 제목 */}
        <h1
          className='text-center'
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '28.8px',
            color: '#000000',
          }}
        >
          비밀번호 변경
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[18px] pt-[44px] pb-24'>
        {/* 컨텐츠 추가 예정 */}
      </main>
    </div>
  );
}

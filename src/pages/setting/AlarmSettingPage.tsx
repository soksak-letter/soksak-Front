import { useNavigate } from 'react-router-dom';

export default function AlarmSettingPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      {/* 헤더 */}
      <header
        className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-[16px] py-[16px]'
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
          className='absolute left-[16px] flex items-center justify-center'
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
          알림
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[30px] pt-[26px]'>
        {/* 마케팅 정보 알림 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
            }}
          >
            마케팅 정보 알림
          </span>
          {/* 토글 버튼 (OFF 상태) - 추후 구현 */}
          <div
            style={{
              width: '48px',
              height: '24px',
              backgroundColor: '#B1B3B4',
              borderRadius: '18px',
            }}
          />
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            margin: '10px 0 13px 0',
          }}
        />

        {/* 편지 알림 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
            }}
          >
            편지 알림
          </span>
          {/* 토글 버튼 (ON 상태) - 추후 구현 */}
          <div
            style={{
              width: '48px',
              height: '24px',
              backgroundColor: '#FFC8C6',
              borderRadius: '18px',
            }}
          />
        </div>
      </main>
    </div>
  );
}

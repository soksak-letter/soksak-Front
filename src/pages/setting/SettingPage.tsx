import { useNavigate } from 'react-router-dom';

export default function SettingPage() {
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
            fontWeight: 400,
            fontSize: '16.41px',
            lineHeight: '20px',
            color: '#000000',
          }}
        >
          설정
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[18px] pt-[44px]'>
        {/* 계정·알림 섹션 */}
        <section className='mb-[50px]'>
          <h2
            className='mb-[23px]'
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
            }}
          >
            계정·알림
          </h2>
          <ul className='flex flex-col gap-[9px]'>
            <li>
              <button
                onClick={() => navigate('/setting/pw-reset')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                비밀번호 변경
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/setting/notification')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                알림
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/setting/consent')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                정보 동의 설정
              </button>
            </li>
          </ul>
        </section>

        {/* 서비스 정보·정책 섹션 */}
        <section className='mb-[50px]' style={{ marginTop: '53px' }}>
          <h2
            className='mb-[23px]'
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
            }}
          >
            서비스 정보 정책
          </h2>
          <ul className='flex flex-col gap-[9px]'>
            <li>
              <button
                onClick={() => navigate('/setting/notice')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                공지사항
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/setting/terms')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                서비스 이용약관
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/setting/privacy')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                개인정보 처리방침
              </button>
            </li>
          </ul>
        </section>

        {/* 계정 관리 섹션 */}
        <section className='mb-[50px]' style={{ marginTop: '137px' }}>
          <ul className='flex flex-col gap-[9px]'>
            <li>
              <button
                onClick={() => navigate('/setting/logout')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                로그아웃
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/setting/withdrawal')}
                className='w-full text-left py-[3px] ml-[3px]'
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#000000',
                }}
              >
                회원탈퇴
              </button>
            </li>
          </ul>
        </section>

        {/* 버전 정보 */}
        <section
          style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '276px' }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22.4px',
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            버전
          </span>
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22.4px',
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            v1.3
          </span>
        </section>
      </main>
    </div>
  );
}

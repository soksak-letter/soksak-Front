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
      <main className='mx-auto w-full max-w-[375px] px-[14px] pt-[33px] pb-24'>
        {/* 안내 문구 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '23.8px',
            color: '#171717',
            marginBottom: '16px',
          }}
        >
          새로운 비밀번호를 입력해주세요.
        </p>

        {/* 입력 필드 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* 비밀번호 입력 */}
          <input
            type='password'
            placeholder='비밀번호'
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E6E6',
              borderRadius: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              color: '#171717',
              outline: 'none',
            }}
            className='placeholder:text-[#8C8C8C]'
          />

          {/* 비밀번호 확인 입력 */}
          <input
            type='password'
            placeholder='비밀번호 확인'
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E6E6',
              borderRadius: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              color: '#171717',
              outline: 'none',
            }}
            className='placeholder:text-[#8C8C8C]'
          />
        </div>

        {/* 도움말 텍스트 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '19.2px',
            color: '#595959',
            marginTop: '10px',
          }}
        >
          비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
        </p>
      </main>

      {/* 하단 영역 (링크 + 버튼) */}
      <div
        className='fixed bottom-0 left-1/2 w-full max-w-[375px] px-[16px] pb-[34px]'
        style={{
          transform: 'translateX(-50%)',
          backgroundColor: '#FAFAFA',
        }}
      >
        {/* 비밀번호를 잊었어요 링크 */}
        <button
          type='button'
          onClick={() => {
            // TODO: 비밀번호 찾기 페이지로 이동
          }}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '23.8px',
            color: '#595959',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          비밀번호를 잊었어요
        </button>

        {/* 비밀번호 변경 버튼 */}
        <button
          type='button'
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: '#F5544C',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '25.6px',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

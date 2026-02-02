import { useNavigate } from 'react-router-dom';

export default function PersonalConsentPage() {
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
          정보 동의 설정
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[37px] pt-[36px]'>
        <p
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '23.8px',
            color: '#000000',
          }}
        >
          이번 주부터 오늘의 질문이 새롭게 개편되었습니다. 온보딩에서 선택해 주신 관심사와 최근 이용 패턴을 반영해, 조금 더 내 상황에 맞는 질문이 도착할 예정입니다. 질문이 너무 어렵게 느껴지거나, 받고 싶은 질문 톤이 있다면 의견을 남겨주세요. 앞으로도 계속 다듬어 나가겠습니다.
          <br />
          이번 주부터 오늘의 질문이 새롭게 개편되었습니다. 온보딩에서 선택해 주신 관심사와 최근 이용 패턴을 반영해, 조금 더 내 상황에 맞는 질문이 도착할 예정입니다. 질문이 너무 어렵게 느껴지거나, 받고 싶은 질문 톤이 있다면 의견을 남겨주세요. 앞으로도 계속 다듬어 나가겠습니다.
          <br />
          이번 주부터 오늘의 질문이 새롭게 개편되었습니다. 온보딩에서 선택해 주신 관심사와 최근 이용 패턴을 반영해, 조금 더 내 상황에 맞는 질문이 도착할 예정입니다. 질문이 너무 어렵게 느껴지거나, 받고 싶은 질문 톤이 있다면 의견을 남겨주세요. 앞으로도 계속 다듬어 나가겠습니다.
          <br />
          <br />
          이번 주부터 오늘의 질문이 새롭게 개편되었습니다. 온보딩에서 선택해 주신 관심사와 최근 이용 패턴을 반영해, 조금 더 내 상황에 맞는 질문이 도착할 예정입니다. 질문이 너무 어렵게 느껴지거나, 받고 싶은 질문 톤이 있다면 의견을 남겨주세요. 앞으로도 계속 다듬어 나가겠습니다.
        </p>
      </main>
    </div>
  );
}

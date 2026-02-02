
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';

export default function PersonalConsentPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='정보 동의 설정' onBack={handleBack} />
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

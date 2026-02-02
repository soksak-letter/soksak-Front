import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';

// 토글 버튼 컴포넌트
interface ToggleButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

function ToggleButton({ isOn, onToggle }: ToggleButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      style={{
        width: '48px',
        height: '24px',
        backgroundColor: isOn ? '#FFC8C6' : '#B1B3B4',
        borderRadius: '18px',
        padding: '3px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: isOn ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        transition: 'background-color 0.2s ease',
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: isOn ? '#F5544C' : '#FFFFFF',
          borderRadius: '50%',
          transition: 'background-color 0.2s ease',
        }}
      />
    </button>
  );
}

export default function AlarmSettingPage() {
  const navigate = useNavigate();
  const [marketingAlarm, setMarketingAlarm] = useState(false);
  const [letterAlarm, setLetterAlarm] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='알림' onBack={handleBack} />
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
          <ToggleButton isOn={marketingAlarm} onToggle={() => setMarketingAlarm(!marketingAlarm)} />
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
          <ToggleButton isOn={letterAlarm} onToggle={() => setLetterAlarm(!letterAlarm)} />
        </div>
      </main>
    </div>
  );
}

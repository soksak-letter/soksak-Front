import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';

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
          <ToggleSwitch
            checked={marketingAlarm}
            onCheckedChange={setMarketingAlarm}
            className='ml-2'
            aria-label='마케팅 정보 알림 토글'
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
          <ToggleSwitch
            checked={letterAlarm}
            onCheckedChange={setLetterAlarm}
            className='ml-2'
            aria-label='편지 도착 알림 토글'
          />
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import {
  HEADER_HEIGHT,
  PAGE_MAX_WIDTH,
  PAGE_PADDING_X,
  PAGE_PADDING_TOP,
} from '@/constants/settingLayout';
import { useMyNotificationSettings } from '@/hooks/onboarding/useMyNotificationSettings';
import { usePatchMyNotificationSettings } from '@/hooks/onboarding/usePatchMyNotificationSettings';

export default function AlarmSettingPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // GET /users/me/notification-settings
  const { data } = useMyNotificationSettings(true);

  // PATCH /users/me/notification-settings
  const patchSettings = usePatchMyNotificationSettings();

  // 서버값을 UI 토글에 반영
  const [marketingAlarm, setMarketingAlarm] = useState(false);
  const [letterAlarm, setLetterAlarm] = useState(true);

  useEffect(() => {
    if (!data) return;
    setMarketingAlarm(data.marketing);
    setLetterAlarm(data.letter);
  }, [data]);

  const handleToggleMarketing = (next: boolean) => {
    const prev = marketingAlarm;

    setMarketingAlarm(next); // UI 즉시 반영(낙관적)
    patchSettings.mutate(
      { marketing: next, letter: letterAlarm },
      {
        onError: () => {
          // 실패하면 롤백(최소 안전장치)
          setMarketingAlarm(prev);
        },
      },
    );
  };

  const handleToggleLetter = (next: boolean) => {
    const prev = letterAlarm;

    setLetterAlarm(next);

    patchSettings.mutate(
      { marketing: marketingAlarm, letter: next },
      {
        onError: () => {
          setLetterAlarm(prev);
        },
      },
    );
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='알림' onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: HEADER_HEIGHT }} />

      {/* 메인 컨텐츠 */}
      <main
        className='mx-auto w-full'
        style={{
          maxWidth: PAGE_MAX_WIDTH,
          paddingLeft: PAGE_PADDING_X,
          paddingRight: PAGE_PADDING_X,
          paddingTop: PAGE_PADDING_TOP,
        }}
      >
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
            onCheckedChange={handleToggleMarketing}
            className='ml-2'
            aria-label='마케팅 정보 알림 토글'
            disabled={patchSettings.isPending}
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
            onCheckedChange={handleToggleLetter}
            className='ml-2'
            aria-label='편지 도착 알림 토글'
            disabled={patchSettings.isPending}
          />
        </div>
      </main>
    </div>
  );
}

import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import { usePrivacyPolicy } from '@/hooks/setting/usePrivacyPolicy';

const contentStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#000000',
  whiteSpace: 'pre-wrap',
};

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePrivacyPolicy();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-white'>
      <SettingHeader title={data?.title ?? '개인정보 처리방침'} onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] pb-8'>
        <div style={{ marginTop: '8px' }} className='px-9'>
          {isLoading && <p style={contentStyle}>불러오는 중...</p>}
          {!data && isError && <p style={contentStyle}>개인정보 처리방침을 불러오지 못했습니다.</p>}
          {data && <p style={contentStyle}>{data.content}</p>}
        </div>
      </main>
    </div>
  );
}

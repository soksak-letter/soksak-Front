import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import { useCommunityGuideline } from '@/hooks/setting/useCommunityGuideline';

const contentStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#000000',
  whiteSpace: 'pre-wrap',
};

export default function CommunityGuidelinePage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCommunityGuideline();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-white'>
      <SettingHeader title={data?.title ?? '커뮤니티 가이드라인'} onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] pb-8'>
        <div style={{ marginTop: '8px' }} className='px-9'>
          {isLoading && <p style={contentStyle}>불러오는 중...</p>}
          {!data && isError && (
            <p style={contentStyle}>커뮤니티 가이드라인을 불러오지 못했습니다.</p>
          )}
          {data && <p style={contentStyle}>{data.content}</p>}
        </div>
      </main>
    </div>
  );
}

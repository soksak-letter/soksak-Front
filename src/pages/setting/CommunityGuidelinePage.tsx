import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';

const contentStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#000000',
  whiteSpace: 'pre-wrap',
};

const TEMP_GUIDELINE_CONTENT = `커뮤니티 가이드라인

속삭은 모든 사용자가 안전하고 편안하게 편지를 주고받을 수 있도록 다음의 커뮤니티 가이드라인을 운영합니다.

1. 상호 존중
- 다른 사용자를 존중하고 배려하는 언어를 사용해 주세요.
- 비방, 욕설, 혐오 표현은 금지됩니다.

2. 불법 콘텐츠 금지
- 불법적인 내용이나 유해한 정보를 공유하지 마세요.
- 타인의 개인정보를 무단으로 수집하거나 공유하지 마세요.

3. 스팸 및 광고 금지
- 상업적 광고나 스팸성 메시지를 보내지 마세요.
- 반복적인 동일 내용의 편지 전송은 제한될 수 있습니다.

4. 건전한 커뮤니티 유지
- 성적으로 부적절한 콘텐츠는 금지됩니다.
- 자해, 자살 관련 내용은 신고 대상입니다.

5. 신고 및 제재
- 가이드라인 위반 시 경고, 이용 제한, 계정 정지 등의 조치가 취해질 수 있습니다.
- 신고된 내용은 검토 후 적절한 조치가 이루어집니다.

속삭은 건강한 편지 문화를 만들어가기 위해 노력합니다.
문의사항이 있으시면 고객센터로 연락해 주세요.`;

export default function CommunityGuidelinePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-white'>
      <SettingHeader title='커뮤니티 가이드라인' onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] pb-8'>
        <div style={{ marginTop: '8px' }} className='px-9'>
          <p style={contentStyle}>{TEMP_GUIDELINE_CONTENT}</p>
        </div>
      </main>
    </div>
  );
}

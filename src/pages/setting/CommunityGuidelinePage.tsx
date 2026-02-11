import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import { useCommunityGuideline } from '@/hooks/setting/useCommunityGuideline';

const RULES = [
  { number: '01', text: '욕설 및 개인/집단에 대한 비하·모욕' },
  { number: '02', text: '영리 목적의 광고 및 스팸 홍보 내용' },
  { number: '03', text: '인종/성별/성적지향 등에 대한 혐오·차별' },
  { number: '04', text: '음란한 표현 및 성적 수치심을 주는 행위' },
  { number: '05', text: '무의미한 문자의 반복 및 지속적인 도배 행위' },
  { number: '06', text: '연락처, 주소 등 민감한 개인정보 노출' },
  { number: '07', text: '극단적 선택의 조장 및 묘사' },
  { number: '08', text: '타인 사칭 및 허위 사실 유포' },
  { number: '09', text: '폭력, 학대, 범죄 미화 및 타인 위협' },
  { number: '10', text: '도박, 마약 등 불법 행위 유도 및 거래' },
];

const cardStyle: CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)',
};

const sectionTitleStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '23.8px',
  color: '#F4544C',
};

const bodyTextStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#171717',
};

const ruleRowStyle: CSSProperties = {
  backgroundColor: '#F9F9F9',
  borderRadius: '8px',
  padding: '10px 16px',
};

const ruleNumberStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#000000',
};

const ruleTextStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#000000',
};

const loadingStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '19.2px',
  color: '#171717',
};

export default function CommunityGuidelinePage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCommunityGuideline();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-[#F9F9F9]'>
      <SettingHeader
        title={data?.title ?? '커뮤니티 가이드라인'}
        onBack={handleBack}
        bgColor='#F9F9F9'
      />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-4 pb-8'>
        {isLoading && (
          <p className='mt-[23px]' style={loadingStyle}>
            불러오는 중...
          </p>
        )}
        {!data && isError && (
          <p className='mt-[23px]' style={loadingStyle}>
            커뮤니티 가이드라인을 불러오지 못했습니다.
          </p>
        )}
        {data && (
          <div className='flex flex-col gap-4 pt-[23px]'>
            {/* 카드 1: 편지를 보낼 때 */}
            <div style={cardStyle}>
              <div className='flex flex-col gap-3'>
                <p style={sectionTitleStyle}>📮 편지를 보낼 때</p>
                <div className='flex flex-col gap-2'>
                  <p style={bodyTextStyle}>상대방에게 편지를 작성할 때 정중하게 작성해주세요.</p>
                  <p style={bodyTextStyle}>타인에게 위협이 되는 표현은 삼가주세요.</p>
                  <p style={bodyTextStyle}>친구가 되기 전까지는 서로의 익명성을 존중해주세요.</p>
                </div>
              </div>
            </div>

            {/* 카드 2: 편지를 받고 나서 */}
            <div style={cardStyle}>
              <div className='flex flex-col gap-3'>
                <p style={sectionTitleStyle}>📩 편지를 받고 나서</p>
                <div className='flex flex-col gap-2'>
                  <p style={bodyTextStyle}>도착한 편지에 비난보다는 공감의 시선을 보내주세요.</p>
                  <p style={bodyTextStyle}>답장을 할 때 상대방에 대한 예의를 담아주세요.</p>
                  <p style={bodyTextStyle}>
                    불쾌한 내용을 담은 편지를 받았다면 신고 기능을 활용해주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 카드 3: 깨끗한 커뮤니티를 위한 약속 */}
            <div style={cardStyle}>
              <div className='flex flex-col gap-3'>
                <div>
                  <p style={sectionTitleStyle}>🚫 깨끗한 커뮤니티를 위한 약속</p>
                  <div className='mt-2'>
                    <p style={bodyTextStyle}>
                      아래 항목은 신고 사유에 해당할 수 있으며, 타인을 위한 규칙입니다.
                    </p>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  {RULES.map((rule) => (
                    <div key={rule.number} style={ruleRowStyle}>
                      <div className='flex items-center gap-2'>
                        <span style={ruleNumberStyle}>{rule.number}</span>
                        <span style={ruleTextStyle}>{rule.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

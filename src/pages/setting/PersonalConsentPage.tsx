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
        <div className='flex flex-col gap-4 font-pretendard font-medium text-[14px] leading-[23.8px] text-black'>
          <p>
            속삭편지는 "개인정보 보호법"에 따라 동의를 얻어 아래와 같이 속삭편지 서비스의 홍보 및
            마케팅을 위한 개인정보를 수집·이용합니다.
          </p>
          <p>
            <strong>수집목적</strong>
            <br />
            이용자에 대한 편의 제공, 본 서비스에 대한 상품·서비스 안내 및 이용권유, 사은·판촉행사
            등의 마케팅 활동, 시장조사 및 상품·서비스 개발연구 등을 목적으로 수집·이용, 속삭편지에서
            운영하는 서비스의 원활한 이용 목적으로 수집·이용
          </p>
          <p>
            <strong>수집항목</strong>
            <br />
            성명, 성별, 휴대전화번호, 이메일, 직업, 프로필 사진
          </p>
          <p>
            <strong>보유기간</strong>
            <br />
            동의일로부터 회원 탈퇴 혹은 마케팅 동의 해제 시까지 보유·이용
          </p>
          <p>
            귀하는 개인정보 수집, 이용에 동의하지 않을 권리가 있으며, 동의를 거부할 경우에는 거부한
            내용 관련 서비스를 받을 수 없습니다.
          </p>
          <p>
            * 만약 사용자가 더 이상 홍보 및 마케팅 정보 수신을 원하지 않을 경우 [마이페이지&gt;1:1
            문의]로 요청하시면 본 동의를 철회할 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  );
}

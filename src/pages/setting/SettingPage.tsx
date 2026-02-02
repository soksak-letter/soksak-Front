import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import SettingHeader from '@/components/common/SettingHeader';

export default function SettingPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <div>
        <SettingHeader title='설정' onBack={handleBack} />
        {/* 헤더 높이만큼 여백 */}
        <div style={{ height: '50px' }} />

        {/* 메인 컨텐츠 */}
        <main className='mx-auto w-full max-w-[375px] px-[18px] pt-[44px] pb-24'>
          {/* 계정·알림 섹션 */}
          <section className='mb-[50px]'>
            <h2
              className='mb-[23px]'
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '25.6px',
                color: '#000000',
              }}
            >
              계정·알림
            </h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  onClick={() => navigate('/setting/pw-reset')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  비밀번호 변경
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/alarm')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  알림
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/personal-consent')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  정보 동의 설정
                </button>
              </li>
            </ul>
          </section>

          {/* 서비스 정보·정책 섹션 */}
          <section className='mb-[50px]' style={{ marginTop: '53px' }}>
            <h2
              className='mb-[23px]'
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '25.6px',
                color: '#000000',
              }}
            >
              서비스 정보 정책
            </h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  onClick={() => navigate('/setting/notice')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  공지사항
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/terms')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  서비스 이용약관
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/privacy')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  개인정보 처리방침
                </button>
              </li>
            </ul>
          </section>

          {/* 계정 관리 섹션 */}
          <section className='mb-[50px]' style={{ marginTop: '137px' }}>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  // TODO: 실제 로그아웃 처리 함수(onConfirmLogout) 연결 필요
                  onClick={() => openModal('logoutConfirm')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <button
                  // TODO: 실제 회원탈퇴 처리 함수(onConfirmWithdraw) 연결 필요
                  onClick={() => openModal('withdrawalConfirm')}
                  className='w-full text-left py-[3px] ml-[3px]'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    color: '#000000',
                  }}
                >
                  회원탈퇴
                </button>
              </li>
            </ul>
          </section>

          {/* 버전 정보 */}
          <section
            style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '276px' }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '22.4px',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              버전
            </span>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '22.4px',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              v1.3
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}

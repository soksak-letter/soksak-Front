import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import SettingHeader from '@/components/common/SettingHeader';
import pkg from '../../../package.json';
import { useAuthHandlers } from '@/hooks/auth/useAuthHandlers';

const sectionTitle =
  'font-pretendard font-semibold text-[16px] leading-[25.6px] text-black mb-[23px]';
const menuButton =
  'w-full text-left font-pretendard font-medium text-[16px] leading-[25.6px] text-black py-[3px] ml-[3px]';

export default function SettingPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { handleLogout, handleWithdraw } = useAuthHandlers();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-dvh bg-[#FAFAFA]!'>
      <div>
        <SettingHeader title='설정' onBack={handleBack} />
        {/* 헤더 높이만큼 여백 */}
        <div className='h-[50px]' />

        {/* 메인 컨텐츠 */}
        <main className='mx-auto w-full max-w-[375px] px-[18px] pt-[44px] pb-[calc(101px+env(safe-area-inset-bottom,0px))]'>
          {/* 계정·알림 섹션 */}
          <section className='mb-[50px]'>
            <h2 className={sectionTitle}>계정·알림</h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button onClick={() => navigate('/setting/pw-reset')} className={menuButton}>
                  비밀번호 변경
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/setting/alarm')} className={menuButton}>
                  알림
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/personal-consent')}
                  className={menuButton}
                >
                  정보 동의 설정
                </button>
              </li>
            </ul>
          </section>

          {/* 서비스 정보·정책 섹션 */}
          <section className='mb-[50px] mt-[53px]'>
            <h2 className={sectionTitle}>서비스 정보 정책</h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button onClick={() => navigate('/setting/notice')} className={menuButton}>
                  공지사항
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/setting/terms')} className={menuButton}>
                  서비스 이용약관
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/setting/privacy')} className={menuButton}>
                  개인정보 처리방침
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/setting/guideline')} className={menuButton}>
                  커뮤니티 가이드라인
                </button>
              </li>
            </ul>
          </section>

          {/* 계정 관리 섹션 */}
          <section className='mb-[50px] mt-[137px]'>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  onClick={() => openModal('logoutConfirm', { onConfirmLogout: handleLogout })}
                  className={menuButton}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openModal('withdrawalConfirm', { onConfirmWithdraw: handleWithdraw })
                  }
                  className={menuButton}
                >
                  회원탈퇴
                </button>
              </li>
            </ul>
          </section>

          {/* 버전 정보 */}
          <section className='mt-12 flex flex-row items-center justify-between w-full max-w-[375px] px-2'>
            <span className='font-pretendard font-medium text-[14px] leading-[22.4px] text-black/60 min-w-[40px]'>
              버전
            </span>
            <span className='font-pretendard font-medium text-[14px] leading-[22.4px] text-black/60 text-right truncate max-w-[120px]'>
              v{pkg.version}
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}

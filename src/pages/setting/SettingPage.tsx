import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import SettingHeader from '@/components/common/SettingHeader';
import pkg from '../../../package.json';
import {
  HEADER_HEIGHT,
  PAGE_MAX_WIDTH,
  PAGE_PADDING_X,
  PAGE_PADDING_TOP,
  SECTION_MARGIN_BOTTOM,
  SECTION_TITLE_MARGIN_BOTTOM,
  BUTTON_MARGIN_LEFT,
  BUTTON_PADDING_Y,
  BUTTON_LINE_HEIGHT,
  TAB_BAR_HEIGHT,
  SECTION_SPACING_MEDIUM,
  SECTION_SPACING_LARGE,
} from '@/constants/settingLayout';
import { useAuthHandlers } from '@/hooks/auth/useAuthHandlers';

export default function SettingPage() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { handleLogout, handleWithdraw } = useAuthHandlers();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <div>
        <SettingHeader title='설정' onBack={handleBack} />
        {/* 헤더 높이만큼 여백 */}
        <div style={{ height: HEADER_HEIGHT }} />

        {/* 메인 컨텐츠 */}
        <main
          className={`mx-auto w-full`}
          style={{
            maxWidth: PAGE_MAX_WIDTH,
            paddingLeft: PAGE_PADDING_X,
            paddingRight: PAGE_PADDING_X,
            paddingTop: PAGE_PADDING_TOP,
            paddingBottom: `calc(${TAB_BAR_HEIGHT}px + 16px + env(safe-area-inset-bottom, 0px))`,
          }}
        >
          {/* 계정·알림 섹션 */}
          <section style={{ marginBottom: SECTION_MARGIN_BOTTOM }}>
            <h2
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                color: '#000000',
                marginBottom: SECTION_TITLE_MARGIN_BOTTOM,
              }}
            >
              계정·알림
            </h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  onClick={() => navigate('/setting/pw-reset')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  비밀번호 변경
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/alarm')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  알림
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/personal-consent')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  정보 동의 설정
                </button>
              </li>
            </ul>
          </section>

          {/* 서비스 정보·정책 섹션 */}
          <section
            style={{ marginBottom: SECTION_MARGIN_BOTTOM, marginTop: SECTION_SPACING_MEDIUM }}
          >
            <h2
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                color: '#000000',
                marginBottom: SECTION_TITLE_MARGIN_BOTTOM,
              }}
            >
              서비스 정보 정책
            </h2>
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  onClick={() => navigate('/setting/notice')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  공지사항
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/terms')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  서비스 이용약관
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/setting/privacy')}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  개인정보 처리방침
                </button>
              </li>
            </ul>
          </section>

          {/* 계정 관리 섹션 */}
          <section
            style={{ marginBottom: SECTION_MARGIN_BOTTOM, marginTop: SECTION_SPACING_LARGE }}
          >
            <ul className='flex flex-col gap-[9px]'>
              <li>
                <button
                  // TODO: 실제 로그아웃 처리 함수(onConfirmLogout) 연결 필요
                  onClick={() => openModal('logoutConfirm', { onConfirmLogout: handleLogout })}
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <button
                  // TODO: 실제 회원탈퇴 처리 함수(onConfirmWithdraw) 연결 필요
                  onClick={() =>
                    openModal('withdrawalConfirm', { onConfirmWithdraw: handleWithdraw })
                  }
                  className='w-full text-left'
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: `${BUTTON_LINE_HEIGHT}px`,
                    color: '#000000',
                    paddingTop: BUTTON_PADDING_Y,
                    paddingBottom: BUTTON_PADDING_Y,
                    marginLeft: BUTTON_MARGIN_LEFT,
                  }}
                >
                  회원탈퇴
                </button>
              </li>
            </ul>
          </section>

          {/* 버전 정보 */}
          <section
            className='mt-12 flex flex-row items-center justify-between w-full'
            style={{ maxWidth: PAGE_MAX_WIDTH, paddingLeft: 8, paddingRight: 8 }}
          >
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

import { Button } from '@/components/common/Button';
import Toast from '@/components/common/Toast';
import useFindAccount from '@/hooks/useFindAccount';
import { useNavigate } from 'react-router-dom';

const PwFindPage = () => {
  const navigate = useNavigate();
  const {
    email,
    authCode,
    validation,
    apiStatus,
    serverMessage,
    isAuthVerified,
    showToast, // 토스트 보임 여부
    closeToast, // 토스트 닫기 함수
    formattedTime,
    handleEmailChange,
    handleAuthCodeChange,
    handleAuthRequest,
    handleVerifyCode,
    isFormatValid,
  } = useFindAccount('pw');

  // 버튼 비활성화 조건
  // 1. 이메일 형식이 틀림
  // 2. 로딩 중
  const isButtonDisabled = !isFormatValid || apiStatus === 'loading';
  // 메시지 표시 로직
  // 1. API 에러가 있으면 API 에러 메시지 (빨강)
  // 2. API 성공이면 성공 메시지 (초록/파랑)
  // 3. API 상태가 idle이면 형식 검사 에러 메시지 (빨강) - 필요시에만 노출
  // 메시지 렌더링 (이메일 입력창 하단)

  const renderMessage = () => {
    if (isAuthVerified) return <p className='text-[#3DC061] text-sm mt-1'>인증되었습니다.</p>;
    if (apiStatus === 'error')
      return <p className='text-[#F33326] text-sm mt-1'>{serverMessage}</p>;
    if (apiStatus === 'success')
      return <p className='text-[#3DC061] text-sm mt-1'>인증번호가 발송되었습니다.</p>;
    if (email.length > 0 && !validation.success)
      return <p className='text-[#F33326] text-sm mt-1'>{validation.message}</p>;
    return null;
  };
  return (
    <div className='flex flex-col h-full'>
      {/* 설명 텍스트 */}
      <div className='mb-6'>
        <p className='ty-body2'>비밀번호 재설정을 위해 본인 인증이 필요해요.</p>
        <p className='ty-body4'>이메일로 전송받은 인증번호를 확인해주세요.</p>
      </div>

      {/* 이메일 입력 & 인증 요청 버튼 */}
      <div className='flex gap-2 mb-4'>
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='이메일'
          className={`w-[240px] h-[48px] bg-[var(--color-bg-primary)] 
              px-4 border-[1px] rounded-lg border-[var(--color-grey-100)]
              outline-none focus:border-[var(--color-secondary-800)] 
              ${
                // 1. 성공 (그린): 존재하는 이메일일 때
                apiStatus === 'success'
                  ? 'border-[var(--color-status-positive)] focus:border-[var(--color-status-positive)]'
                  : // 2. 에러 (레드): API 오류 또는 형식 틀림
                    apiStatus === 'error' || (email.length > 0 && !validation.success)
                    ? 'border-[var(--color-status-alert)]'
                    : // 3. 입력값 있음 (블루): 입력 중이거나, 입력 후 포커스 떼도 유지
                      email.length > 0
                      ? 'border-[var(--color-secondary-800)] focus:border-[var(--color-secondary-800)]'
                      : // 4. 기본 (회색): 빈 칸일 때 (포커스 시엔 블루)
                        'border-[var(--color-grey-100)] focus:border-[var(--color-secondary-800)]'
              }`}
        />
        <Button
          size='small'
          color={!isButtonDisabled ? 'black' : 'grey'}
          onClick={handleAuthRequest}
          // 인증 완료되었거나, 형식 틀렸거나, 로딩중이면 클릭 불가
          disabled={isButtonDisabled}
          className={` transition-colors`}
        >
          {/* 상태에 따라 버튼 텍스트 변경: 요청중 / 다시 요청 / 인증 요청 */}
          {apiStatus === 'loading' ? '요청중' : apiStatus === 'success' ? '다시 요청' : '인증 요청'}
        </Button>
      </div>
      {/* 이메일 관련 메시지 (성공/에러) */}
      <div className='mb-4'>{renderMessage()}</div>

      {/* 2. 인증번호 입력 영역 (이메일 발송 성공 시에만 노출) */}
      {apiStatus === 'success' && (
        <div className='flex-col'>
          <div className='flex gap-2 mb-4'>
            <div className='relative flex-1'>
              <input
                type='text'
                value={authCode}
                onChange={handleAuthCodeChange}
                placeholder='인증번호 6자리 입력'
                className={`w-full h-[48px] px-4 rounded-lg outline-none border-[1px] border-[var(--color-grey-100)] focus:border-[var(--color-secondary-800)] ${
                  !isAuthVerified
                    ? 'border-[var(--color-grey-100)]'
                    : 'border-[var(--color-status-positive)]'
                }`}
              />
              {/* 타이머 (인풋창 내부 우측) */}
              {!isAuthVerified && (
                <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F5544C] text-[14px] font-medium'>
                  {formattedTime}
                </span>
              )}
            </div>

            <Button
              size='small'
              color='black'
              onClick={handleVerifyCode}
              disabled={authCode.length < 6}
              className={`
              ${authCode.length === 6 ? 'bg-[#9CA3AF] text-white' : 'bg-[#E5E6E6] text-[#8C8C8C]'}
            `}
            >
              확인
            </Button>
          </div>
          <p className='text-[#3DC061] text-sm mt-1 '>{isAuthVerified ? '인증되었습니다' : ''}</p>
        </div>
      )}

      {/* [수정] Toast 컴포넌트 사용 */}
      <Toast isVisible={showToast} message='인증되었습니다.' onClose={closeToast} />

      {/* 하단 아이디 찾기 버튼 */}
      <div className='mt-[30px] px-[5px]'>
        {/* 여백은 상황에 맞게 조절하세요 */}
        <Button
          // 인증이 완료되어야만 활성화
          disabled={!isAuthVerified}
          color={!isAuthVerified ? 'grey' : 'primary'}
          onClick={() => {
            // 비밀번호 재설정은 인증 성공 시 '새 비밀번호 입력 페이지'로 이동해야 함
            if (isAuthVerified) {
              navigate('/auth/reset-password-input');
            }
          }}
        >
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
};
export default PwFindPage;

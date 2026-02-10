import { Button } from '@/components/common/Button';
import ToastPopup from '@/components/ToastPopup';
import useFindAccount from '@/hooks/auth/useFindAccount';
import { useState } from 'react';

const IdFindPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    email,
    authCode,
    validation,
    apiStatus,
    serverMessage,
    isAuthVerified,
    toastState, // { message, status } 또는 null
    toastVisible, // boolean
    closeToast, // 토스트 닫기 함수
    formattedTime,
    handleEmailChange,
    handleAuthCodeChange,
    handleAuthRequest,
    handleVerifyCode,
    isFormatValid,
    handleComplete,
  } = useFindAccount('id');
  // 버튼 비활성화 조건
  // 1. 이메일 형식이 틀림
  // 2. 로딩 중
  const isButtonDisabled = !isFormatValid || apiStatus === 'pending';
  // 메시지 표시 로직
  // 1. API 에러가 있으면 API 에러 메시지 (빨강)
  // 2. API 성공이면 성공 메시지 (초록/파랑)
  // 3. API 상태가 idle이면 형식 검사 에러 메시지 (빨강) - 필요시에만 노출
  // 메시지 렌더링 (이메일 입력창 하단)
  const renderMessage = () => {
    if (isAuthVerified)
      return <p className='text-[var(--color-status-positive)] ty-detail mt-1'>인증되었습니다.</p>;
    if (apiStatus === 'error')
      return <p className='text-[var(--color-status-alert)] ty-detail mt-1'>{serverMessage}</p>;
    if (apiStatus === 'success')
      return (
        <p className='ty-detail text-[var(--color-status-positive)] mt-1'>
          인증번호가 발송되었습니다.
        </p>
      );
    if (email.length > 0 && !validation.success && !isFocused)
      return (
        <p className='ty-detail text-[var(--color-status-alert)] mt-1'>{validation.message}</p>
      );
    return null;
  };
  return (
    <div className='relative flex flex-col h-full'>
      {/* 설명 텍스트 */}
      <div className='mb-[16px]'>
        <p className='ty-body2'>속삭편지에 등록된 아이디를 찾아요.</p>
        <p className='ty-body5'>이메일로 전송받은 인증번호를 확인해주세요.</p>
      </div>

      <div className='flex flex-col h-[180px] gap-[8px]'>
        {/* 이메일 입력 & 인증 요청 버튼 */}
        <div className='flex flex-col gap-[4px]'>
          <div className='flex flex-row gap-[8px]'>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder='이메일'
              className={`w-[240px] h-[48px] bg-[var(--color-bg-primary)] 
              px-4 border-[1px] rounded-lg border-[var(--color-grey-100)]
              outline-none  
              ${email ? 'ty-body5' : 'ty-detailMedium'}
              ${
                // 1. 성공 (그린): 존재하는 이메일일 때
                apiStatus === 'success'
                  ? 'border-[var(--color-status-positive)] focus:border-[var(--color-status-positive)]'
                  : // 2. 에러 (레드): API 오류 또는 형식 틀림
                    apiStatus === 'error' || (email.length > 0 && !validation.success && !isFocused)
                    ? 'border-[var(--color-status-alert)]'
                    : // 3. 입력값 있음 (블랙): 입력 중이거나, 입력 후 포커스 떼도 유지
                      email.length > 0
                      ? 'border-[var(--color-secondary-800)] focus:border-[var(--color-grey-800)]'
                      : // 4. 기본 (회색): 빈 칸일 때 (포커스 시엔 블랙)
                        'border-[var(--color-grey-100)] focus:border-[var(--color-grey-800)]'
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
              {apiStatus === 'pending'
                ? '요청중'
                : apiStatus === 'success'
                  ? '다시 요청'
                  : '인증 요청'}
            </Button>
          </div>
          {/* 이메일 관련 메시지 (성공/에러) */}
          <div>{renderMessage()}</div>
        </div>

        {/* 2. 인증번호 입력 영역 (이메일 발송 성공 시에만 노출) */}
        {apiStatus === 'success' && (
          <div className='flex flex-col gap-[4px]'>
            <div className='flex gap-2'>
              <div className='relative flex-1'>
                <input
                  type='text'
                  value={authCode}
                  onChange={handleAuthCodeChange}
                  placeholder='인증번호 6자리 입력'
                  className={`w-full h-[48px] px-4 rounded-lg outline-none border-[1px] border-[var(--color-grey-100)] focus:border-[var(--color-grey-800)] 
                    ${authCode ? 'ty-body5' : 'ty-detailMedium'}
                    ${
                      !isAuthVerified
                        ? 'border-[var(--color-grey-100)]'
                        : 'border-[var(--color-status-positive)]'
                    }`}
                />
                {/* 타이머 (인풋창 내부 우측) */}
                {!isAuthVerified && (
                  <span className='absolute right-4 top-1/2 transform -translate-y-1/2 ty-body5 text-[var(--color-status-alert)] '>
                    {formattedTime}
                  </span>
                )}
              </div>

              <Button
                size='small'
                color={authCode.length === 6 ? 'black' : 'grey'}
                onClick={handleVerifyCode}
                disabled={authCode.length < 6}
              >
                확인
              </Button>
            </div>
            <p className='text-[var(--color-status-positive)] ty-detail '>
              {isAuthVerified ? '인증되었습니다' : ''}
            </p>
          </div>
        )}
      </div>

      {toastState && (
        <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
          <ToastPopup
            status={toastState.status} // 'success' | 'error'
            message={toastState.message} // 메세지 텍스트
            visible={toastVisible} // 애니메이션용 visibility
            onClose={closeToast} // 강제 닫기 (클릭 시)
          />
        </div>
      )}
      {/* 하단 아이디 찾기 버튼 */}
      <div className='flex w-full px-[5px] justify-center'>
        {/* 여백은 상황에 맞게 조절하세요 */}
        <Button
          // 인증이 완료되어야만 활성화
          disabled={!isAuthVerified}
          color={!isAuthVerified ? 'grey' : 'primary'}
          onClick={handleComplete}
        >
          아이디 찾기
        </Button>
      </div>
    </div>
  );
};
export default IdFindPage;

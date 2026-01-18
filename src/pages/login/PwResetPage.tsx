import { Button } from '@/components/common/Button';
import { removeWhitespace } from '@/utils/inputUtils';
import { validate } from '@/utils/validate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PwResetPAge = () => {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 유효성 검사 결과 상태
  const [pwValidation, setPwValidation] = useState({ success: false, message: '' });
  const [confirmValidation, setConfirmValidation] = useState({ success: false, message: '' });

  // 2. 핸들러: 비밀번호 입력
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = removeWhitespace(e.target.value);
    setPassword(cleanValue);

    // 비밀번호 유효성 검사 실행
    setPwValidation(validate.password(cleanValue));

    // 비밀번호를 바꾸면, 확인창 검사도 다시 해야 함 (일치 여부가 달라질 수 있으므로)
    if (passwordConfirm.length > 0) {
      setConfirmValidation(validate.passwordConfirm(cleanValue, passwordConfirm));
    }
  };

  // 3. 핸들러: 비밀번호 확인 입력
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = removeWhitespace(e.target.value);
    setPasswordConfirm(cleanValue);

    // 일치 여부 검사 실행
    setConfirmValidation(validate.passwordConfirm(password, cleanValue));
  };

  // 4. 최종 제출 (재설정 버튼 클릭)
  const handleSubmit = async () => {
    // API 호출 로직 (Mock)
    console.log('비밀번호 재설정 요청:', password);
    navigate('/auth/signin'); // 로그인 페이지로 이동
  };

  // 버튼 활성화 조건: 둘 다 유효성 검사 통과 시
  const isFormValid = pwValidation.success && confirmValidation.success;

  // 5. 테두리 색상 결정 함수 (기존 로직 활용)
  // 조건: 에러(빨강) -> 입력중(파랑) -> 성공(초록) -> 기본(회색)
  const getBorderClass = (val: string, isValid: boolean, isError: boolean) => {
    if (isError) return 'border-[#F33326] focus:border-[#F33326]'; // 에러 (빨강)
    if (isValid) return 'border-[#3DC061] focus:border-[#3DC061]'; // 성공 (초록)
    if (val.length > 0) return 'border-[#007AFF] focus:border-[#007AFF]'; // 입력 중 (파랑)
    return 'border-[var(--color-grey-100)] focus:border-[#007AFF]'; // 기본 (회색 -> 포커스 파랑)
  };
  return (
    <div className='relative flex flex-col h-full'>
      {/* 설명 텍스트 */}
      <div className='mb-[16px]'>
        <p className='ty-body2'>비밀번호 재설정하기</p>
        <p className='ty-body4'>새로운 비밀번호를 입력해주세요.</p>
      </div>

      {/* 이메일 입력 & 인증 요청 버튼 */}
      <div className='flex flex-col gap-[8px]'>
        {/* 1. 비밀번호 입력 */}
        <div className='flex flex-col gap-[8px]'>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='비밀번호'
            className={`w-full h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg outline-none 
              ${getBorderClass(password, pwValidation.success, password.length > 0 && !pwValidation.success)}`}
          />
          {/* 하단 메시지 (에러가 있으면 에러 메시지, 없으면 기본 가이드) */}
          {password.length > 0 && !pwValidation.success ? (
            <p className='text-[#F33326] text-[13px]'>{pwValidation.message}</p>
          ) : (
            <p className='text-[var(--color-text-assistive)] ty-detail'>
              비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
            </p>
          )}
        </div>
        {/* 2. 비밀번호 확인 입력 */}
        <div className='flex flex-col gap-[8px]'>
          <input
            type='password'
            value={passwordConfirm}
            onChange={handleConfirmChange}
            placeholder='비밀번호 확인'
            className={`w-full h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg outline-none 
              ${getBorderClass(passwordConfirm, confirmValidation.success, passwordConfirm.length > 0 && !confirmValidation.success)}`}
          />
          {/* 하단 메시지 */}
          {passwordConfirm.length > 0 && !confirmValidation.success ? (
            <p className='text-[#F33326] text-[13px]'>{confirmValidation.message}</p>
          ) : (
            <p className='text-[var(--color-text-assistive)] ty-detail'>
              비밀번호를 다시 입력해주세요.
            </p>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className='absolute bottom-[337px] left-0 right-0 px-[5px]'>
        <Button
          disabled={!isFormValid}
          color={!isFormValid ? 'grey' : 'primary'}
          onClick={handleSubmit}
          className='w-full'
        >
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
};
export default PwResetPAge;

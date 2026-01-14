import { Button } from '@/components/common/Button';
import ToastCheck from '@/assets/icons/ToastCheck.svg?react';
import CheckBlank from '@/assets/icons/CheckBlank.svg?react';
import BackHeader from '@/components/common/headers/BackHeader';
import { useNavigate } from 'react-router-dom';
import useTermsAgree from '@/hooks/useTermsAgree';
import TermItem from '@/components/TermItem';
import { blockSpaceKey, getBorderColor, getMessageColor } from '@/utils/inputUtils';
import useSignUpForm from '@/hooks/useSignUpForm';

// Todo:
// 1.이메일 중복시 처리

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    form, // 입력 데이터
    validations, // 에러 메시지
    isEmailUnique, // 이메일 중복 확인 상태
    focusedField,
    handleUsernameChange, // 추가됨
    handleUsernameBlur,
    handleFocus, //focus
    handleBlur,
    handleNoSpaceChange, // 공통 입력 핸들러
    handleEmailChange, // 이메일 입력 핸들러
    handleCheckEmailDuplicate, // 이메일 중복체크 함수
    canSubmitWithoutTerms, //제풀가능려부
  } = useSignUpForm();

  // 전체동의 관리하는 커스텀 훅
  const {
    agreements,
    isAllChecked,
    isFormValid: isTermsAgreed, // 약관 동의 여부
    handleCheck,
    handleAllCheck,
  } = useTermsAgree();

  // 최종 제출 버튼 활성화 조건
  const canSubmit = canSubmitWithoutTerms && isTermsAgreed;

  const handleProfile = () => {
    // 훅에서 계산된 유효성 검사 결과
    if (!canSubmit) return;

    console.log('회원가입 약관 동의 완료');
    navigate('/auth/profile-setup');
  };

  // [추가] 이메일 전용 테두리 색상 계산 함수 (컴포넌트 내부)
  const getEmailBorderColor = () => {
    if (!form.email) return 'border-[var(--color-grey-100)]'; // 빈값: 회색
    if (!validations.email.success) return 'border-[#F33326]'; // 정규식 에러 or 중복 에러: 빨강
    if (isEmailUnique) return 'border-[#3DC061]'; // 중복확인 완료: 초록
    return 'border-[var(--color-secondary-800)]'; // 정규식은 맞지만 확인 안 함: 회색
  };
  const getEmailMessageColor = () => {
    if (!form.email) return 'text-transparent';
    if (!validations.email.success) return 'text-[#F33326]';
    if (isEmailUnique) return 'text-[#3DC061]';
    return 'text-[var(--color-secondary-800)]'; // 확인 안 함: 파란색(안내) or 회색
  };

  return (
    <div className='w-[375px] h-auto bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='회원가입' />
      </div>
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
        <p className='ty-title3 w-[343px] h-[29px]'>기본정보</p>
        {/* 이메일 */}
        <p className='ty-body4 w-[343px] h-[24px]'>이메일</p>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-[8px] w-[343px] '>
            <input
              type='email'
              value={form.email}
              onChange={handleEmailChange}
              onFocus={handleFocus('email')}
              onBlur={handleBlur}
              placeholder='이메일'
              className={`w-[240px] h-[48px] bg-[var(--color-bg-primary)] 
              px-4 border-[1px]  rounded-lg 
              outline-none focus:border-[var(--color-secondary-800)] ${getEmailBorderColor()}`}
            />
            <Button
              color='grey'
              size='small'
              className={`w-[80px] h-[48px] ${isEmailUnique ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={handleCheckEmailDuplicate}
              // [핵심 변경] 중복확인 완료됐거나, 빈값이거나, 형식이 틀리면 버튼 비활성화
              disabled={isEmailUnique || !form.email || !validations.email.success}
            >
              중복확인
            </Button>
          </div>
          {/* 에러가 있으면 에러 메시지, 에러가 없고 값이 있으면 성공 메시지 출력 */}
          {/* 메시지 영역 */}
          <p
            className={`px-[3px] mt-1 ty-detail 
            ${focusedField === 'email' ? 'text-[var(--color-text-assistive)]' : getEmailMessageColor()}`}
          >
            {focusedField === 'email'
              ? ''
              : !validations.email.success
                ? validations.email.message //"사용할 수 없는 이메일입니다"
                : isEmailUnique
                  ? validations.email.message // "사용할 수 있는 이메일입니다."
                  : ''}
          </p>
        </div>

        {/* 2. 아이디 */}
        <p className='ty-body4 w-[343px] h-[24px]'>아이디</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            value={form.username}
            // 커링 함수 사용: 함수를 실행해서 반환된 핸들러를 onChange에 전달
            onChange={handleUsernameChange(16)}
            onKeyDown={blockSpaceKey}
            onFocus={handleFocus('username')}
            onBlur={handleUsernameBlur}
            placeholder='아이디'
            className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] 
              px-4 border-[1px] rounded-lg outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.username.success, form.username)}`}
          />
          <p
            className={`px-[3px] ty-detail ${
              focusedField === 'username'
                ? 'text-[var(--color-text-assistive)]'
                : getMessageColor(validations.username.success, form.username)
            }`}
          >
            {/* 포커스 중엔 안내 문구, 아니면 validate.ts에서 온 메시지 그대로 출력 */}
            {focusedField === 'username'
              ? '영문과 숫자만 사용 가능합니다.'
              : form.username
                ? validations.username.message
                : ''}
          </p>
        </div>
        {/* 비밀번호 */}
        <p className='ty-body4 w-[343px] h-[24px]'>비밀번호</p>
        <div>
          {/* 비밀번호 입력 */}
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='text'
              value={form.password}
              onChange={handleNoSpaceChange('password', 16)}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('password')}
              onBlur={handleBlur}
              placeholder='비밀번호'
              className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg 
                focus:border-[var(--color-secondary-800)] outline-none ${getBorderColor(validations.password.success, form.password)}`}
            />
            <p
              className={`px-[3px]  ty-detail 
              ${focusedField === 'password' ? 'text-[#3B82F6]' : getMessageColor(validations.password.success, form.password)}`}
            >
              {focusedField === 'password'
                ? '비밀번호는 영문, 숫자를 포함하여 8~16자리까지 입력 가능합니다.'
                : form.password
                  ? validations.password.message
                  : '비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.'}
            </p>
          </div>
          {/* 비밀번호 확인 */}
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='password'
              value={form.passwordConfirm}
              onChange={handleNoSpaceChange('passwordConfirm', 16)}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('passwordConfirm')}
              onBlur={handleBlur}
              placeholder='비밀번호 확인'
              className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] 
                rounded-lg outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.passwordConfirm.success, form.passwordConfirm)}`}
            />
            {/* [수정] 안내 문구 하나로 통합 */}
            <p
              className={`px-[3px] ty-detail 
              ${focusedField === 'passwordConfirm' ? 'text-[var(--color-text-assistive)]' : getMessageColor(validations.passwordConfirm.success, form.passwordConfirm)}`}
            >
              {focusedField === 'passwordConfirm'
                ? '비밀번호를 다시 입력해주세요.'
                : form.passwordConfirm
                  ? validations.passwordConfirm.message
                  : '비밀번호를 다시 입력해주세요.'}
            </p>
          </div>
        </div>
        {/* 4. 이름 */}
        <p className='ty-body4 w-[343px] h-[24px]'>이름</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            value={form.name}
            onChange={handleNoSpaceChange('name')}
            onKeyDown={blockSpaceKey}
            onFocus={handleFocus('name')}
            onBlur={handleBlur}
            placeholder='이름'
            className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] 
              focus:border-[var(--color-secondary-800)] rounded-lg outline-none ${getBorderColor(validations.name.success, form.name)}`}
          />
          <p
            className={`px-[3px] mt-1 ty-detail ${getMessageColor(validations.name.success, form.name)}`}
          >
            {form.name ? validations.name.message : ''}
          </p>
        </div>
        {/* 5. 휴대폰 번호 */}
        <p className='ty-body4 w-[343px] h-[24px]'>휴대폰 번호</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            value={form.phone}
            onChange={handleNoSpaceChange('phone')}
            onKeyDown={blockSpaceKey}
            onFocus={handleFocus('phone')}
            onBlur={handleBlur}
            placeholder='휴대폰 번호'
            className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg 
              outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.phone.success, form.phone)}`}
          />
          <p
            className={`px-[3px] ty-detail 
            ${focusedField === 'phone' ? 'text-[var(--color-text-assistive)]' : getMessageColor(validations.phone.success, form.phone)}`}
          >
            {focusedField === 'phone'
              ? '휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.'
              : form.phone
                ? validations.phone.message
                : '휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.'}
          </p>
        </div>

        {/* 약관 동의 영역 */}
        <p className='ty-title3 mb-[10px] w-[343px] h-[29px]'>이용약관 동의</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[236px] mb-[23px]'>
          {/* 전체 동의 영역 */}
          <div className=' w-[343px] h-[108px] cursor-pointer' onClick={handleAllCheck}>
            <div className='flex flex-row items-center w-[112px] h-[24px]'>
              <div className='mr-[4px]'>{isAllChecked ? <ToastCheck /> : <CheckBlank />}</div>
              <span className='ty-body4'>전체 동의합니다.</span>
            </div>

            <p className='px-[3px] px-[28px] mt-[8px] ty-detail text-[var(--color-text-assistive)]'>
              전체 동의는 필수 및 선택 항목에 대한 동의가 포함되어 있으며, 개별적으로도 동의를
              선택하실 수 있습니다. 선택항목에 대한 동의를 거부하시는 경우에도 회원가입 및 일반적인
              서비스를 이용할 수 있습니다.
            </p>
          </div>
          {/* 개별 항목 리스트 */}
          <div className='flex flex-col gap-3 pl-[2px]'>
            <TermItem
              label='[필수] 이용약관 동의'
              checked={agreements.terms}
              onToggle={() => handleCheck('terms')}
            />
            <TermItem
              label='[필수] 개인정보 수집 동의'
              checked={agreements.privacy}
              onToggle={() => handleCheck('privacy')}
            />
            <TermItem
              label='[필수] 만 14세 이상입니다.'
              checked={agreements.age}
              onToggle={() => handleCheck('age')}
            />
            <TermItem
              label='[선택] 마케팅 수신 동의'
              checked={agreements.marketing}
              onToggle={() => handleCheck('marketing')}
            />
          </div>
        </div>
      </div>

      <div className='mt-auto flex justify-center pt-4 py-[10px] gap-[10px]'>
        <Button
          onClick={handleProfile}
          disabled={!canSubmit} // 필수 항목 미동의 시 비활성
          className={`w-[342px] h-[48px] ${!canSubmit ? 'bg-[#E5E6E6] text-[#8C8C8C]' : ''}`}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
export default SignUpPage;

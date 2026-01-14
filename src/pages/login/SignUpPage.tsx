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
  const {
    form, // 입력 데이터
    validations, // 에러 메시지
    isEmailUnique, // 이메일 중복 확인 상태
    focusedField,
    handleFocus, //focus
    handleBlur,
    handleNoSpaceChange, // 공통 입력 핸들러
    handleEmailChange, // 이메일 입력 핸들러
    handleCheckEmailDuplicate, // 이메일 중복체크 함수
    canSubmitWithoutTerms, //제풀가능려부
  } = useSignUpForm();

  const navigate = useNavigate();
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
              outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.email.success, form.email)}`}
            />
            <Button
              color='grey'
              size='small'
              className={`w-[80px] h-[48px] ${isEmailUnique ? '' : 'bg-blue-100 text-blue-600'}`}
              onClick={handleCheckEmailDuplicate}
              disabled={isEmailUnique}
            >
              중복확인
            </Button>
          </div>
          {/* 에러가 있으면 에러 메시지, 에러가 없고 값이 있으면 성공 메시지 출력 */}
          {/* 메시지 영역 */}
          <p
            className={`px-[3px] mt-1 ty-detail 
            ${focusedField === 'email' ? 'text-[#3B82F6]' : getMessageColor(validations.email.success, form.email)}`}
          >
            {focusedField === 'email'
              ? '이메일 형식을 입력하고 중복확인을 해주세요.'
              : form.email
                ? validations.email.message
                : '-'}
          </p>
        </div>

        {/* 2. 아이디 */}
        <p className='ty-body4 w-[343px] h-[24px]'>아이디</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            value={form.username}
            // 커링 함수 사용: 함수를 실행해서 반환된 핸들러를 onChange에 전달
            onChange={handleNoSpaceChange('username')}
            onKeyDown={blockSpaceKey}
            onFocus={handleFocus('username')}
            onBlur={handleBlur}
            placeholder='아이디'
            className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] 
              px-4 border-[1px] rounded-lg outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.username.success, form.username)}`}
          />
          <p
            className={`px-[3px] mt-1 ty-detail ${
              focusedField === 'username'
                ? 'text-[#3B82F6]'
                : getMessageColor(validations.username.success, form.username)
            }`}
          >
            {/* 포커스 중엔 안내 문구, 아니면 validate.ts에서 온 메시지 그대로 출력 */}
            {focusedField === 'username'
              ? '영문과 숫자만 사용 가능합니다.'
              : form.username
                ? validations.username.message
                : '-'}
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
              onChange={handleNoSpaceChange('password')}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('password')}
              onBlur={handleBlur}
              placeholder='비밀번호'
              className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg 
                focus:border-[var(--color-secondary-800)] outline-none ${getBorderColor(validations.password.success, form.password)}`}
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
            </p>
            <p
              className={`px-[3px] mt-1 ty-detail 
              ${focusedField === 'password' ? 'text-[#3B82F6]' : getMessageColor(validations.password.success, form.password)}`}
            >
              {focusedField === 'password'
                ? '영문, 숫자를 포함하여 8~16자리까지 입력 가능합니다.'
                : form.password
                  ? validations.password.message
                  : '-'}
            </p>
          </div>
          {/* 비밀번호 확인 */}
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='password'
              value={form.passwordConfirm}
              onChange={handleNoSpaceChange('passwordConfirm')}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('passwordConfirm')}
              onBlur={handleBlur}
              placeholder='비밀번호 확인'
              className={`w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] 
                rounded-lg outline-none focus:border-[var(--color-secondary-800)] ${getBorderColor(validations.passwordConfirm.success, form.passwordConfirm)}`}
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호를 다시 입력해주세요.
            </p>
            {/* [수정] 안내 문구 하나로 통합 */}
            <p
              className={`px-[3px] mt-1 ty-detail 
              ${focusedField === 'passwordConfirm' ? 'text-[#3B82F6]' : getMessageColor(validations.passwordConfirm.success, form.passwordConfirm)}`}
            >
              {focusedField === 'passwordConfirm'
                ? '비밀번호를 다시 입력해주세요.'
                : form.passwordConfirm
                  ? validations.passwordConfirm.message
                  : '-'}
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
            {form.name ? validations.name.message : '-'}
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
          <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
            휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.
          </p>
          <p
            className={`px-[3px] mt-1 ty-detail 
            ${focusedField === 'phone' ? 'text-[#3B82F6]' : getMessageColor(validations.phone.success, form.phone)}`}
          >
            {focusedField === 'phone'
              ? "'-' 없이 숫자만 입력해 주세요."
              : form.phone
                ? validations.phone.message
                : '-'}
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

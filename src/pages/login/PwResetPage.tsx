import { Button } from '@/components/common/Button';
import usePwResetForm from '@/hooks/auth/usePwResetForm';
import { blockSpaceKey, getBorderColor, getMessageColor } from '@/utils/inputUtils';

const PwResetPage = () => {
  const {
    form,
    validations,
    focusedField,
    canSubmit,
    handleFocus,
    handleBlur,
    handleNoSpaceChange,
    handleSubmit,
  } = usePwResetForm();

  return (
    <div className='relative flex flex-col h-full'>
      {/* 설명 텍스트 */}
      <div className='mb-[16px]'>
        <p className='ty-body2'>비밀번호 재설정하기</p>
        <p className='ty-body5'>새로운 비밀번호를 입력해주세요.</p>
      </div>

      <div className='flex flex-col h-[180px] gap-[8px]'>
        {/* 비밀번호 입력 창 */}
        <div className='flex flex-col gap-[8px]'>
          {/* 1. 비밀번호 입력 */}
          <div className='flex flex-col gap-[8px]'>
            <input
              type='password'
              value={form.password}
              onChange={handleNoSpaceChange('password', 16)}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('password')}
              onBlur={handleBlur}
              placeholder='비밀번호'
              className={`w-full h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg outline-none focus:border-[var(--color-grey-800)]
               ${getBorderColor(validations.password.success, form.password)}`}
            />
            {/* 하단 메시지 (에러가 있으면 에러 메시지, 없으면 기본 가이드) */}
            <p
              className={`px-[3px]  ty-detail 
                        ${focusedField === 'password' ? 'text-[var(--color-text-assistive)]' : getMessageColor(validations.password.success, form.password)}`}
            >
              {focusedField === 'password'
                ? '비밀번호는 영문, 숫자 조합으로 8~16자까지 입력 가능합니다.'
                : form.password
                  ? validations.password.message
                  : '비밀번호는 영문, 숫자 조합으로 8~16자까지 입력 가능합니다.'}
            </p>
          </div>
          {/* 2. 비밀번호 확인 입력 */}
          <div className='flex flex-col gap-[8px]'>
            <input
              type='password'
              value={form.passwordConfirm}
              onChange={handleNoSpaceChange('passwordConfirm', 16)}
              onKeyDown={blockSpaceKey}
              onFocus={handleFocus('passwordConfirm')}
              onBlur={handleBlur}
              placeholder='비밀번호 확인'
              className={`w-full h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] rounded-lg outline-none focus:border-[var(--color-grey-800)]
              ${getBorderColor(validations.passwordConfirm.success, form.passwordConfirm)}`}
            />
            {/* 하단 메시지 */}
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
      </div>

      {/* 하단 버튼 */}
      <div className='flex w-full px-[5px] justify-center'>
        <Button
          disabled={!canSubmit}
          color={!canSubmit ? 'grey' : 'primary'}
          onClick={handleSubmit}
          className='w-full'
        >
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
};
export default PwResetPage;

import { useNavigate } from 'react-router-dom';
import useSettingPwChangeForm from '@/hooks/auth/useSettingPwChangeForm';
import SettingHeader from '@/components/common/SettingHeader';

export default function PasswordResetPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const { form, validations, handleNoSpaceChange, handleSubmit, canSubmit, touched, isPending } =
    useSettingPwChangeForm();

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='비밀번호 변경' onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[14px] pt-[33px] pb-24'>
        {/* 안내 문구 */}
        <p className='font-pretendard font-semibold text-sm leading-[23.8px] text-[#171717] mb-4'>
          비밀번호를 변경하려면 현재 비밀번호를 입력해주세요.
        </p>
        {/* 입력 필드 영역 */}
        <div className='flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-[8px]'>
            <input
              type='password'
              placeholder='현재 비밀번호'
              value={form.currentPassword}
              onChange={handleNoSpaceChange('currentPassword', 16)}
              className='w-full h-12 bg-white border border-[#E5E6E6] rounded-lg px-4 font-pretendard font-medium text-sm text-[#171717] outline-none placeholder:text-[#8C8C8C]'
              maxLength={16}
            />
            <p
              className={`ty-detail px-1 ${touched.currentPassword && !validations.currentPassword.success ? 'text-red-500' : 'text-[#8C8C8C]'}`}
            >
              {touched.currentPassword && !validations.currentPassword.success
                ? validations.currentPassword.message
                : '사용 중인 비밀번호를 입력해주세요.'}
            </p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            <input
              type='password'
              placeholder='새 비밀번호'
              value={form.password}
              onChange={handleNoSpaceChange('password', 16)}
              className='w-full h-12 bg-white border border-[#E5E6E6] rounded-lg px-4 font-pretendard font-medium text-sm text-[#171717] outline-none placeholder:text-[#8C8C8C]'
              maxLength={16}
            />
            <p
              className={`ty-detail px-1 ${touched.password && !validations.password.success ? 'text-red-500' : 'text-[#8C8C8C]'}`}
            >
              {touched.password && !validations.password.success
                ? validations.password.message
                : '새 비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.'}
            </p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            <input
              type='password'
              placeholder='새 비밀번호 확인'
              value={form.passwordConfirm}
              onChange={handleNoSpaceChange('passwordConfirm', 16)}
              className='w-full h-12 bg-white border border-[#E5E6E6] rounded-lg px-4 font-pretendard font-medium text-sm text-[#171717] outline-none placeholder:text-[#8C8C8C]'
              maxLength={16}
            />
            <p
              className={`ty-detail px-1 ${touched.passwordConfirm && !validations.passwordConfirm.success ? 'text-red-500' : 'text-[#8C8C8C]'}`}
            >
              {touched.passwordConfirm && !validations.passwordConfirm.success
                ? validations.passwordConfirm.message
                : '새 비밀번호를 다시 입력해주세요.'}
            </p>
          </div>
        </div>
        {/* 비밀번호를 잊었어요 링크 */}
        <button
          type='button'
          onClick={() => navigate('/auth/pw-find')}
          className='block w-full text-center mt-7 font-pretendard font-medium text-sm leading-[23.8px] text-[#595959] underline bg-none border-none cursor-pointer'
        >
          비밀번호를 잊었어요
        </button>
      </main>

      {/* 하단 영역 (버튼) */}
      <div
        className='fixed bottom-0 left-1/2 w-full max-w-[375px] px-[16px] pb-[34px]'
        style={{ transform: 'translateX(-50%)', backgroundColor: '#FAFAFA' }}
      >
        {/* 비밀번호 변경 버튼 */}
        <button
          type='button'
          onClick={handleSubmit}
          disabled={!canSubmit || isPending}
          className='w-full h-12 bg-[#F5544C] rounded-lg shadow-md font-pretendard font-medium text-base leading-[25.6px] text-white border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

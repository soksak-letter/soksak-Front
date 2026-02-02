import { useNavigate } from 'react-router-dom';
import usePwResetForm from '@/hooks/usePwResetForm';

export default function PasswordResetPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const { form, validations, handleNoSpaceChange, handleSubmit, canSubmit } = usePwResetForm();

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      {/* 헤더 */}
      <header
        className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-[21px] py-[13px]'
        style={{
          backgroundColor: '#FAFAFA',
          height: '50px',
          width: '375px',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className='absolute left-[21px] flex items-center justify-center'
          aria-label='뒤로가기'
          style={{
            width: '18px',
            height: '18px',
          }}
        >
          <svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
            <path
              d='M7.5 13.5L1.5 7.5L7.5 1.5'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* 제목 */}
        <h1
          className='text-center'
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '28.8px',
            color: '#000000',
          }}
        >
          비밀번호 변경
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[14px] pt-[33px] pb-24'>
        {/* 안내 문구 */}
        <p className='font-pretendard font-semibold text-sm leading-[23.8px] text-[#171717] mb-4'>
          새로운 비밀번호를 입력해주세요.
        </p>
        {/* 입력 필드 영역 */}
        <div className='flex flex-col gap-[6px]'>
          <input
            type='password'
            placeholder='비밀번호'
            value={form.password}
            onChange={handleNoSpaceChange('password', 16)}
            className='w-full h-12 bg-white border border-[#E5E6E6] rounded-lg px-4 font-pretendard font-medium text-sm text-[#171717] outline-none placeholder:text-[#8C8C8C]'
            maxLength={16}
          />
          {validations.password.message && (
            <span className='text-xs text-red-500'>{validations.password.message}</span>
          )}
          <input
            type='password'
            placeholder='비밀번호 확인'
            value={form.passwordConfirm}
            onChange={handleNoSpaceChange('passwordConfirm', 16)}
            className='w-full h-12 bg-white border border-[#E5E6E6] rounded-lg px-4 font-pretendard font-medium text-sm text-[#171717] outline-none placeholder:text-[#8C8C8C]'
            maxLength={16}
          />
          {validations.passwordConfirm.message && (
            <span className='text-xs text-red-500'>{validations.passwordConfirm.message}</span>
          )}
        </div>
        {/* 도움말 텍스트 */}
        <p className='font-pretendard font-normal text-xs leading-[19.2px] text-[#595959] mt-2'>
          비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
        </p>
        {/* 비밀번호를 잊었어요 링크 */}
        <button
          type='button'
          onClick={() => navigate('/auth/forgot-password')}
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
          disabled={!canSubmit}
          className='w-full h-12 bg-[#F5544C] rounded-lg shadow-md font-pretendard font-medium text-base leading-[25.6px] text-white border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

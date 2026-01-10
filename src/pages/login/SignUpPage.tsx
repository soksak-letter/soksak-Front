import { Button } from '@/components/common/Button';
import ToastCheck from '@/assets/icons/ToastCheck.svg?react';
import CheckBlank from '@/assets/icons/CheckBlank.svg?react';
import BackHeader from '@/components/common/headers/BackHeader';
import { useNavigate } from 'react-router-dom';
import useTermsAgree from '@/hooks/useTermsAgree';
import TermItem from '@/components/TermItem';

const SignUpPage = () => {
  const navigate = useNavigate();
  // 전체동의 관리하는 커스텀 훅
  const { agreements, isAllChecked, isFormValid, handleCheck, handleAllCheck } = useTermsAgree();

  const handleProfile = () => {
    // 훅에서 계산된 유효성 검사 결과
    if (!isFormValid) return;

    console.log('회원가입 약관 동의 완료');
    navigate('auth/profile-setup');
  };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='회원가입' />
      </div>
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px]'>
        <p className='ty-title3 w-[343px] h-[29px]'>기본정보</p>
        <p className='ty-body4 w-[343px] h-[24px]'>이메일</p>
        <div className='flex flex-row gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='이메일'
            className='w-[240px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
          <Button color='grey' size='small' className='w-[80px] h-[48px]'>
            중복확인
          </Button>
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>아이디</p>
        <div className='flex flex-row gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='아이디'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>비밀번호</p>
        <div>
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='text'
              placeholder='비밀번호'
              className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
            </p>
          </div>
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='text'
              placeholder='비밀번호 확인'
              className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호를 다시 입력해주세요.
            </p>
          </div>
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>이름</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='이름'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>휴대폰 번호</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='휴대폰 번호'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
          <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
            휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.
          </p>
        </div>
        {/* 약관 동의 영역 */}
        <p className='ty-title3 mb-[16px] w-[343px] h-[29px] '>이용약관 동의</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[236px]'>
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

      <div className='flex flex-col px-[16px] py-[10px]'>
        <Button
          onClick={handleProfile}
          disabled={!isFormValid} // 필수 항목 미동의 시 비활성
          className={`w-[342px] h-[48px] ${!isFormValid ? 'bg-[#E5E6E6] text-[#8C8C8C]' : ''}`}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
export default SignUpPage;

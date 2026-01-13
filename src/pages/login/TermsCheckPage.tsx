import { Button } from '@/components/common/Button';
import ToastCheck from '@/assets/icons/ToastCheck.svg?react';
import CheckBlank from '@/assets/icons/CheckBlank.svg?react';
import BackHeader from '@/components/common/headers/BackHeader';
import { useNavigate } from 'react-router-dom';
import useTermsAgree from '@/hooks/useTermsAgree';
import TermItem from '@/components/TermItem';

const TermCheckPage = () => {
  const navigate = useNavigate();
  // 전체동의 관리하는 커스텀 훅
  const { agreements, isAllChecked, isFormValid, handleCheck, handleAllCheck } = useTermsAgree();

  //온보딩으로(다음 클릭시)
  const handleOnboading = () => {
    if (!isFormValid) return;
    navigate('/onboarding/profile');
  };

  return (
    <div className='w-[375px] h-screen bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='이용약관 동의' />
      </div>
      {/* 약관 동의 영역 */}
      <div className='flex flex-col px-[16px] gap-[8px] w-[343px] h-[236px] mb-[23px]'>
        {/* 전체 동의 영역 */}
        <div className=' w-[343px] h-[108px] cursor-pointer' onClick={handleAllCheck}>
          <div className='flex flex-row items-center w-[112px] h-[24px]'>
            <div className='mr-[4px]'>{isAllChecked ? <ToastCheck /> : <CheckBlank />}</div>
            <span className='ty-body4'>전체 동의합니다.</span>
          </div>

          <p className='px-[3px] px-[26px] mt-[8px] ty-detail text-[var(--color-text-assistive)]'>
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

      <div className='fixed bottom-[40px] left-0 right-0 mx-auto w-full max-w-[375px] px-4'>
        <Button
          onClick={handleOnboading}
          disabled={!isFormValid} // 필수 항목 미동의 시 비활성
          className={`w-[342px] h-[48px] ${!isFormValid ? 'bg-[#E5E6E6] text-[#8C8C8C]' : ''}`}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
};
export default TermCheckPage;

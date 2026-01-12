import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '@/assets/icons/Question.svg?react';

const ProfileSetUp = () => {
  const navigate = useNavigate();
  //  닉네임 입력 상태 관리
  const [nickname, setNickname] = useState('');

  // 유효성 검사 (예: 1글자 이상 10글자 이하)
  const isValid = nickname.length > 0 && nickname.length <= 10;
  const handleProfile = () => {
    if (!isValid) return;
    console.log('프로필 설정 완료', nickname);
    navigate('/onboarding/profile');
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 10글자 제한
    if (e.target.value.length <= 10) {
      setNickname(e.target.value);
    }
  };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='프로필 설정' />
      </div>
      {/* 프로필 영역 */}
      <div className='flex flex-col items-center mt-10 mb-8'>
        <div className='w-24 h-24 bg-[#FFC8C6] rounded-full mb-3'></div>
        <span className='ty-body2'>파란수박님</span>
      </div>

      {/*  닉네임 입력 영역 */}
      <div className='flex flex-col gap-2 px-[16px]'>
        <label className='text-[14px] font-bold text-[#171717]'>닉네임</label>
        <input
          type='text'
          value={nickname}
          onChange={handleNicknameChange}
          placeholder='닉네임'
          className='w-full h-[48px] px-4 rounded-lg border border-[#E5E6E6] bg-white text-[16px] text-[#171717] placeholder-[#8C8C8C] focus:outline-none focus:border-[#F5544C]'
        />
        <p className='text-[12px] text-[#8C8C8C] mt-1'>닉네임은 최대 10자리까지 입력 가능합니다.</p>

        {/* 닉네임 규칙 링크 */}
        <button className='flex items-center gap-1 mt-2 text-[12px] font-semibold text-[#171717]'>
          {/*튤팁 */}
          <Question />
          <span>닉네임 규칙이 궁금하신가요?</span>
        </button>
      </div>

      <div className='absolute bottom-[40px] w-full px-4'>
        <Button
          onClick={handleProfile}
          //   disabled={!isFormValid} // 필수 항목 미동의 시 비활성 ${!isFormValid ? 'bg-[#E5E6E6] text-[#8C8C8C]' : ''}
          className={`w-[342px] h-[48px] `}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
};
export default ProfileSetUp;

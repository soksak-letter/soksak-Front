import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '@/assets/icons/Question.svg?react';
import { FaCamera } from 'react-icons/fa';
import { validate } from '@/styles/utilities/validate';

const ProfileSetUp = () => {
  const navigate = useNavigate();
  //  닉네임 입력 상태 관리
  const [nickname, setNickname] = useState('');

  // 툴팁(말풍선) 보임 여부 상태 관리
  const [showTooltip, setShowTooltip] = useState(false);

  // 유효성 검사 결과 객체 받기
  const validationResult = validate.nickname(nickname);
  const isValid = validationResult.success;

  //온보딩으로(다음 클릭시)
  const handleProfile = () => {
    if (!isValid) return;
    console.log('프로필 설정 완료', nickname);
    navigate('/onboarding/profile');
  };

  // 테두리 색상 결정
  const getBorderColor = () => {
    if (nickname.length === 0) return 'border-[var(--color-grey-100)]';
    if (!isValid) return 'border-[#F5544C] focus:border-[#F5544C]'; // 실패: 빨강
    return 'border-[#007AFF] focus:border-[#007AFF]'; // 성공: 파란
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 입력 길이 제한 (UX용)
    if (value.length <= 16) {
      setNickname(value);
    }
  };

  return (
    <div className='w-[375px] h-screen bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='프로필 설정' />
      </div>
      {/* 프로필 영역 */}
      <div className='flex flex-col items-center mt-10 mb-[16px]'>
        <div className='relative'>
          <div className='w-[128px] h-[128px] bg-[var(--color-primary-100)] rounded-full mb-3'></div>
          <button
            type='button'
            className='absolute bottom-2 right-3 w-8 h-8 bg-[#F5544C] rounded-full flex items-center justify-center border-2 border-[#FAFAFA] text-white'
            aria-label='프로필 사진 변경'
          >
            <FaCamera size={14} />
          </button>
        </div>
      </div>

      {/*  닉네임 입력 영역 */}
      <div className='flex flex-col gap-2 px-[16px]'>
        <label className='ty-body4'>닉네임</label>
        <input
          type='text'
          value={nickname}
          onChange={handleNicknameChange}
          placeholder='닉네임'
          className={`w-full h-[48px] px-4 rounded-lg border 
          bg-white text-[16px] text-[#171717] placeholder-[#8C8C8C] 
          outline-none
          ${getBorderColor()}`}
          // 스페이스바(Space) 키가 눌리면 동작 취소(preventDefault)
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
        />
        <p className='ty-detail text-[var(--color-text-assistive)] mt-1'>
          닉네임은 최대 16자리까지 입력 가능합니다.
        </p>

        {/* 닉네임 규칙 툴팁 */}
        <div className='relative w-fit mt-2'>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className='flex items-center gap-[8px] mt-2'
          >
            {/*튤팁 */}
            <Question />
            <span className='ty-detailMedium'>닉네임 규칙이 궁금하신가요?</span>
          </button>

          {/* 말풍선 (조건부 렌더링) */}
          {showTooltip && (
            <div className='absolute top-8 left-[-4px] z-10'>
              {/* 말풍선 꼬리 (삼각형) */}
              <div
                className='absolute -top-[8px] left-[5px] w-0 h-2.5
                border-l-[6px] border-r-[6px] border-b-[8px]
                border-l-transparent border-r-transparent border-b-[#E5E6E6] '
              ></div>

              {/* 말풍선 본문 */}
              <div className='bg-[#E5E6E6] px-2.5 py-1.5 rounded-lg w-max '>
                <p className='ty-detail'>지금 정한 닉네임은 나와 친구에게만 보입니다!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-[40px] left-0 right-0 mx-auto w-full max-w-[375px] px-4'>
        <Button onClick={handleProfile} disabled={!isValid}>
          시작하기
        </Button>
      </div>
    </div>
  );
};
export default ProfileSetUp;

import BackHeader from '@/components/common/headers/BackHeader';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import LetterTextBox from '@/components/letters/LetterTextBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DailyQuestionBox from '@/components/letters/DailyQuestionBox';
import Question from '../../assets/icons/Question.svg?react';

const OtherDraftPage = () => {
  const navigate = useNavigate();

  const [letter, setLetter] = useState({
    title: '',
    content: '',
  });
  const [isPublic, setIsPublic] = useState(false);

  // mock data
  const nickname = '파란수박';
  const letterLeft = 4;
  const dailyQuestion = '당신의 인생에 큰 영감을 주는 사람은 누구인가요?';

  const handleSubmit = () => {
    // TODO:
    // 1. title 최소/최대 글자 수 조건 확인
    // 2. content 최소/최대 글자 수 조건 확인
    // 3. 조건 안 맞으면 토스트/에러 처리
    navigate('/letter/other-decorate', {
      state: {
        title: letter.title,
        content: letter.content,
      },
    });
  };

  return (
    <div className='flex flex-col'>
      <BackHeader
        title={`${nickname}에게 보내는 편지`}
        rightElement={
          <button type='submit' onClick={handleSubmit}>
            꾸미기
          </button>
        }
      />
      <div className='flex flex-col items-start p-4 -mt-3 gap-3'>
        <div className='text-[18px] font-semibold leading-[160%]'>
          <span className='text-black'>우리에게 남은 편지 횟수는 </span>
          <span className='text-[var(--color-primary-500)]'>{letterLeft}회</span>
        </div>

        <DailyQuestionBox
          Icon={Question}
          question={dailyQuestion}
          iconClassName='text-[var(--color-text-assistive)]'
          bubbleBgColor='#E5E6E6'
          bubbleTextStyle='text-[var(--color-text-normal)]'
        />

        <div>
          <LetterTextBox value={letter} onChange={setLetter} className='w-[343px] h-[394px]' />
        </div>
        <div className='flex items-center justify-end -mt-3 gap-2'>
          <span className='text-[var(--color-text-normal)] text-[14px] font-medium'>
            오늘 하루 동안 편지 공개하기
          </span>
          <ToggleSwitch checked={isPublic} onCheckedChange={setIsPublic} />
        </div>
        <p className='flex text-[12px] text-[var(--color-text-assistive)] leading-[160%] font-medium'>
          비방의 언어가 담기면 자동으로 필터링 돼요.
          <br />
          상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
        </p>
      </div>
    </div>
  );
};

export default OtherDraftPage;

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader'; // 경로 맞춰줘
import ToggleSwitch from '@/components/common/ToggleSwitch'; // 이미 있다고 했던 토글

import { BsQuestionCircle } from 'react-icons/bs';
import LetterTextBox from '@/components/letters/LetterTextBox';
import DailyQuestionBox from '@/components/letters/DailyQuestionBox';

export default function FriendDraftPage() {
  const navigate = useNavigate();

  // const params = useParams();
  // TODO : friendId는 추후 닉네임 불러올 때 Id로 가져올 거라서 연동 후 사용
  // const friendId = params.friendId ?? '1';

  // TODO: friendName은 실제 데이터로 교체
  const friendName = useMemo(() => '파란수박', []);
  const dailyQuestion = useMemo(() => '당신의 인생에 큰 영감을 주는 사람은 누구인가요?', []);

  const [letter, setLetter] = useState({
    title: '',
    content: '',
  });
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = () => {
    // TODO:
    // 1. title 최소/최대 글자 수 조건 확인
    // 2. content 최소/최대 글자 수 조건 확인
    // 3. 조건 안 맞으면 토스트/에러 처리
    navigate('/letter/friend/decorate', {
      state: {
        title: letter.title,
        content: letter.content,
      },
    });
  };

  return (
    <div className='flex flex-col'>
      <BackHeader
        title={`${friendName}에게 보내는 편지`}
        rightElement={
          <button type='submit' onClick={handleSubmit}>
            꾸미기
          </button>
        }
      />
      <div className='flex flex-col items-start p-5 -mt-3 gap-3'>
        <DailyQuestionBox
          question={dailyQuestion}
          Icon={BsQuestionCircle}
          iconClassName='w-[14px] h-[14px] text-[var(--color-text-assistive)]'
          bubbleBgColor='#414141'
          bubbleClassName='text-white'
        />
      </div>
      <div className='px-4'>
        <LetterTextBox value={letter} onChange={setLetter} className='w-[343px] h-[394px]' />
      </div>
      <div className='flex items-center justify-end p-5 -mt-3 gap-2'>
        <span className='text-[var(--color-text-normal)] text-[14px] font-medium'>
          오늘 하루 동안 편지 공개하기
        </span>
        <ToggleSwitch checked={isPublic} onCheckedChange={setIsPublic} />
      </div>
      <p className='flex p-5 -mt-3 text-[12px] text-[var(--color-text-assistive)] leading-[160%] font-medium'>
        비방의 언어가 담기면 자동으로 필터링 돼요.
        <br />
        상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
      </p>
    </div>
  );
}

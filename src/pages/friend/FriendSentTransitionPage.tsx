import { Button } from '@/components/common/Button';
import LetterEndedEnvelope from '@/assets/icons/LetterEndedEnvelope.svg?react';

export default function FriendSentTransitionPage() {
  // mock data
  // TODO : 앞 페이지랑 props 연결하기
  const receiver = '파란수박';

  return (
    <div>
      <header>
        <p>
          {receiver}님과 10회의 대화를
          <br />
          모두 나누었어요.
        </p>
        <p>인연을 이어가시려면 친구로 추가해주세요.</p>
      </header>
      <div>
        <link>우리가 나눴던 대화 다시보기</link>
      </div>
      <div>
        <LetterEndedEnvelope />
        <Button>친구 신청</Button>
        <Button>후기 남기기</Button>
      </div>
    </div>
  );
}

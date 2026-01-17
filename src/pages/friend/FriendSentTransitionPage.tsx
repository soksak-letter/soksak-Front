import { Button } from '@/components/common/Button';

export default function FriendSentTransitionPage() {
  // mock data, 앞 페이지에 props로 넘기면 사용하기
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
        <Button>친구 신청</Button>
        <Button>후기 남기기</Button>
      </div>
    </div>
  );
}

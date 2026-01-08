import { useState } from 'react';
import FeedHeader from '../../components/common/headers/FeedHeader';
import QuestionSection from '../../components/feed/QuestionSection';
import LetterPreviewCard from '../../components/feed/LetterPreviewCard';
import FloatingButton from '../../components/common/FloatingButton';
import type { LetterPreviewVariant } from '../../components/feed/LetterPreviewCard';

interface FeedLetter {
  id: string;
  title: string;
  content: string;
  likes: number;
  variant: LetterPreviewVariant;
  isExpandable?: boolean;
}

export default function FeedPage() {
  const [letters] = useState<FeedLetter[]>([
    {
      id: '1',
      title: '이지영 선생님',
      content:
        '나에게 가장 큰 영감? 나는 누군가에게 막 큰 영감을 받지는 않는다고 생각했는데, 그래도 이지영 선생님? 수능 때문에 너무 힘든데, 마인드가 멋져서 항상 존경한다.',
      likes: 74,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '2',
      title: '요즘 아이돌에 빠져있다... 위시 사랑해',
      content:
        '요즘 이런 생각을 할 기회가 많이 없는데, 음,, 아마 NCT WISH를 볼 때 그들이 전하는 청량한 에너지에 매 순간 반하게 되는 것 같다. 나도 내 소원을 이루는 날이 올까? 내 소원은 옛날부터 무대를 꾸미는 무대 연출가였다. 현생에 치여서 잊고 있을 때 그들의 무대를 보면 다시 내 꿈에 대한 의욕이 다시금 생기는 것 같다. ',
      likes: 74,
      variant: 'green',
      isExpandable: false,
    },
    {
      id: '3',
      title: '우리 아빠',
      content:
        '바로바로 ~ 우리 아빠다!! 우리 아빠는 나에게 가장 큰 영감을 주시는 분이라고 할 수 있다. 그 이유는 바로 언제나 나를 웃겨주시기 때문이다. 옛날에는 솔직히 너무 놀림이 심할 때는 아빠가 싫었다... 하지만 머리가 크고 보니 누군가를 이렇게 웃겨줄 수 있는 기회는 많지 않고, 또 정말 쉽지 않은 일인 것을 느꼈다. 나도 그런 사람이 될 수 있을까 싶은 마음이 항상 남아 있는 것 같다... 흠 그런 마음들 ...',
      likes: 74,
      variant: 'yellow',
      isExpandable: true,
    },
    {
      id: '4',
      title: '나의 할머니',
      content:
        '할머니는 항상 나에게 따뜻한 말씀을 해주시는 분이다. 힘들 때마다 할머니 생각을 하면 힘이 난다. 할머니의 삶의 지혜와 경험담을 들을 때면 내가 얼마나 작은 고민을 하고 있는지 깨닫게 된다.',
      likes: 52,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '5',
      title: '친구 수진이',
      content:
        '수진이는 내 고등학교 때부터 친구인데, 항상 긍정적인 에너지를 가지고 있어서 나에게 큰 영감을 준다. 힘든 일이 있어도 항상 웃으면서 이겨내는 모습이 정말 멋있다.',
      likes: 89,
      variant: 'green',
      isExpandable: false,
    },
    {
      id: '6',
      title: '우리 엄마',
      content:
        '엄마는 언제나 나를 위해 희생하시는 분이다. 엄마의 사랑은 정말 무조건적이고 따뜻하다. 엄마처럼 누군가를 사랑할 수 있는 사람이 되고 싶다. 엄마가 해주시는 음식을 먹을 때마다 행복하고, 엄마와 대화할 때면 마음이 편안해진다. 엄마는 나의 영원한 롤모델이다.',
      likes: 124,
      variant: 'yellow',
      isExpandable: true,
    },
    {
      id: '7',
      title: '동아리 선배',
      content:
        '동아리 선배님은 항상 열정적으로 활동하시는 모습이 인상 깊다. 선배님을 보면서 나도 더 열심히 해야겠다는 생각이 든다.',
      likes: 41,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '8',
      title: '좋아하는 작가',
      content:
        '최근에 읽은 책의 작가님이 정말 대단하다고 느꼈다. 글 하나하나에 담긴 철학과 사유의 깊이가 나에게 많은 생각을 하게 만들었다.',
      likes: 67,
      variant: 'green',
      isExpandable: false,
    },
    {
      id: '9',
      title: '운동 코치님',
      content:
        '헬스장에서 만난 코치님은 항상 긍정적인 에너지로 가득하시다. 힘들 때마다 응원해주시고, 포기하지 않도록 격려해주신다. 코치님 덕분에 운동을 계속할 수 있었고, 건강도 많이 좋아졌다. 코치님처럼 다른 사람에게 좋은 영향을 주는 사람이 되고 싶다.',
      likes: 98,
      variant: 'yellow',
      isExpandable: true,
    },
    {
      id: '10',
      title: '사촌 언니',
      content:
        '사촌 언니는 늘 자기 길을 묵묵히 걸어가는 사람이다. 주변 시선에 흔들리지 않고 자신의 꿈을 향해 나아가는 모습이 정말 멋있다.',
      likes: 55,
      variant: 'blue',
      isExpandable: false,
    },
  ]);

  const handleLike = (letterId: string) => {
    console.log('좋아요:', letterId);
    // TODO: API 호출로 좋아요 처리
  };

  return (
    <div className='min-h-dvh' style={{ backgroundColor: '#FAFAFA' }}>
      {/* 고정 상단바 */}
      <FeedHeader title='공개 편지' />

      {/* 상단바 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 상단 질문 섹션 */}
      <QuestionSection
        question={`당신의 인생에 가장 큰 영감을\n주는 사람은 누구인가요?`}
        timeLeft='13시간 32초'
        showGuidance={true}
      />

      {/* 편지 리스트 섹션 */}
      <section className='px-4 py-4 space-y-4'>
        {letters.map((letter) => (
          <LetterPreviewCard
            key={letter.id}
            title={letter.title}
            content={letter.content}
            likes={letter.likes}
            variant={letter.variant}
            isExpandable={letter.isExpandable}
            onLike={() => handleLike(letter.id)}
          />
        ))}
      </section>

      {/* 플로팅 버튼 */}
      <FloatingButton
        text='나도 편지 작성하기'
        navigateTo='/write'
      />
    </div>
  );
}

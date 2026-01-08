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

export default function FriendFeedPage() {
  const [letters] = useState<FeedLetter[]>([
    {
      id: '1',
      title: '최고의 친구 민지',
      content:
        '민지는 내 인생에서 가장 소중한 친구다. 힘들 때마다 옆에서 응원해주고, 기쁠 때는 함께 기뻐해주는 진정한 친구. 우리의 우정이 영원하길 바란다.',
      likes: 92,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '2',
      title: '고등학교 단짝 수진',
      content:
        '수진아, 우리가 처음 만난 게 벌써 5년 전이라니 믿기지 않아. 그동안 함께 웃고 울고, 수많은 추억을 만들었지. 너와 함께한 모든 순간이 소중해. 앞으로도 쭉 함께하자!',
      likes: 156,
      variant: 'green',
      isExpandable: true,
    },
    {
      id: '3',
      title: '대학 동기 지훈이',
      content:
        '지훈아, 너는 정말 믿음직한 친구야. 과제할 때도, 시험 준비할 때도 항상 함께 해줘서 고마워. 너 덕분에 대학 생활이 훨씬 즐거웠어.',
      likes: 78,
      variant: 'yellow',
      isExpandable: false,
    },
    {
      id: '4',
      title: '동아리 친구 서연',
      content:
        '서연이와 함께 동아리 활동을 하면서 정말 많은 걸 배웠다. 항상 긍정적이고 열정적인 모습이 나에게 큰 영감을 준다. 함께 프로젝트 하는 시간이 항상 즐겁다.',
      likes: 64,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '5',
      title: '어릴 적 친구 현우',
      content:
        '현우야, 우리가 초등학교 때부터 친구였다는 게 정말 신기해. 시간이 지나도 변하지 않는 우리의 우정이 너무 소중해. 오래오래 친하게 지내자. 어린 시절의 추억들을 떠올릴 때면 항상 네가 생각나. 우리 함께 만들었던 비밀 기지, 함께 놀던 공원, 모든 게 그립다.',
      likes: 203,
      variant: 'green',
      isExpandable: true,
    },
    {
      id: '6',
      title: '운동 친구 태양',
      content:
        '태양이 덕분에 운동을 시작할 수 있었어. 함께 땀 흘리고 목표를 향해 나아가는 시간이 정말 의미 있었다.',
      likes: 45,
      variant: 'yellow',
      isExpandable: false,
    },
    {
      id: '7',
      title: '직장 동료 혜진',
      content:
        '혜진 선배님은 회사 생활의 든든한 지원군이다. 업무적으로도 많은 도움을 받았고, 개인적으로도 좋은 조언을 많이 해주셔서 감사하다.',
      likes: 88,
      variant: 'blue',
      isExpandable: false,
    },
    {
      id: '8',
      title: '여행 친구 은지',
      content:
        '은지와 함께한 여행은 항상 특별했다. 새로운 곳을 탐험하고, 맛있는 음식을 먹고, 끝없이 수다 떨던 시간들이 그립다. 다음 여행도 기대된다!',
      likes: 134,
      variant: 'green',
      isExpandable: true,
    },
    {
      id: '9',
      title: '취미 친구 재민',
      content:
        '재민이와 함께 사진 찍으러 다니는 게 주말의 낙이다. 같은 취미를 공유하는 친구가 있다는 게 정말 행복한 일이다.',
      likes: 56,
      variant: 'yellow',
      isExpandable: false,
    },
    {
      id: '10',
      title: '멘토 같은 친구 승호',
      content:
        '승호 형은 친구이자 인생 선배다. 고민이 있을 때마다 좋은 조언을 해주고, 올바른 방향을 제시해준다. 형처럼 멋진 사람이 되고 싶다.',
      likes: 112,
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
      <FeedHeader title='친구 편지' />

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
      <FloatingButton text='나도 편지 작성하기' navigateTo='/write' />
    </div>
  );
}

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import PenIcon from '@/assets/icons/PenIcon.svg?react';

type Direction = 'received' | 'sent';

type PostItem = {
  letterId: number;
  title: string;
  dateText: string; // '2026.1.3'
  sentAt: string; // ISO
  direction: Direction; // received=왼쪽, sent=오른쪽
  colorKey: 'yellow' | 'blue' | 'pink' | 'cream';
};

export default function LetterPostOtherPage() {
  const navigate = useNavigate();
  const params = useParams();

  // 라우터 설계에 따라 threadId가 있을 수도/없을 수도 있음
  // (너희가 추천했던 threadId 중심이면 여기서 잡히게 될 것)
  const threadId = params.threadId ?? '101';

  // TODO: threadId로 상대 닉네임/질문/포스트 목록 불러오기
  const senderName = '파란수박';
  const questionTitle = '당신의 인생에 가장 큰 영감을\n주는 사람은 누구인가요?';

  const posts = useMemo<PostItem[]>(() => {
    const data: PostItem[] = [
      {
        letterId: 1,
        title: '이지영선생님러브러브...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:10:00',
        direction: 'received',
        colorKey: 'yellow',
      },
      {
        letterId: 2,
        title: '나는현우진이좋은데...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:18:00',
        direction: 'sent',
        colorKey: 'blue',
      },
      {
        letterId: 3,
        title: '이지영 사랑해',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:33:00',
        direction: 'received',
        colorKey: 'blue',
      },
      {
        letterId: 4,
        title: '안녕하세요 날씨가 좋아...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:50:00',
        direction: 'sent',
        colorKey: 'pink',
      },
      {
        letterId: 5,
        title: '이지영선생님러브러브...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T10:05:00',
        direction: 'received',
        colorKey: 'blue',
      },
      {
        letterId: 6,
        title: '이지영선생님러브러브...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T10:20:00',
        direction: 'sent',
        colorKey: 'cream',
      },
    ];

    return [...data].sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  }, []);

  // 레인 분리 + 각 레인 내부는 시간순 유지
  const leftLane = useMemo(() => posts.filter((p) => p.direction === 'received'), [posts]);
  const rightLane = useMemo(() => posts.filter((p) => p.direction === 'sent'), [posts]);

  const handleOpenLetterDetail = (letterId: number) => {
    // 너가 말한 흐름: post-other에서 편지 상세 누르면 reply 페이지로 이동
    // 현재 reply가 파라미터 없이도 열리도록 만들어둔 상태라 일단 단순 이동.
    // 나중에 신고/답장 대상 식별하려면 letterId/threadId를 함께 넘기는 걸 추천.
    navigate(`/letter/reply`, {
      state: { threadId, letterId, senderName },
    });

    // (추천 라우트 형태로 바꾸면)
    // navigate(`/letter/reply/${letterId}`, { state: { threadId, senderName } });
  };

  const handleWriteReply = () => {
    // 우측 하단 플로팅 펜: 답장 작성(익명 상대에게 보내는 편지 작성)
    navigate('/letter/other/draft', {
      state: { threadId, senderName },
    });
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <BackHeader title='익명 편지' />

      <main className='px-5 pb-[110px]'>
        <div className='mt-2 text-[13px] text-[#6F6F6F]'>{senderName}님과 이어진 질문</div>

        <h2 className='mt-1 ty-title1 leading-[30px] text-[#171717] whitespace-pre-line'>
          {questionTitle}
        </h2>

        {/* 바깥은 2열, 안쪽은 각 레인 flex-col */}
        <div className='mt-6 grid grid-cols-2 gap-x-[34px] items-start'>
          {/* 왼쪽 레인 (received) */}
          <div className='flex flex-col gap-[41px]'>
            {leftLane.map((p) => (
              <PostCard
                key={p.letterId}
                item={p}
                onClick={() => handleOpenLetterDetail(p.letterId)}
              />
            ))}
          </div>

          {/* 오른쪽 레인 (sent) - 상단 41px 오프셋 */}
          <div className='flex flex-col gap-[41px] pt-[41px]'>
            {rightLane.map((p) => (
              <PostCard
                key={p.letterId}
                item={p}
                onClick={() => handleOpenLetterDetail(p.letterId)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 플로팅 작성 버튼 */}
      <button
        type='button'
        onClick={handleWriteReply}
        className='fixed bottom-[112px] right-[calc(50%-187px+20px)] z-50
          h-[56px] w-[56px] rounded-full bg-[var(--color-primary-500)] text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
        aria-label='답장 작성'
      >
        <PenIcon className='ml-3.5' />
      </button>
    </div>
  );
}

function PostCard({ item, onClick }: { item: PostItem; onClick?: () => void }) {
  return (
    <button type='button' onClick={onClick} className='text-left'>
      {/* 봉투 자리 */}
      <div className={`w-[138px] h-[98px] rounded-2xl ${envelopeBg(item.colorKey)}`} />

      <p className='mt-3 line-clamp-1 text-[14px] font-semibold text-[#171717]'>{item.title}</p>
      <p className='mt-1 text-[12px] text-[#6F6F6F]'>{item.dateText}</p>
    </button>
  );
}

function envelopeBg(key: PostItem['colorKey']) {
  switch (key) {
    case 'yellow':
      return 'bg-[#FFF2B3]';
    case 'blue':
      return 'bg-[#D9EEFF]';
    case 'pink':
      return 'bg-[#FFD1D1]';
    case 'cream':
    default:
      return 'bg-[#F2F2F2]';
  }
}

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import PenIcon from '@/assets/icons/PenIcon.svg?react';

type Direction = 'received' | 'sent';

type PostItem = {
  id: number;
  title: string;
  dateText: string;
  sentAt: string; // ISO
  direction: Direction; // received=왼쪽, sent=오른쪽
  colorKey: 'yellow' | 'blue' | 'pink' | 'cream';
};

export default function FriendPostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const friendId = params.friendId ?? '1';

  const friendName = '파란수박';

  const posts = useMemo<PostItem[]>(() => {
    const data: PostItem[] = [
      {
        id: 1,
        title: '이지영선생님러브러브...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:10:00',
        direction: 'received',
        colorKey: 'yellow',
      },
      {
        id: 2,
        title: '나는현우진이좋은데...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:18:00',
        direction: 'sent',
        colorKey: 'blue',
      },
      {
        id: 3,
        title: '이지영 사랑해',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:33:00',
        direction: 'received',
        colorKey: 'blue',
      },
      {
        id: 4,
        title: '안녕하세요 날씨가 좋아...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T09:50:00',
        direction: 'sent',
        colorKey: 'pink',
      },
      {
        id: 5,
        title: '이지영선생님러브러브...',
        dateText: '2026.1.3',
        sentAt: '2026-01-03T10:05:00',
        direction: 'received',
        colorKey: 'blue',
      },
      {
        id: 6,
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

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <BackHeader title={`${friendName}님과 나눈 편지`} />

      <main className='px-5 pb-[110px]'>
        <div className='mt-2 ty-body4 text-[var(--color-text-alternative)]'>
          {friendName}님과 이어진 질문
        </div>

        <h2 className='mt-1 ty-title1'>
          당신의 인생에 가장 큰 영감을
          <br />
          주는 사람은 누구인가요?
        </h2>

        {/* 바깥은 2열, 안쪽은 각 레인 flex-col */}
        <div className='mt-6 grid grid-cols-2 gap-x-[34px] items-start'>
          {/* 왼쪽 레인 (received) */}
          <div className='flex flex-col gap-[41px]'>
            {leftLane.map((p) => (
              <PostCard
                key={p.id}
                item={p}
                onClick={() => {
                  // navigate(`/friend/${friendId}/post/${p.id}`);
                }}
              />
            ))}
          </div>

          {/* 오른쪽 레인 (sent) - 상단 41px 오프셋 */}
          <div className='flex flex-col gap-[41px] pt-[41px]'>
            {rightLane.map((p) => (
              <PostCard
                key={p.id}
                item={p}
                onClick={() => {
                  // navigate(`/friend/${friendId}/post/${p.id}`);
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 플로팅 작성 버튼 */}
      <button
        type='button'
        onClick={() => navigate(`/friend/${friendId}/draft`)}
        className='fixed bottom-[112px] right-[calc(50%-187px+20px)] z-50
          h-[56px] w-[56px] rounded-full bg-[var(--color-primary-500)] text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
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
      {/* TODO: envelopeBg 다른 페이지에는 paperColor로 되어 있음. 추후 통일 필요 */}
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

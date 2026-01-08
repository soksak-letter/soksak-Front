// src/pages/friend/FriendPostPage.tsx
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader'; // 경로 맞춰줘

type PostItem = {
  id: number;
  title: string;
  date: string;
  colorKey: 'yellow' | 'blue' | 'pink' | 'cream';
};

export default function FriendPostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const friendId = params.friendId ?? '1';

  // TODO: friendName은 실제 데이터로 교체
  const friendName = '파란수박';

  // 더미 데이터
  const posts = useMemo<PostItem[]>(
    () => [
      { id: 1, title: '이지영선생님러브러브...', date: '2026.1.3', colorKey: 'yellow' },
      { id: 2, title: '나는현우진이좋은데...', date: '2026.1.3', colorKey: 'blue' },
      { id: 3, title: '이지영 사랑해', date: '2026.1.3', colorKey: 'blue' },
      { id: 4, title: '안녕하세요 날씨가 좋아...', date: '2026.1.3', colorKey: 'pink' },
      { id: 5, title: '이지영선생님러브러브...', date: '2026.1.3', colorKey: 'blue' },
      { id: 6, title: '이지영선생님러브러브...', date: '2026.1.3', colorKey: 'cream' },
    ],
    [],
  );

  return (
    <div className='min-h-screen bg-white'>
      <BackHeader title={`${friendName}님과 나눈 편지`} />

      <main className='px-5 pb-[110px]'>
        {/* <div className='mt-2 text-[13px] text-[#6F6F6F]'>파란수박님과 이어진 질문</div> */}
        <div className='mt-2 text-[13px] text-[#6F6F6F]'>{friendName}님과 이어진 질문</div>
        <h2 className='mt-1 text-[20px] font-semibold leading-[30px] text-[#171717]'>
          당신의 인생에 가장 큰 영감을
          <br />
          주는 사람은 누구인가요?
        </h2>

        {/* 2열 그리드 */}
        <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-6'>
          {posts.map((p) => (
            <button
              key={p.id}
              type='button'
              onClick={() => navigate(`/posts/${p.id}`)} // 상세 라우트 없으면 나중에 바꿔
              className='text-left'
            >
              {/* 봉투 자리 */}
              <div className={`h-[108px] w-full rounded-2xl ${envelopeBg(p.colorKey)}`} />
              <p className='mt-3 line-clamp-1 text-[14px] font-semibold text-[#171717]'>
                {p.title}
              </p>
              <p className='mt-1 text-[12px] text-[#6F6F6F]'>{p.date}</p>
            </button>
          ))}
        </div>
      </main>

      {/* 플로팅 작성 버튼 */}
      <button
        type='button'
        onClick={() => navigate(`/friend/${friendId}/draft`)}
        className='fixed bottom-[98px] right-[calc(50%-187px+20px)] z-50
          h-[56px] w-[56px] rounded-full bg-[#F5544C] text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
        aria-label='write'
      >
        ✎
      </button>
    </div>
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

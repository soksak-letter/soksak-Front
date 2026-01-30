import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import { Button } from '@/components/common/Button';
import { useLetterDetail } from '@/hooks/letters/useLetterDetail';

type ReplyViewData = {
  senderName: string;
  sentAtText: string; // '2025.8.27 6:21 AM'
  question: string;
  content: string;
};

export default function LetterReplyPage() {
  const navigate = useNavigate();
  const { letterId: letterIdParam } = useParams();
  const location = useLocation();

  const letterId = letterIdParam ? Number(letterIdParam) : 0;
  const { data, isLoading, isError, error } = useLetterDetail(letterId);

  // 필요하면 라우트에서 letterId/threadId를 받아와서 API 연결
  // const letterId = params.letterId;
  // const threadId = params.threadId;

  console.log('[LetterReplyPage] data:', data);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || !data) {
    return <div>편지를 불러오지 못했어요.</div>;
  }

  const handleReport = () => {
    navigate('/letter/report');
  };

  const handleReply = () => {
    navigate('/letter/other/draft');
  };

  const handleEnd = () => {
    navigate(-1); // TODO: 여기 뒤로가기가 아니라 모달 떠야함. 모달 구현 필요
  };

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader
        title={`${data.senderName}님의 편지`}
        rightElement={
          <button
            type='button'
            onClick={handleReport}
            className='ty-body5 font-medium text-[var(--color-primary-500)]'
          >
            신고하기
          </button>
        }
      />

      <main className='px-5 pb-[28px]'>
        <p className='mt-2 ty-body5 text-[var(--color-text-normal)]'>{data.sentAtText}</p>
        <p className='mt-2 ty-body5 text-[var(--color-text-normal)]'>내가 받았던 질문은</p>
        <h1 className='mt-1 whitespace-pre-line ty-title2 leading-[140%] text-[var(--color-text-normal)]'>
          {data.question}
        </h1>
        {/* TODO: 컴포넌트 교체 필요 */}
        <section className='mt-5 rounded-md border border-[#E7E2CF] bg-[#FBF5DD] px-4 py-4'>
          <div
            className='whitespace-pre-line text-[14px] leading-[180%] text-[var(--color-text-normal)]'
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 22px, rgba(55, 65, 81, 0.22) 22px, rgba(55, 65, 81, 0.22) 23px)',
              paddingBottom: '6px',
              minHeight: '360px',
            }}
          >
            {data.content}
          </div>
        </section>
        <div className='mt-6 grid grid-cols-2 gap-3'>
          <Button className='w-full' color='grey' onClick={handleEnd}>
            편지 끝내기
          </Button>
          <Button className='w-full' onClick={handleReply}>
            답장하기
          </Button>
        </div>
      </main>
    </div>
  );
}

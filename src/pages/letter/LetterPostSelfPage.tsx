import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import { Button } from '@/components/common/Button';

type PostSelfData = {
  letterId: string;
  createdAtText: string; // '2025.8.27 6:21 AM'
  question: string;
  content: string;
};

export default function LetterPostSelfPage() {
  const navigate = useNavigate();
  const params = useParams();
  const letterId = params.letterId ?? '1';

  // mock data (나중에 API 연결)
  const data = useMemo<PostSelfData>(() => {
    return {
      letterId,
      createdAtText: '2025.8.27 6:21 AM',
      question: '당신의 인생에 가장 큰 영감을\n주는 사람은 누구인가요?',
      content: `3개월 뒤 개굴이에게
개굴개굴개구리가
노래를 한다
개구리입니다`,
    };
  }, [letterId]);

  const handleGoWriteNew = () => {
    navigate('/letter/self/draft');
  };

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader title='나에게 받은 편지' />

      <main className='px-5 pb-[28px]'>
        {/* meta */}
        <p className='mt-2 ty-body5 text-[var(--color-text-assistive)]'>{data.createdAtText}</p>

        {/* label */}
        <p className='mt-2 text-[14px] font-medium text-[var(--color-text-normal)]'>
          내가 받았던 질문은
        </p>

        {/* question */}
        <h1 className='mt-1 whitespace-pre-line text-[22px] font-bold leading-[140%] text-[var(--color-text-normal)]'>
          {data.question}
        </h1>

        {/* paper */}
        <section className='mt-5 rounded-md border border-[#BFD9E6] bg-[#DFF2FB] px-4 py-4'>
          <div
            className='whitespace-pre-line text-[14px] leading-[180%] text-[var(--color-text-normal)]'
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 22px, rgba(55, 65, 81, 0.25) 22px, rgba(55, 65, 81, 0.25) 23px)',
              paddingBottom: '6px',
              minHeight: '320px',
            }}
          >
            {data.content}
          </div>
        </section>

        {/* CTA */}
        <div className='mt-6'>
          <Button className='w-full' onClick={handleGoWriteNew}>
            나에게 새로운 편지쓰러 가기
          </Button>
        </div>
      </main>
    </div>
  );
}

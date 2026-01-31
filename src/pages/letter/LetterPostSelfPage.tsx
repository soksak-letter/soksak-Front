import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import { Button } from '@/components/common/Button';
import { useLetterDetail } from '@/hooks/letters/useLetterDetail';
import { useMemo } from 'react';
import { FONT_ASSET_MAP, DEFAULT_FONT_ID } from '@/constants/fontAssets';
import { PAPER_ASSET_MAP, DEFAULT_PAPER_ID } from '@/constants/paperAssets';
import NotFoundPage from '../system/NotFoundPage';
import LetterCard from '@/components/letters/LetterCard';
import { LoadingDots } from '@/components/LoadingDots';

const parseSentAt = (isoOrNull: string | null) => {
  if (!isoOrNull) return '-';

  const d = new Date(isoOrNull);
  if (Number.isNaN(d.getTime())) return '-';

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  let hours = d.getHours(); // 0 ~ 23
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const isPM = hours >= 12;
  const ampm = isPM ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const hh = String(hours).padStart(2, '0');

  return `${y}.${m}.${day} ${hh}:${minutes} ${ampm}`;
};

type PostSelfData = {
  title: string;
  sentAtText: string;
  question: string;
  content: string;
  paperId: number;
  fontId: number;
  stampId: number;
  stampUrl: string;
};

export default function LetterPostSelfPage() {
  const navigate = useNavigate();
  const { letterId: letterIdParam } = useParams();
  const letterId = letterIdParam ? Number(letterIdParam) : 0;
  const { data, isLoading, isError, refetch } = useLetterDetail(letterId);

  const view = useMemo<PostSelfData | null>(() => {
    if (!data) return null;

    return {
      title: data.title,
      sentAtText: parseSentAt(data.deliveredAt),
      question: data.question,
      content: data.content,
      paperId: (data.design?.paper?.id ?? 0) + 1,
      fontId: data.design?.font?.id ?? 0,
      stampId: data.design?.stamp?.id ?? 0,
      stampUrl: data.design?.stamp?.assetUrl ?? '',
    };
  }, [data]);

  const assets = useMemo(() => {
    if (!view) return null;

    const font = FONT_ASSET_MAP[view.fontId] ?? FONT_ASSET_MAP[DEFAULT_FONT_ID];
    const paper = PAPER_ASSET_MAP[view.paperId] ?? PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

    return { font, paper };
  }, [view]);

  // 잘못된 접근 - 404 처리
  if (!letterIdParam) return <NotFoundPage />;

  const handleGoWriteNew = () => {
    navigate('/letter/self/draft');
  };

  const content = isLoading ? (
    <div className='flex flex-col items-center justify-center gap-8 py-50'>
      <LoadingDots fillIntervalMs={350} />
      <p className='ty-title2'>로딩 중...</p>
    </div>
  ) : isError || !view || !assets ? (
    <div className='flex flex-col items-center justify-center gap-8 py-30 text-center'>
      <p className='ty-title3'>편지를 불러오지 못했어요.</p>
      <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
        다시 시도
      </Button>
    </div>
  ) : (
    <>
      {/* 날짜/시간 + 질문 */}
      <p className='ty-body5 text-[var(--color-text-normal)]'>{view.sentAtText}</p>

      <h1 className='mt-1 whitespace-pre-line ty-title2 leading-[140%] text-[var(--color-text-normal)]'>
        {view.question}
      </h1>

      {/* 편지지 컴포넌트 */}
      <LetterCard
        PaperBg={assets.paper.Preview}
        font={assets.font.fontFamily}
        value={{ title: view.title, content: view.content }}
        className='rotate-1 mt-5'
      />

      {/* CTA */}
      <div className='mt-6'>
        <Button className='w-full' onClick={handleGoWriteNew}>
          나에게 새로운 편지쓰러 가기
        </Button>
      </div>
    </>
  );

  return (
    <div className='min-h-dvh bg-[var(--color-bg-500)]'>
      <BackHeader title='나에게 받은 편지' />

      <main className='px-5 pb-[28px]'>{content}</main>
    </div>
  );
}

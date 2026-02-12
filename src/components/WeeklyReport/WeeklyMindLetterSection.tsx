import PlanetIcon from '@/assets/icons/PlanetIcon.svg?react';

/* -------------------------
 * 카드 컴포넌트
 * ------------------------- */
type WeeklyMindLetterCardProps = {
  receiverName: string;
  body: string;
  title?: string;
  buttonText?: string;
  onClick?: () => void;
};

function WeeklyMindLetterCard({
  receiverName,
  body,
  title,
  buttonText = '다음 주 나에게 편지 쓰기',
  onClick,
}: WeeklyMindLetterCardProps) {
  const headerText = title ?? `${receiverName}님에게 도착한 주간 마음 편지`;

  return (
    <section className='w-full'>
      {/* 헤더 */}
      <div className='flex items-start gap-2'>
        <PlanetIcon className='mt-[2px]' />
        <h3 className='ty-title3'>{headerText}</h3>
      </div>

      {/* 본문 */}
      <p className='mt-3 whitespace-pre-line ty-body5 leading-[1.55]'>{body}</p>

      {/* CTA 버튼 */}
      <button
        type='button'
        onClick={onClick}
        className='mt-4 w-full h-[48px] rounded-[10px]
                   bg-[var(--color-primary-500)] text-white ty-body4
                   transition-transform active:scale-[0.99]'
      >
        {buttonText}
      </button>
    </section>
  );
}

/* -------------------------
 * 파란 배경 섹션 (export)
 * ------------------------- */
type WeeklyMindLetterSectionProps = {
  receiverName: string;
  body: string;
  onClick?: () => void;
};

export default function WeeklyMindLetterSection({
  receiverName,
  body,
  onClick,
}: WeeklyMindLetterSectionProps) {
  return (
    <div className='w-full rounded-[8px] bg-[#DFF1FF] p-[16px]'>
      <WeeklyMindLetterCard receiverName={receiverName} body={body} onClick={onClick} />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import type { Letter } from '@/types/letter';
import ReportLetterItem from '../letters/ReportLetterItem';

interface Props {
  letters: Letter[];
}

export default function ReportLetterCarousel({ letters }: Props) {
  const navigate = useNavigate();

  return (
    <div className='w-full overflow-hidden'>
      {/* 가로 스크롤 컨테이너 */}
      <div
        className='flex gap-[8px] overflow-x-auto pb-4 no-scrollbar'
        style={{
          msOverflowStyle: 'none' /* IE/Edge */,
          scrollbarWidth: 'none' /* Firefox */,
        }}
      >
        {/* 스크롤바 숨기기 (Chrome/Safari) */}
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {letters.map((letter) => (
          <div key={letter.id} className='flex-shrink-0 w-[104px] h-[80px]'>
            <ReportLetterItem letter={letter} onClick={() => navigate(letter.link)} />
          </div>
        ))}
      </div>
    </div>
  );
}

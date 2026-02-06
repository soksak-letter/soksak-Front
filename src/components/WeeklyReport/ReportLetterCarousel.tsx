import { useNavigate } from 'react-router-dom';
import type { FeedLetter } from '@/types/letter';
import ReportLetterItem from '../letters/ReportLetterItem';

interface Props {
  letters: FeedLetter[];
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
          <div key={letter.letterId} className='flex-shrink-0 w-[104px] h-[80px]'>
            {/* <ReportLetterItem letter={letter} onClick={() => navigate(letter.link)} /> */}
            <ReportLetterItem letter={letter} onClick={() => navigate('/')} />
            {/* TODO: 현재 타입에 링크가 존재하지 않아, 기존 코드에서 link는 주석처리하고 임의로 리다이렉트 시켰습니다. 꼭 수정해주세요 */}
          </div>
        ))}
      </div>
    </div>
  );
}

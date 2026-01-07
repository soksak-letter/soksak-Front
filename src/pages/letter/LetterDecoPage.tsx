import BackHeader from '@/components/common/headers/BackHeader';
import LetterPreviewCard from '@/components/LetterPreviewCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function LetterDecoPage() {
  const { mode } = useParams<{ mode?: string }>();
  const safeMode: Mode = mode === 'anon' || mode === 'other' || mode === 'self' ? mode : 'anon';

  const navigate = useNavigate();

  const { state } = useLocation();
  const { title = '', content = '' } = (state ?? {}) as { title?: string; content?: string };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='relative'>
      <BackHeader title='꾸미기' rightElement={<button>완료</button>} onBack={handleBack} />

      <p className='p-5 text-[20px] font-medium leading-[120%]'>편지를 마음껏 꾸며보세요.</p>

      {/* TODO : 편지지 디자인 확정 후 수정 */}
      {/* 편지 미리보기 Wrapper */}
      <div className='relative mx-auto w-full max-w-[320px] aspect-[2/3]'>
        {/* 편지지 배경 */}
        <LetterPreviewCard />

        {/* 텍스트 레이어 (겹침) */}
        <div className='absolute inset-0 flex flex-col px-3 pt-4 pb-3'>
          {/* 제목 */}
          <h3 className='text-[12px] font-semibold text-black/80 mb-2 line-clamp-2'>{title}</h3>
          {/* 내용 */}
          <p className='flex-1 text-[11px] leading-5 text-black/60 whitespace-pre-wrap overflow-hidden'>
            {content}
          </p>
        </div>
      </div>

      {/* TODO : 바텀시트 추가 */}
    </div>
  );
}

export default LetterDecoPage;

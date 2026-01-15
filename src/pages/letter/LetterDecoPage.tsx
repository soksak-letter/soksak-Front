import BackHeader from '@/components/common/headers/BackHeader';
import LetterCard from '@/components/letters/LetterCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useModalStore } from '@/stores/modalStore';
import { useEffect } from 'react';

type Mode = 'anon' | 'other' | 'self' | 'friend';

function LetterDecoPage() {
  const { mode } = useParams<{ mode?: string }>();
  const { state } = useLocation();
  const { openModal } = useModalStore();

  const { title = '', content = '' } = (state ?? {}) as { title?: string; content?: string };

  const navigate = useNavigate();

  // 유효하지 않은 mode인 경우 이전 페이지로 이동 또는 에러 처리
  const safeMode = ['anon', 'other', 'self', 'friend'].includes(mode ?? '') ? (mode as Mode) : null;
  useEffect(() => {
    if (!safeMode) {
      // TODO : 에러 페이지 제작 후 navigate('/error') 로 변경
      navigate(-1);
    }
  }, [safeMode, navigate]);

  if (!safeMode) return null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    openModal('letterSendingConfirm', {
      onConfirmSending: () => navigate(`/letter/${safeMode}/sending`),
    });
  };

  return (
    <div className='relative'>
      <BackHeader
        title='꾸미기'
        rightElement={
          <button type='button' onClick={handleSubmit}>
            완료
          </button>
        }
        onBack={handleBack}
      />

      <div className='p-5'>
        <p className='ty-title2'>편지를 마음껏 꾸며보세요.</p>
      </div>

      {/* TODO : 편지지 디자인 확정 후 수정 */}
      {/* 편지 미리보기 Wrapper */}
      <div className='relative mx-auto w-full max-w-[320px] aspect-[2/3]'>
        {/* 편지지 배경 */}
        <LetterCard />

        {/* 텍스트 레이어 (겹침) */}
        <div className='absolute inset-0 flex flex-col px-3 pt-4 pb-3'>
          {/* 제목 */}
          <div className='mb-2 line-clamp-2'>
            <p className='ty-title3'>{title}</p>
          </div>
          {/* 내용 */}
          <div className='flex-1 whitespace-pre-wrap overflow-hidden'>
            <p className='ty-body5'>{content}</p>
          </div>
        </div>
      </div>

      {/* TODO : 바텀시트 추가 */}
    </div>
  );
}

export default LetterDecoPage;

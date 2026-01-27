import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useState } from 'react';

import BackHeader from '@/components/common/headers/BackHeader';
import LetterCard from '@/components/letters/LetterCard';
import LetterStyleContent from '@/components/BottomSheet/contents/LetterStyleContent';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import LetterEnvelope from '@/components/letters/LetterEnvelope';

type Target = 'anon' | 'other' | 'self' | 'friend';
type StyleTab = 'font' | 'paper' | 'stamp';

function LetterDecoPage() {
  const { target } = useParams<{ target?: string }>();
  const { state } = useLocation();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const { title = '', content = '' } = (state ?? {}) as { title?: string; content?: string };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<StyleTab>('font');

  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeSheet = () => setIsOpen(false);

  // 유효하지 않은 target인 경우 이전 페이지로 이동 또는 에러 처리
  const safeMode = ['anon', 'other', 'self', 'friend'].includes(target ?? '')
    ? (target as Target)
    : null;
  useEffect(() => {
    if (!safeMode) {
      navigate('/error/404');
    }
  }, [safeMode, navigate]);

  if (!safeMode) return null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    setIsOpen(false);

    openModal('letterSendingConfirm', {
      onConfirmSending: () => navigate(`/letter/${safeMode}/sending`),
      onConfirmCancelSending: () => setIsOpen(true),
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
        {selectedTab === 'stamp' ? (
          <div className='absolute inset-0 flex justify-center'>
            <LetterEnvelope
              paperColor='#FFF7E6'
              stampSrc='https://via.placeholder.com/56x76.png?text=STAMP'
              stampAlt='test'
              className='mt-20 -rotate-4 shadow-sm'
            />
          </div>
        ) : (
          <LetterCard />
        )}
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
      {isOpen && (
        <BottomSheet
          isOpen={isOpen}
          onClose={closeSheet}
          overlay={false}
          closeOnOutside={false}
          height={362}
        >
          <LetterStyleContent selectedTab={selectedTab} onChangeTab={setSelectedTab} />
        </BottomSheet>
      )}{' '}
    </div>
  );
}

export default LetterDecoPage;

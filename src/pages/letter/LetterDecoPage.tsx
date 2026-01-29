import { useNavigate, useParams } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useState } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';

import BackHeader from '@/components/common/headers/BackHeader';
import LetterCard from '@/components/letters/LetterCard';
import LetterStyleContent from '@/components/BottomSheet/letterStyle/LetterStyleContent';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { LoadingDots } from '@/components/LoadingDots';
import { Button } from '@/components/common/Button';
import { DEFAULT_PAPER_ID, PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { DEFAULT_FONT_ID, FONT_ASSET_MAP } from '@/constants/fontAssets';
import { useGlobalToast } from '@/components/toast/ToastProvider';

type Target = 'anon' | 'other' | 'self' | 'friend';
type StyleTab = 'font' | 'paper' | 'stamp';

function LetterDecoPage() {
  const { draft, style, patchStyle } = useLetterStore();
  const { data, isLoading, isError, error, refetch } = useLetterStyleOptions();
  const { showToast } = useGlobalToast();

  const { target } = useParams<{ target?: string }>();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<StyleTab>('font');

  const fonts = data?.fonts ?? [];
  const papers = data?.papers ?? [];
  const stamps = data?.stamps ?? [];

  const selectedStamp = stamps.find((s) => s.id === style.stampId);

  const paperAsset =
    (style.paperId != null ? PAPER_ASSET_MAP[style.paperId] : undefined) ??
    PAPER_ASSET_MAP[DEFAULT_PAPER_ID];

  const PaperBg = paperAsset.Preview;
  const envelopeColor = paperAsset.envelopeColor;

  useEffect(() => {
    console.log('[Style fontId updated]', style.fontId);
  }, [style.fontId]);

  const fontFamily =
    (style.fontId != null ? FONT_ASSET_MAP[style.fontId]?.fontFamily : undefined) ??
    FONT_ASSET_MAP[DEFAULT_FONT_ID].fontFamily;

  const stampUrl = selectedStamp?.assetUrl ?? '';

  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeSheet = () => setIsOpen(false);

  // 잘못된 접근 방어 (URL로 직접 접근, 작성 흐름 없이 들어온 경우)
  const safeMode = ['anon', 'other', 'self', 'friend'].includes(target ?? '')
    ? (target as Target)
    : null;
  useEffect(() => {
    if (!safeMode) {
      navigate('/error/404', { replace: true });
    }
    if (!draft.title || !draft.content) {
      navigate(`/letter/${safeMode}/draft`, { replace: true });
    }
  }, [safeMode, navigate, draft.title, draft.content]);

  if (!safeMode) return null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    setIsOpen(false);

    if (!style.paperId || !style.fontId || !style.stampId) {
      setIsOpen(true);
      showToast('꾸미기 요소를 모두 선택해주셔야 합니다!', 'error');
      return;
    }

    openModal('letterSendingConfirm', {
      onConfirmSending: () => {
        navigate(`/letter/${safeMode}/sending`);
      },
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
      {/* 편지 미리보기 Wrapper */}
      <div className='relative mx-auto w-full max-w-[320px] aspect-[2/3]'>
        {selectedTab === 'stamp' ? (
          <div className='absolute inset-0 flex justify-center'>
            <LetterEnvelope
              paperColor={envelopeColor}
              stampSrc={stampUrl}
              stampAlt={selectedStamp?.name ?? '우표 이미지'}
              className='mt-20 -rotate-4 shadow-sm'
            />
          </div>
        ) : (
          <LetterCard
            PaperBg={PaperBg}
            font={fontFamily}
            value={{ title: draft.title, content: draft.content }}
            className='-rotate-1 mt-10'
          />
        )}
      </div>
      {isOpen && (
        <BottomSheet
          isOpen={isOpen}
          onClose={closeSheet}
          overlay={false}
          closeOnOutside={false}
          height={362}
          draggable={true}
          minHeight={100}
        >
          {isLoading ? (
            <div className='flex h-full flex-col items-center justify-center gap-8 -mt-5'>
              <LoadingDots fillIntervalMs={350} />
              <p className='mt-4 ty-title2'>로딩 중...</p>
            </div>
          ) : isError ? (
            <div className='flex h-full flex-col items-center justify-center gap-10 -mt-5 text-center'>
              <p className='ty-title2'>스타일을 불러오지 못했어요.</p>
              <Button type='button' onClick={() => refetch()} className='w-full max-w-[240px]'>
                다시 시도
              </Button>
            </div>
          ) : (
            <LetterStyleContent
              selectedTab={selectedTab}
              onChangeTab={setSelectedTab}
              value={style}
              onChange={(next) => patchStyle(next)}
              papers={papers}
              fonts={fonts}
              stamps={stamps}
            />
          )}
        </BottomSheet>
      )}
    </div>
  );
}

export default LetterDecoPage;

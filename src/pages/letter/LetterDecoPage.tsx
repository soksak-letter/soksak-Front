import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useState } from 'react';
import { useLetterStore } from '@/stores/letterStore';
import { useLetterStyleOptions } from '@/hooks/letters/useLetterStyleOptions';

import BackHeader from '@/components/common/headers/BackHeader';
import LetterCard from '@/components/letters/LetterCard';
import LetterStyleContent from '@/components/BottomSheet/letterStyle/LetterStyleContent';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import { LoadingDots } from '@/components/LoadingDots';
import { Button } from '@/components/common/Button';
import { DEFAULT_PAPER_ID, PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { DEFAULT_FONT_ID, FONT_ASSET_MAP } from '@/constants/fontAssets';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { ENVELOPE_ASSET_MAP } from '@/constants/envelopeAssets';

type Target = 'anon' | 'other' | 'self' | 'friend';
type StyleTab = 'font' | 'paper' | 'stamp';

function LetterDecoPage() {
  const setActiveTarget = useLetterStore((d) => d.setActiveTarget);
  const style = useLetterStore((d) => d.getStyle());
  const patchStyle = useLetterStore((d) => d.patchStyle);
  const draft = useLetterStore((s) => s.getDraft());

  const { data, isLoading, isError, refetch } = useLetterStyleOptions();
  const { showToast } = useGlobalToast();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  // senderName 불러오기
  const location = useLocation();
  const senderName = (location.state as { senderName?: string } | null)?.senderName ?? '익명';
  const friendName = (location.state as { friendName?: string } | null)?.friendName ?? '친구';

  const { target } = useParams<{ target?: string }>();

  const safeMode: Target | null =
    target === 'anon' || target === 'other' || target === 'self' || target === 'friend'
      ? target
      : null;

  // 페이지 진입 시 target 세팅
  useEffect(() => {
    if (!safeMode) return;
    setActiveTarget(safeMode);
  }, [safeMode, setActiveTarget]);

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

  const envelopeAsset =
    (style.paperId != null ? ENVELOPE_ASSET_MAP[style.paperId] : undefined) ??
    ENVELOPE_ASSET_MAP[DEFAULT_PAPER_ID];

  const EnvelopePreview = envelopeAsset?.Preview;

  const stampUrl = selectedStamp?.assetUrl ?? '';

  const fontFamily =
    (style.fontId != null ? FONT_ASSET_MAP[style.fontId]?.fontFamily : undefined) ??
    FONT_ASSET_MAP[DEFAULT_FONT_ID].fontFamily;

  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeSheet = () => setIsOpen(false);

  // 잘못된 접근 방어 (URL로 직접 접근, 작성 흐름 없이 들어온 경우)
  useEffect(() => {
    if (!safeMode) {
      navigate('/error/404', { replace: true });
      return;
    }

    // 제목/내용 둘 중 하나라도 없으면 draft로 돌려보내기
    const hasSomething = draft.title.trim().length > 0 || draft.content.trim().length > 0;

    if (!hasSomething) {
      navigate(`/letter/${safeMode}/draft`, { replace: true });
    }
  }, [safeMode, navigate, draft.title, draft.content]);

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
      friendName,
      onConfirmSending: () => {
        navigate(`/letter/${safeMode}/sending`, {
          state: { senderName, friendName },
        });
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
        <p className='ty-title2'>편지를 마음껏 꾸며보세요!</p>
      </div>
      {/* 편지 미리보기 Wrapper */}
      <div className='relative mx-auto w-full aspect-[2/3]'>
        {selectedTab === 'stamp' ? (
          <div className='absolute inset-0 flex justify-center'>
            <div className='relative w-[340px] h-[250px] -rotate-3'>
              {EnvelopePreview ? (
                <EnvelopePreview className='h-full w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
              ) : (
                <div className='h-full w-full rounded-xl bg-[#F2F2F2] drop-shadow-[0_10px_25px_rgba(0,0,0,0.10)]' />
              )}

              {!!stampUrl && (
                <img
                  src={stampUrl}
                  className='absolute -rotate-5 right-[30px] bottom-[40px] h-[90px] w-[90px] object-contain pointer-events-none'
                  draggable={false}
                />
              )}
            </div>
          </div>
        ) : (
          <LetterCard
            PaperBg={PaperBg}
            font={fontFamily}
            value={{ title: draft.title, content: draft.content }}
            className='mt-5'
          />
        )}
      </div>
      {isOpen && (
        <BottomSheet
          isOpen={isOpen}
          onClose={closeSheet}
          overlay={false}
          closeOnOutside={false}
          height={340}
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

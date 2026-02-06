import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import IosNotificationGuideModal from '@/modals/IosNotificationGuideModal';
import { useEffect, useState } from 'react';

import LetterCard from '@/components/letters/LetterCard';
import { PAPER_ASSET_MAP } from '@/constants/paperAssets';
import { FONT_ASSET_MAP } from '@/constants/fontAssets';
import { useLetterStore } from '@/stores/letterStore';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';

import { subscribePush } from '@/utils/push/subscribePush';
import useToast from '@/hooks/useToast';
import { putPushSubscription } from '@/api/putPushSubscription';

type LocationState = {
  title?: string;
  content?: string;
};

export default function OnboardingLetterGuidePage() {
  const { state } = useLocation() as { state?: LocationState };
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // location.state + store fallback
  const draft = useLetterStore((s) => s.getDraft());
  const patchDraft = useLetterStore((s) => s.patchDraft);

  const title = state?.title ?? draft.title ?? '제목';
  const content = state?.content ?? draft.content ?? '';

  const mintPaperId = 1; //  mint paper 선택
  const PaperBg = PAPER_ASSET_MAP[mintPaperId].Preview;

  const fontId = 3; // TODO: 나눔히피체가 추가되면 해당 폰트 ID로 교체 필요
  const fontFamily = FONT_ASSET_MAP[fontId].fontFamily;

  useEffect(() => {
    if (state?.title || state?.content) {
      patchDraft({ title: state?.title ?? '', content: state?.content ?? '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = async () => {
    // 0) 버튼 중복 클릭 방지용 로딩 상태 사용
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1) 브라우저 푸시 구독 시도
      const result = await subscribePush();

      // 2) 구독 성공이면 백엔드에 등록(PUT)
      if (result.ok) {
        const res = await putPushSubscription(result.body);

        if (res.data.resultType === 'SUCCESS' && res.data.success?.updated) {
          showToast('알림 설정이 완료되었어요', 'success');
          console.log('[push subscription]', result.body);
        } else {
          showToast('알림 등록에 실패했어요. 설정에서 다시 시도해 주세요.', 'error');
        }
      } else {
        // 실패 사유별로 UX 안내를 다르게 줄 수도 있음
        // - INSECURE_CONTEXT: 로컬/비보안 컨텍스트
        // - DENIED: 사용자가 거절
        // - NO_SW/NO_NOTIFICATION: 브라우저 미지원
        // - MISSING_VAPID: env 누락
        // - NO_KEYS: 구독 객체 이상

        if (result.reason === 'INSECURE_CONTEXT') {
          showToast(
            '현재 환경에서는 알림 설정이 어려워요. 배포 환경에서 다시 시도해 주세요.',
            'error',
          );
        } else if (result.reason === 'DENIED') {
          showToast('알림 권한이 거절되었어요. 설정에서 다시 켤 수 있어요.', 'error');
        } else {
          showToast('알림을 설정하지 못했어요. 설정에서 다시 켤 수 있어요.', 'error');
        }

        console.debug('[push] subscribe failed:', result.reason);
      }
    } catch (e) {
      // 네트워크/서버 에러 등
      console.error('[push] unexpected error', e);
    } finally {
      // 3) 푸시 성공/실패와 무관하게 다음 화면으로 이동
      navigate('/onboarding/letter-send', { replace: true });

      console.log({
        question: '3일 뒤, 나는 어떤 모습으로 달라져 있을까요?',
        title,
        content,
      });

      setIsSubmitting(false);
    }
  };
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6 pb-6 bg-[var(--color-bg-500)]'>
      <button
        type='button'
        onClick={() => setIsGuideOpen(true)}
        className='text-right ty-body3 text-(--color-text-assistive) underline underline-offset-2'
      >
        알림 설정 가이드
      </button>

      {isGuideOpen && <IosNotificationGuideModal onClose={() => setIsGuideOpen(false)} />}

      <div className='mt-4 text-center'>
        <p className='mt-2 ty-body3 text-[#000000] leading-6'>
          속삭편지에 오신 걸 환영해요
          <br />
          3일 뒤의 나에게 가볍게 편지를 작성해볼까요?
          <br />
          깜짝 선물처럼 알림을 보내드릴게요.
        </p>

        <p className='mt-[28px] ty-title3 text-(--color-primary-500)'>
          3일 뒤, 나는 어떤 모습으로 달라져 있을까요?
        </p>
      </div>

      <div className='mt-6 flex flex-1 items-center justify-center'>
        <div
          className='relative w-[240px] h-[390px] -translate-y-[40px] flex justify-center [&_.z-10]:translate-y-[20px]
  [&_.z-10]:transform'
        >
          <div
            className='relative'
            style={{
              transform: 'scale(0.775)',
              transformOrigin: 'center',
            }}
          >
            <LetterCard
              PaperBg={PaperBg}
              font={fontFamily}
              value={{ title, content }}
              className={[
                'rotate-[2deg]',
                'drop-shadow-[0_12px_30px_rgba(0,0,0,0.08)]',
                '!bg-transparent',
                '!shadow-none',
                '!ring-0 !border-0',
                '!p-0',
                'overflow-visible',
              ].join(' ')}
            />
          </div>

          <HappyModalIcon className='absolute bottom-[-48px] right-[-28px] h-[77.5px] w-[80px]' />
        </div>
      </div>

      <div className='mt-auto flex justify-center pt-10'>
        <Button color='primary' size='large' onClick={handleNext} disabled={isSubmitting}>
          다음으로
        </Button>
      </div>
    </div>
  );
}

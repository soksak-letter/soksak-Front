import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';

import ReviewIcon from '@/assets/icons/reviewIcon.svg?react';
import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';
import LoveIcon from '@/assets/icons/LoveIcon.svg?react';

import { useCreateReview } from '@/hooks/useCreateReview';
import { useThreadFlowStore } from '@/stores/letterContextStore';
import { useGlobalToast } from '@/components/toast/ToastProvider';

type ReviewMood = 'meh' | 'good' | 'love';

const MOODS: Array<{
  key: ReviewMood;
  label: string;
}> = [
  { key: 'meh', label: '그냥 그래요' },
  { key: 'good', label: '좋아요!' },
  { key: 'love', label: '또 만나고 싶어요' },
];

export default function LetterReviewPage() {
  const navigate = useNavigate();

  const [mood, setMood] = useState<ReviewMood | null>(null);
  const [temp, setTemp] = useState<number>(36.5);

  const percent = useMemo(() => {
    return Math.min(100, Math.max(0, temp));
  }, [temp]);
  // 2. 핸들(서클) 및 온도 텍스트 통합 위치 스타일
  // translateX(-50%)를 사용해 정확히 중앙을 맞춥니다.
  const positionStyle = useMemo(
    () => ({
      left: `${percent}%`,
      transform: 'translateX(-50%)',
    }),
    [percent],
  );

  // URL params 우선 > 없으면 store로 sessionId 받아오기
  const { sessionId: sessionIdParam } = useParams<{ sessionId?: string }>();
  const sessionIdFormStore = useThreadFlowStore((s) => s.sessionId);

  const sessionId = sessionIdParam ? Number(sessionIdParam) : sessionIdFormStore;

  const { showToast } = useGlobalToast();
  const senderName = useThreadFlowStore((s) => s.senderName ?? '익명');
  // TODO : 내 이름 불러오기
  const username = '개굴';

  // 서버에 보낼 데이터로 매핑 (reviewTag)
  const moodToTag = (m: ReviewMood) => {
    if (m === 'meh') return '그냥 그래요';
    if (m === 'good') return '좋아요!';
    return '또 만나고 싶어요';
  };

  // sessionId 없으면 막기
  const createReview = useCreateReview();
  const canSubmit = mood !== null && !!sessionId && !createReview.isPending;

  // POST 요청
  const handleSubmit = async () => {
    if (!mood) {
      showToast('기분을 선택해주세요.');
      return;
    }
    if (!sessionId) {
      navigate('/error/404', { replace: true });
      return;
    }

    if (createReview.isPending) return;

    const body = {
      temperatureScore: temp,
      reviewTag: moodToTag(mood),
    };

    createReview.mutate(
      { sessionId, body },
      {
        onSuccess: () => {
          showToast('후기를 보냈어요!', 'success');
          navigate('/home/main');
        },
        onError: (err) => {
          showToast(err?.reason ?? '후기 전송 실패. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <BackHeader
        title='후기 보내기'
        rightElement={
          <button
            type='button'
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={[
              'ty-body4',
              canSubmit ? 'text-[var(--color-text-default)]' : 'text-[var(--color-text-assistive)]',
            ].join(' ')}
          >
            완료
          </button>
        }
      />

      <div className='px-5 pb-10'>
        {/* ===== 익명 프로필 ===== */}
        <div className='mt-6 flex flex-col items-center'>
          <ReviewIcon className='w-26 h-26' />
          <p className='mt-5 ty-title3 text-[#000000]'>{senderName}님</p>
        </div>

        {/* ===== 카피 ===== */}
        <div className='mt-8'>
          <p className='ty-body2 text-[#000000] leading-[160%]'>
            {username}님, {senderName}님과의 편지는 어땠나요?
            <br />
            편지 후기를 남겨주세요.
          </p>
          <p className='mt-2 ty-body5 text-[var(--color-text-alternative)] leading-[160%]'>
            남겨주신 온도는 이후 매칭에 활용됩니다.
          </p>
        </div>

        {/* ===== 이모지 3택1: 3열/간격/텍스트 강조 ===== */}
        <div className='mt-7 grid grid-cols-3 gap-3'>
          {MOODS.map((m) => {
            const selected = mood === m.key;

            // 아이콘 3개 분기
            const Icon =
              m.key === 'meh' ? SadModalIcon : m.key === 'love' ? LoveIcon : HappyModalIcon;

            return (
              <button
                key={m.key}
                type='button'
                onClick={() => setMood(m.key)}
                className='flex flex-col items-center'
                aria-pressed={selected}
              >
                {/* div는 레이아웃 전용 래퍼 */}
                <div className='flex items-center justify-center rounded-full'>
                  <Icon className='w-[92px] h-[77.5px]' />
                </div>

                <span
                  className={['mt-3 ty-body5', selected ? 'text-[#F5544C]' : 'text-[#000000]'].join(
                    ' ',
                  )}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== 슬라이더 ===== */}
        <div className='mt-[45px]'>
          <p className='ty-body2 text-[#000000]'>우리의 편지 온도는 어땠나요?</p>
          <p className='mt-2 ty-body5 text-[var(--color-text-alternative)]'>
            남겨주신 온도는 이후 매칭에 도움이 됩니다.
          </p>

          <div className='mt-[27px] w-full px-[15px] relative '>
            {/* A. 시각적 디자인 레이어 (실제 슬라이더 아래에 위치) */}
            <div className='relative h-2 bg-[#F3B6B3] rounded-full'>
              {/* 채워진 게이지 (왼쪽부터 현재 온도까지) */}
              <div
                className='absolute left-0 top-0 h-full bg-[var(--color-primary-500)] rounded-full'
                style={{ width: `${percent}%` }}
              />
              {/* 커스텀 핸들 (분홍색 큰 원) */}
              <div
                className='absolute top-1/2 w-[22px] h-[22px] bg-[var(--color-primary-500)] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.2)]'
                style={{
                  top: '-50%', // 부모 h-2의 중앙
                  marginTop: '0px', // 미세 조정 필요 시 사용
                  ...positionStyle,
                }}
              />

              {/* 온도 표시 텍스트 (원 바로 아래) */}
              <div
                className='absolute top-[20px] ty-body4 text-[var(--color-primary-500)] font-bold whitespace-nowrap'
                style={positionStyle}
              >
                {percent.toFixed(1)}도
              </div>
            </div>

            <input
              type='range'
              min={0}
              max={100}
              step={0.5}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className='absolute top-[-16px] left-0 w-full h-10 opacity-0 cursor-pointer z-10'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

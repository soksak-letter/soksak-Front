import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader';
import LetterEnvelope from '@/components/letters/LetterEnvelope';

import SadModalIcon from '@/assets/icons/SadModalIcon.svg?react';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';
import LoveIcon from '@/assets/icons/LoveIcon.svg?react';

import stampEx1 from '@/assets/test/stampEx1.svg';
import stampEx2 from '@/assets/test/stampEx2.svg';

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
  //   const { letterId } = useParams<{ letterId: string }>();

  const [mood, setMood] = useState<ReviewMood | null>(null);
  const [temp, setTemp] = useState<number>(0);
  const [isSliding, setIsSliding] = useState(false);

  const percent = useMemo(() => Math.min(100, Math.max(0, temp)), [temp]);
  const canSubmit = mood !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    // await postLetterReview({ letterId, mood, temperature: temp });
    navigate(-1);
  };

  const testStamps = [
    { id: 'stamp-1', src: stampEx1 },
    { id: 'stamp-2', src: stampEx2 },
  ];

  // 피그마 봉투 사이즈 (W 174.54 / H 97.98)
  const FIGMA_W = 174.54;
  const FIGMA_H = 97.98;

  // LetterEnvelope 기본이 296.45 x 162.52 라는 전제에서 스케일
  const BASE_W = 296.45;
  const scale = FIGMA_W / BASE_W; // ≈ 0.589
  const rotateDeg = -4.03;

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
        {/* ===== 봉투: 디자인처럼 중앙 고정 ===== */}
        <div className='mt-6 flex flex-col items-center'>
          <div
            className='flex items-center justify-center'
            style={{ width: FIGMA_W, height: FIGMA_H }}
          >
            <div
              style={{
                transform: `scale(${scale}) rotate(${rotateDeg}deg)`,
                transformOrigin: 'center',
              }}
            >
              <LetterEnvelope
                paperColor='#EBF7DF'
                stampSrc={testStamps[0].src}
                stampAlt='우표 이미지'
                className='shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[6px]'
              />
            </div>
          </div>

          <p className='mt-5 ty-title3 text-[#000000]'>파란수박님</p>
        </div>

        {/* ===== 카피 ===== */}
        <div className='mt-8'>
          <p className='ty-body2 text-[#000000] leading-[160%]'>
            개굴님, 파란수박님과의 편지는 어땠나요?
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
                <div className='flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#E8F3FF]'>
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
        <div className='mt-10'>
          <p className='ty-body2 text-[#000000]'>우리의 편지 온도는 어땠나요?</p>
          <p className='mt-2 ty-body5 text-[var(--color-text-alternative)]'>
            남겨주신 온도는 이후 매칭에 도움이 됩니다.
          </p>

          <div className='mt-5'>
            <div
              className='relative'
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => setIsSliding(false)}
              onTouchStart={() => setIsSliding(true)}
              onTouchEnd={() => setIsSliding(false)}
            >
              {(isSliding || temp !== 0) && (
                <div
                  className='pointer-events-none absolute -bottom-7 ml-2 ty-body4 text-[var(--color-primary-500)]'
                  style={{
                    left: `calc(${percent}% - 10px)`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {temp}도
                </div>
              )}

              <input
                type='range'
                min={0}
                max={100}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className='w-[320px] ml-2 appearance-none bg-transparent outline-none'
                style={
                  {
                    // @ts-expect-error CSS var
                    '--fill': `${percent}%`,
                  } as React.CSSProperties
                }
              />

              <style>{`
                input[type="range"]{
                  height: 24px;
                }
                input[type="range"]::-webkit-slider-runnable-track{
                  height: 8px;
                  border-radius: 9999px;
                  background: linear-gradient(
                    to right,
                    var(--color-primary-500) 0%,
                    var(--color-primary-500) var(--fill),
                    #F3B6B3 var(--fill),
                    #F3B6B3 100%
                  );
                }
                input[type="range"]::-webkit-slider-thumb{
                  -webkit-appearance: none;
                  width: 22px;
                  height: 22px;
                  margin-top: -7px;
                  border-radius: 9999px;
                  background: var(--color-primary-500);
                  border: none;
                  box-shadow: 0 1px 2px rgba(0,0,0,0.12);
                }
                input[type="range"]::-moz-range-track{
                  height: 8px;
                  border-radius: 9999px;
                  background: #F3B6B3;
                }
                input[type="range"]::-moz-range-progress{
                  height: 8px;
                  border-radius: 9999px;
                  background: var(--color-primary-500);
                }
                input[type="range"]::-moz-range-thumb{
                  width: 22px;
                  height: 22px;
                  border-radius: 9999px;
                  background: var(--color-primary-500);
                  border: none;
                  box-shadow: 0 1px 2px rgba(0,0,0,0.12);
                }
              `}</style>
            </div>

            <div className='mt-1 flex items-center justify-between ty-body5 text-[var(--color-text-normal)]'>
              <span>0도</span>
              <span>100도</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

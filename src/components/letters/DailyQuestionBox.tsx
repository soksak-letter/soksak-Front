import type React from 'react';
import { useState } from 'react';

type DailyQuestionBoxProps = {
  question: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  bubbleBgColor?: string;
  bubbleTextStyle?: string;
};

const DailyQuestionBox = ({
  question,
  Icon,
  iconClassName = 'text-[var(--color-text-normal)]',
  bubbleBgColor = '#E5E6E6',
  bubbleTextStyle = '',
}: DailyQuestionBoxProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div className='flex items-center'>
        <button
          type='button'
          className='flex items-center gap-2'
          onClick={() => setIsClicked((v) => !v)}
        >
          <Icon className={iconClassName} />
          <span className='ty-detail text-[var(--color-text-assistive)]'>
            오늘의 질문이 궁금하다면?
          </span>
        </button>
      </div>

      <div
        className={`
          flex flex-col items-start -mt-2
          transition-all duration-200
          ${isClicked ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        style={{ pointerEvents: isClicked ? 'auto' : 'none' }}
      >
        <div className='flex flex-col items-start -ml-2 -mt-1'>
          {/* 꼬리 */}
          <div
            className='ml-[9px] h-0 w-0 border-x-[6px] border-x-transparent border-b-[8px]'
            style={{ borderBottomColor: bubbleBgColor }}
          />

          {/* 본문 */}
          <div
            className='max-w-[340px] rounded-[8px] px-3 py-2 leading-[160%] shadow-sm ty-detailMedium'
            style={{
              backgroundColor: bubbleBgColor,
              color: bubbleTextStyle,
            }}
          >
            {question}
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyQuestionBox;

import type React from 'react';
import { useState } from 'react';

type DailyQuestionBoxProps = {
  question: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  bubbleBgColor?: string;
  bubbleClassName?: string;
};

const DailyQuestionBox = ({
  question,
  Icon,
  iconClassName = 'w-[14px] h-[14px]',
  bubbleBgColor = '#E5E6E6',
  bubbleClassName = '',
}: DailyQuestionBoxProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          className={`flex items-center ${iconClassName}`}
          onClick={() => setIsClicked((v) => !v)}
        >
          <Icon className={iconClassName} />
        </button>
        <span className='text-[12px] text-[var(--color-text-assistive)]'>
          오늘의 질문이 궁금하다면?
        </span>
      </div>

      {isClicked && (
        <div className='flex flex-col items-start transition-opacity duration-200'>
          <div className='flex flex-col items-start -ml-2 -mt-1'>
            {/* 꼬리 */}
            <div
              className='ml-[9px] h-0 w-0 border-x-[6px] border-x-transparent border-b-[8px]'
              style={{ borderBottomColor: bubbleBgColor }}
            />
            {/* 본문 */}
            <div
              className={`max-w-[340px] rounded-[8px] px-3 py-2 text-[12px] leading-[160%] text-[var(--color-text-normal)] shadow-sm ${bubbleClassName}`}
              style={{ backgroundColor: bubbleBgColor }}
            >
              {question}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyQuestionBox;

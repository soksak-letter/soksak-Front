import React, { useState } from "react";
import Question from '../../assets/icons/Question.svg?react'

interface DailyQuestionBoxProps = {
  question: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  bubbleBgColor?: string;
  bubbleClassName?: string;
  className?: string;
}

const DailyQuestionBox = ({
  question, Icon, iconClassName, bubbleBgColor, bubbleClassName, className
}: DailyQuestionBoxProps) => {
    const [isClicked, setIsClicked] = useState(false);
    
    // mock data
    const dailyQuestion = '당신의 인생에 큰 영감을 주는 사람은 누구인가요?';

  return (
    <>
    
<div className='flex items-center gap-2'>
          <button
            type='button'
            className='flex items-center w-[14px] h-[14px]'
            onClick={() => setIsClicked((v) => !v)}
          >
            <Question />
          </button>
          <span className='text-[12px] text-[var(--color-text-assistive)]'>
            오늘의 질문이 궁금하다면?
          </span>
        </div>
        <div
          className={`flex flex-col items-start transition-opacity duration-200 ${isClicked ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='flex flex-col items-start -ml-2 -mt-1'>
            {/* 꼬리 */}
            <div className='ml-[9px] h-0 w-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-[#E5E6E6]' />
            {/* 본문 */}
            <div
              className='max-w-[340px] rounded-[10px] bg-[#E5E6E6] px-3 py-2
                      text-[12px] font-medium leading-[160%] text-[var(--color-text-normal)] shadow-sm'
            >
              {dailyQuestion}
            </div>
          </div>
        </div>
    </>
      )
    }

export default DailyQuestionBox;
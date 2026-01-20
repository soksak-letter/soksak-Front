import { useState, type ChangeEvent } from 'react';

type LetterTextBoxValue = {
  title: string;
  content: string;
};

type LetterTextBoxProps = {
  value: LetterTextBoxValue;
  // eslint-disable-next-line no-unused-vars
  onChange: (next: LetterTextBoxValue) => void;
  // 부모 className에 w, h값 명시하여 사용해주시면 됩니다
  className?: string;
};

const LENGTH = {
  TITLE: { MIN: 3, MAX: 20 },
  CONTENT: { MAX: 500 },
} as const;

const LetterTextBox = ({ value, onChange, className }: LetterTextBoxProps) => {
  const [titleTouched, setTitleTouched] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextTitle = e.target.value;
    onChange({
      ...value,
      title:
        nextTitle.length <= LENGTH.TITLE.MAX ? nextTitle : nextTitle.slice(0, LENGTH.TITLE.MAX),
    });
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextContent = e.target.value;
    onChange({
      ...value,
      content:
        nextContent.length <= LENGTH.CONTENT.MAX
          ? nextContent
          : nextContent.slice(0, LENGTH.CONTENT.MAX),
    });
  };

  return (
    <div className='flex flex-col'>
      <div className={`flex flex-col ${className ?? ''}`}>
        <div className='h-[46px] shrink-0 rounded-t-md bg-[#EFEFEF] px-4 py-2.5 shadow-[0_0px_20px_8px_rgba(0,0,0,0.05)]'>
          <input
            value={value.title}
            onChange={handleTitleChange}
            onBlur={() => setTitleTouched(true)}
            className='w-full py-1 bg-transparent text-[14px] font-medium text-gray-800 placeholder:text-[#8C8C8C] focus:outline-none'
            placeholder='제목'
          />
        </div>

        <div className='flex-1 rounded-b-md bg-white shadow-[0_8px_15px_6px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col'>
          <textarea
            value={value.content}
            onChange={handleContentChange}
            className='flex-1 w-full resize-none bg-transparent px-4 py-4
                      text-[14px] leading-[170%] text-gray-800
                      placeholder:text-gray-500 focus:outline-none
                      overflow-y-auto'
            placeholder='오늘의 질문을 읽고 얘기해보고 싶은 내용이나 주제가 있나요? 자유롭게 작성해보세요.'
          />
        </div>
      </div>
      <div className='flex justify-end p-3 ty-detailMedium tabular-nums'>
        {value.content.length}/{LENGTH.CONTENT.MAX}
      </div>
    </div>
  );
};

export default LetterTextBox;

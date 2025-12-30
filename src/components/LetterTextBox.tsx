import { useState, type ChangeEvent } from 'react';

const LetterTextBox = () => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const LENGTH = {
    TITLE: {
      MIN: 3,
      MAX: 20,
    },
    CONTENT: {
      MAX: 500,
    },
  } as const;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setTitle(next.length <= LENGTH.TITLE.MAX ? next : next.slice(0, LENGTH.TITLE.MAX));
  };

  const handleContextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setContext(next.length <= LENGTH.CONTENT.MAX ? next : next.slice(0, LENGTH.CONTENT.MAX));
  };

  // const isTitleValid =
  //   title.length === 0 || (title.length >= LENGTH.TITLE.MIN && title.length <= LENGTH.TITLE.MAX);

  return (
    <div className='w-full max-w-xl mx-auto'>
      <div className='min-h-[49px] w-[343px] resize-none rounded-t-md bg-[#EFEFEF] px-4 py-3 text-xl font-medium text-[#8C8C8C] shadow-sm'>
        <input
          value={title}
          onChange={handleTitleChange}
          className='w-full bg-transparent text-xl font-medium text-gray-800 placeholder:text-[#8C8C8C] focus:outline-none'
          placeholder='제목'
        />
      </div>

      <div className='h-[350px] w-[343px] rounded-b-md border border-t-0 border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col'>
        <textarea
          value={context}
          onChange={handleContextChange}
          className='flex-1 w-full resize-none bg-transparent px-4 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none overflow-y-auto'
          placeholder={`오늘의 질문을 읽고 
얘기해보고 싶은 내용이나 주제가 있나요?

자유롭게 작성해보세요.`}
        />

        <div className='shrink-0 flex items-center justify-end px-3 py-2 text-sm text-gray-500 tabular-nums'>
          {context.length} / {LENGTH.CONTENT.MAX}
        </div>
      </div>
    </div>
  );
};

export default LetterTextBox;

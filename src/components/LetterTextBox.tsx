const LetterTextBox = () => {
  return (
    <div className='relative flex flex-col w-full items-center justify-center max-w-xl mx-auto'>
      <div className='min-h-[49px] w-[343px] resize-none rounded-t-md bg-[#EFEFEF] px-4 py-3 text-xl font-medium text-[#8C8C8C] shadow-sm'>
        제목
      </div>

      <textarea
        className='min-h-[350px] w-[343px] resize-none rounded-b-md border border-none
                   bg-white px-4 py-3 text-base text-gray-800 shadow-sm
                   placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300'
        placeholder={`오늘의 질문을 읽고 
얘기해보고 싶은 내용이나 주제가 있나요?

자유롭게 작성해보세요.`}
      />
    </div>
  );
};

export default LetterTextBox;

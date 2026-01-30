import Soksakletter from '@/assets/icons/Soksakletter.svg?react';
const SplashPage = () => {
  return (
    <div className='w-[375px] bg-[#FAFAFA]! h-screen mx-auto flex flex-col items-center justify-center px-[85px] relative'>
      <div className='flex flex-col gap-[32px] items-center'>
        <Soksakletter />
        <div className='flex flex-col items-center justify-center'>
          <p className='ty-title2'>나를 만나는 질문,</p>
          <p className='ty-title2'>타인과 나누는 익명 편지</p>
        </div>
      </div>
    </div>
  );
};
export default SplashPage;

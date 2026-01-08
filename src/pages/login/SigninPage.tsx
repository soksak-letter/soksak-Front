const SigninPage = () => {
  return (
    <div className='w-[375px] mx-auto  flex flex-col items-center justify-center '>
      <input
        type='text'
        placeholder='아이디'
        className='w-[342px] h-[48px] px-4 border border-line-normal rounded-lg'
      />
      <input
        type='text'
        placeholder='비밀번호'
        className='w-[342px] h-[48px] px-4 border border-line-normal rounded-lg'
      />
    </div>
  );
};
export default SigninPage;

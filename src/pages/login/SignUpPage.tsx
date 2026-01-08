import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // 로그인 로직 처리
    console.log('로그인 시도');
    navigate('/'); // 로그인 성공 시 메인으로 이동
  };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='회원가입' />
      </div>
      <div className='flex flex-col px-[16px] py-[10px] gap-[8px] '>
        <p className='ty-title3 w-[343px] h-[29px]'>기본정보</p>
        <p className='ty-body4 w-[343px] h-[24px]'>이메일</p>
        <div className='flex flex-row gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='비밀번호'
            className='w-[240px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
          <Button color='grey' size='small' className='w-[80px] h-[48px]'>
            중복확인
          </Button>
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>아이디</p>
        <div className='flex flex-row gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='아이디'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>비밀번호</p>
        <div>
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='text'
              placeholder='비밀번호'
              className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호는 영문, 숫자를 포함하여 최대 16자리까지 입력 가능합니다.
            </p>
          </div>
          <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
            <input
              type='text'
              placeholder='비밀번호 확인'
              className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
            />
            <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
              비밀번호를 다시 입력해주세요.
            </p>
          </div>
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>이름</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='이름'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
        </div>
        <p className='ty-body4 w-[343px] h-[24px]'>휴대폰 번호</p>
        <div className='flex flex-col gap-[8px] w-[343px] h-[75px]'>
          <input
            type='text'
            placeholder='휴대폰 번호'
            className='w-[343px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
          />
          <p className='px-[3px] ty-detail text-[var(--color-text-assistive)]'>
            휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;

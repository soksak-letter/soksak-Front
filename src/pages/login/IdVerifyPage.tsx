import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';

const IdVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // navigate state로 전달받은 데이터
  const { id, date } = location.state || { id: '-', date: '-' };

  return (
    <div className='relative flex flex-col h-full'>
      <div className='mb-[32px]'>
        <p className='ty-body2 text-[var(--color-text-normal)]'>
          회원님의 이메일 정보와 일치하는 아이디입니다.
        </p>
      </div>

      <div className='w-full bg-[var(--color-primary-100)] rounded-[12px] p-6 mb-8'>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='ty-body4 text-[var(--color-text-alternative)] mb-1'>아이디</p>
            <p className='ty-body4 text-[var(--color-text-normal)]'>{id}</p>
          </div>
          <div>
            <p className='ty-body4 text-[var(--color-text-alternative)] mb-1'>가입일</p>
            <p className='ty-body4 text-[var(--color-text-normal)]'>{date}</p>
          </div>
        </div>
      </div>

      <div className='absolute bottom-[300px] w-full px-[5px] flex justify-center gap-3'>
        <Button className='flex-1' color='primary' onClick={() => navigate('/auth/signin')}>
          로그인하기
        </Button>
        <Button className='flex-1' color='grey' onClick={() => navigate('/auth/pw-find')}>
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
};
export default IdVerifyPage;

import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';

const IdVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // navigate state로 전달받은 데이터
  const { id, date } = location.state || { id: '-', date: '-' };

  return (
    <div className='flex flex-col h-full'>
      <div className='mb-6'>
        <p className='text-[18px] font-bold text-[#171717]'>
          회원님의 이메일 정보와 일치하는 아이디입니다.
        </p>
      </div>

      <div className='w-full bg-[#FFF0F0] rounded-[12px] p-6 mb-8'>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-[13px] text-[#595959] mb-1'>아이디</p>
            <p className='text-[16px] font-bold text-[#171717]'>{id}</p>
          </div>
          <div>
            <p className='text-[13px] text-[#595959] mb-1'>가입일</p>
            <p className='text-[16px] font-bold text-[#171717]'>{date}</p>
          </div>
        </div>
      </div>

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex  items-center gap-3 pb-4'>
        <Button size='medium' color='primary' onClick={() => navigate('/auth/signin')}>
          로그인하기
        </Button>
        <Button size='medium' color='grey' onClick={() => navigate('/auth/pw-find')}>
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
};
export default IdVerifyPage;

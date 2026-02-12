import { ROUTES } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';

import Soksakletter from '@/assets/icons/Soksakletter.svg?react';

interface QuestionCardProps {
  question: string;
  timeLeft: string;
  profileImageUrl?: string;
}

export default function QuestionCard({ question, timeLeft, profileImageUrl }: QuestionCardProps) {
  const navigate = useNavigate();
  const handleMypage = () => {
    navigate(ROUTES.my.mypage);
  };
  return (
    <div className='w-full px-4 py-2.5 bg-[var(--color-bg-500)]'>
      <div className='flex items-center gap-10'>
        {/* 질문 텍스트 영역 */}
        <div className='flex-1 flex flex-col gap-2'>
          {/* 질문 */}
          <h2 className='whitespace-pre-line ty-title2'>{question}</h2>

          {/* 타이머 */}
          <p className='ty-body2 text-[var(--color-primary-heavy)]'>
            <span className='text-[var(--color-primary-500)]'>{timeLeft}</span> 후에 질문이
            사라져요.
          </p>
        </div>

        {/* 프로필 이미지 */}
        <div
          onClick={handleMypage}
          className={`flex-shrink-0 rounded-full overflow-hidden cursor-pointer ${
            !profileImageUrl ? 'bg-[var(--color-primary-100)]' : ''
          }`}
          style={{
            width: '47px',
            height: '48px',
            border: '0.5px solid #E2E2E2',
          }}
        >
          {profileImageUrl ? (
            <img src={profileImageUrl} alt='프로필' className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <Soksakletter className='w-6 h-6' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

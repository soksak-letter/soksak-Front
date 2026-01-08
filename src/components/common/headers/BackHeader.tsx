import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { IoChevronBackSharp } from 'react-icons/io5';
import type React from 'react';

type Props = {
  title: string;
  rightElement?: React.ReactNode; // 완료 버튼 등 우측 요소가 필요할 때만 넣기
  titleClassName?: string; // 타이틀 위치/스타일 추가
  onBack?: () => void; // 조건부 뒤로가기를 위해 추가
};

const BackHeader = ({ title, rightElement, titleClassName, onBack }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <Header className='h-[68px]'>
      {/* 1. 뒤로가기 버튼 (왼쪽 고정) */}
      <button
        type='button'
        onClick={handleBack}
        aria-label='뒤로 가기'
        className='absolute left-4' // absolute로 위치 고정
      >
        <IoChevronBackSharp className='w-5 h-5 text-current' />
      </button>

      {/* 2. 타이틀 (중앙) */}
      <h1 className={`text-lg font-semibold ${titleClassName}`}>{title}</h1>

      {/* 3. 우측 요소 (있으면 렌더링) */}
      {rightElement && <div className='absolute right-4 text-sm font-semibold'>{rightElement}</div>}
    </Header>
  );
};
export default BackHeader;

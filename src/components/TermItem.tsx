import ToastCheck from '@/assets/icons/ToastCheck.svg?react';
import CheckBlank from '@/assets/icons/CheckBlank.svg?react';

interface TermItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onViewClick?: () => void;
}

const TermItem = ({ label, checked, onToggle, onViewClick }: TermItemProps) => {
  return (
    <div className='flex justify-between items-center h-[24px] w-full '>
      {/* 개별 항목 컴포넌트*/}
      <div className='flex items-center cursor-pointer' onClick={onToggle}>
        <div className='mr-[8px]'>{checked ? <ToastCheck /> : <CheckBlank />}</div>
        <span className='ty-body5 text-[#171717]'>{label}</span>
      </div>
      {onViewClick ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewClick();
          }}
          className='ty-detailMedium text-[var(--color-text-assistive)] underline decoration-[#CBCCCD] underline-offset-2'
        >
          보기
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
export default TermItem;

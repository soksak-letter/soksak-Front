import ToastCheck from '@/assets/icons/ToastCheck.svg?react';
import CheckBlank from '@/assets/icons/CheckBlank.svg?react';

const TermItem = ({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className='flex justify-between items-center h-[24px]'>
      {/* 개별 항목 컴포넌트*/}
      <div className='flex items-center cursor-pointer' onClick={onToggle}>
        <div className='mr-2'>{checked ? <ToastCheck /> : <CheckBlank />}</div>
        <span className='ty-body4 text-[#171717]'>{label}</span>
      </div>
      <button className='text-[12px] text-[#8C8C8C] underline decoration-[#CBCCCD] underline-offset-2'>
        보기
      </button>
    </div>
  );
};
export default TermItem;

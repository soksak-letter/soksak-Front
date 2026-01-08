import { useEffect } from 'react';
import ToastCheck from '@/assets/icons/ToastCheck.svg?react';

type Props = {
  message?: string;
  isVisible: boolean;
  onClose: () => void;
};

const Toast = ({ message, isVisible, onClose }: Props) => {
  useEffect(() => {
    if (isVisible) {
      // 3초 뒤에 자동으로 사라짐
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
      <div className='flex flex-row items-center pl-4 py-4 gap-[10px] w-[343px] h-[56px] bg-[#FFEEED] rounded-[32px] '>
        <ToastCheck />
        <span className='text-[#171717] ty-body5 leading-6'>{message}</span>
      </div>
    </div>
  );
};

export default Toast;

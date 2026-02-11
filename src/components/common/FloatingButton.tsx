import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface FloatingButtonProps {
  text?: string;
  onClick?: () => void;
  navigateTo?: string;
}

export default function FloatingButton({
  text = '나도 편지 작성하기',
  onClick,
  navigateTo,
}: FloatingButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div
      className='fixed left-1/2 z-40'
      style={{
        bottom: 0,
        width: '375px',
        height: '138px',
        transform: 'translateX(-50%)',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '40px',
        paddingBottom: '40px',
        background:
          'linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, rgba(250, 250, 250, 1) 100%)',
        pointerEvents: 'none',
      }}
    >
      <Button
        size='large'
        onClick={handleClick}
        className='w-full pointer-events-auto'
      >
        {text}
      </Button>
    </div>
  );
}

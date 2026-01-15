import { useNavigate } from 'react-router-dom';

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
      <button
        onClick={handleClick}
        className='w-full'
        style={{
          backgroundColor: 'rgb(245, 84, 76)',
          height: '58px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '16px',
          paddingBottom: '16px',
          boxShadow:
            '0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.25)',
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '25.6px',
            color: '#FFFFFF',
          }}
        >
          {text}
        </span>
      </button>
    </div>
  );
}

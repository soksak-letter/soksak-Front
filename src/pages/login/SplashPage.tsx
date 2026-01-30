import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Soksakletter from '@/assets/icons/Soksakletter.svg?react';

const START_DELAY_MS = 1200;
const DURATION_MS = 1200;
const EXIT_BUFFER_MS = 600; // 애니메이션 끝나고 여운
const MOVE_UP_PX = 24;

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const total = START_DELAY_MS + DURATION_MS + EXIT_BUFFER_MS;

    const t = window.setTimeout(() => {
      navigate('/auth/welcome', { replace: true });
    }, total);

    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div className='w-[375px] h-screen mx-auto bg-[#FAFAFA]! flex flex-col items-center justify-center px-[85px] relative overflow-hidden'>
      <style>{`
        @keyframes dissolveUp {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          100% { opacity: 1; transform: translate3d(0, -${MOVE_UP_PX}px, 0); }
        }

        .splash-logo {
          opacity: 0;
          animation: dissolveUp ${DURATION_MS}ms ease-out ${START_DELAY_MS}ms forwards;
          will-change: opacity, transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-logo {
            opacity: 1;
            animation: none;
            transform: none;
          }
        }
      `}</style>

      <div className='flex flex-col gap-[32px] items-center'>
        <div className='splash-logo h-[190px] flex items-center justify-center'>
          <Soksakletter className='h-full w-auto' />
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p className='ty-title2'>나를 만나는 질문,</p>
          <p className='ty-title2'>타인과 나누는 익명 편지</p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;

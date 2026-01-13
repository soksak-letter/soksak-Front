import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useLocation } from 'react-router-dom';

const LetterSendingPage = () => {
  const { pathname } = useLocation();

  const sender = '개굴';
  const receiver = '파란수박';

  const testPapers = [
    { id: 'paper-1', name: 'Ivory', color: '#FFF4E6' },
    { id: 'paper-2', name: 'Sky', color: '#478bd3' },
    { id: 'paper-3', name: 'Mint', color: '#47e89f' },
    { id: 'paper-4', name: 'Gray', color: '#717171' },
  ];

  const getTargetText = () => {
    if (pathname.includes('/letter/other/sending') || pathname.includes('/letter/anon/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          누군가에게 전달되고 있어요.
        </>
      );
    }
    if (pathname.includes('/letter/self/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          미래의 {sender}님에게 전달되고 있어요.
        </>
      );
    }
    if (pathname.includes('/letter/friend/sending')) {
      return (
        <>
          {sender}님의 소중한 편지가
          <br />
          {receiver}님에게 전달되고 있어요.
        </>
      );
    }
  };

  const TargetText = getTargetText();

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-dvh'>
      <p className='ty-title2 text-center'>{TargetText}</p>
      <LetterEnvelope paperColor={testPapers[1].color} className='-rotate-4 shadow-lg' />
      <p className='ty-body3 text-center'>평균 24시간 이내로 편지에 답장을 받아요.</p>
    </div>
  );
};

export default LetterSendingPage;

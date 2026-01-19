import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useLocation, useNavigate } from 'react-router-dom';

import stampEx1 from '@/assets/test/stampEx1.svg';
import stampEx2 from '@/assets/test/stampEx2.svg';
import { useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';

const LetterSendingPage = () => {
  const { pathname } = useLocation();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const sender = '개굴';
  const receiver = '파란수박';

  const testPapers = [
    { id: 'paper-1', name: 'Ivory', color: '#FFF4E6' },
    { id: 'paper-2', name: 'Sky', color: '#478bd3' },
    { id: 'paper-3', name: 'Mint', color: '#47e89f' },
    { id: 'paper-4', name: 'Gray', color: '#717171' },
  ];

  const testStamps = [
    { id: 'stamp-1', src: stampEx1 },
    { id: 'stamp-2', src: stampEx2 },
  ];

  const isFriendSending = pathname.includes('/letter/friend/sending');

  useEffect(() => {
    let cancelled = false;

    const sendLetter = async () => {
      try {
        // TODO : 실제 전송 API 호출

        if (cancelled) return;

        if (isFriendSending) {
          // TODO : 10회 주고받았는지 확인하는 API/값
          // 아래는 mock data
          const isTenTimes = true;

          if (isTenTimes) {
            navigate('/friend/sent-transition', { replace: true });
            return;
          }
        }
      } catch (e) {
        if (cancelled) return;
        openModal('letterSendingFailed');
      }
    };
  });

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
    return (
      <>
        {sender}님의 소중한 편지가
        <br />
        누군가에게 전달되고 있어요.
      </>
    );
  };

  const TargetText = getTargetText();

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-dvh'>
      <p className='ty-title2 text-center'>{TargetText}</p>
      <LetterEnvelope
        paperColor={testPapers[1].color}
        stampSrc={testStamps[0].src}
        stampAlt='우표 이미지'
        className='-rotate-4 shadow-lg'
      />
      <p className='ty-body3 text-center'>평균 24시간 이내로 편지에 답장을 받아요.</p>
    </div>
  );
};

export default LetterSendingPage;

import LetterEnvelope from '@/components/letters/LetterEnvelope';
import { useLocation, useNavigate } from 'react-router-dom';

import stampEx1 from '@/assets/test/stampEx1.svg';
import stampEx2 from '@/assets/test/stampEx2.svg';
import { useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';
import useToast from '@/hooks/useToast';
import ToastPopup from '@/components/ToastPopup';

const LetterSendingPage = () => {
  const { pathname } = useLocation();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { toast, visible, showToast, closeToast } = useToast({
    duration: 3000,
    exitMs: 300,
  });

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
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const sendLetter = async () => {
      try {
        // TODO : 실제 전송 API 호출

        if (cancelled) return;

        if (isFriendSending) {
          // TODO : 10회 주고받았는지 확인하는 API/값
          // 아래는 mock data
          const isTenTimes = true;

          if (isTenTimes) {
            await delay(3000);
            if (cancelled) return;
            navigate('/friend/sent-transition', { replace: true });
            return;
          }
        }

        // TODO : 10회 미만일 때 성공 처리
        showToast('편지를 전송했어요!', 'success');
        // 토스트 확인 + sending 페이지 확인 후 전송하기 위해 delay 설정
        // 실제 서버 연결시, 3s 이상 걸릴 경우 sending 화면 지속되나?
        await delay(3000);

        if (cancelled) return;
        navigate('/home/main', { replace: true });
      } catch (e) {
        if (cancelled) return;
        // TODO : 전역 상태 store 만든 후 편지 전송 실패 처리 리팩토링
        // 아래 모달은 여기서 띄우면 안됨.
        // 이전 페이지로 이동한 뒤 모달을 띄우고 싶으나, navigate는 언마운트 후 리렌더링이 됨
        openModal('letterSendingFailed');
      }
    };
    sendLetter();

    return () => {
      cancelled = true;
    };
  }, [isFriendSending, navigate, openModal, showToast]);

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

      {/* 편지 전송 성공 Toast (친구/10회 미만) */}
      {toast && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]'>
          <ToastPopup
            status={toast.status}
            message={toast.message}
            visible={visible}
            onClose={closeToast}
          />
        </div>
      )}
    </div>
  );
};

export default LetterSendingPage;

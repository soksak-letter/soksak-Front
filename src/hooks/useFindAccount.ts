import { useEffect, useState } from 'react';
import { validate } from '@/utils/validate'; // 기존 파일 재사용
import { removeWhitespace } from '@/utils/inputUtils'; // 기존 파일 재사용

// 타입을 'id' 또는 'pw'만 받도록 정의
type FindType = 'id' | 'pw';
// API 상태 타입 정의
type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

const useFindAccount = (type: FindType) => {
  // 1. 상태 관리
  const [email, setEmail] = useState('');

  // 유효성 검사 결과 (형식 검사용)
  const [validation, setValidation] = useState({ success: false, message: '' });

  // API 요청 상태 (서버 통신 상태 및 결과)
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle'); // 이메일 전송 상태
  const [serverMessage, setServerMessage] = useState('');

  // --- [인증번호 관련 상태 (NEW)] ---
  const [authCode, setAuthCode] = useState(''); // 입력한 인증번호
  const [isAuthVerified, setIsAuthVerified] = useState(false); // 인증번호 확인 완료 여부
  const [timeLeft, setTimeLeft] = useState(300); // 타이머 (5분 = 300초)
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 작동 여부

  // --- [토스트 상태] ---
  const [showToast, setShowToast] = useState(false);

  // --- [타이머 로직] ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false); // 시간 초과
      setApiStatus('error');
      setServerMessage('인증 시간이 만료되었습니다. 다시 요청해주세요.');
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // 시간을 05:00 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  // --- [핸들러] ---

  // 1. 이메일 입력
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = removeWhitespace(e.target.value);
    setEmail(cleanValue);
    const result = validate.email(cleanValue);
    setValidation(result);

    // 이메일 수정 시 모든 인증 상태 초기화
    if (apiStatus !== 'idle') {
      setApiStatus('idle');
      setServerMessage('');
      setIsAuthVerified(false);
      setIsTimerActive(false);
      setAuthCode('');
    }
  };

  // 2. 인증번호 입력
  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력받도록 처리 (선택사항)
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 6) setAuthCode(val);
  };

  // 3. 인증 요청 (이메일 발송) & 재전송
  const handleAuthRequest = async () => {
    if (!validation.success) return;

    setApiStatus('loading');
    setIsAuthVerified(false); // 재요청 시 인증 완료 상태 초기화

    try {
      // [API 호출 시]
      // type이 'id'면 아이디 찾기 API, 'pw'면 비번 찾기 API 호출
      // const url = type === 'id' ? '/auth/id-find/email' : '/auth/find-pw/email';
      // await api.post(url, { email });
      // --- [MOCK API] ---
      const mockApiCall = new Promise<{ status: number }>((resolve) => {
        setTimeout(() => {
          if (email === 'sucess@test.com')
            resolve({ status: 200 }); // 간단한 성공 조건
          else resolve({ status: 404 });
        }, 1000);
      });
      const response = await mockApiCall;
      // ------------------

      if (response.status === 200) {
        setApiStatus('success');
        setServerMessage('인증번호가 발송되었습니다.'); // 사진 속 초록 글씨

        // 타이머 리셋 및 시작
        setTimeLeft(300); // 5분
        setIsTimerActive(true);
        setAuthCode(''); // 인증번호 입력칸 비우기
      } else {
        setApiStatus('error');
        setServerMessage('가입되지 않은 이메일입니다.');
        setIsTimerActive(false);
      }
    } catch (error) {
      setApiStatus('error');
      setServerMessage('오류가 발생했습니다.');
      setIsTimerActive(false);
    }
  };

  // 4. 인증번호 확인 (확인 버튼 클릭 시)
  const handleVerifyCode = () => {
    // --- [MOCK 인증 로직] ---
    // 실제로는 API 호출 필요:
    //const url = type === 'id' ? '/auth/find-id/verify' : '/auth/find-pw/verify';
    if (authCode === '123456') {
      setIsAuthVerified(true);
      setIsTimerActive(false); // 인증 성공하면 타이머 멈춤
      setShowToast(true); // 토스트 켜기!
      setServerMessage(''); // 최종 성공 메시지
    } else {
      setIsAuthVerified(false);
      alert('인증번호가 일치하지 않습니다.'); // 또는 별도 에러 상태 관리
    }
  };
  // 토스트 닫기 핸들러 (컴포넌트에 전달용)
  const closeToast = () => {
    setShowToast(false);
  };
  return {
    email,
    authCode,
    validation, // 형식 검사 결과 ({ success, message })
    apiStatus, // API 상태 ('idle', 'loading', 'success', 'error')
    serverMessage, // 서버로부터 받은 메시지 (또는 에러 메시지)
    isAuthVerified, // 최종 인증 완료 여부
    formattedTime: formatTime(timeLeft), // 05:00 형식 시간
    showToast, // 상태 전달
    closeToast, // 닫기 함수 전달
    handleEmailChange,
    handleAuthCodeChange,
    handleAuthRequest,
    handleVerifyCode, // 인증번호 확인
    isFormatValid: validation.success, // UI에서 버튼 활성화 여부로 사용
  };
};

export default useFindAccount;

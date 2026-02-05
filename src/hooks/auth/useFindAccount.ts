import { useEffect, useState } from 'react';
import { validate } from '@/utils/validate'; // 기존 파일 재사용
import { removeWhitespace } from '@/utils/inputUtils'; // 기존 파일 재사용
import { useNavigate } from 'react-router-dom';
import useToast from '../useToast';

import {
  useAuthCodeMutation,
  useFindIdMutation,
  useVerifyCodeMutation,
} from './mutation/useFindAccountMutation';

// 타입을 'id' 또는 'pw'만 받도록 정의
type FindType = 'id' | 'pw';

const useFindAccount = (type: FindType) => {
  const navigate = useNavigate();

  // API 요청 상태 (서버 통신 상태 및 결과)
  const [serverMessage, setServerMessage] = useState('');

  // UI용 type('id', 'pw')을 API용 type('find-id', 'reset-password')으로 변환
  const apiType = type === 'id' ? 'find-id' : 'reset-password';

  // --- [인증번호 관련 상태 (NEW)] ---
  //  상태 관리
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState(''); // 입력한 인증번호
  const [isAuthVerified, setIsAuthVerified] = useState(false); // 인증번호 확인 완료 여부
  const [timeLeft, setTimeLeft] = useState(300); // 타이머 (5분 = 300초)
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 작동 여부

  // 비밀번호 재설정 시 서버에서 줄 수도 있는 토큰 저장용
  const [resetToken, setResetToken] = useState<string | undefined>(undefined);

  // --- [토스트 상태] ---
  const { toast, visible, showToast, closeToast } = useToast({
    duration: 3000, // 필요에 따라 조절
    exitMs: 300,
  });

  // --- [Mutation 도입] ---
  const authRequest = useAuthCodeMutation();
  const verifyRequest = useVerifyCodeMutation();
  const findIdRequest = useFindIdMutation();

  // --- [타이머 로직] ---
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>; //TypeScript가 NodeJS 환경의 타입을 찾지 못해 빨간줄 뜨는 오류 수정
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false); // 시간 초과
      setIsTimerActive(false);
      setServerMessage('인증 시간이 만료되었습니다. 다시 요청해주세요.');
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // 시간을 5:00 형식으로 변환하는 함수
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

    // 이메일 수정 시 모든 인증 상태 초기화
    if (authRequest.isSuccess || authRequest.isError) {
      authRequest.reset(); // Mutation 상태 초기화
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
    if (!validate.email(email).success) return;

    authRequest.mutate(
      { type: apiType, email },
      {
        onSuccess: (response) => {
          if (response.resultType === 'SUCCESS') {
            setServerMessage('인증번호가 발송되었습니다.');
            setTimeLeft(response.success.expiredInSeconds || 300);
            setIsTimerActive(true);
            setAuthCode('');
          } else {
            setServerMessage(response.error.reason || '가입되지 않은 이메일입니다.');
            setIsTimerActive(false);
          }
        },
      },
    );
  };

  // 4. 인증번호 확인 (확인 버튼 클릭 시)
  const handleVerifyCode = async () => {
    verifyRequest.mutate(
      { type: apiType, email, code: authCode },
      {
        onSuccess: (response) => {
          if (response.resultType === 'SUCCESS') {
            const { verified, jwtAccessToken } = response.success;
            if (verified) {
              setIsAuthVerified(true);
              setIsTimerActive(false);
              showToast('인증되었습니다.', 'success');
              setServerMessage('');
              setResetToken(jwtAccessToken);
            } else {
              showToast('인증번호가 일치하지 않습니다.', 'error');
            }
          }
        },
      },
    );
  };
  // 맨 하단 '아이디 찾기' 또는 '비밀번호 재설정' 버튼 클릭 시
  const handleComplete = async () => {
    if (!isAuthVerified) return;

    if (type === 'id') {
      findIdRequest.mutate(email, {
        onSuccess: (response) => {
          if (response.resultType === 'SUCCESS') {
            navigate('/auth/id-verify', {
              state: { id: response.success.username, date: response.success.createdAt },
            });
          }
        },
      });
    } else {
      if (!resetToken) return showToast('인증 정보가 없습니다.', 'error');
      navigate('/auth/pw-reset', { state: { email, token: resetToken } }); // 이메일 넘겨줌
    }
  };
  return {
    email,
    authCode,
    validation: validate.email(email), // 형식 검사 결과 ({ success, message })
    apiStatus: authRequest.status, // API 상태 ('idle', 'loading', 'success', 'error')
    serverMessage, // 서버로부터 받은 메시지 (또는 에러 메시지)
    isAuthVerified, // 최종 인증 완료 여부
    formattedTime: formatTime(timeLeft), // 05:00 형식 시간
    toastState: toast, // { message, status } 객체
    toastVisible: visible, // boolean
    closeToast, // 닫기 함수 전달
    handleEmailChange,
    handleAuthCodeChange,
    handleAuthRequest,
    handleVerifyCode, // 인증번호 확인
    isFormatValid: validate.email(email).success, // UI에서 버튼 활성화 여부로 사용
    handleComplete, // 최종 완료 버튼 핸들러
  };
};

export default useFindAccount;

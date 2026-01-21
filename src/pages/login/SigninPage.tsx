import { axiosInstance } from '@/api/axios';
import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import type { SignInRequest, SignInResponse } from '@/types/dto/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  // 1. DTO에 맞춰 userName으로 상태 관리
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // 페이지 이동 핸들러
  const handleFindId = () => navigate('/auth/id-find'); // 아이디 찾기 페이지 경로
  const handleFindPw = () => navigate('/auth/pw-find'); // 비밀번호 찾기 페이지 경로
  const handleLogin = async () => {
    // 1) 유효성 검사
    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 2) 보낼 데이터 준비 (SignInRequest 타입 준수)
    const requestData: SignInRequest = {
      username: username, // 변경된 필드명
      password: password,
    };

    console.log(' [로그인 요청] 데이터:', requestData);

    try {
      // 3) API 호출 (POST /auth/login) -> 백엔드 주소 확인 필요
      const response = await axiosInstance.post<SignInResponse>('/auth/login', requestData);

      console.log('[로그인 성공] 응답:', response.data);

      const { resultType, success, error } = response.data;

      // 4) 성공 처리
      if (resultType === 'SUCCESS' && success) {
        // SignInResult 구조: { result: { jwtAccessToken, ... } }
        const { jwtAccessToken, jwtRefreshToken } = success.result;

        // 토큰 저장
        localStorage.setItem('accessToken', jwtAccessToken);
        localStorage.setItem('refreshToken', jwtRefreshToken);

        console.log('토큰 저장 완료! 메인으로 이동합니다.');
        //navigate('/');
      } else {
        // 200 OK지만 실패 로직 (예: 비밀번호 불일치 등 서버가 정의한 에러)
        console.warn('[로그인 실패] 이유:', error?.reason);
        alert(error?.reason || '로그인에 실패했습니다.');
      }
    } catch (err: any) {
      console.error(' [통신 에러]:', err);
      if (err.response) {
        // 서버가 400, 500 등을 보냈을 때
        alert(err.response.data?.error?.reason || '서버 오류가 발생했습니다.');
      } else {
        alert('네트워크 연결을 확인해주세요.');
      }
    }
  };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <BackHeader title='로그인' />
      <div className='mx-auto flex flex-col items-center justify-center gap-[16px] py-[16px]'>
        <input
          type='text'
          placeholder='아이디'
          value={username} // state: username
          onChange={(e) => setUserName(e.target.value)}
          className='w-[342px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
        />
        <input
          type='text'
          value={password} // state: password
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호(영문,숫자 포함 최대 16자리)'
          className='w-[342px] h-[48px] bg-[var(--color-bg-primary)] px-4 border-[1px] border-[var(--color-grey-100)] rounded-lg'
        />
        <Button onClick={handleLogin} className='w-[342px] h-[48px]'>
          로그인
        </Button>
        <div className='w-[342px] flex justify-end items-end gap-3 mb-10'>
          <button
            onClick={handleFindId}
            className='text-[13px] text-[#595959] hover:text-[#171717] font-medium'
          >
            아이디 찾기
          </button>
          {/* 세로 구분선 */}
          <div className='w-[1px] h-[12px] bg-[#E5E6E6]' />
          <button
            onClick={handleFindPw}
            className='text-[13px] text-[#595959] hover:text-[#171717] font-medium'
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;

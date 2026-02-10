import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import { useSigninMutation } from '@/hooks/auth/mutation/useAuthMutation';
import { blockSpaceKey, removeWhitespace } from '@/utils/inputUtils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  // 1. DTO에 맞춰 userName으로 상태 관리
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // 페이지 이동 핸들러
  const handleFindId = () => navigate('/auth/id-find'); // 아이디 찾기 페이지 경로
  const handleFindPw = () => navigate('/auth/pw-find'); // 비밀번호 찾기 페이지 경로

  // Mutation 사용
  const { mutate: loginMutate, isPending } = useSigninMutation();

  /**
   * [비밀번호 입력 핸들러]
   * - 공백 제거
   * - 16자 초과 입력 방지 (maxLength가 있어도 붙여넣기 등을 위해 안전장치 추가)
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = removeWhitespace(e.target.value);
    if (cleanValue.length > 16) return; // 16자 넘으면 업데이트 안 함
    setPassword(cleanValue);
  };

  const canSubmit = username && password && password.length >= 8;
  const handleLogin = async () => {
    if (!canSubmit || isPending) return;

    // mutation 실행
    loginMutate({ username, password });
  };
  // 2) 보낼 데이터 준비 (SignInRequest 타입 준수)
  // const requestData: SignInRequest = {
  //   username: username,
  //   password: password,
  // };

  return (
    <div className='w-[375px] bg-[#FAFAFA]! mx-auto flex flex-col '>
      <BackHeader title='로그인' />
      <div className='mx-auto flex flex-col items-center justify-center gap-[16px] py-[16px]'>
        <input
          type='text'
          placeholder='아이디'
          value={username} // state: username
          onChange={(e) => setUserName(removeWhitespace(e.target.value))}
          className={`w-[342px] h-[48px] border-[1px] bg-[var(--color-bg-primary)] px-4 outline-none focus:border-[var(--color-grey-800)] 
           border-[var(--color-grey-100)] rounded-lg ${username ? 'ty-body5' : 'ty-detailMedium'}`}
        />
        <input
          type='password'
          value={password} // state: password
          onChange={handlePasswordChange}
          onKeyDown={blockSpaceKey} // 스페이스바 입력 차단
          maxLength={16} // HTML 속성으로 16자 제한
          placeholder='비밀번호(영문, 숫자 조합으로 8~16자리)'
          className={`w-[342px] h-[48px] border-[1px] bg-[var(--color-bg-primary)] px-4 outline-none focus:border-[var(--color-grey-800)] 
           border-[var(--color-grey-100)] rounded-lg ${password ? 'ty-body5' : 'ty-detailMedium'}`}
        />
        <Button
          onClick={handleLogin}
          disabled={!canSubmit || isPending}
          className='w-[342px] h-[48px]'
        >
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

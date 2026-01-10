import { useState } from 'react';

const useTermsAgree = () => {
  // 각 약관의 동의 상태 관리
  const [agreements, setAgreements] = useState({
    terms: false, // [필수] 이용약관
    privacy: false, // [필수] 개인정보 수집
    age: false, // [필수] 만 14세 이상
    marketing: false, // [선택] 마케팅
  });

  // 모든 필수 약관이 동의되었는지 확인 (버튼 활성화용)
  const isFormValid = agreements.terms && agreements.privacy && agreements.age;

  // 전체 동의 상태 계산 (모든 항목이 true일 때만 true)
  const isAllChecked = Object.values(agreements).every((val) => val === true);

  // 개별 체크박스
  const handleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 전체 동의
  const handleAllCheck = () => {
    const nextState = !isAllChecked; // 현재 상태의 반대로
    setAgreements({
      terms: nextState,
      privacy: nextState,
      age: nextState,
      marketing: nextState,
    });
  };
  //데이터와 함수를 반환
  return {
    agreements,
    isAllChecked,
    isFormValid,
    handleCheck,
    handleAllCheck,
  };
};
export default useTermsAgree;

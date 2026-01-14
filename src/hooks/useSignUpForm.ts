import { useEffect, useState } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';

// 검사 결과 타입 정의
interface ValidationResult {
  success: boolean;
  message: string;
}

const useSignUpForm = () => {
  //  상태 관리

  // 입력된 폼 데이터 저장
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });
  // 이메일 중복 확인 완료 여부
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  //포커스 상태 관리ㄴ
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 각 필드별 유효성 검사 에러 메시지 저장
  // [핵심 변경] 에러 문자열만 저장하는 게 아니라, { success, message } 객체를 저장함
  const [validations, setValidations] = useState<Record<string, ValidationResult>>({
    email: { success: false, message: '' },
    username: { success: false, message: '' },
    password: { success: false, message: '' },
    passwordConfirm: { success: false, message: '' },
    name: { success: false, message: '' },
    phone: { success: false, message: '' },
  });
  // useEffect에서 validate 함수의 리턴값을 '그대로' State에 넣음
  useEffect(() => {
    const newValidations = { ...validations };

    // 각 필드별로 validate 실행 후 결과(객체)를 바로 저장
    if (form.email) newValidations.email = validate.email(form.email);
    if (form.username) newValidations.username = validate.username(form.username);
    if (form.password) newValidations.password = validate.password(form.password);
    if (form.passwordConfirm)
      newValidations.passwordConfirm = validate.passwordConfirm(
        form.password,
        form.passwordConfirm,
      );
    if (form.name) newValidations.name = validate.name(form.name);
    if (form.phone) newValidations.phone = validate.phone(form.phone);

    // 값 변경 감지 (JSON.stringify로 비교)
    if (JSON.stringify(validations) !== JSON.stringify(newValidations)) {
      setValidations(newValidations);
    }
  }, [form]);

  // 핸들러 로직

  const handleFocus = (field: string) => () => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  /**
   * [공통 핸들러] 공백 제거 및 유효성 검사를 수행
   * 사용법: onChange={handleNoSpaceChange('username', validate.username)}
   * * @param field - 업데이트할 form 필드명 (예: 'username', 'name')
   * @param validator - (선택) 해당 필드의 유효성 검사 함수
   */
  const handleNoSpaceChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // 공백 제거
    const cleanValue = removeWhitespace(e.target.value);
    // 폼 상태 업데이트
    setForm((prev) => ({ ...prev, [field]: cleanValue }));
  };

  /**
   * [이메일 전용 핸들러]
   * 이메일 값이 변경되면 중복 확인 상태(isEmailUnique)를 초기화해야 함
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = removeWhitespace(e.target.value);
    setForm((prev) => ({ ...prev, email: cleanValue }));
    // 이메일이 수정되면 기존 중복 확인 결과는 무효화됨
    setIsEmailUnique(false);
  };

  /**
   * [이메일 중복 확인]
   * API를 호출하여 이메일 사용 가능 여부를 판단
   */
  const handleCheckEmailDuplicate = () => {
    // 이메일이 비어있거나 형식이 올바르지 않으면 중단
    if (!form.email || !validations.email.success) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    // **********TODO: API 호출***************
    const isAvailable = true; // ***************(테스트용) 항상 통과한다고 가정***************

    if (isAvailable) {
      setIsEmailUnique(true);
      alert('사용 가능한 이메일입니다.');
    } else {
      setIsEmailUnique(false);
      setValidations((prev) => ({
        ...prev,
        email: { success: false, message: '이미 사용 중인 이메일입니다.' },
      }));
    }
  };

  // 제출 가능 여부 계산

  // 모든 필드에 값이 채워져 있는지 확인
  const isFormFilled = Object.values(form).every((val) => val !== '');
  // 모든 에러 메시지가 비어있는지(유효성 검사 통과) 확인
  const hasNoErrors = Object.values(validations).every((val) => val.success);
  // 최종 제출 가능 조건: 빈카 없음 & 에러 없음 & 이메일 중복확인 완료
  const canSubmitWithoutTerms = isFormFilled && hasNoErrors && isEmailUnique; // 약관은 UI에서 합침

  return {
    form, // 입력 데이터
    validations, // 에러 메시지
    isEmailUnique, // 이메일 중복 확인 상태
    focusedField,
    handleFocus, //focus
    handleBlur,
    handleNoSpaceChange, // 공통 입력 핸들러
    handleEmailChange, // 이메일 입력 핸들러
    handleCheckEmailDuplicate, // 이메일 중복체크 함수
    canSubmitWithoutTerms, //제풀가능려부
  };
};

export default useSignUpForm;

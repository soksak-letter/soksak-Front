import { useState, useEffect } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { patchResetPassword } from '@/api/findAccount';

// 검사 결과 타입 정의
interface ValidationResult {
  success: boolean;
  message: string;
}
const usePwResetForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 이전 페이지(인증번호 확인)에서 넘겨준 토큰 받기
  const token = location.state?.token;

  const [form, setForm] = useState({ password: '', passwordConfirm: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ password: boolean; passwordConfirm: boolean }>({ password: false, passwordConfirm: false });
  const [validations, setValidations] = useState<{
    password: ValidationResult;
    passwordConfirm: ValidationResult;
  }>({
    password: { success: false, message: '' },
    passwordConfirm: { success: false, message: '' },
  });

  // 유효성 검사 (useEffect)
  useEffect(() => {
    const newValidations = {
      password: validate.password(form.password),
      passwordConfirm: validate.passwordConfirm(form.password, form.passwordConfirm),
    };
    setValidations(newValidations);
  }, [form]);

  // 핸들러들 (handleFocus, handleBlur 등 복사)
  const handleFocus = (field: string) => () => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleNoSpaceChange =
    (field: string, maxLength?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // 공백 제거
      const cleanValue = removeWhitespace(e.target.value);
      //maxLength가 설정되어 있고, 입력값이 그보다 길면 업데이트 안 함(무시)
      if (maxLength && cleanValue.length > maxLength) {
        return;
      }
      // 폼 상태 업데이트
      setForm((prev) => ({ ...prev, [field]: cleanValue }));
      // touched 처리
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

  // 제출 가능 여부 (비밀번호 2개만 확인)
  const canSubmit = validations.password.success && validations.passwordConfirm.success;

  // --- API 호출 핸들러 ---
  const handleSubmit = async () => {
    if (!canSubmit) return;

    if (!token) {
      alert('인증 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    try {
      const response = await patchResetPassword(
        { password: form.password }, // Body
        token, // Header Token
      );

      if (response.resultType === 'SUCCESS') {
        navigate('/auth/signin'); // 로그인 페이지로 이동
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    form,
    validations,
    focusedField,
    canSubmit,
    handleFocus,
    handleBlur,
    handleNoSpaceChange,
    handleSubmit,
    touched
  };
};

export default usePwResetForm;

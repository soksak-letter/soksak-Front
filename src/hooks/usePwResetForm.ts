import { useState, useEffect } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';

// 검사 결과 타입 정의
interface ValidationResult {
  success: boolean;
  message: string;
}
const usePwResetForm = () => {
  const [form, setForm] = useState({ password: '', passwordConfirm: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 유효성 검사 상태
  const [validations, setValidations] = useState({
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
      // [추가된 로직] maxLength가 설정되어 있고, 입력값이 그보다 길면 업데이트 안 함(무시)
      if (maxLength && cleanValue.length > maxLength) {
        return;
      }
      // 폼 상태 업데이트
      setForm((prev) => ({ ...prev, [field]: cleanValue }));
    };

  // 제출 가능 여부 (비밀번호 2개만 확인)
  const canSubmit = validations.password.success && validations.passwordConfirm.success;

  return {
    form,
    validations,
    focusedField,
    canSubmit,
    handleFocus,
    handleBlur,
    handleNoSpaceChange,
  };
};

export default usePwResetForm;

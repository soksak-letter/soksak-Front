import { useState, useEffect } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';

// 검사 결과 타입 정의
interface ValidationResult {
  success: boolean;
  message: string;
}

type SettingPwChangeFormField = 'currentPassword' | 'password' | 'passwordConfirm';

const useSettingPwChangeForm = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });
  const [focusedField, setFocusedField] = useState<SettingPwChangeFormField | null>(null);
  const [touched, setTouched] = useState<Record<SettingPwChangeFormField, boolean>>({
    currentPassword: false,
    password: false,
    passwordConfirm: false,
  });
  const [validations, setValidations] = useState<{
    currentPassword: ValidationResult;
    password: ValidationResult;
    passwordConfirm: ValidationResult;
  }>({
    currentPassword: { success: false, message: '' },
    password: { success: false, message: '' },
    passwordConfirm: { success: false, message: '' },
  });

  // 유효성 검사 (useEffect)
  useEffect(() => {
    const newValidations = {
      // 현재 비밀번호는 입력 여부만 확인 (실제 검증은 서버에서)
      currentPassword:
        form.currentPassword.length > 0
          ? { success: true, message: '' }
          : { success: false, message: '현재 비밀번호를 입력해주세요.' },
      password: validate.password(form.password),
      passwordConfirm: validate.passwordConfirm(form.password, form.passwordConfirm),
    };
    setValidations(newValidations);
  }, [form]);

  // 핸들러들
  const handleFocus = (field: SettingPwChangeFormField) => () => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleNoSpaceChange =
    (field: SettingPwChangeFormField, maxLength?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 공백 제거
      const cleanValue = removeWhitespace(e.target.value);
      // maxLength가 설정되어 있고, 입력값이 그보다 길면 업데이트 안 함(무시)
      if (maxLength && cleanValue.length > maxLength) {
        return;
      }
      // 폼 상태 업데이트
      setForm((prev) => ({ ...prev, [field]: cleanValue }));
      // touched 처리
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

  // 제출 가능 여부 (현재 비밀번호 + 새 비밀번호 2개 확인)
  const canSubmit =
    validations.currentPassword.success &&
    validations.password.success &&
    validations.passwordConfirm.success;

  // --- API 호출 핸들러 ---
  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      // TODO: 로그인 상태에서 비밀번호 변경 API 호출
      // 예시:
      // const response = await patchChangePassword({
      //   currentPassword: form.currentPassword,
      //   newPassword: form.password,
      // });
      //
      // if (response.resultType === 'SUCCESS') {
      //   alert('비밀번호가 변경되었습니다.');
      //   navigate('/setting');
      // }

      console.log('TODO: 비밀번호 변경 API 호출', {
        currentPassword: form.currentPassword,
        newPassword: form.password,
      });

      alert('API 연결이 필요합니다.');
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
    touched,
  };
};

export default useSettingPwChangeForm;

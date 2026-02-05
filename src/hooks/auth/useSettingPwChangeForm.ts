import { useState } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';
import { useChangePasswordMutation } from './mutation/useSettingMutation';

type SettingPwChangeFormField = 'currentPassword' | 'password' | 'passwordConfirm';

const useSettingPwChangeForm = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });

  const [touched, setTouched] = useState<Record<SettingPwChangeFormField, boolean>>({
    currentPassword: false,
    password: false,
    passwordConfirm: false,
  });
  // Mutation 도입
  const { mutate: changePassword, isPending } = useChangePasswordMutation();

  // 파생 상태로 유효성 검사 (useEffect 제거)
  const validations = {
    currentPassword:
      form.currentPassword.length > 0
        ? { success: true, message: '' }
        : { success: false, message: '현재 비밀번호를 입력해주세요.' },
    password: validate.password(form.password),
    passwordConfirm: validate.passwordConfirm(form.password, form.passwordConfirm),
  };

  // 핸들러들

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
    validations.passwordConfirm.success &&
    !isPending;

  // --- API 호출 핸들러 ---
  const handleSubmit = async () => {
    if (!canSubmit) return;
    // API 호출
    changePassword({
      currentPassword: form.currentPassword,
      password: form.password,
    });
  };

  return {
    form,
    validations,
    canSubmit,
    isPending,
    handleNoSpaceChange,
    handleSubmit,
    touched,
  };
};

export default useSettingPwChangeForm;

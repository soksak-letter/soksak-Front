import { useState } from 'react';
import { validate } from '@/utils/validate';
import { removeWhitespace } from '@/utils/inputUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from './mutation/useFindAccountMutation';
import { useGlobalToast } from '@/components/toast/ToastProvider';

type PwResetFormField = 'password' | 'passwordConfirm';
const usePwResetForm = () => {
  const { showToast } = useGlobalToast();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 이전 페이지(인증번호 확인)에서 넘겨준 토큰 받기
  const token = location.state?.token;

  const [form, setForm] = useState({ password: '', passwordConfirm: '' });
  const [focusedField, setFocusedField] = useState<PwResetFormField | null>(null);

  // TanStack Query Mutation 도입
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const validations = {
    password: validate.password(form.password),
    passwordConfirm: validate.passwordConfirm(form.password, form.passwordConfirm),
  };

  // 핸들러들 (handleFocus, handleBlur 등 복사)
  const handleFocus = (field: PwResetFormField) => () => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleNoSpaceChange =
    (field: PwResetFormField, maxLength?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // 공백 제거
      const cleanValue = removeWhitespace(e.target.value);
      //maxLength가 설정되어 있고, 입력값이 그보다 길면 업데이트 안 함(무시)
      if (maxLength && cleanValue.length > maxLength) {
        return;
      }
      // 폼 상태 업데이트
      setForm((prev) => ({ ...prev, [field]: cleanValue }));
    };

  // 제출 가능 여부 (비밀번호 2개만 확인)
  const canSubmit = validations.password.success && validations.passwordConfirm.success;

  // --- API 호출 핸들러 ---
  const handleSubmit = async () => {
    if (!canSubmit || isPending) return;

    if (!token) {
      showToast('인증 정보가 만료되었습니다.다시 인증해주세요.', 'error');
      navigate('/auth/pw-find');
      return;
    }

    // Mutation 실행
    resetPassword({ password: form.password, token });
  };
  return {
    form,
    validations,
    focusedField,
    canSubmit,
    isPending,
    handleFocus,
    handleBlur,
    handleNoSpaceChange,
    handleSubmit,
  };
};

export default usePwResetForm;

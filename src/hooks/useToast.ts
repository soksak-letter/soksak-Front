import { useCallback, useEffect, useRef, useState } from 'react';
import type { ToastPopupProps } from '@/components/ToastPopup';

type ToastState = null | Pick<ToastPopupProps, 'status' | 'message'>;

type Options = {
  duration?: number; // 토스트 유지 시간 (기본 3000ms)
  exitMs?: number; // 퇴장 애니메이션 시간 (기본 300ms)
};

export default function useToast(options: Options = {}) {
  const { duration = 3000, exitMs = 300 } = options;

  const [toast, setToast] = useState<ToastState>(null);
  const [visible, setVisible] = useState(false);

  const toastTimerRef = useRef<number | null>(null);
  const toastClearRef = useRef<number | null>(null);

  const clearToastTimers = useCallback(() => {
    if (toastTimerRef.current != null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    if (toastClearRef.current != null) {
      window.clearTimeout(toastClearRef.current);
      toastClearRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearToastTimers(); // 언마운트 시 타이머 정리
  }, [clearToastTimers]);

  const closeToast = useCallback(() => {
    clearToastTimers();
    setVisible(false);
    toastClearRef.current = window.setTimeout(() => setToast(null), exitMs);
  }, [clearToastTimers, exitMs]);

  const showToast = useCallback(
    (message: string, status: ToastPopupProps['status'] = 'error') => {
      setToast({ message, status });
      setVisible(true);

      clearToastTimers();

      toastTimerRef.current = window.setTimeout(() => {
        setVisible(false); // 퇴장 애니메이션 시작
        toastClearRef.current = window.setTimeout(() => setToast(null), exitMs); // 애니메이션 후 제거
      }, duration);
    },
    [clearToastTimers, duration, exitMs],
  );

  return { toast, visible, showToast, closeToast };
}

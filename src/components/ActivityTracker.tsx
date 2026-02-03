import { useEffect, useRef } from 'react';
import { useActivityStore } from '@/stores/activityStore';
import { usePostMyActivity } from '@/hooks/onboarding/usePostMyActivity';

const STORAGE_KEY = 'soksak_total_seconds';

export default function ActivityTracker() {
  const addSeconds = useActivityStore((s) => s.addSeconds);
  const hydrate = useActivityStore((s) => s.hydrate);

  const postActivity = usePostMyActivity();
  // 1. mutate를 ref로 고정
  const mutateRef = useRef(postActivity.mutate);

  // 2. mutate가 바뀌면 ref만 업데이트
  useEffect(() => {
    mutateRef.current = postActivity.mutate;
  }, [postActivity.mutate]);

  const intervalRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // 3. 최초 로컬스토리지 복구
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw !== null ? parseInt(raw, 10) : 0;

    if (!Number.isNaN(saved) && saved > 0) hydrate(saved);
  }, [hydrate]);

  // 4. 실제 타이머 로직
  useEffect(() => {
    const start = () => {
      if (intervalRef.current) return;

      lastTickRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const diffSec = Math.floor((now - lastTickRef.current) / 1000);
        if (diffSec <= 0) return;

        lastTickRef.current = now;
        addSeconds(diffSec);

        // 여기서만 API ping
        mutateRef.current({});
      }, 1000);
    };

    const stop = () => {
      if (!intervalRef.current) return;
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') start();
      else stop();
    };

    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [addSeconds]);

  // 3) 로컬스토리지에 주기적으로 저장(새로고침 대비)
  useEffect(() => {
    const id = window.setInterval(() => {
      const total = useActivityStore.getState().totalSeconds;
      localStorage.setItem(STORAGE_KEY, String(total));
    }, 10_000);

    return () => window.clearInterval(id);
  }, []);

  // 4) 서버 activity ping도 전역에서 같이 (원하면)
  useEffect(() => {
    // “전역 ping”을 원하면 여기서 주기적으로 호출
    // 예: 60초마다
    const id = window.setInterval(() => {
      postActivity.mutate({});
    }, 60_000);

    return () => window.clearInterval(id);
  }, [postActivity]);

  return null;
}

import { useEffect, useRef } from 'react';
import { useActivityStore } from '@/stores/activityStore';
import { usePostMyActivity } from '@/hooks/onboarding/usePostMyActivity';

const STORAGE_KEY = 'soksak_total_seconds';

export default function ActivityTracker() {
  const addSeconds = useActivityStore((s) => s.addSeconds);
  const hydrate = useActivityStore((s) => s.hydrate);
  const postActivity = usePostMyActivity();

  const intervalRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // 1) 최초 로컬 값 불러오기
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw !== null ? parseInt(raw, 10) : 0;

    if (!Number.isNaN(saved) && saved > 0) hydrate(saved);
  }, [hydrate]);

  // 2) visible 상태에서만 초 누적
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

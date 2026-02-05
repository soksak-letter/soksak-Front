import { useEffect, useState, useMemo } from 'react';

type UseCountdownOptions = {
  tickMs?: number;
  onExpire?: () => void;
};

function useCountdown(deadlineMs: number, { tickMs = 1000, onExpire }: UseCountdownOptions = {}) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let expired = false;

    // 남은 시간 계산
    const calcLeft = () => Math.max(0, Math.floor((deadlineMs - Date.now()) / 1000));

    const id = window.setInterval(() => {
      const next = calcLeft();
      setSecondsLeft(next);

      if (next === 0 && !expired) {
        expired = true;
        onExpire?.();
      }
    }, tickMs);

    setSecondsLeft(calcLeft());

    return () => window.clearInterval(id);
  }, [deadlineMs, tickMs, onExpire]);

  const isExpired = secondsLeft === 0;

  const mmss = useMemo(() => {
    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;
    const pad = (n: number) => String(n).padStart(2, '0');

    return `${pad(h)}시간 ${pad(m)}분 ${pad(s)}초`;
  }, [secondsLeft]);

  return { secondsLeft, isExpired, mmss };
}

export default useCountdown;

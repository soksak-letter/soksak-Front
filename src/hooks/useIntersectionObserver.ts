import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  /** 값이 바뀌면 옵저버를 재등록하여 재감지 */
  resetKey?: unknown;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '0px 0px 200px 0px',
  threshold = 0,
  resetKey,
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);
  onIntersectRef.current = onIntersect;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, rootMargin, threshold, resetKey]);

  return targetRef;
}

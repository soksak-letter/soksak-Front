## Design Token Usage Policy

텍스트 및 컬러 스타일은 Tailwind arbitrary value
(e.g. `text-[color:var(--...)]`)를 사용하지 않습니다.

모든 색상 값은 CSS variable 기반 design token을 직접 사용하며,
Tailwind 클래스는 레이아웃 및 상태 표현에만 사용합니다.

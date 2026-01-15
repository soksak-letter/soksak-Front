import type { KeyboardEvent } from 'react';

/**
 * [onKeyDown] 스페이스바 입력 자체를 차단하는 함수
 * 태그의 onKeyDown 속성에 그대로 넣rl
 */
export const blockSpaceKey = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === ' ') {
    e.preventDefault();
  }
};

/**
 *  [onChange] 문자열에서 모든 공백을 제거하는 함수
 * 입력값(e.target.value)을 이 함수로 감싸서 사용
 */
export const removeWhitespace = (text: string): string => {
  return text.replace(/\s/g, '');
};
/**
 * [UI] 입력 필드 테두리 색상 반환
 * - 값 없음: 회색 (기본)
 * - 에러 있음: 빨강 (오류)
 * - 값 있고 에러 없음: 초록 (성공)
 * -signupPage에서 focus로 입력시:파란색(입력중)
 */
export const getBorderColor = (isValid: boolean, value: string) => {
  if (!value) return 'border-[var(--color-grey-100)]'; // 입력 전 (회색)
  if (!isValid) return 'border-[#F33326]'; // 에러 (빨강)
  return 'border-[#3DC061]'; // 성공 (초록)
};
/**
 * [UI] 메시지 텍스트 색상 반환
 * - 값 없음: 투명 (안 보임)
 * - 에러 있음: 빨강
 * - 값 있고 에러 없음: 초록
 */
export const getMessageColor = (isValid: boolean, value: string) => {
  if (!value) return 'text-[var(--color-text-assistive)]';
  if (!isValid) return 'text-[#F33326]';
  return 'text-[#3DC061]';
};

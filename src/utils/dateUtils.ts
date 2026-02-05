/**
 * 날짜 문자열을 지정된 형식으로 포맷팅
 * @param dateString - 날짜 문자열 (ISO 8601 형식 등)
 * @param format - 출력 형식 ('dot' = YYYY.M.D, 'korean' = YYYY년 M월 D일)
 * @param fallback - 파싱 실패 시 반환값 (기본값: '-')
 */
export function formatDate(
  dateString: string,
  format: 'dot' | 'korean' = 'dot',
  fallback: string = '-',
): string {
  if (!dateString || dateString === '-') return fallback;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return fallback;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (format === 'korean') {
    return `${year}년 ${month}월 ${day}일`;
  }

  return `${year}.${month}.${day}`;
}

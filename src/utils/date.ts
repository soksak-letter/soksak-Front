// 백엔드에 요청용
export function getNowKSTIsoString(): string {
  const now = new Date();

  const KST_OFFSET_MINUTES = 9 * 60;
  const localOffsetMinutes = now.getTimezoneOffset();

  const kstTime = new Date(now.getTime() + (localOffsetMinutes + KST_OFFSET_MINUTES) * 60 * 1000);

  const yyyy = kstTime.getFullYear();
  const mm = String(kstTime.getMonth() + 1).padStart(2, '0');
  const dd = String(kstTime.getDate()).padStart(2, '0');
  const hh = String(kstTime.getHours()).padStart(2, '0');
  const min = String(kstTime.getMinutes()).padStart(2, '0');
  const ss = String(kstTime.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}+09:00`;
}

// 프론트 쿼리키용
export function getTodayKstKey(): string {
  const kstIso = getNowKSTIsoString(); // ...+09:00
  return kstIso.slice(0, 10); // "YYYY-MM-DD"
}

/**
 * 날짜 문자열을 지정된 형식으로 포맷팅
 * @param dateString - 날짜 문자열 (ISO 8601 형식 등)
 * @param options - 포맷 옵션
 * @param options.format - 출력 형식 ('dot' = YYYY.M.D, 'korean' = YYYY년 M월 D일)
 * @param options.padded - 월/일을 2자리로 패딩할지 여부 (기본값: false)
 * @param options.fallback - 파싱 실패 시 반환값 (기본값: '-')
 */
export function formatDate(
  dateString: string,
  options: {
    format?: 'dot' | 'korean';
    padded?: boolean;
    fallback?: string;
  } = {},
): string {
  const { format = 'dot', padded = false, fallback = '-' } = options;

  if (!dateString || dateString === '-') return fallback;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return fallback;

  const year = date.getFullYear();
  const month = padded
    ? String(date.getMonth() + 1).padStart(2, '0')
    : String(date.getMonth() + 1);
  const day = padded ? String(date.getDate()).padStart(2, '0') : String(date.getDate());

  if (format === 'korean') {
    return `${year}년 ${month}월 ${day}일`;
  }

  return `${year}.${month}.${day}`;
}

/**
 * @deprecated formatDate(iso, { padded: true })를 사용하세요
 */
export function getParseDate(iso: string): string {
  return formatDate(iso, { padded: true });
}

// UI 파싱용 (yyyy.mm.dd hh:mm am|pm)
export const getParseSentAt = (isoOrNull: string | null) => {
  if (!isoOrNull) return '-';

  const d = new Date(isoOrNull);
  if (Number.isNaN(d.getTime())) return '-';

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  let hours = d.getHours(); // 0 ~ 23
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const isPM = hours >= 12;
  const ampm = isPM ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const hh = String(hours).padStart(2, '0');

  return `${y}.${m}.${day} ${hh}:${minutes} ${ampm}`;
};

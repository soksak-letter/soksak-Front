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

// UI 파싱용 (yyyy.mm.dd)
export function getParseDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
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

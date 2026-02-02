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

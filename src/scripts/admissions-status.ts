import { september2026 } from '../data/admissions';
import { getAdmissionsStatus } from '../utils/admissionsStatus';
import { formatCalendarDate, formatCalendarRange, getJakartaDate, millisecondsUntilJakartaMidnight } from '../utils/calendarDate';

const region = document.querySelector<HTMLElement>('[data-admissions-status]');
const summary = region?.querySelector<HTMLElement>('[data-status-summary]');
const detail = region?.querySelector<HTMLElement>('[data-status-detail]');
const reference = region?.querySelector<HTMLElement>('[data-status-reference]');

if (region && summary && detail && reference) {
  let timer: ReturnType<typeof setTimeout>;
  function refresh() {
    if (!region || !summary || !detail || !reference) return;
    clearTimeout(timer);
    const now = new Date();
    const date = getJakartaDate(now);
    const status = getAdmissionsStatus(date, september2026);
    if (status.activeWave) {
      summary.textContent = `Pendaftaran dibuka sesuai jadwal · ${status.activeWave.label}`;
      detail.textContent = `Jadwal ${status.activeWave.label}: ${formatCalendarRange(status.activeWave.startDate, status.activeWave.endDate)}.`;
    } else if (status.nextWave) {
      summary.textContent = 'Pendaftaran belum dibuka untuk gelombang berikutnya';
      detail.textContent = `${status.nextWave.label} dijadwalkan mulai ${formatCalendarDate(status.nextWave.startDate)}. Saat ini tidak ada gelombang aktif.`;
    } else {
      summary.textContent = 'Pendaftaran periode ini telah ditutup sesuai jadwal';
      detail.textContent = `Jadwal ${september2026.label} berakhir pada ${formatCalendarDate(status.closingDate)}. Informasi periode berikutnya dapat dilihat melalui PMB resmi UBSI.`;
    }
    reference.textContent = `Status berdasarkan jadwal per ${formatCalendarDate(date)} (WIB). Konfirmasi proses pendaftaran melalui PMB resmi UBSI.`;
    region.dataset.state = status.state;
    // Also refresh on return from a background tab or browser history restoration.
    timer = setTimeout(refresh, millisecondsUntilJakartaMidnight(now) + 50);
  }
  refresh();
  window.addEventListener('pageshow', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refresh();
  });
}

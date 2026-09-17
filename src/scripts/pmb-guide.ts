import { september2026 } from '../data/admissions';
import { getAdmissionsStatus } from '../utils/admissionsStatus';
import { getJakartaDate } from '../utils/calendarDate';

function refreshWavePresentation() {
  const status = getAdmissionsStatus(getJakartaDate(new Date()), september2026);

  for (const item of status.waves) {
    const row = document.querySelector<HTMLElement>(`[data-pmb-wave="${item.wave.id}"]`);
    const label = row?.querySelector<HTMLElement>('[data-wave-state-label]');
    if (!row || !label) continue;

    row.dataset.state = item.state;
    label.textContent = item.state === 'active' ? 'Sedang berlaku' : item.state === 'past' ? 'Selesai' : 'Berikutnya';
  }
}

refreshWavePresentation();
window.addEventListener('pageshow', refreshWavePresentation);
window.addEventListener('focus', refreshWavePresentation);

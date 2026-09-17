import { september2026 } from '../data/admissions';
import { calculateTuition, getDefaultTuitionWave, resolveProgramSelection } from '../utils/tuition';
import { getCostComposition, getSspComparison, type TuitionResult } from '../utils/tuitionVisuals';
import { formatRupiah } from '../utils/currency';
import { formatCalendarRange, getJakartaDate, millisecondsUntilJakartaMidnight } from '../utils/calendarDate';

const root = document.querySelector<HTMLElement>('[data-tuition-calculator]');
if (root) {
  const program = root.querySelector<HTMLSelectElement>('#tuition-program')!;
  const wave = root.querySelector<HTMLSelectElement>('#tuition-wave')!;
  const controls = root.querySelector<HTMLFormElement>('[data-tuition-controls]')!;
  const announcement = root.querySelector<HTMLElement>('[data-tuition-announcement]')!;
  const queryNote = root.querySelector<HTMLElement>('[data-query-note]')!;
  const selection = resolveProgramSelection(new URLSearchParams(window.location.search).get('program'));
  program.value = selection.program.id;
  queryNote.textContent = selection.invalid
    ? `Program pada tautan tidak dikenali. ${selection.program.name} dipilih sebagai contoh; kamu dapat menggantinya.`
    : 'Pilihan program mengikuti daftar S1 Margonda untuk periode ini.';
  let manualWave = false;
  let timer: ReturnType<typeof setTimeout>;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let resultMotion: Animation | undefined;
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) resultMotion?.cancel(); });

  function render(announce = false) {
    if (!root) return;
    const result = calculateTuition({ programId: program.value, waveId: wave.value });
    root.querySelector<HTMLElement>('[data-tuition-result]')!.hidden = !result;
    root.querySelector<HTMLElement>('[data-tuition-empty]')!.hidden = !!result;
    root.querySelector<HTMLElement>('[data-result-label]')!.textContent = result
      ? `${result.program.name} · ${result.wave.label}` : 'Belum ada gelombang yang dipilih';
    const activeWave = getDefaultTuitionWave(getJakartaDate(new Date()));
    root.querySelector<HTMLElement>('[data-tuition-empty]')!.textContent = activeWave
      ? 'Pilih gelombang untuk melihat estimasi biaya.'
      : 'Pilih gelombang untuk melihat estimasi. Tidak ada gelombang aktif saat ini; tarif tetap dapat dibandingkan sebagai referensi periode ini.';
    root.querySelector<HTMLElement>('[data-wave-note]')!.textContent = result
      ? `${formatCalendarRange(result.wave.startDate, result.wave.endDate)}. ${result.wave.id === activeWave ? 'Sesuai gelombang aktif pada jadwal PMB.' : 'Pilihan referensi biaya; bukan gelombang aktif saat ini.'}`
      : activeWave ? 'Pilih gelombang yang ingin kamu simulasikan.' : 'Tidak ada gelombang aktif. Pilih salah satu untuk membandingkan tarif periode ini.';
    if (result) {
      const fees = ['registration', 'preCollege', 'semesterTuition', 'semesterOneSubtotal', 'ssp', 'initialTotal'] as const;
      for (const fee of fees) root.querySelector<HTMLElement>(`[data-fee="${fee}"]`)!.textContent = formatRupiah(result[fee]);
      root.querySelector<HTMLElement>('[data-surcharge-note]')!.textContent = result.surcharge
        ? `Kuliah: tarif dasar ${formatRupiah(result.baseSemester)} + tambahan program ${formatRupiah(result.surcharge)} per semester.`
        : 'Biaya kuliah menggunakan tarif dasar, tanpa tambahan program.';
      for (const part of getCostComposition(result)) {
        root.querySelector<HTMLElement>(`[data-cost-segment="${part.key}"]`)!.style.flexGrow = String(part.fraction);
      }
    }
    const scenarios = september2026.waves.map(item => calculateTuition({ programId: program.value, waveId: item.id }))
      .filter((item): item is TuitionResult => item !== null);
    const comparison = getSspComparison(scenarios, result);
    document.querySelector<HTMLElement>('[data-comparison-reference]')!.textContent = result
      ? `Selisih SSP setiap gelombang dibanding ${result.wave.label} pilihanmu (${formatRupiah(result.ssp)}).`
      : 'Pilih gelombang pada simulator untuk melihat selisih SSP.';
    document.querySelectorAll<HTMLElement>('[data-compare-wave]').forEach(row => {
      const item = comparison.find(item => item.wave.id === row.dataset.compareWave);
      if (!item) return;
      const difference = row.querySelector<HTMLElement>('[data-wave-difference]')!;
      row.dataset.relation = item.relation;
      row.querySelector<HTMLElement>('[data-wave-state]')!.textContent = {
        unselected: 'Gelombang', selected: 'Pilihanmu', earlier: 'Sebelum', later: 'Sesudah',
      }[item.relation];
      row.querySelector<HTMLElement>('[data-wave-amount]')!.textContent = formatRupiah(item.amount);
      row.querySelector<HTMLElement>('[data-wave-bar]')!.style.setProperty('--ssp-ratio', String(item.fraction));
      difference.hidden = item.difference === null;
      if (item.difference !== null) {
        const amount = item.difference;
        difference.textContent = `${amount > 0 ? '+' : amount < 0 ? '−' : ''}${formatRupiah(Math.abs(amount))}`;
      }
    });
    if (announce && result && !reducedMotion.matches) {
      resultMotion?.cancel();
      resultMotion = root.querySelector<HTMLElement>('.tuition-total')!.animate(
        [{ opacity: .6 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' },
      );
    }
    if (announce) announcement.textContent = result
      ? `${result.program.name}, ${result.wave.label}. Estimasi komponen biaya awal ${formatRupiah(result.initialTotal)}.`
      : 'Pilih gelombang untuk melihat estimasi biaya.';
  }

  function refresh() {
    clearTimeout(timer);
    const now = new Date();
    if (!manualWave) wave.value = getDefaultTuitionWave(getJakartaDate(now)) ?? '';
    render();
    timer = setTimeout(refresh, millisecondsUntilJakartaMidnight(now) + 50);
  }
  controls.addEventListener('submit', event => event.preventDefault());
  program.addEventListener('change', () => {
    queryNote.textContent = 'Pilihan program mengikuti daftar S1 Margonda untuk periode ini.';
    render(true);
  });
  wave.addEventListener('change', () => { manualWave = true; render(true); });
  refresh();
  controls.hidden = false;
  document.documentElement.classList.remove('tuition-pending');
  // Keep the existing assistant trigger in a dedicated help area on this route.
  // Its native dialog listeners and focus-return behavior remain unchanged.
  const assistantTrigger = document.querySelector<HTMLElement>('[data-assistant-trigger]');
  if (assistantTrigger) root.querySelector('[data-tuition-assistant-slot]')!.append(assistantTrigger);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refresh();
  });
}

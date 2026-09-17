import type { calculateTuition } from './tuition';

export type TuitionResult = NonNullable<ReturnType<typeof calculateTuition>>;
type WaveRelation = 'unselected' | 'selected' | 'earlier' | 'later';

/** Presentation only: every amount and the denominator come from the approved result. */
export function getCostComposition(result: TuitionResult) {
  return [
    { key: 'registration', label: 'Pendaftaran', amount: result.registration },
    { key: 'preCollege', label: 'Prakuliah', amount: result.preCollege },
    { key: 'semesterTuition', label: 'Kuliah / semester', amount: result.semesterTuition },
    { key: 'ssp', label: 'SSP penuh', amount: result.ssp },
  ].map(item => ({ ...item, fraction: item.amount / result.initialTotal }));
}

/** Chronology is relative to the selection, never a claim about today's availability. */
export function getSspComparison(scenarios: readonly TuitionResult[], selected: TuitionResult | null) {
  const maximum = Math.max(...scenarios.map(item => item.ssp));
  const selectedIndex = scenarios.findIndex(item => item.wave.id === selected?.wave.id);
  return scenarios.map((scenario, index) => {
    const relation: WaveRelation = selectedIndex < 0 ? 'unselected' : index === selectedIndex ? 'selected' : index < selectedIndex ? 'earlier' : 'later';
    return {
      wave: scenario.wave,
      amount: scenario.ssp,
      fraction: maximum > 0 ? scenario.ssp / maximum : 0,
      difference: selected ? scenario.ssp - selected.ssp : null,
      relation,
    };
  });
}

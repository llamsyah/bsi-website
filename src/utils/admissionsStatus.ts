import type { AdmissionsPeriod, AdmissionsWave } from '../data/admissions.ts';
import { assertCalendarDate } from './calendarDate.ts';

export type AdmissionsState = 'upcoming' | 'active' | 'closed';
export type WaveState = 'past' | 'active' | 'upcoming';

export interface AdmissionsStatus {
  periodId: string;
  referenceDate: string;
  state: AdmissionsState;
  /** Schedule availability only; not live quota, eligibility or payment status. */
  registrationAvailable: boolean;
  activeWave: AdmissionsWave | null;
  nextWave: AdmissionsWave | null;
  previousWave: AdmissionsWave | null;
  openingDate: string;
  closingDate: string;
  classStart: string;
  waves: { wave: AdmissionsWave; state: WaveState }[];
}

/** Pure calendar comparison: no clock, UTC parsing or UI assumptions. */
export function getAdmissionsStatus(referenceDate: string, period: AdmissionsPeriod): AdmissionsStatus {
  assertCalendarDate(referenceDate);
  assertCalendarDate(period.classStart);
  if (!period.waves.length) throw new RangeError('Admissions period needs at least one verified wave');

  const ids = new Set<string>();
  let precedingEnd: string | null = null;
  for (const wave of period.waves) {
    assertCalendarDate(wave.startDate);
    assertCalendarDate(wave.endDate);
    if (wave.startDate > wave.endDate || (precedingEnd !== null && wave.startDate <= precedingEnd)) {
      throw new RangeError('Admissions waves must be chronological and non-overlapping');
    }
    if (ids.has(wave.id)) throw new RangeError('Admissions wave identifiers must be unique');
    ids.add(wave.id);
    precedingEnd = wave.endDate;
  }

  const waves = period.waves.map(wave => ({
    wave,
    state: (referenceDate < wave.startDate ? 'upcoming' : referenceDate > wave.endDate ? 'past' : 'active') as WaveState,
  }));
  const activeWave = waves.find(item => item.state === 'active')?.wave ?? null;
  const nextWave = waves.find(item => item.state === 'upcoming')?.wave ?? null;
  const past = waves.filter(item => item.state === 'past');

  return {
    periodId: period.id,
    referenceDate,
    // A gap is upcoming with registration unavailable, never a fake active wave.
    state: activeWave ? 'active' : nextWave ? 'upcoming' : 'closed',
    registrationAvailable: activeWave !== null,
    activeWave,
    nextWave,
    previousWave: past.at(-1)?.wave ?? null,
    openingDate: period.waves[0]!.startDate,
    closingDate: period.waves.at(-1)!.endDate,
    classStart: period.classStart,
    waves,
  };
}

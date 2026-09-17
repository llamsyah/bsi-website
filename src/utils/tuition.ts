import { september2026 } from '../data/admissions.ts';
import { margondaPrograms } from '../data/programs.ts';
import { tuition } from '../data/tuition.ts';
import { getAdmissionsStatus } from './admissionsStatus.ts';

/** Unknown inputs do not silently produce a price for a different selection. */
export function calculateTuition({ programId, waveId }: { programId: string; waveId: string }) {
  const program = margondaPrograms.programs.find(item => item.id === programId);
  const wave = september2026.waves.find(item => item.id === waveId);
  if (!program || !wave) return null;
  const surcharge = tuition.surchargeProgramIds.includes(program.id) ? tuition.semesterSurcharge : 0;
  const semesterTuition = tuition.baseSemester + surcharge;
  const semesterOneSubtotal = tuition.registration + tuition.preCollege + semesterTuition;
  const ssp = tuition.sspByWave[wave.id];
  return {
    program, wave, periodId: tuition.periodId,
    registration: tuition.registration, preCollege: tuition.preCollege,
    baseSemester: tuition.baseSemester, surcharge, semesterTuition, ssp,
    semesterOneSubtotal,
    // Full SSP + one semester + registration + pre-college, NOT an amount due now.
    initialTotal: semesterOneSubtotal + ssp,
  };
}

/** Exact, case-sensitive shared slug. Unknown/missing input falls back to first program. */
export function resolveProgramSelection(slug: string | null) {
  const program = margondaPrograms.programs.find(item => item.slug === slug);
  return { program: program ?? margondaPrograms.programs[0]!, invalid: slug !== null && !program };
}

/** No active wave means no automatic cost selection; past waves remain inspectable. */
export function getDefaultTuitionWave(referenceDate: string) {
  return getAdmissionsStatus(referenceDate, september2026).activeWave?.id ?? null;
}

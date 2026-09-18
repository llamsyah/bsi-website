import { academicPrograms, type DegreeLevel } from '../data/academic.ts';

export interface AcademicContext { degreeLevel: DegreeLevel; programId?: string }
export function parseAcademicSelection(search: string | URLSearchParams) {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const level = params.get('jenjang');
  const slug = params.get('program');
  const program = academicPrograms.find(item => item.slug === slug);
  const degreeLevel: DegreeLevel = level === 's2' ? 'S2' : level === 's1' ? 'S1' : program?.degreeLevel ?? 'S1';
  const error = level && !['s1', 's2'].includes(level) ? 'Jenjang pada tautan tidak dikenali. Pilih S1 atau S2.'
    : slug && !program ? 'Program pada tautan tidak dikenali. Pilih kembali program yang tersedia.'
    : program && program.degreeLevel !== degreeLevel ? 'Jenjang dan program pada tautan berbeda. Pilih kembali program sesuai jenjang.' : null;
  return { degreeLevel, program: error ? undefined : program, error };
}
export function academicHref(path: string, context: AcademicContext) {
  const params = new URLSearchParams({ jenjang: context.degreeLevel.toLowerCase() });
  const program = academicPrograms.find(item => item.id === context.programId && item.degreeLevel === context.degreeLevel);
  if (program) params.set('program', program.slug);
  return `${path}?${params}`;
}
export function validAcademicContext(context?: AcademicContext): AcademicContext | undefined {
  if (!context || !['S1', 'S2'].includes(context.degreeLevel)) return undefined;
  const program = academicPrograms.find(item => item.id === context.programId && item.degreeLevel === context.degreeLevel);
  return { degreeLevel: context.degreeLevel, ...(program ? { programId: program.id } : {}) };
}

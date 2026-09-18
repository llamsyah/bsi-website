import { margondaPrograms } from './programs.ts';
import { graduatePrograms } from './graduate.ts';

export type DegreeLevel = 'S1' | 'S2';
export interface AcademicProgram {
  readonly id: string; readonly slug: string; readonly name: string;
  readonly degreeLevel: DegreeLevel; readonly campus: string;
  readonly facultyOrAcademicGroup: string; readonly classOptions: readonly string[];
  readonly intakePeriods: readonly string[]; readonly admissionTrack: string; readonly costModel: string;
}
/** Compatibility projection: existing S1 consumers and pricing retain their original dataset. */
export const academicPrograms: readonly AcademicProgram[] = [
  ...margondaPrograms.programs.map(program => ({ id: program.id, slug: program.slug, name: program.name,
    degreeLevel: program.degree, campus: margondaPrograms.campus, facultyOrAcademicGroup: program.facultyId,
    classOptions: program.classes, intakePeriods: [margondaPrograms.periodId],
    admissionTrack: margondaPrograms.periodId, costModel: 's1-semester-ssp' })),
  ...graduatePrograms,
];
export const programsForDegree = (degree: DegreeLevel) => academicPrograms.filter(program => program.degreeLevel === degree);

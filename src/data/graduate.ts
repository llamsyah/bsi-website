/** Task 11A: dedicated PMB S2 publication; never inherits S1 waves or fees. */
export const graduateIntake = {
  id: 's2-margonda-september-2026', label: 'September 2026', campus: 'margonda',
  classLabel: 'Jumat / Sabtu', classOption: 'jumat-sabtu',
  registrationWindow: null, lectureStart: null,
  eligibility: 'Lulusan Sarjana (S1)', laptopRequired: true,
  source: 'https://pmbubsi.id/infopmb/prodi/s2_info', verifiedAt: '2026-09-17',
} as const;

export const graduatePrograms = [
  { id: 'magister-manajemen', slug: 'magister-manajemen', name: 'Magister Manajemen', degreeLevel: 'S2',
    campus: 'margonda', facultyOrAcademicGroup: 'pascasarjana', classOptions: ['jumat-sabtu'],
    intakePeriods: [graduateIntake.id], admissionTrack: graduateIntake.id, costModel: 's2-mm',
    durationSemesters: 3, durationSource: 'https://news.bsi.ac.id/prodi/s2-jurusan-management/' },
  { id: 'magister-teknologi-informasi', slug: 'magister-teknologi-informasi', name: 'Magister Teknologi Informasi', degreeLevel: 'S2',
    campus: 'margonda', facultyOrAcademicGroup: 'pascasarjana', classOptions: ['jumat-sabtu'],
    intakePeriods: [graduateIntake.id], admissionTrack: graduateIntake.id, costModel: 's2-mti',
    durationSemesters: 3, durationSource: 'https://www.bsi.ac.id/Program-Studi-teknologi-informasi-59110-jakarta-pusat' },
] as const;

export interface GraduateCost {
  kind: 's2-program'; registration: number; matriculation: number; almamater: number;
  programTotal: number; semesterPayment: number;
  installment: { amount: number; count: number };
  componentInclusion: null; installmentDueDates: null;
  exclusions: readonly string[];
}
const common = { kind: 's2-program', registration: 500_000, matriculation: 2_500_000,
  almamater: 500_000, componentInclusion: null, installmentDueDates: null,
  exclusions: ['Remedial', 'Tesis', 'Wisuda'] } as const;
export const graduateCosts: Readonly<Record<string, GraduateCost>> = {
  's2-mm': { ...common, programTotal: 35_000_000, semesterPayment: 11_700_000, installment: { amount: 1_950_000, count: 18 } },
  's2-mti': { ...common, programTotal: 45_000_000, semesterPayment: 15_000_000, installment: { amount: 2_500_000, count: 18 } },
};

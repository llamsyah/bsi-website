import { september2026 } from './admissions.ts';
import type { VerificationMetadata } from './verification';

type WaveId = typeof september2026.waves[number]['id'];

/** CONTENT_DATA.md §§19–23. Amounts are integer rupiah, not payment deadlines. */
export const tuition = {
  periodId: september2026.id,
  registration: 260_000,
  preCollege: 1_600_000,
  baseSemester: 3_980_000,
  semesterSurcharge: 1_000_000,
  surchargeProgramIds: [
    'manajemen', 'akuntansi', 'ilmu-komunikasi',
    'sistem-informasi', 'teknologi-informasi', 'informatika',
  ] as readonly string[],
  sspByWave: {
    i: 2_500_000, ii: 3_000_000, iii: 3_600_000, iv: 4_500_000,
    v: 5_400_000, vi: 6_000_000, khusus: 6_000_000,
  } satisfies Record<WaveId, number>,
  evidence: {
    source: 'CONTENT_DATA.md §§19–23 — verified S1 Margonda fees and SSP',
    verifiedAt: '2026-09-15', verificationStatus: 'VERIFIED',
    scope: 'campus:Margonda; eleven verified S1 programs', period: september2026.id,
  } satisfies VerificationMetadata,
} as const;

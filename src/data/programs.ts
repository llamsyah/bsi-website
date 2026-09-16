import { september2026 } from './admissions';
import type { VerificationMetadata } from './verification';

/** Name-only Home preview. Search, detailed profiles and accreditation are deferred. */
export const margondaPrograms = {
  periodId: september2026.id,
  periodLabel: september2026.label,
  campus: 'margonda',
  degree: 'S1',
  programs: [
    { id: 'rekayasa-perangkat-lunak', name: 'Rekayasa Perangkat Lunak' },
    { id: 'informatika', name: 'Informatika' },
    { id: 'teknologi-informasi', name: 'Teknologi Informasi' },
    { id: 'sistem-informasi', name: 'Sistem Informasi' },
    { id: 'sastra-inggris', name: 'Sastra Inggris' },
    { id: 'ilmu-komunikasi', name: 'Ilmu Komunikasi' },
    { id: 'akuntansi', name: 'Akuntansi' },
    { id: 'manajemen', name: 'Manajemen' },
    { id: 'teknik-elektro', name: 'Teknik Elektro' },
    { id: 'teknik-industri', name: 'Teknik Industri' },
    { id: 'psikologi', name: 'Psikologi' },
  ],
  evidence: {
    source: 'CONTENT_DATA.md §8 — Margonda Program Offering',
    verifiedAt: '2026-09-15', verificationStatus: 'VERIFIED',
    scope: 'campus:Margonda; undergraduate offerings', period: september2026.id,
  } satisfies VerificationMetadata,
} as const;

/** Home preview sample — diverse fields, not ranked or recommended. */
const homePreviewIds = [
  'rekayasa-perangkat-lunak',
  'manajemen',
  'ilmu-komunikasi',
  'psikologi',
] as const;

export const homeProgramPreviewSample = homePreviewIds.map((id) => {
  const program = margondaPrograms.programs.find((entry) => entry.id === id);
  if (!program) throw new Error(`Missing Home preview program: ${id}`);
  return program;
});

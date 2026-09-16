import type { VerificationMetadata } from './verification';

export const institution = {
  name: 'Universitas Bina Sarana Informatika',
  shortName: 'UBSI',
  branding: 'Kampus Digital Kreatif',
  evidence: {
    source: 'CONTENT_DATA.md §5',
    verifiedAt: '2026-09-15',
    verificationStatus: 'VERIFIED',
    scope: 'institution',
  } satisfies VerificationMetadata,
} as const;

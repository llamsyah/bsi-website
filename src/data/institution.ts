import type { VerificationMetadata } from './verification';

export const institution = {
  name: 'Universitas Bina Sarana Informatika',
  shortName: 'UBSI',
  branding: 'Kampus Digital Kreatif',
  accreditation: {
    label: 'Terakreditasi Unggul',
    authority: 'BAN-PT',
    reference: 'SK BAN-PT No. 2346/SK/BAN-PT/Ak/PT/VI/2025',
    // Institution-wide accreditation; no unverified expiry or program claim.
  },
  evidence: {
    source: 'CONTENT_DATA.md §5',
    verifiedAt: '2026-09-15',
    verificationStatus: 'VERIFIED',
    scope: 'institution',
  } satisfies VerificationMetadata,
} as const;

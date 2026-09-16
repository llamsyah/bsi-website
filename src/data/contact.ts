import type { VerificationMetadata } from './verification';

export const contact = {
  whatsapp: { label: '0812-8079-4574', url: 'https://wa.me/6281280794574' },
  evidence: {
    source: 'deep-research-report.md — Identitas Kampus Margonda',
    verifiedAt: '2026-09-15',
    verificationStatus: 'VERIFIED',
    scope: 'campus:Margonda PMB',
  } satisfies VerificationMetadata,
} as const;

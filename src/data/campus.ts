import type { VerificationMetadata } from './verification';

export const campus = {
  name: 'UBSI Kampus Margonda',
  shortName: 'UBSI Margonda',
  buildings: [
    {
      id: 'margonda-a',
      name: 'Margonda A',
      address: 'Jl. Margonda Raya No. 8, Pondok Cina, Beji, Depok',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.%20Margonda%20Raya%20No.%208%2C%20Pondok%20Cina%2C%20Beji%2C%20Depok',
      evidence: {
        source: 'CONTENT_DATA.md §6 — Margonda A',
        verifiedAt: '2026-09-15',
        verificationStatus: 'VERIFIED',
        scope: 'campus:Margonda A',
      } satisfies VerificationMetadata,
    },
    {
      id: 'margonda-b',
      name: 'Margonda B',
      address: 'Jl. Margonda Raya No. 471, Pancoran Mas, Depok',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.%20Margonda%20Raya%20No.%20471%2C%20Pancoran%20Mas%2C%20Depok',
      evidence: {
        // New project confirmation supersedes the older web-research conflict.
        source: 'CONTENT_DATA.md §6 — Margonda B; project team confirmation',
        verifiedAt: '2026-09-15',
        verificationStatus: 'PROJECT_CONFIRMED',
        scope: 'campus:Margonda B',
      } satisfies VerificationMetadata,
    },
  ],
} as const;

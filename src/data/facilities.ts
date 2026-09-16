import type { VerificationMetadata } from './verification';

/** Limited Home preview; never attribute Margonda A facilities to Margonda B. */
export const margondaAPreview = {
  names: ['Ruang kelas', 'Laboratorium', 'Perpustakaan', 'Musholla'],
  image: {
    src: '/images/margonda-a.png', width: 263, height: 293,
    alt: 'Gedung UBSI Kampus Margonda A, foto dari situs resmi UBSI',
    source: 'https://bsi.ac.id/storage/kampus/35DEz7Gyug69WDSDGJaEllpOVvmoEGiXa4uVhsYL.png',
  },
  evidence: {
    source: 'CONTENT_DATA.md §7; index.html — photo for Kampus Margonda A',
    verifiedAt: '2026-09-15', verificationStatus: 'VERIFIED', scope: 'campus:Margonda A',
  } satisfies VerificationMetadata,
} as const;

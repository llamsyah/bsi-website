import type { VerificationMetadata } from './verification';

export const margondaAFacilities = [
  { id: 'ruang-dosen', name: 'Ruang Dosen', image: '/images/facilities/ruang-dosen.jpg', source: 'https://bsi.ac.id/storage/kampus/KFjBsIIoObBCA6LqlveL5fUOv3a4GcopjlD2mzpY.jpg' },
  { id: 'ruang-kelas', name: 'Ruang Kelas', image: '/images/facilities/ruang-kelas.jpg', source: 'https://bsi.ac.id/storage/kampus/Ckt7HFJGXL2cSI3oaNqSCSB9B2FEYwvgoaJdBMaK.jpg' },
  { id: 'laboratorium', name: 'Laboratorium', image: '/images/facilities/laboratorium.jpg', source: 'https://bsi.ac.id/storage/kampus/qRFIbldL19GTJweFf8M1CG4NLFnzXmDrgwW1MZ4E.jpg' },
  { id: 'perpustakaan', name: 'Perpustakaan', image: '/images/facilities/perpustakaan.jpg', source: 'https://bsi.ac.id/storage/kampus/aXHd0jkJQnzdtBrXPVqnIu4mSWaklK159DbYUfhD.jpg' },
  { id: 'area-parkir', name: 'Area Parkir', image: '/images/facilities/area-parkir.jpg', source: 'https://bsi.ac.id/storage/kampus/IOxZ1kvqszGNzq4L1oiY7PLGrRweyVwShvCDvMoH.jpg' },
  { id: 'musholla', name: 'Musholla', image: '/images/facilities/musholla.jpg', source: 'https://bsi.ac.id/storage/kampus/UgGvF3LOGY684HJtKB17pxKikhvFB2E3b1o1Az6W.jpg' },
  { id: 'ruang-meeting', name: 'Ruang Meeting', image: '/images/facilities/ruang-meeting.jpg', source: 'https://bsi.ac.id/storage/kampus/JlZJ6Sc4CucGWlLnSbFGt3LIqmDFvEmEdkNPsEau.jpg' },
  { id: 'parkiran-gedung', name: 'Parkiran Gedung', image: '/images/facilities/parkiran-gedung.jpg', source: 'https://bsi.ac.id/storage/kampus/4fOUZI8jzunsOEBP93Vlr0RbEHGNwF6eJFjzYBqr.jpg' },
] as const;

export const margondaAFacilitiesEvidence = {
  source: 'CONTENT_DATA.md §7; index.html — official UBSI Margonda A facility gallery',
  verifiedAt: '2026-09-15',
  verificationStatus: 'VERIFIED',
  scope: 'campus:Margonda A',
} satisfies VerificationMetadata;

export const margondaBDocumentation = {
  facadeStatus: 'PROJECT_CONFIRMED',
  assetStatus: 'PROJECT PENDING',
  message: 'Tampilan fasad saat ini telah dikonfirmasi tim project. Foto final akan ditempatkan setelah dokumentasi lapangan tersedia.',
  facilities: [] as const,
  evidence: {
    source: 'Task 10 project-team confirmation; CONTENT_DATA.md §7 — Margonda B',
    verifiedAt: '2026-09-17',
    verificationStatus: 'PROJECT_CONFIRMED',
    scope: 'campus:Margonda B facade appearance; no final asset or facility inventory',
  } satisfies VerificationMetadata,
} as const;

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

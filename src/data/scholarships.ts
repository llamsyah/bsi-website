import { registration } from './admissions.ts';

/** General verified baseline, not a live application/eligibility determination. */
export const scholarships = {
  items: [
    { name: 'Talenta Digital', description: 'Dukungan bagi calon mahasiswa dengan talenta di bidang digital. Besaran bantuan mengikuti penilaian dan ketentuan gelombang.' },
    { name: 'Indonesia Juara', description: 'Dukungan bagi calon mahasiswa berprestasi akademik maupun nonakademik. Manfaat mengikuti tingkat prestasi dan ketentuan program.' },
  ],
  informationUrl: registration.url,
  evidence: { source: 'CONTENT_DATA.md §24', verifiedAt: '2026-09-15', scope: 'institution-wide scholarship baseline; not automatic Margonda eligibility' },
} as const;

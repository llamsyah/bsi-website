import type { VerificationMetadata } from './verification';

/** Official PMB entry already linked by the prototype; no local registration flow. */
export const registration = {
  label: 'Daftar Sekarang',
  url: 'https://pmbubsi.id/pmb',
  source: 'index.html — official PMB links; PRODUCT_REQUIREMENTS.md §6.4',
} as const;

export interface AdmissionsWave {
  readonly id: string;
  readonly label: string;
  /** Inclusive campus calendar dates, YYYY-MM-DD. */
  readonly startDate: string;
  readonly endDate: string;
}

export interface AdmissionsPeriod {
  readonly id: string;
  readonly label: string;
  readonly campus: string;
  readonly intake: string;
  readonly registrationUrl: string;
  readonly classStart: string;
  /** Chronological, non-overlapping waves. Gaps are allowed. */
  readonly waves: readonly AdmissionsWave[];
  readonly evidence: VerificationMetadata;
}

export const september2026 = {
  id: 'september-2026',
  label: 'PMB September 2026',
  campus: 'margonda',
  intake: '2026-09',
  registrationUrl: registration.url,
  classStart: '2026-09-21',
  waves: [
    { id: 'i', label: 'Gelombang I', startDate: '2025-10-15', endDate: '2026-02-08' },
    { id: 'ii', label: 'Gelombang II', startDate: '2026-02-09', endDate: '2026-04-08' },
    { id: 'iii', label: 'Gelombang III', startDate: '2026-04-09', endDate: '2026-06-04' },
    { id: 'iv', label: 'Gelombang IV', startDate: '2026-06-05', endDate: '2026-07-02' },
    { id: 'v', label: 'Gelombang V', startDate: '2026-07-03', endDate: '2026-08-14' },
    { id: 'vi', label: 'Gelombang VI', startDate: '2026-08-15', endDate: '2026-09-10' },
    { id: 'khusus', label: 'Gelombang Khusus', startDate: '2026-09-11', endDate: '2026-10-02' },
  ],
  evidence: {
    source: 'CONTENT_DATA.md §§15–16; deep-research-report.md — Jadwal PMB (Syarat & Ketentuan PMB resmi)',
    verifiedAt: '2026-09-15',
    verificationStatus: 'VERIFIED',
    scope: 'campus:Margonda; PMB September 2026',
    period: 'september-2026',
  },
} as const satisfies AdmissionsPeriod;

/** Condensed Home journey, preserving the order in CONTENT_DATA.md §17. */
export const admissionsJourney = {
  steps: [
    { title: 'Registrasi online', description: 'Buat pendaftaran, isi data, lalu selesaikan pembayaran pendaftaran melalui PMB resmi.' },
    { title: 'Ikuti seleksi', description: 'Ikuti Ujian Saringan Masuk secara online sesuai ketentuan PMB.' },
    { title: 'Pilih & daftar ulang', description: 'Pilih kampus, program studi, dan waktu kuliah. Lanjutkan daftar ulang serta lengkapi dokumen.' },
    { title: 'Bersiap kuliah', description: 'Dapatkan NIM dan kelas, ikuti ORMIK/SEMOT, lalu mulai perkuliahan.' },
  ],
  evidence: {
    source: 'CONTENT_DATA.md §17 — Admission Flow', verifiedAt: '2026-09-15',
    verificationStatus: 'VERIFIED', scope: 'PMB procedure summary', period: september2026.id,
  } satisfies VerificationMetadata,
} as const;

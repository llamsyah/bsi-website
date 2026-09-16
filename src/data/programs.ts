import { september2026 } from './admissions.ts';
import type { VerificationMetadata } from './verification';

export const faculties = {
  'teknik-informatika': 'Fakultas Teknik & Informatika',
  'ekonomi-bisnis': 'Fakultas Ekonomi & Bisnis',
  'komunikasi-bahasa': 'Fakultas Komunikasi & Bahasa',
  'ilmu-kesehatan': 'Fakultas Ilmu Kesehatan',
} as const;

export const classTimes = {
  'pagi-siang': 'Pagi / Siang',
  'sore-malam': 'Sore / Malam',
} as const;

export interface Program {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly degree: 'S1';
  readonly facultyId: keyof typeof faculties;
  readonly description: string;
  readonly classes: readonly (keyof typeof classTimes)[];
  /** General subject overview only; does not verify Margonda curriculum or availability. */
  readonly overviewSource: string;
  readonly accreditation?: { readonly label: 'Unggul'; readonly evidence: string };
}

const day = ['pagi-siang'] as const;
const dayAndEvening = ['pagi-siang', 'sore-malam'] as const;
const programDefinitions = [
  {
    id: 'rekayasa-perangkat-lunak', name: 'Rekayasa Perangkat Lunak', facultyId: 'teknik-informatika', classes: day,
    description: 'Mengenal proses pembuatan perangkat lunak, dari analisis kebutuhan dan perancangan hingga pengujian serta pemeliharaan.',
    overviewSource: 'https://www.bsi.ac.id/Program-Studi-Rekayasa-Perangkat-Lunak-S1-58201-Jakarta',
  },
  {
    id: 'informatika', name: 'Informatika', facultyId: 'teknik-informatika', classes: dayAndEvening,
    description: 'Mempelajari komputasi, pemrograman, dan pengolahan data untuk mengembangkan solusi perangkat lunak.',
    overviewSource: 'https://news.bsi.ac.id/prodi/s1-informatika/',
  },
  {
    id: 'teknologi-informasi', name: 'Teknologi Informasi', facultyId: 'teknik-informatika', classes: day,
    description: 'Mengenal pengelolaan infrastruktur teknologi informasi, administrasi sistem, dan keamanan informasi untuk kebutuhan organisasi.',
    overviewSource: 'https://portalv2.bsi.ac.id/Program-Studi-Teknologi-Informasi-S1-55202-Jakarta',
  },
  {
    id: 'sistem-informasi', name: 'Sistem Informasi', facultyId: 'teknik-informatika', classes: dayAndEvening,
    description: 'Menghubungkan kebutuhan organisasi dengan teknologi melalui pengembangan sistem informasi dan pengelolaan data.',
    overviewSource: 'https://news.bsi.ac.id/prodi/s1-sistem-informasi/',
    accreditation: { label: 'Unggul', evidence: 'CONTENT_DATA.md §13 — Sistem Informasi S1 Margonda; baseline 2026-09-15' },
  },
  {
    id: 'sastra-inggris', name: 'Sastra Inggris', facultyId: 'komunikasi-bahasa', classes: day,
    description: 'Mempelajari bahasa, sastra, dan budaya berbahasa Inggris serta penggunaannya dalam komunikasi.',
    overviewSource: 'https://www.bsi.ac.id/Fakultas-Komunikasi-dan-Bahasa',
  },
  {
    id: 'ilmu-komunikasi', name: 'Ilmu Komunikasi', facultyId: 'komunikasi-bahasa', classes: dayAndEvening,
    description: 'Mengenal cara menyusun dan menyampaikan pesan dalam komunikasi antarindividu, organisasi, dan berbagai media.',
    overviewSource: 'https://news.bsi.ac.id/berita/edukasi/jurusan-ilmu-komunikasi/',
  },
  {
    id: 'akuntansi', name: 'Akuntansi', facultyId: 'ekonomi-bisnis', classes: day,
    description: 'Mempelajari pencatatan, pengelolaan, dan pelaporan informasi keuangan untuk membantu memahami kondisi organisasi.',
    overviewSource: 'https://news.bsi.ac.id/berita/edukasi/kuliah-jurusan-akuntansi/',
  },
  {
    id: 'manajemen', name: 'Manajemen', facultyId: 'ekonomi-bisnis', classes: day,
    description: 'Mengenal strategi bisnis, pemasaran, kepemimpinan, dan pengelolaan sumber daya dalam organisasi.',
    overviewSource: 'https://bsi.ac.id/Fakultas-Ekonomi-dan-Bisnis?locale=id',
  },
  {
    id: 'teknik-elektro', name: 'Teknik Elektro', facultyId: 'teknik-informatika', classes: day,
    description: 'Mempelajari penerapan listrik dan elektronika dalam pengembangan perangkat serta sistem teknologi.',
    overviewSource: 'https://news.bsi.ac.id/prodi/s1-teknik-elektro/',
  },
  {
    id: 'teknik-industri', name: 'Teknik Industri', facultyId: 'teknik-informatika', classes: day,
    description: 'Mengenal perancangan dan pengelolaan sistem kerja yang menghubungkan manusia, mesin, material, dan informasi.',
    overviewSource: 'https://news.bsi.ac.id/berita/edukasi/jurusan-anti-ribet-yang-bikin-sistem-kerja-makin-efisien-dan-cuan-maksimal/',
  },
  {
    id: 'psikologi', name: 'Psikologi', facultyId: 'ilmu-kesehatan', classes: day,
    description: 'Mempelajari perilaku, proses berpikir, emosi, dan interaksi sosial untuk memahami manusia.',
    overviewSource: 'https://news.bsi.ac.id/berita/rektor-ubsi-psikologi-kian-diminati/',
  },
] satisfies readonly Omit<Program, 'slug' | 'degree'>[];

export const margondaPrograms = {
  periodId: september2026.id,
  periodLabel: september2026.label,
  campus: 'margonda',
  degree: 'S1',
  programs: programDefinitions.map((program): Program => ({ ...program, slug: program.id, degree: 'S1' })),
  fridaySaturdayAvailable: false,
  overviewEvidence: {
    source: 'Per-program overviewSource URLs; general subject summaries only',
    verifiedAt: '2026-09-16', verificationStatus: 'VERIFIED',
    scope: 'general program subject matter; not campus-specific curriculum promises',
  } satisfies VerificationMetadata,
  evidence: {
    source: 'CONTENT_DATA.md §§8–13 — Margonda offerings, faculties, classes and accreditation',
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

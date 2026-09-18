export type EditorialKind = 'activity' | 'student-life' | 'alumni' | 'achievement';
export type EditorialPlacement =
  | 'home-featured'
  | 'home-supporting'
  | 'campus-student-featured'
  | 'campus-student-supporting'
  | 'campus-people-featured'
  | 'campus-people-supporting';

export interface EditorialItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly kind: EditorialKind;
  readonly scope: 'margonda' | 'institution';
  readonly scopeLabel: string;
  readonly publishDate: string;
  readonly eventStart?: string;
  readonly eventEnd?: string;
  readonly sourceUrl: string;
  readonly sourceLabel: string;
  readonly placement: EditorialPlacement;
  readonly verified: true;
  readonly visual: {
    readonly kind: 'placeholder';
    readonly label: string;
    readonly motif: 'agenda' | 'orientation' | 'digital' | 'enterprise' | 'creative' | 'international' | 'alumni' | 'sport';
  };
}

const editorialItems: readonly EditorialItem[] = [
  {
    id: 'semot-2026', title: 'SEMOT UBSI 2026: berani mengambil inisiatif',
    summary: 'Agenda UBSI untuk membekali mahasiswa baru dengan perspektif, semangat, dan keberanian memulai perjalanan kuliah.',
    category: 'Agenda', kind: 'activity', scope: 'institution', scopeLabel: 'Seluruh kampus UBSI',
    publishDate: '2026-08-28', eventStart: '2026-09-20', eventEnd: '2026-09-20',
    sourceUrl: 'https://news.bsi.ac.id/event/bukan-sekadar-semot-ubsi-2026/', sourceLabel: 'Baca agenda SEMOT di BSINews',
    placement: 'home-featured', verified: true,
    visual: { kind: 'placeholder', label: 'Visual agenda SEMOT 2026', motif: 'agenda' },
  },
  {
    id: 'ormik-margonda-2026', title: 'Langkah awal mahasiswa baru di Margonda',
    summary: 'ORMIK membantu mahasiswa baru mengenal lingkungan akademik, proses belajar, dan ruang pengembangan diri di kampus.',
    category: 'Mahasiswa Baru', kind: 'activity', scope: 'margonda', scopeLabel: 'UBSI Kampus Margonda',
    publishDate: '2026-09-15', eventStart: '2026-09-16', eventEnd: '2026-09-19',
    sourceUrl: 'https://news.bsi.ac.id/berita/menjadi-mahasiswa-dimulai-dari-sini-ubsi-margonda-bekali-mahasiswa-baru-lewat-orientasi-akademik-2026/', sourceLabel: 'Baca konteks ORMIK Margonda di BSINews',
    placement: 'home-supporting', verified: true,
    visual: { kind: 'placeholder', label: 'Visual orientasi mahasiswa baru Margonda', motif: 'orientation' },
  },
  {
    id: 'workshop-digital-kreatif-2026', title: 'Workshop Digital Kreatif untuk mahasiswa baru',
    summary: 'Agenda 12 September memperkenalkan pemanfaatan AI secara kreatif, kritis, dan bertanggung jawab kepada mahasiswa baru Margonda.',
    category: 'Terbaru', kind: 'activity', scope: 'margonda', scopeLabel: 'UBSI Kampus Margonda',
    publishDate: '2026-09-11', eventStart: '2026-09-12', eventEnd: '2026-09-12',
    sourceUrl: 'https://news.bsi.ac.id/berita/menyambut-era-ai-ubsi-kampus-margonda-siapkan-langkah-perdana-mahasiswa-baru-jadi-talenta-digital/', sourceLabel: 'Baca pengumuman workshop di BSINews',
    placement: 'home-supporting', verified: true,
    visual: { kind: 'placeholder', label: 'Visual Workshop Digital Kreatif Margonda', motif: 'digital' },
  },
  {
    id: 'entrepreneur-fair-2026', title: 'Belajar menjalankan usaha melalui Entrepreneur Fair',
    summary: 'Pada 15–24 Juni 2026, mahasiswa lintas program mengelola booth, mempresentasikan produk, dan mempraktikkan pemasaran di Margonda A.',
    category: 'Student Life', kind: 'student-life', scope: 'margonda', scopeLabel: 'Margonda A',
    publishDate: '2026-06-24', eventStart: '2026-06-15', eventEnd: '2026-06-24',
    sourceUrl: 'https://news.bsi.ac.id/event/dorong-semangat-berwirausaha-ubsi-kampus-margonda-sukses-selenggarakan-bsi-entrepreneur-fair-2026/', sourceLabel: 'Baca cerita Entrepreneur Fair di BSINews',
    placement: 'campus-student-featured', verified: true,
    visual: { kind: 'placeholder', label: 'Visual BSI Entrepreneur Fair 2026', motif: 'enterprise' },
  },
  {
    id: 'cinesprint-2026', title: 'Karya media bertemu pengalaman produksi',
    summary: 'CineSprint membawa mahasiswa Ilmu Komunikasi melalui proses produksi film, kolaborasi, dan presentasi karya kreatif.',
    category: 'Karya Mahasiswa', kind: 'student-life', scope: 'margonda', scopeLabel: 'Mahasiswa Margonda',
    publishDate: '2026-07-13', eventStart: '2026-07-04', eventEnd: '2026-07-04',
    sourceUrl: 'https://news.bsi.ac.id/berita/cinesprint-mahasiswa-ilmu-komunikasi/', sourceLabel: 'Baca cerita CineSprint di BSINews',
    placement: 'campus-student-supporting', verified: true,
    visual: { kind: 'placeholder', label: 'Visual proyek kreatif CineSprint 2026', motif: 'creative' },
  },
  {
    id: 'nur-student-mobility', title: 'Pengalaman belajar lintas negara',
    summary: 'Nur Badarul Nashiroh, mahasiswa S1 Manajemen Margonda, mengikuti International Student Mobility di University of Northern Philippines.',
    category: 'Kesempatan Internasional', kind: 'student-life', scope: 'margonda', scopeLabel: 'Mahasiswa Margonda',
    publishDate: '2025-07-14',
    sourceUrl: 'https://news.bsi.ac.id/berita/kisah-inspiratif-nur-di-bkot-2025-mahasiswa-ubsi-kampus-margonda-yang-menembus-kancah-internasional/', sourceLabel: 'Baca kisah student mobility di BSINews',
    placement: 'campus-student-supporting', verified: true,
    visual: { kind: 'placeholder', label: 'Visual pengalaman student mobility internasional', motif: 'international' },
  },
  {
    id: 'inas-zhafirah', title: 'Dari ruang kuliah menuju jurnalisme televisi',
    summary: 'Inas Zhafirah, alumni Ilmu Komunikasi Margonda lulusan 2025, mengembangkan minat jurnalistiknya hingga kini bekerja sebagai jurnalis Garuda TV.',
    category: 'Cerita Alumni', kind: 'alumni', scope: 'margonda', scopeLabel: 'Alumni Margonda',
    publishDate: '2026-08-08',
    sourceUrl: 'https://news.bsi.ac.id/cerita-alumni/inas-wujudkan-mimpi-sebagai-jurnalis-garuda-tv/', sourceLabel: 'Baca perjalanan Inas di BSINews',
    placement: 'campus-people-featured', verified: true,
    visual: { kind: 'placeholder', label: 'Visual cerita alumni Inas Zhafirah', motif: 'alumni' },
  },
  {
    id: 'yoel-proliga-2026', title: 'Bertumbuh bersama tim juara Proliga 2026',
    summary: 'Yoel Alfianto Siregar, mahasiswa Ilmu Komunikasi Margonda, menjadi bagian dari tim LavAni saat tim tersebut menjuarai Proliga 2026.',
    category: 'Prestasi Mahasiswa', kind: 'achievement', scope: 'margonda', scopeLabel: 'Mahasiswa Margonda',
    publishDate: '2026-06-19', eventStart: '2026-01-10', eventEnd: '2026-04-25',
    sourceUrl: 'https://news.bsi.ac.id/berita/dua-mahasiswa-ubsi-berkontribusi-bawa-lavani-raih-juara-1-proliga-2026/', sourceLabel: 'Baca cerita Yoel dan LavAni di BSINews',
    placement: 'campus-people-supporting', verified: true,
    visual: { kind: 'placeholder', label: 'Visual pencapaian tim LavAni di Proliga 2026', motif: 'sport' },
  },
] as const;

const byPlacement = (placement: EditorialPlacement) => editorialItems.filter(item => item.placement === placement);

export const homeEditorialContent = {
  title: 'Terkini di Margonda', featured: byPlacement('home-featured')[0]!, supporting: byPlacement('home-supporting'),
} as const;

export const campusExperienceContent = {
  studentLife: { featured: byPlacement('campus-student-featured')[0]!, supporting: byPlacement('campus-student-supporting') },
  stories: { featured: byPlacement('campus-people-featured')[0]!, supporting: byPlacement('campus-people-supporting') },
} as const;

export { editorialItems };

export interface HomeEditorialItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly date: string;
  readonly category: 'Agenda' | 'Kegiatan' | 'Prestasi' | 'Kehidupan Kampus';
  readonly scope: 'margonda';
  readonly sourceUrl: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
}

interface HomeEditorialCollection {
  readonly title: string;
  readonly status: 'withheld-until-verified' | 'published';
  readonly items: readonly HomeEditorialItem[];
}

const noVerifiedItems: readonly HomeEditorialItem[] = [];

/**
 * Home only renders these collections when verified Margonda-specific copy,
 * source URLs and suitable non-facility imagery are available together.
 */
export const homeEditorialContent: Readonly<{
  studentLife: HomeEditorialCollection;
  activities: HomeEditorialCollection;
}> = {
  studentLife: {
    title: 'Kehidupan mahasiswa di Margonda',
    status: 'withheld-until-verified',
    items: noVerifiedItems,
  },
  activities: {
    title: 'Aktivitas & Cerita dari Margonda',
    status: 'withheld-until-verified',
    items: noVerifiedItems,
  },
};

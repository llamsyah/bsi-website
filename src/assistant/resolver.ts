import { admissionsJourney, registration, september2026 } from '../data/admissions.ts';
import { campus } from '../data/campus.ts';
import { margondaAPreview } from '../data/facilities.ts';
import { classTimes, faculties, margondaPrograms } from '../data/programs.ts';
import { scholarships } from '../data/scholarships.ts';
import { tuition } from '../data/tuition.ts';
import { getAdmissionsStatus } from '../utils/admissionsStatus.ts';
import { formatCalendarDate, formatCalendarRange } from '../utils/calendarDate.ts';
import { formatRupiah } from '../utils/currency.ts';
import { calculateTuition } from '../utils/tuition.ts';
import type { AssistantAction, AssistantRequest, AssistantResponse } from './types';

export const MAX_QUESTION_LENGTH = 500;
const programsAction = { label: 'Lihat Program Studi', href: '/program-studi' };
const costsAction = { label: 'Buka Simulator Biaya', href: '/biaya-beasiswa' };
const pmbAction = { label: 'Lihat Panduan PMB', href: '/pmb' };
const registrationAction = { label: registration.label, href: registration.url };
const campusAction = { label: 'Lihat Kampus Margonda', href: '/kampus' };
const programContext = `${margondaPrograms.periodLabel} · S1 Margonda`;
const feeContext = `${programContext} · acuan biaya ${formatCalendarDate(tuition.evidence.verifiedAt)}`;

function normalize(value: string) {
  return value.toLocaleLowerCase('id-ID').normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}
function containsPhrase(query: string, phrase: string) {
  return ` ${query} `.includes(` ${normalize(phrase)} `);
}
function answer(text: string, actions: readonly AssistantAction[], sourceContext?: string, status: AssistantResponse['status'] = 'answered'): AssistantResponse {
  return { text, actions, sourceContext, status };
}
function fallback(action = pmbAction) {
  return answer('Aku belum punya informasi terverifikasi untuk pertanyaan itu. Aku bisa membantu soal program, kelas, biaya, jadwal PMB, alamat kampus, dan informasi umum beasiswa Margonda. Untuk ketentuan lain, konfirmasikan melalui PMB resmi UBSI.', [action, registrationAction], undefined, 'unsupported');
}

/** Deterministic, deliberately limited topic matching; no conversation memory or generated facts. */
export function resolveAssistant({ question, referenceDate }: AssistantRequest): AssistantResponse {
  const query = normalize(question);
  if (!query) return answer('Apa yang ingin kamu ketahui tentang UBSI Margonda?', [], undefined, 'clarify');
  if (question.length > MAX_QUESTION_LENGTH) return answer(`Tulis pertanyaan singkat, maksimal ${MAX_QUESTION_LENGTH} karakter.`, [], undefined, 'clarify');
  // Unsupported markup and high-ambiguity topics never flow into factual answer templates.
  if (/[<>]/.test(question)) return fallback();
  const years = query.match(/\b20\d{2}\b/g) ?? [];
  if (years.some(year => year !== september2026.intake.slice(0, 4))) return fallback();
  if (/\b(s2|d3|magister|keperawatan|kedokteran|hukum|hubungan internasional|gaji|karier|cocok|rekomendasi|cicilan|diskon|promo|gratis|kuota|kursi|lulus|kos|jam operasional|jam buka|akreditasi|sertifikasi|daring|kelas online|kuliah online|golden ticket|indonesia cerdas)\b/.test(query)) return fallback();

  if (/\b(beasiswa|talenta digital|indonesia juara)\b/.test(query)) {
    const selected = scholarships.items.filter(item => containsPhrase(query, item.name));
    const items = selected.length ? selected : scholarships.items;
    return answer(items.map(item => `${item.name}: ${item.description}`).join('\n\n') + '\n\nAku tidak menentukan kelayakan atau besaran bantuanmu. Cek ketersediaan dan syarat terbaru melalui PMB resmi; estimasi simulator belum dikurangi beasiswa.',
      [{ label: 'Kenali pilihan beasiswa', href: '/biaya-beasiswa#beasiswa' }, registrationAction],
      `Informasi umum UBSI · acuan ${formatCalendarDate(scholarships.evidence.verifiedAt)}`);
  }

  if (/\b(fasilitas|alamat|lokasi)\b/.test(query)) {
    const building = campus.buildings.find(item => containsPhrase(query, item.name) || containsPhrase(query, `gedung ${item.id.at(-1)}`) || containsPhrase(query, `kampus ${item.id.at(-1)}`));
    if (/\bfasilitas\b/.test(query)) {
      if (building?.id === 'margonda-b') return answer('Informasi lengkap fasilitas Margonda B belum tersedia. Aku tidak bisa menyamakannya dengan fasilitas Margonda A.', [campusAction], 'Margonda B · dokumentasi fasilitas belum lengkap', 'unsupported');
      return answer(`Fasilitas Margonda A yang sudah tercantum di website: ${margondaAPreview.names.join(', ')}. Ini merupakan ringkasan, bukan inventaris lengkap. Fasilitas Margonda B belum didokumentasikan lengkap.`, [campusAction], 'Fasilitas Margonda A · data website');
    }
    return answer((building ? [building] : campus.buildings).map(item => `${item.name}: ${item.address}.`).join('\n\n'), [campusAction], 'Alamat UBSI Kampus Margonda · data website');
  }

  // Faculty phrases are resolved first: "Fakultas Teknik & Informatika" is not a single program.
  if (/\bfakultas\b/.test(query)) {
    const faculty = Object.entries(faculties).find(([, name]) => containsPhrase(query.replace(/\bdan\b/g, ' ').replace(/\s+/g, ' '), name));
    if (!faculty) return answer(`Fakultas mana yang kamu maksud? Pilihan dalam daftar Margonda: ${Object.values(faculties).join('; ')}.`, [programsAction], programContext, 'clarify');
    const names = margondaPrograms.programs.filter(item => item.facultyId === faculty[0]).map(item => item.name);
    return answer(`${faculty[1]} di Margonda mencakup: ${names.join(', ')}. Semua program pada daftar ini berjenjang S1.`, [programsAction], programContext);
  }

  const programs = margondaPrograms.programs.filter(item => containsPhrase(query, item.name) || (item.id === 'rekayasa-perangkat-lunak' && containsPhrase(query, 'rpl')));
  if (programs.length > 1) return answer('Sebutkan satu program dulu agar rincian kelas atau biayanya jelas. Kamu juga bisa membandingkan pilihan melalui halaman Program Studi.', [programsAction], programContext, 'clarify');
  const program = programs[0];
  if (program && /\b(malam|sore)\b/.test(query) && !program.classes.includes('sore-malam')) {
    return answer(`Kelas Sore / Malam belum tercantum untuk ${program.name} dalam daftar Margonda periode ini. Pilihan yang tercantum: ${program.classes.map(id => classTimes[id]).join(' dan ')}.`, [programsAction], programContext, 'unsupported');
  }
  const waveToken = query.match(/\b(?:gelombang|gel)\s+(\S+)/)?.[1];
  const numericWave = waveToken && /^[1-6]$/.test(waveToken) ? september2026.waves[Number(waveToken) - 1] : undefined;
  const wave = numericWave ?? september2026.waves.find(item => item.id === waveToken);
  const hasWaveRequest = /\b(?:gelombang|gel)\b/.test(query);

  if (/\b(biaya|tarif|uang kuliah|ssp)\b/.test(query)) {
    if (/\bssp\b/.test(query) && /\b(apa|artinya|pengertian)\b/.test(query) && !hasWaveRequest) {
      return answer('SSP adalah Sumbangan Sarana Pendidikan. Nilai penuhnya mengikuti gelombang pendaftaran dan terpisah dari biaya kuliah per semester. Simulator menampilkan SSP penuh, bukan jadwal cicilannya.', [costsAction], feeContext);
    }
    if (hasWaveRequest && !wave) return answer('Gelombang mana yang kamu maksud? Sebutkan I, II, III, IV, V, VI, atau Khusus.', [costsAction], feeContext, 'clarify');
    if (/\bssp\b/.test(query) && !program) {
      if (!wave) return answer('SSP untuk gelombang yang mana? Pilih I–VI atau Khusus; nilainya bisa dibandingkan di simulator.', [costsAction], feeContext, 'clarify');
      return answer(`SSP penuh ${wave.label}: ${formatRupiah(tuition.sspByWave[wave.id])}. Jadwal gelombang: ${formatCalendarRange(wave.startDate, wave.endDate)}. Ini referensi biaya periode tersebut, bukan pernyataan bahwa gelombangnya sedang dibuka.`, [costsAction], feeContext);
    }
    if (!program) return answer('Maksudmu biaya program studi yang mana? Sebutkan nama program, misalnya Informatika atau Rekayasa Perangkat Lunak.', [costsAction, programsAction], programContext, 'clarify');
    const active = getAdmissionsStatus(referenceDate, september2026).activeWave;
    // The first wave is only a lookup container for semester tuition when no wave is active.
    const result = calculateTuition({ programId: program.id, waveId: (wave ?? active ?? september2026.waves[0]).id })!;
    let text = `Biaya kuliah ${program.name}: ${formatRupiah(result.semesterTuition)} per semester.`;
    text += result.surcharge ? ` Sudah termasuk tambahan program ${formatRupiah(result.surcharge)}.` : ' Menggunakan tarif dasar tanpa tambahan program.';
    if (wave || active) {
      text += `\n\nUntuk ${result.wave.label}, SSP penuh ${formatRupiah(result.ssp)}. Estimasi komponen biaya awal ${formatRupiah(result.initialTotal)} mencakup pendaftaran, prakuliah, satu semester kuliah, dan SSP penuh. Bukan tagihan sekaligus atau total sampai lulus.`;
    } else text += '\n\nTidak ada gelombang aktif pada jadwal periode ini. Pilih gelombang secara manual di simulator untuk melihat rincian referensi biaya.';
    return answer(text, [{ label: `Hitung biaya ${program.name}`, href: `/biaya-beasiswa?${new URLSearchParams({ program: program.slug })}` }], `${feeContext} · ditanya ${formatCalendarDate(referenceDate)} (WIB)`);
  }

  if (/\b(kelas|malam|sore|pagi|siang|jumat|sabtu|jadwal kuliah)\b/.test(query)) {
    if (/\b(jumat|sabtu)\b/.test(query) && !margondaPrograms.fridaySaturdayAvailable) return answer('Kelas Jumat / Sabtu tidak dibuka untuk program S1 dalam daftar Margonda pada periode ini.', [programsAction], programContext);
    if (program) return answer(`${program.name}: ${program.classes.map(id => classTimes[id]).join(' dan ')}.${!program.classes.includes('sore-malam') ? ' Kelas Sore / Malam belum tercantum untuk program ini.' : ''} Jam perkuliahan terperinci perlu dikonfirmasi melalui PMB resmi.`, [programsAction], programContext);
    return answer('Kelas untuk program studi yang mana? Sebutkan nama program agar aku bisa menunjukkan pilihan waktu kuliahnya.', [programsAction], programContext, 'clarify');
  }

  if (/\b(program apa saja|program studi apa saja|jurusan apa saja|daftar program|daftar jurusan|pilihan program|pilihan jurusan)\b/.test(query) || ['jurusan', 'program studi', 'program'].includes(query)) {
    return answer(`Daftar ${margondaPrograms.programs.length} program ${margondaPrograms.degree} di Margonda:\n${margondaPrograms.programs.map(item => `• ${item.name}`).join('\n')}`, [programsAction], programContext);
  }
  if (/\b(mulai kuliah|awal kuliah|awal perkuliahan)\b/.test(query)) return answer(`Awal perkuliahan ${september2026.label} dijadwalkan ${formatCalendarDate(september2026.classStart)}.`, [pmbAction], september2026.label);
  if (/\b(cara daftar|cara mendaftar|alur|proses pmb|registrasi)\b/.test(query)) return answer(admissionsJourney.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.description}`).join('\n\n'), [pmbAction, registrationAction], september2026.label);
  if (/\b(daftar|pendaftaran|pmb|gelombang|gel)\b/.test(query)) {
    if (wave) return answer(`${wave.label}: ${formatCalendarRange(wave.startDate, wave.endDate)}. Tanggal akhir termasuk dalam jadwal pendaftaran.`, [pmbAction], september2026.label);
    if (waveToken && !['apa', 'sekarang', 'saat', 'aktif', 'berapa', 'pendaftaran'].includes(waveToken)) return answer('Sebutkan gelombang I–VI atau Khusus untuk jadwalnya, atau tanyakan “sekarang gelombang apa?”.', [pmbAction], september2026.label, 'clarify');
    const status = getAdmissionsStatus(referenceDate, september2026);
    const text = status.activeWave
      ? `Pendaftaran dibuka sesuai jadwal ${status.activeWave.label}, ${formatCalendarRange(status.activeWave.startDate, status.activeWave.endDate)}.`
      : status.nextWave ? `Pendaftaran belum dibuka. ${status.nextWave.label} dijadwalkan mulai ${formatCalendarDate(status.nextWave.startDate)}; tidak ada gelombang aktif saat ini.`
      : `Pendaftaran ${september2026.label} telah ditutup sesuai jadwal pada ${formatCalendarDate(status.closingDate)}. Belum ada periode berikutnya dalam data website.`;
    return answer(`${text} Konfirmasi proses pendaftaran melalui PMB resmi UBSI.`, [pmbAction, registrationAction], `${september2026.label} · per ${formatCalendarDate(referenceDate)} (WIB)`);
  }

  if (program && (/\b(ada|tersedia|tentang|belajar|program|jurusan)\b/.test(query) || query === normalize(program.name))) {
    return answer(`${program.name} (${program.degree}) tercantum dalam daftar program Margonda. ${program.description}`, [programsAction], programContext);
  }
  return fallback();
}

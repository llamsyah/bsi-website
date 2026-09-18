import { graduateIntake, graduatePrograms } from '../data/graduate.ts';
import { registration } from '../data/admissions.ts';
import { academicHref, type AcademicContext } from '../utils/academicSelection.ts';
import { getGraduateCost } from '../utils/graduateCosts.ts';
import { formatRupiah as rupiah } from '../utils/currency.ts';
import type { AssistantResponse } from './types';

export function resolveGraduate(query: string, context: AcademicContext): AssistantResponse {
  const program = graduatePrograms.find(item => item.id === context.programId);
  const actions = [
    { label: 'Lihat biaya S2', href: academicHref('/biaya-beasiswa', context) },
    { label: 'Panduan PMB S2', href: academicHref('/pmb', context) },
  ];
  const reply = (text: string, status: AssistantResponse['status'] = 'answered'): AssistantResponse => ({ text, status, actions, context, sourceContext: `S2 Margonda · ${graduateIntake.label} · publikasi PMB S2, 17 September 2026` });
  if (/\b(ssp|prakuliah|precollege)\b/.test(query)) return reply('Sumber biaya S2 yang digunakan tidak mencantumkan komponen SSP atau prakuliah seperti pada S1. Biaya S2 disajikan terpisah: pendaftaran, matrikulasi, almamater, dan pilihan pembayaran program. Konfirmasi tagihan akhir melalui PMB resmi.');
  if (/\b(kuota|kursi|gratis|beasiswa|diskon|promo|akreditasi|daring|online|gedung|gaji|rekomendasi|cocok)\b/.test(query)) return reply('Ketentuan itu belum tersedia dalam acuan S2 Margonda yang digunakan. Konfirmasi melalui PMB resmi UBSI; aku tidak dapat menentukan kelayakan, potongan, atau penempatan gedung.', 'unsupported');
  if (/\b(biaya|biayanya|tarif|bayar|pembayaran|cicilan|dicicil|angsuran|harga|matrikulasi|almamater)\b/.test(query)) {
    if (!program) return reply('Biaya program S2 yang mana: Magister Manajemen atau Magister Teknologi Informasi?', 'clarify');
    const result = getGraduateCost(program.id)!;
    const cost = result.cost;
    return reply(`${program.name}: total program yang dipublikasikan ${rupiah(cost.programTotal)}; per semester ${rupiah(cost.semesterPayment)}; atau angsuran ${cost.installment.count} × ${rupiah(cost.installment.amount)}. Ketiganya bukan komponen untuk dijumlahkan.${result.inconsistent ? ` Perkalian semester dan angsuran menghasilkan ${rupiah(result.installmentProduct)}, berbeda ${rupiah(result.difference)} dari total publikasi. Angka resmi tidak disesuaikan.` : ''}\n\nPendaftaran ${rupiah(cost.registration)}, matrikulasi ${rupiah(cost.matriculation)} saat daftar ulang, dan almamater ${rupiah(cost.almamater)}. Hubungan komponen ini dengan total program perlu dikonfirmasi. Belum termasuk ${cost.exclusions.join(', ')}. Jadwal angsuran dan tagihan akhir mengikuti konfirmasi PMB resmi.`);
  }
  if (/\b(gelombang|gel|buka|dibuka|tutup|ditutup|mulai|awal|tanggal|deadline)\b/.test(query)) return reply('Margonda tercantum untuk intake S2 September 2026. Tanggal pendaftaran dan awal kuliah S2 belum tersedia dalam acuan ini, sehingga status buka/tutup belum dapat ditentukan. Jadwal gelombang S1 tidak digunakan untuk S2. Konfirmasi jadwal melalui PMB resmi.');
  if (/\b(kelas|jadwal|jumat|sabtu|malam|sore|pagi|siang|kapan)\b/.test(query)) return reply(`Kelas S2 Margonda tercantum ${graduateIntake.classLabel} untuk intake ${graduateIntake.label}. Jam terperinci dan mode perkuliahan perlu dikonfirmasi; aku tidak menyimpulkan kelas pagi atau malam.`);
  if (/\b(daftar|pendaftaran|alur|syarat|lulus|dokumen|registrasi)\b/.test(query)) return { ...reply(`Syarat yang tercantum: ${graduateIntake.eligibility}; perkuliahan menggunakan laptop. Matrikulasi dibayarkan saat daftar ulang. Konfirmasi dokumen, seleksi, dan jadwal melalui PMB resmi UBSI. Website ini tidak memproses pendaftaran.`), actions: [...actions, { label: registration.label, href: registration.url }] };
  if (/\b(lama|durasi|semester)\b/.test(query)) return reply('Profil kedua program menyebut durasi 3 semester. Penyelesaian mengikuti ketentuan akademik; ini bukan jaminan kelulusan pada tanggal tertentu.');
  if (/\b(ada|tersedia|program|jurusan|s2|magister|pascasarjana|tentang)\b/.test(query)) return reply(`${program ? program.name : graduatePrograms.map(item => item.name).join(' dan ')} tersedia dalam daftar S2 Margonda untuk intake ${graduateIntake.label}, kelas ${graduateIntake.classLabel}.`, 'answered');
  return reply('Aku bisa membantu tentang pilihan program S2, kelas, biaya, dan persiapan pendaftaran. Ketentuan lainnya perlu dikonfirmasi melalui PMB resmi.', 'unsupported');
}

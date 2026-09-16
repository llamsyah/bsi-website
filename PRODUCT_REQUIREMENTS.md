# Product Requirements — Website PMB Universitas BSI Margonda

## 1. Product Goal

Website PMB UBSI Margonda harus membantu calon mahasiswa membuat keputusan dengan lebih cepat dan percaya diri sebelum melanjutkan ke sistem pendaftaran resmi UBSI.

Website harus berfungsi sebagai:

* information portal,
* campus-specific PMB guide,
* decision-support tool,
* entry point menuju official registration.

Website tidak menggantikan sistem PMB pusat.

---

## 2. Core User Journey

User journey utama:

**Kenal → Percaya → Pilih Jurusan → Hitung Kemampuan → Kenal Kampus → Pahami PMB → Daftar**

Setiap halaman dan fitur harus mendukung minimal satu tahap dari journey tersebut.

Jika sebuah fitur tidak membantu user memahami kampus, memilih program, memahami biaya, memahami proses PMB, atau melakukan pendaftaran, fitur tersebut bukan prioritas utama.

---

## 3. Primary Audience

Target utama:

Calon mahasiswa yang sedang mempertimbangkan kuliah di UBSI Kampus Margonda.

Secondary audience:

* orang tua/wali,
* siswa SMA/SMK sederajat,
* calon mahasiswa pindahan apabila informasi resmi tersedia,
* pengguna yang ingin memahami biaya atau fasilitas sebelum mendaftar.

---

## 4. Primary Navigation

Primary navigation final:

1. Beranda
2. Program Studi
3. Biaya & Beasiswa
4. Kampus Margonda
5. Panduan PMB
6. Daftar Sekarang

### Navigation Rules

`Daftar Sekarang`:

* visually distinct,
* berfungsi sebagai primary CTA,
* mengarah ke kanal pendaftaran resmi PMB UBSI,
* tidak mengarah ke calculator,
* tidak membuka form pendaftaran lokal palsu.

AI Assistant tidak menjadi primary navigation.

Student Life tidak menjadi primary navigation.

---

# 5. PAGE REQUIREMENTS

---

## 5.1 Beranda

### Purpose

Memberikan overview cepat mengenai UBSI Margonda dan mengarahkan user ke informasi yang paling penting untuk mengambil keputusan.

### Required Sections

Urutan baseline:

1. Navbar
2. Hero
3. Trust Proof
4. Status PMB
5. Program Studi Preview
6. Biaya & Beasiswa Preview
7. Kenapa UBSI Margonda
8. Panduan PMB Preview
9. Kampus & Fasilitas Preview
10. Berita Margonda
11. FAQ
12. Final CTA
13. Footer

---

### Hero

Hero harus menjelaskan dengan jelas:

* website ini tentang UBSI Margonda,
* apa manfaat website bagi calon mahasiswa,
* tindakan berikutnya.

Primary CTA:

`Daftar Sekarang`

Secondary CTA:

`Lihat Program Studi`

Optional tertiary action:

* Simulasi Biaya
* Download brochure jika resource resmi tersedia.

Hero tidak boleh mengandalkan klaim marketing yang tidak terverifikasi.

Hindari:

* AI-Native Campus
* AI Native Learning
* angka mitra industri tanpa source kuat
* angka sertifikasi yang berpotensi outdated.

---

### Trust Proof

Trust section harus menampilkan sedikit fakta tetapi kuat.

Contoh kandidat:

* Terakreditasi Unggul
* Kampus Digital Kreatif
* 11 Program S1 di Margonda
* status PMB aktif jika current

Trust item yang bersifat temporal harus berasal dari admissions source of truth.

Jangan mencampurkan data institusi dan Margonda tanpa label.

---

### Status PMB

Section harus menunjukkan:

* status pendaftaran,
* gelombang/periode aktif,
* tanggal penutupan,
* tanggal awal perkuliahan jika relevan.

Jika tidak ada gelombang aktif:

jangan menampilkan gelombang lama sebagai current.

Gunakan state seperti:

* Pendaftaran Dibuka
* Pendaftaran Ditutup
* Menunggu Periode Berikutnya

CTA:

* Daftar Sekarang
* Lihat Panduan PMB

---

### Program Studi Preview

Home harus memperkenalkan offering Margonda.

Baseline saat ini:

11 program S1.

Home tidak harus menjelaskan semua detail.

Minimal tampilkan:

* nama program,
* jenjang,
* bidang/fakultas jika valid,
* class availability jika relevan.

CTA:

`Lihat Semua Program Studi`

---

### Biaya & Beasiswa Preview

Section harus menonjolkan calculator sebagai decision-support.

Tujuan:

membantu user memahami estimasi biaya sebelum mendaftar.

Harus menyediakan jalur ke:

* Simulasi Biaya
* Informasi Beasiswa

Jangan framing calculator sebagai technology showcase.

---

### Kenapa UBSI Margonda

Section harus menggunakan fakta konkret.

Kandidat value:

* institusi Terakreditasi Unggul,
* lokasi Margonda,
* pilihan program studi,
* Kampus Digital Kreatif,
* sertifikasi melalui LSP UBSI terlisensi BNSP,
* ekosistem karier dan kerja sama industri,
* fasilitas kampus.

Hindari copy terlalu generik seperti:

“kampus terbaik untuk masa depan”

tanpa bukti.

---

### Panduan PMB Preview

Home hanya membutuhkan overview.

Contoh alur:

1. Pilih program studi
2. Lakukan pendaftaran
3. Ikuti proses seleksi
4. Selesaikan daftar ulang
5. Mulai perkuliahan

Alur final harus mengikuti sumber resmi PMB.

CTA:

`Lihat Panduan PMB`

---

### Kampus & Fasilitas Preview

Home harus memberi gambaran:

* Margonda A
* Margonda B
* beberapa fasilitas utama

Gunakan visual nyata.

Margonda B menggunakan dokumentasi original tim setelah tersedia.

---

### Berita Margonda

Prioritaskan:

* kegiatan kampus Margonda,
* mahasiswa Margonda,
* kegiatan PMB Margonda,
* prestasi yang relevan dengan Margonda.

Jangan menggunakan berita kampus lain seolah-olah berita Margonda.

Jika berita nasional digunakan, label:

`UBSI Nasional`

harus jelas.

---

### FAQ

FAQ Home harus menjawab pertanyaan pendek yang paling umum.

Contoh topik:

* program studi,
* biaya,
* beasiswa,
* lokasi,
* kelas,
* cara daftar.

Jawaban harus singkat.

Detail diarahkan ke halaman terkait.

---

### Final CTA

Purpose:

memberikan closing action setelah seluruh decision journey.

CTA utama:

`Daftar Sekarang`

Secondary:

`Lihat Panduan PMB`

---

# 5.2 Program Studi

## Purpose

Membantu calon mahasiswa mengetahui dan membandingkan program studi yang benar-benar tersedia di Kampus Margonda.

## Baseline Offering

Current verified baseline:

* Rekayasa Perangkat Lunak
* Informatika
* Teknologi Informasi
* Sistem Informasi
* Sastra Inggris
* Ilmu Komunikasi
* Akuntansi
* Manajemen
* Teknik Elektro
* Teknik Industri
* Psikologi

Hanya program yang dapat diverifikasi sebagai offering Margonda yang boleh masuk.

---

## Required Features

### Search

User dapat mencari berdasarkan:

* nama program,
* keyword relevan.

Search harus tetap sederhana dan cepat.

### Filter

Filter dapat menggunakan:

* bidang/fakultas,
* kelas,
* kategori lain jika benar-benar membantu.

Jangan membuat terlalu banyak filter.

### Program Card

Setiap card minimal berisi:

* nama program,
* jenjang,
* faculty/category jika valid,
* short description,
* class availability jika verified,
* CTA detail atau CTA biaya.

Salary range tidak ditampilkan tanpa source kuat.

---

## Program Detail

Jika program detail dibuat, informasi ideal:

* nama resmi
* jenjang
* faculty
* overview
* kompetensi utama
* prospek karier
* kurikulum/link resmi
* akreditasi jika verified
* sertifikasi relevan jika official
* pilihan kelas
* CTA Simulasi Biaya
* CTA Daftar Sekarang

Detail page hanya diperlukan jika content cukup.

Jangan membuat detail kosong hanya demi route.

---

# 5.3 Biaya & Beasiswa

## Purpose

Membantu calon mahasiswa memperkirakan biaya dan mengetahui peluang beasiswa.

---

## Financial Cost Simulator

Simulator harus tetap menjadi feature utama.

User harus dapat memahami:

* biaya pendaftaran,
* biaya prakuliah,
* biaya kuliah,
* SSP,
* tambahan khusus program jika ada,
* total estimasi.

Calculator harus menjelaskan bahwa:

* angka mengikuti periode tertentu,
* biaya dapat berubah,
* hasil merupakan estimasi berdasarkan data PMB resmi yang tersedia.

---

## Wave Logic

Current baseline:

* Gelombang I
* Gelombang II
* Gelombang III
* Gelombang IV
* Gelombang V
* Gelombang VI
* Gelombang Khusus

Current active wave harus ditentukan berdasarkan tanggal.

Jika tidak ada gelombang aktif:

jangan fallback ke gelombang terakhir.

---

## Scope

Program yang tidak tersedia di Margonda tidak boleh muncul sebagai default offering.

Current baseline:

D3 tidak menjadi offering utama Margonda.

S1 Keperawatan bukan offering Margonda.

S2 belum dianggap final sampai clarification selesai.

---

## Beasiswa

Baseline yang saat ini mempunyai current evidence paling kuat:

* Beasiswa Talenta Digital
* Beasiswa Indonesia Juara

Setiap beasiswa idealnya menampilkan:

* nama
* target
* benefit
* syarat utama
* status
* official source/link

Jika status tidak jelas:

jangan label sebagai “aktif”.

---

# 5.4 Kampus Margonda

## Purpose

Membantu calon mahasiswa memahami lokasi, suasana, fasilitas, dan konteks Kampus Margonda.

---

## Required Structure

### Intro

Overview singkat UBSI Margonda.

### Margonda A

Tampilkan:

* alamat
* map
* visual
* fasilitas terverifikasi
* fungsi gedung jika source tersedia

### Margonda B

Tampilkan:

* informasi gedung baru,
* alamat terbaru setelah dikonfirmasi,
* dokumentasi original tim,
* fasilitas hanya jika sudah terverifikasi.

Jangan isi placeholder menggunakan gambar random.

---

## Institutional History

Timeline dapat menggunakan:

* 1988
* 2018
* 2033

Namun harus diberi context bahwa ini adalah timeline institusi BSI/UBSI.

Jangan memberikan impression bahwa Kampus Margonda berdiri sejak 1988.

---

## Vision and Mission

Visi/misi dapat tersedia sebagai secondary content.

Jangan menjadikannya isi utama Home.

---

## Student Life

Student Life dapat masuk ke halaman Kampus.

Content:

* organisasi
* kegiatan
* student activity
* campus life
* gallery

Gunakan content yang relevan dan dapat diverifikasi.

---

# 5.5 Panduan PMB

## Purpose

Memberikan alur penerimaan mahasiswa baru yang mudah dipahami.

---

## Required Content

Minimal menjelaskan:

* siapa yang dapat mendaftar
* program/periode
* proses registrasi
* seleksi
* daftar ulang
* dokumen
* pembayaran jika applicable
* langkah setelah diterima
* official registration link

---

## PMB Flow

Alur harus mengikuti prosedur resmi.

Baseline:

1. Registrasi online
2. Proses seleksi/ujian
3. Daftar ulang dan upload dokumen
4. Proses administrasi mahasiswa
5. Persiapan perkuliahan

Exact wording harus disesuaikan source resmi.

---

## Admissions Period

PMB date merupakan temporal data.

Halaman harus menampilkan periode yang berlaku.

Archive period tidak boleh terlihat sebagai current.

---

## FAQ

Full PMB FAQ dapat ditempatkan di halaman ini.

Topik:

* cara daftar,
* biaya,
* dokumen,
* gelombang,
* beasiswa,
* lokasi,
* kelas,
* daftar ulang.

---

# 6. GLOBAL REQUIREMENTS

## 6.1 Data Accuracy

Setiap claim penting harus memiliki factual baseline.

Kategori data:

* VERIFIED
* NEEDS CONTEXT
* OUTDATED
* CONFLICTING
* NOT ENOUGH EVIDENCE

Data yang `OUTDATED` atau `NOT ENOUGH EVIDENCE` tidak boleh dipresentasikan sebagai current fact.

---

## 6.2 Scope Awareness

Setiap data harus jelas scope-nya:

* UBSI nasional
* Kampus Margonda
* program tertentu
* periode tertentu

Jangan mencampur scope.

---

## 6.3 Temporal Data

Data berikut dianggap temporal:

* PMB wave
* tanggal pendaftaran
* tuition
* scholarship
* promo
* news
* class availability

UI harus memperlakukan data tersebut sebagai informasi yang dapat berubah.

---

## 6.4 Registration CTA

Semua CTA `Daftar Sekarang` harus mempunyai destination yang konsisten.

Destination:

official PMB UBSI.

Tidak ada registration flow palsu di website ini.

---

## 6.5 Responsive

Website harus usable pada:

* mobile
* tablet
* laptop
* desktop

Prioritas mobile:

content clarity lebih penting daripada decorative animation.

---

## 6.6 Accessibility

Minimal:

* semantic interaction
* keyboard accessible
* focus visible
* meaningful alt text
* readable contrast
* proper labels
* reduced motion support

---

## 6.7 Performance

Prioritaskan:

* optimized image
* lazy loading
* minimal unnecessary JavaScript
* controlled animations
* mobile-friendly canvas usage

Visual effect tidak boleh menghambat fungsi utama.

---

## 6.8 Error and Empty States

Interactive features harus mempunyai reasonable fallback.

Contoh:

Jika search tidak menemukan prodi:

tampilkan empty state.

Jika current PMB wave tidak ditemukan:

tampilkan status yang benar, bukan data stale.

Jika data optional tidak tersedia:

jangan render placeholder misleading.

---

# 7. CONTENT RULES

Gunakan:

* bahasa Indonesia yang jelas,
* kalimat ringkas,
* wording informatif,
* CTA yang actionable.

Hindari:

* exaggerated marketing language,
* jargon yang tidak membantu,
* angka tanpa source,
* klaim superiority,
* copy AI-generated yang terlalu generik.

---

# 8. VISUAL REQUIREMENTS

Pertahankan DNA UBSI:

* blue
* red
* white

Red dapat lebih prominent daripada prototype saat ini.

Namun red tidak harus mendominasi seluruh background.

Gunakan red terutama untuk:

* CTA,
* active emphasis,
* important status,
* visual accent.

Blue tetap berfungsi sebagai institutional anchor.

Jangan memaksakan dark theme sebagai default jika mengurangi kesesuaian dengan konteks institusi/pendidikan.

---

# 9. AI ASSISTANT REQUIREMENTS

AI Assistant bukan blocker untuk website completion.

Jika dipertahankan:

* gunakan sebagai secondary utility,
* jangan menjadi main navigation,
* jangan membuat website bergantung pada respons AI,
* core information harus tersedia tanpa chatbot.

Suggested positioning:

`Tanya BSI`

---

# 10. NEWS REQUIREMENTS

News bukan core conversion feature.

Prioritas:

* correctness,
* scope,
* relevance.

Jika sulit dipelihara:

lebih baik section sederhana dengan beberapa berita Margonda valid daripada feed besar tetapi salah scope.

---

# 11. SOURCE OF TRUTH CATEGORIES

Website harus menganggap kategori berikut sebagai data domain terpisah:

* institution
* campus
* programs
* admissions
* tuition
* scholarships
* certifications
* facilities
* contact
* news

Goal:

satu factual value tidak disalin manual ke banyak tempat tanpa kontrol.

---

# 12. NON-FUNCTIONAL SUCCESS CRITERIA

Website dianggap siap demo apabila:

* tidak ada CTA penting yang salah arah,
* tidak ada current PMB status yang stale,
* program offering sesuai Margonda,
* fee utama sesuai baseline,
* tidak ada placeholder misleading,
* navigation jelas,
* mobile usable,
* calculator usable,
* Program Studi usable,
* campus info jelas,
* registration link benar,
* tidak ada obvious console-breaking error,
* visual consistency cukup baik.

---

# 13. SIDANG / PORTFOLIO SUCCESS CRITERIA

Project harus dapat dijelaskan sebagai proses:

1. rapid prototype
2. requirement discovery
3. factual research
4. information architecture
5. data validation
6. refactor
7. testing
8. readiness

Key value proposition:

> Website tidak hanya menyampaikan informasi kampus, tetapi membantu calon mahasiswa mengambil keputusan melalui program explorer, simulasi biaya, panduan PMB, dan informasi Kampus Margonda yang terstruktur.

---

# 14. CURRENT LOCKED PRODUCT DECISIONS

Keputusan yang dianggap locked kecuali ada evidence baru:

* website fokus Margonda,
* website bukan pengganti PMB pusat,
* official registration tetap external,
* Program Studi merupakan core page,
* cost simulator dipertahankan,
* AI Assistant diturunkan menjadi supporting utility,
* Student Life menjadi secondary content,
* Margonda B menggunakan dokumentasi original,
* unverified marketing numbers tidak dipakai,
* data nasional dan Margonda harus dipisahkan,
* PMB temporal data harus mudah diperbarui.

---

# 15. OPEN PRODUCT QUESTIONS

Masih perlu diputuskan/dituntaskan:

* apakah semua 11 prodi membutuhkan detail page,
* final faculty grouping untuk Program Studi,
* detail accreditation per program,
* final S2 scope,
* final scholarship status,
* final Margonda B facilities,
* exact contact/service hours,
* depth Student Life,
* news maintenance strategy.

Open question tidak boleh menjadi blocker untuk memperbaiki bagian website yang sudah jelas.

---

# 16. IMPLEMENTATION PRINCIPLE

Agent tidak boleh langsung melakukan full rewrite berdasarkan dokumen ini saja.

Sebelum mengubah implementation:

1. baca `PROJECT_CONTEXT.md`
2. baca `CURRENT_STATE.md`
3. baca `PRODUCT_REQUIREMENTS.md`
4. inspect current source
5. identify behavior yang harus dipertahankan
6. lakukan perubahan per milestone
7. validate setelah perubahan

Requirement dan correctness lebih penting daripada rewrite cepat.

# Project Context — Website PMB Universitas BSI Margonda

## 1. Project Overview

Project ini adalah pengembangan Website PMB Universitas Bina Sarana Informatika (UBSI) Kampus Margonda sebagai bagian dari kegiatan PKL.

Website tidak diposisikan sebagai pengganti sistem PMB resmi UBSI, melainkan sebagai portal informasi dan decision-support khusus calon mahasiswa Kampus Margonda.

Tujuan utama website adalah membantu calon mahasiswa:

1. Mengenal UBSI Kampus Margonda.
2. Mengetahui program studi yang tersedia di Margonda.
3. Memahami biaya kuliah dan opsi beasiswa.
4. Mengenal fasilitas dan lingkungan kampus.
5. Memahami proses PMB.
6. Melanjutkan pendaftaran melalui kanal resmi UBSI.

Posisi produk:

> Website PMB UBSI Margonda adalah portal informasi dan decision-support khusus calon mahasiswa Kampus Margonda yang membantu pengguna memilih program studi, memahami biaya dan beasiswa, mengenal kampus, memahami proses PMB, kemudian diarahkan ke sistem pendaftaran resmi UBSI.

Website tidak dirancang sebagai sistem akademik, sistem PMB pusat, atau pengganti database internal UBSI.

---

## 2. Project Constraints

Project dikerjakan dalam konteks PKL dan tidak memiliki akses langsung ke:

* database internal UBSI,
* backend PMB resmi,
* API internal kampus,
* sistem autentikasi UBSI,
* data mahasiswa internal,
* sistem pembayaran,
* sistem registrasi PMB pusat.

Karena keterbatasan tersebut, target project bukan melakukan deployment production penuh ke sistem UBSI.

Target project adalah menghasilkan frontend yang:

* stabil,
* responsive,
* kredibel secara informasi,
* layak demo dan sidang,
* mudah dipahami oleh pengguna,
* maintainable,
* memiliki source of truth data yang terstruktur,
* siap diintegrasikan dengan API/database resmi apabila akses tersedia di masa depan.

Tidak perlu membuat database palsu hanya untuk memberikan kesan full-stack.

---

## 3. Current Development Stage

Website awal dikembangkan sebagai rapid prototype.

Pada tahap prototype, seluruh HTML, CSS, dan JavaScript ditempatkan di satu file:

`index.html`

Pendekatan single-file dipilih untuk mempercepat eksplorasi UI, eksperimen fitur, dan iterasi desain selama requirement project belum stabil.

Prototype saat ini sudah memiliki banyak komponen dan fitur yang berfungsi.

Tahap berikutnya bukan membangun ulang website dari nol, tetapi:

1. memvalidasi requirement,
2. memverifikasi data,
3. memperbaiki information architecture,
4. mempertahankan fitur yang sudah bekerja,
5. memperbaiki bagian yang salah atau tidak relevan,
6. kemudian melakukan refactor secara terkontrol.

---

## 4. Current Website Features

Prototype saat ini memiliki:

### Beranda

* hero section,
* trust/statistics section,
* informasi PMB,
* informasi singkat UBSI,
* feature cards,
* campus news.

### Program Studi

* daftar program studi,
* search,
* filter fakultas,
* program cards,
* informasi jenjang,
* informasi kelas,
* informasi tambahan mengenai program.

### Biaya Kuliah

* financial cost simulator,
* pemilihan jenjang,
* pemilihan gelombang,
* estimasi komponen biaya,
* perbandingan antar gelombang,
* estimasi penghematan.

### Beasiswa

* informasi beberapa program beasiswa.

### Kampus

* informasi sejarah UBSI,
* visi dan misi,
* timeline institusi,
* Kampus Margonda A,
* Kampus Margonda B,
* fasilitas,
* Google Maps.

### Student Life

* organisasi,
* kegiatan,
* gallery,
* alumni-related content.

### News

* berita dan aktivitas UBSI.

### AI Assistant

* terdapat sebagai supporting feature,
* bukan bagian utama dari tujuan Website PMB.

---

## 5. Product Direction

Website tidak akan lagi diperlakukan sebagai company profile generik.

Product direction utama adalah:

**student decision journey.**

Alur pengguna yang menjadi dasar website:

**Kenal → Percaya → Pilih Jurusan → Hitung Kemampuan → Kenal Kampus → Pahami PMB → Daftar**

Website harus menjawab pertanyaan utama calon mahasiswa:

### Apa yang bisa saya kuliahkan?

Program Studi.

### Kenapa saya harus mempertimbangkan UBSI Margonda?

Trust signal, akreditasi, lingkungan kampus, fasilitas, dan value yang relevan.

### Berapa biaya kuliahnya?

Biaya & Beasiswa.

### Kampusnya seperti apa?

Kampus Margonda dan fasilitas.

### Bagaimana proses masuknya?

Panduan PMB.

### Kalau saya sudah yakin, apa langkah berikutnya?

Daftar Sekarang melalui sistem PMB resmi UBSI.

---

## 6. Primary Information Architecture

Primary navigation yang menjadi arah final:

1. Beranda
2. Kampus Margonda
3. Program Studi
4. Biaya & Beasiswa
5. Panduan PMB
6. Daftar Sekarang

`Daftar Sekarang` harus menjadi primary CTA dan diarahkan ke kanal PMB resmi UBSI.

AI Assistant tidak ditempatkan sebagai menu utama.

Apabila dipertahankan, AI Assistant berfungsi sebagai supporting utility seperti:

`Tanya BSI`

yang dapat ditampilkan sebagai floating action atau secondary feature.

Student Life menjadi bagian dari konteks Kampus, bukan primary navigation.

News bersifat secondary content.

---

## 7. Home Page Direction

Urutan Home yang menjadi baseline:

1. Navbar
2. Hero
3. Trust Proof
4. Status PMB
5. Program Studi
6. Biaya & Beasiswa
7. Kenapa UBSI Margonda
8. Panduan PMB
9. Kampus & Fasilitas
10. Berita Margonda
11. FAQ
12. Final CTA
13. Footer

Home tidak perlu memuat seluruh informasi website.

Tujuan Home adalah membantu pengguna memahami website dan mengarahkan mereka ke keputusan berikutnya.

---

## 8. Data Research Baseline

Factual research telah dilakukan menggunakan sumber resmi UBSI, PMB UBSI, BSI News, LSP UBSI, dan sumber resmi lainnya.

Prinsip penting hasil research:

### Scope data harus jelas

Data UBSI nasional tidak boleh langsung dianggap sebagai data Kampus Margonda.

Contoh:

Jumlah fakultas atau program studi secara institusi tidak sama dengan jumlah program yang tersedia di Kampus Margonda.

### Program Studi Margonda

Baseline PMB September 2026 menunjukkan 11 program S1 tersedia di Margonda:

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

Program yang tersedia di website harus mengikuti offering Kampus Margonda, bukan seluruh katalog UBSI nasional.

### PMB September 2026

Gelombang PMB yang ditemukan:

* Gelombang I: 15 Oktober 2025 – 8 Februari 2026
* Gelombang II: 9 Februari – 8 April 2026
* Gelombang III: 9 April – 4 Juni 2026
* Gelombang IV: 5 Juni – 2 Juli 2026
* Gelombang V: 3 Juli – 14 Agustus 2026
* Gelombang VI: 15 Agustus – 10 September 2026
* Gelombang Khusus: 11 September – 2 Oktober 2026

Awal perkuliahan periode September:

21 September 2026.

Data PMB bersifat temporal dan harus diperlakukan berbeda dari data institusi yang relatif stabil.

---

## 9. Tuition Data Baseline

Beberapa data dasar biaya yang berhasil diverifikasi dan relevan untuk S1 antara lain:

* biaya pendaftaran,
* biaya prakuliah,
* biaya kuliah semester,
* SSP,
* variasi biaya berdasarkan gelombang,
* variasi biaya untuk beberapa program tertentu.

Financial Cost Simulator merupakan salah satu fitur utama yang perlu dipertahankan.

Namun kalkulator harus menggunakan data yang memiliki:

* periode berlaku,
* scope program,
* source,
* status verifikasi.

D3, Keperawatan, atau program lain tidak boleh ditampilkan sebagai offering Margonda apabila tidak tersedia di baseline PMB Margonda terbaru.

---

## 10. Accreditation and Branding

Status institusi UBSI:

**Terakreditasi Unggul.**

Untuk copy website, gunakan:

`Terakreditasi Unggul`

tanpa menambahkan masa berlaku jika belum terverifikasi secara kuat dari sumber primer.

Branding yang aman dan konsisten digunakan:

**Kampus Digital Kreatif**

Hindari klaim seperti:

* AI-Native Campus
* AI Native Learning

apabila dipresentasikan sebagai branding resmi institusi.

AI tetap dapat disebut dalam konteks kegiatan, pembelajaran digital, atau perkembangan teknologi apabila mempunyai sumber yang sesuai.

---

## 11. Certification and Industry Claims

LSP UBSI merupakan lembaga sertifikasi yang terlisensi BNSP.

Hindari menggunakan angka tetap seperti:

`18 Sertifikasi BNSP`

karena jumlah skema/ruang lingkup dapat berubah.

Gunakan wording yang lebih aman:

> Sertifikasi kompetensi melalui LSP UBSI yang terlisensi BNSP.

Klaim:

`1000+ Mitra Industri`

belum memiliki source primer terbaru yang cukup kuat sebagai angka marketing utama.

Konsep hubungan industri tetap dapat digunakan tanpa angka:

> Didukung jejaring kerja sama industri dan layanan pengembangan karier.

---

## 12. Campus Margonda

Website harus membedakan Kampus Margonda A dan Margonda B.

### Margonda A

Informasi lokasi dan fasilitas memiliki dokumentasi resmi yang lebih lengkap.

Fasilitas yang dapat digunakan berdasarkan sumber resmi:

* ruang dosen,
* ruang kelas,
* laboratorium,
* perpustakaan,
* area parkir,
* musholla,
* ruang meeting,
* parkiran gedung.

### Margonda B

Margonda B merupakan gedung yang lebih baru.

Dokumentasi resmi masih terbatas.

Tim akan melakukan dokumentasi langsung untuk kebutuhan website.

Jangan menggunakan gambar random atau mengarang fasilitas yang belum diverifikasi.

Dokumentasi asli tim dapat digunakan setelah tersedia.

---

## 13. Content Reliability Rules

Semua data website harus mengikuti prinsip berikut:

### 1. Do not guess

Jika tidak ada source yang cukup, jangan menyimpulkan sendiri.

### 2. Separate scope

Bedakan:

* UBSI institusi,
* UBSI Kampus Margonda,
* program studi tertentu,
* periode PMB tertentu.

### 3. Separate evergreen and temporal data

Evergreen:

* identitas institusi,
* sejarah,
* campus information,
* lokasi,
* fasilitas,
* program.

Temporal:

* biaya,
* gelombang,
* jadwal,
* beasiswa aktif,
* promo,
* berita,
* tanggal PMB.

Temporal data harus mudah diperbarui.

### 4. Prefer current official sources

Prioritas source:

1. PMB UBSI
2. situs resmi UBSI
3. BSI News
4. LSP UBSI
5. sumber resmi UBSI lainnya

### 5. Conflicting official data must remain explicit

Jika dua source resmi berbeda, jangan memilih berdasarkan asumsi.

Tandai sebagai:

`CONFLICTING`

sampai ada klarifikasi.

---

## 14. Core Features to Preserve

Selama refactor, jangan menghilangkan fitur yang sudah memberi value tanpa alasan.

Prioritas fitur:

### Financial Cost Simulator

High-value feature dan salah satu pembeda utama project.

### Program Explorer

Search/filter program membantu calon mahasiswa mempersempit pilihan.

### Scholarship Information

Tetap dipertahankan tetapi hanya menggunakan program yang masih memiliki baseline resmi.

### Campus and Facilities

Penting untuk meningkatkan kepercayaan calon mahasiswa.

### PMB Guidance

Harus menjadi bagian core website.

### AI Assistant

Supporting feature, bukan core dependency.

Website harus tetap usable meskipun AI Assistant tidak tersedia.

---

## 15. Quality Target

Project dianggap berhasil apabila website:

* memberikan informasi yang benar,
* memiliki user journey yang jelas,
* responsive,
* tidak bergantung pada fitur gimmick,
* tidak menggunakan klaim tidak terverifikasi,
* mudah dipahami calon mahasiswa,
* memiliki CTA pendaftaran yang benar,
* memiliki data yang mudah diperbarui,
* mempertahankan fitur utama prototype,
* layak dipresentasikan pada sidang PKL,
* cukup rapi untuk dimasukkan ke portfolio,
* siap untuk integrasi lebih lanjut apabila akses backend diberikan.

---

## 16. Non-Goals

Project ini tidak bertujuan untuk:

* membuat ulang sistem PMB pusat UBSI,
* membuat sistem pembayaran,
* membuat database mahasiswa,
* membuat autentikasi mahasiswa,
* membuat backend internal kampus tanpa requirement,
* membuat CMS hanya untuk terlihat kompleks,
* membuat fitur yang tidak membantu calon mahasiswa,
* mengimplementasikan integrasi yang tidak memiliki akses resmi.

---

## 17. Development Principle

Jangan melakukan rewrite penuh tanpa alasan.

Sebelum mengubah bagian website:

1. pahami implementasi existing,
2. tentukan apakah bagian tersebut bekerja,
3. tentukan requirement final,
4. pertahankan behavior yang masih relevan,
5. ubah hanya jika ada alasan produk, data, UX, reliability, atau maintainability.

Prioritas pengerjaan:

**blocker → core functionality → correctness → reliability → UX → additional improvement**

---

## 18. Project Narrative for Presentation

Narrative yang dapat dipertanggungjawabkan saat sidang:

> Website awal dikembangkan sebagai rapid prototype untuk mempercepat eksplorasi desain dan fitur. Setelah kebutuhan website semakin jelas, dilakukan audit terhadap struktur informasi dan validasi data menggunakan sumber resmi UBSI. Audit menemukan beberapa perbedaan antara data institusi nasional, data Kampus Margonda, dan data PMB yang bersifat temporal. Berdasarkan hasil tersebut, website diarahkan menjadi portal informasi dan decision-support khusus calon mahasiswa UBSI Margonda. Fitur yang sudah memberikan value, seperti simulasi biaya dan program explorer, dipertahankan, sementara struktur informasi dan source of truth diperbaiki agar website lebih akurat, maintainable, dan siap dikembangkan lebih lanjut.

# Current State — Website PMB Universitas BSI Margonda

## Implementation update — Tasks 03–10

The original audit below describes the preserved root `index.html` prototype.
The production application now lives in Astro `src/`, with five real routes.
Milestone 1 established the shared shell; Task 03 added the September 2026
admissions dataset, pure date-only status engine and minimal `/pmb` integration.
Task 04 migrates Home's visual language and verified static previews. Home and
`/pmb` share `AdmissionsStatus.astro`. Task 05 migrates `/program-studi` as a
compact editorial index with native expandable rows, verified program data,
name search and faculty filtering. Task 06 migrates `/biaya-beasiswa` with shared
program selection, seven-wave SSP comparison, a pure tuition engine, and a limited
verified scholarship preview. Campus interactions and scholarship application
tools remain deferred.
Task 07 adds the optional cross-site Tanya BSI dialog: an explicitly experimental
local resolver over the same program, admissions, tuition, scholarship and campus
data. It supports contextual navigation, safe text rendering and page-local
conversation through a small replaceable service interface. It is not generative
AI or an official advisor and has no connection to the separate WhatsApp/n8n bot.
See README.md for current file boundaries and validation. The legacy prototype
is still unchanged and remains the migration reference.

Task 08 locks the visual and responsive language of the implemented Home,
Program Studi and Biaya & Beasiswa routes. Home now opens with an institutional,
photographic hero using the approved Margonda A image while original Margonda B
documentation remains unavailable. Shared navigation is more editorial, Tanya BSI
moves into the mobile header instead of covering page controls, and mobile page
density is reduced without changing verified data or feature logic.

Task 09 completes `/pmb` as the detailed September 2026 admissions guide. It
reuses the Task 03 status engine for the current wave, retains all seven waves,
and presents the verified ten-step journey as four readable phases. The page also
includes the documented SLTA/contact/document baseline, registration boundary,
FAQ and official PMB handoff without claiming live quota or eligibility.

Task 10 completes `/kampus` as the trust-building campus route. It distinguishes
Margonda A and B without assigning unverified building functions, presents all
eight verified Margonda A facilities with local copies of the official imagery,
and reserves a clear replacement slot for the pending final Margonda B photo.
The compact photographic hero presents UBSI's Kampus Digital Kreatif positioning,
Unggul accreditation reference and Margonda totals. A concise academic handoff and
class options derive from the existing shared program data, while program names
remain on the dedicated Program Studi route.
Map links now sit within the corresponding Margonda A/B profiles, while a compact
PMB contact action follows the primary Program Studi handoff. Student Life is
deferred until suitable student-activity or event evidence and imagery are
available. Shared desktop, mobile and footer navigation now follows the approved
campus-first journey.

### Task 06.1 checkpoint — 17 September 2026

The calculator now presents configuration, a dominant initial-cost estimate,
four-component composition and seven-wave SSP comparison in that order. All
visual amounts derive from the unchanged Task 06 engine. Comparison differences
are relative to the selected wave, not discounts or availability claims. Desktop
uses paired configuration/result panels; mobile uses horizontal comparison rows.
The existing assistant trigger is docked in the calculator help area on this route.
Other routes and the assistant service remain unchanged.

Validation: 99 tests passed; Astro check reported zero errors, warnings and hints
across 40 files; production build generated five routes. Required scenarios and
query selection passed at 1920, 1366, 768 and 320px with no horizontal overflow.
See the Task 06.1 README section for the validation matrix and limitations.

## 1. Repository State

Repository:

`llamsyah/bsi-website`

Default branch:

`main`

Current project structure masih sangat sederhana.

Saat audit dilakukan, root repository hanya memiliki:

`index.html`

File tersebut berukuran sekitar 160 KB dan memuat hampir seluruh implementasi website:

* HTML
* CSS
* JavaScript
* data statis
* UI state
* navigation logic
* animations
* calculator logic

Website saat ini merupakan rapid prototype yang berkembang secara bertahap dalam satu file.

Kondisi ini bukan dianggap kesalahan awal, karena pendekatan tersebut membantu mempercepat eksplorasi selama requirement masih berubah.

Namun struktur tersebut sudah mulai menjadi bottleneck untuk maintenance, data consistency, dan pengembangan lanjutan.

---

## 2. Current Navigation Model

Website saat ini bekerja seperti single-page application sederhana.

Navigation dilakukan melalui JavaScript menggunakan mekanisme seperti:

`goTo(name)`

Setiap halaman atau section memiliki state aktif dan ditampilkan/disembunyikan melalui class seperti:

`.page.active`

Konsekuensi current implementation:

* URL tidak merepresentasikan halaman,
* tidak ada deep-link per halaman,
* browser back/forward tidak bekerja seperti website multi-route normal,
* refresh tidak mempertahankan halaman aktif,
* halaman tidak mempunyai URL yang dapat dibagikan,
* SEO per halaman belum memungkinkan secara natural.

Current navbar secara umum memiliki:

* Home
* AI Assistant
* Kampus
* Program Studi
* Simulasi Biaya
* Beasiswa
* Student Life
* Daftar Sekarang

Current navigation belum mengikuti information architecture final.

---

## 3. Current Visual System

Website sudah memiliki visual identity yang cukup konsisten.

Design tokens utama antara lain:

* Blue: `#1B2F6E`
* Dark Blue: `#101B47`
* Secondary Blue: `#2F4FA8`
* Red: `#E0203D`
* Deep Red: `#A8112C`

Website didominasi background terang/putih dengan kombinasi warna biru dan merah.

Terdapat juga supporting accent seperti:

* amber,
* teal,
* violet,
* rose,
* sky.

Current visual approach tidak perlu dibuang.

Design direction tetap mempertahankan identitas UBSI merah-biru.

Eksperimen peningkatan penggunaan warna merah dapat dilakukan, tetapi tidak boleh mengganggu readability, hierarchy, atau keseluruhan consistency website.

---

## 4. Current Home Page

Urutan current Home secara umum:

1. Hero
2. Trust/Statistics Bar
3. PMB Banner
4. Tentang UBSI Margonda
5. Inovasi Digital Kampus
6. Kampus Update / Berita
7. End of Home

Home saat ini belum memiliki beberapa section penting yang dibutuhkan decision journey calon mahasiswa.

---

## 5. Current Hero

Hero saat ini memiliki:

Eyebrow:

`Terakreditasi UNGGUL · AI-Native Campus`

Headline:

`Kuliah yang Relevan untuk Masa Depan`

Supporting text mengenai kompetensi, peluang, dan perkembangan masa depan.

Current CTA:

* Daftar Sekarang
* Download E-Brosur 2026
* Explore Program

Hero memiliki dekorasi visual berupa:

* animated canvas,
* sphere,
* floating information badges.

Current floating badges antara lain:

* AI Native Learning
* 18+ Sertifikasi BNSP
* 1000+ Mitra Industri

### Current Issues

Beberapa klaim hero tidak lagi memiliki factual baseline yang cukup kuat:

* AI-Native Campus
* AI Native Learning
* 18+ Sertifikasi BNSP
* 1000+ Mitra Industri

Struktur hero masih dapat dipertahankan.

Messaging dan supporting claims perlu diperbaiki.

---

## 6. Current CTA Issue

Current Hero CTA `Daftar Sekarang` tidak mengarah ke sistem pendaftaran resmi.

JavaScript saat ini mengarahkan CTA tersebut ke cost calculator.

Ini merupakan functional/product issue.

Expected behavior:

`Daftar Sekarang`

harus mengarah ke kanal pendaftaran resmi PMB UBSI.

Cost calculator harus mempunyai CTA sendiri yang berbeda.

---

## 7. Current Trust Bar

Current trust/statistics bar menampilkan antara lain:

* 24 Program Studi
* 8 Fakultas
* 1000+ Mitra Industri
* 4 Jenis Beasiswa
* 18 Sertifikasi BNSP

### Current Issues

Data tersebut mencampurkan:

* institutional claims,
* old marketing data,
* Margonda-specific context.

Current official PMB baseline menunjukkan angka institusi yang berbeda dan offering Margonda yang berbeda.

Trust bar perlu diperbarui agar hanya menampilkan fakta yang:

* relevan,
* terverifikasi,
* mempunyai scope jelas.

---

## 8. Current PMB Banner

Current banner antara lain menampilkan:

`PMB 2026 Dibuka`

dan periode:

* Maret 2026
* September 2026

Dengan tanggal awal perkuliahan masing-masing.

### Current Issues

Untuk scope Margonda, periode Maret tidak muncul sebagai offering terbaru yang terverifikasi.

Current PMB data juga belum memasukkan:

`Gelombang Khusus`

yang berlangsung:

11 September – 2 Oktober 2026.

PMB banner dan calculator saat ini belum menggunakan satu source of truth.

Hal ini berpotensi menyebabkan informasi berbeda pada section yang berbeda.

---

## 9. Current Tentang UBSI Margonda

Current section menampilkan:

`Kampus yang Tumbuh Bersama Kebutuhan Industri`

dan menjelaskan:

* akar BSI sejak 1988,
* transformasi menjadi universitas,
* akreditasi,
* program studi,
* partner industri.

Current fact cards mencakup:

* 1988
* Unggul
* 24 Prodi
* 1000+
* 18 BNSP

### Current Issues

Section mencampurkan:

* sejarah institusi,
* statistik nasional,
* informasi Margonda.

Home tidak membutuhkan timeline institusi yang terlalu panjang.

Section ini dapat dipersingkat dan diarahkan ke halaman Kampus Margonda.

---

## 10. Current Inovasi Digital Kampus

Section saat ini menampilkan:

### AI Assistant UBSI

AI-based supporting feature.

### Financial Cost Simulator

Interactive cost estimation feature.

### Current Evaluation

Financial Cost Simulator merupakan core decision-support feature dan harus dipertahankan.

Namun fitur tersebut tidak perlu ditempatkan sebagai showcase teknologi.

Lebih tepat ditempatkan dalam konteks:

`Biaya & Beasiswa`.

AI Assistant bukan core PMB journey.

AI Assistant sebaiknya menjadi supporting utility.

---

## 11. Current News Section

Current section menggunakan heading yang memberikan impression sebagai berita Kampus Margonda.

Namun beberapa content cards berasal dari lokasi lain, misalnya:

* Pontianak,
* Slipi,
* institution-wide activity.

### Current Issue

Content scope tidak sesuai dengan positioning website sebagai portal Margonda.

Expected direction:

Gunakan:

* berita Margonda,
* kegiatan mahasiswa Margonda,
* PMB Margonda,
* aktivitas kampus Depok/Margonda.

Jika menggunakan berita UBSI nasional, label scope harus jelas.

---

## 12. Missing Home Sections

Current Home belum memiliki preview atau section kuat untuk:

* Program Studi
* Biaya & Beasiswa
* Kenapa UBSI Margonda
* Panduan PMB
* Kampus & Fasilitas
* FAQ
* Final CTA

Current Home berhenti cukup tiba-tiba setelah berita.

---

## 13. Current Program Studi Page

Current Program Studi memiliki beberapa fitur yang sudah berguna:

* search,
* faculty/category filter,
* program cards,
* jenjang information,
* class tags,
* certifications,
* additional program information.

### Current Issues

Program data belum sepenuhnya mengikuti offering Margonda terbaru.

Current factual baseline menunjukkan 11 program S1 Margonda:

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

Website tidak boleh mencampurkan program yang tidak tersedia di Margonda.

Beberapa program cards memiliki salary or career income claims.

Salary claims belum mempunyai baseline yang cukup kuat dan sebaiknya:

* dihapus,
* atau hanya digunakan jika memiliki source yang kredibel.

---

## 14. Current Cost Calculator

Financial Cost Simulator merupakan salah satu bagian website yang paling mature.

Current state:

`calcState = { jenjang:'d3', wave:1, s2mode:'18' }`

Current calculator menyediakan:

* pilihan jenjang,
* gelombang,
* tuition breakdown,
* wave comparison,
* savings comparison,
* urgency label.

Current wave data:

1. Gelombang I — 15 Oct 2025 – 8 Feb 2026
2. Gelombang II — 9 Feb – 8 Apr 2026
3. Gelombang III — 9 Apr – 4 Jun 2026
4. Gelombang IV — 5 Jun – 2 Jul 2026
5. Gelombang V — 3 Jul – 14 Aug 2026
6. Gelombang VI — 15 Aug – 10 Sep 2026

### Known Bug

Current function:

`detectCurrentWave()`

setelah Gelombang VI selesai tetap mengembalikan Gelombang VI.

Hal ini membuat website menampilkan status gelombang yang salah setelah 10 September 2026.

Research terbaru menemukan bahwa PMB memiliki:

`Gelombang Khusus — 11 September – 2 Oktober 2026`

Artinya bug bukan hanya pada current-wave logic.

Dataset admissions juga belum lengkap.

---

## 15. Current Tuition Dataset

Current calculator memiliki beberapa hardcoded fee values.

Contoh data:

### D3

* registration: Rp260.000
* pre-college: Rp1.200.000
* tuition: Rp2.480.000
* SSP:

  * Rp1.500.000
  * Rp2.000.000
  * Rp2.500.000
  * Rp3.000.000
  * Rp3.600.000
  * Rp4.500.000

### S1 General

* registration: Rp260.000
* pre-college: Rp1.600.000
* tuition: Rp3.980.000
* SSP:

  * Rp2.500.000
  * Rp3.000.000
  * Rp3.600.000
  * Rp4.500.000
  * Rp5.400.000
  * Rp6.000.000

### S1 Special

* tuition: Rp4.980.000

### S1 Nursing

* pre-college: Rp2.400.000
* lab clothes: Rp250.000
* tuition: Rp10.000.000

### S2 Management

* registration: Rp500.000
* matriculation: Rp3.000.000
* total: Rp35.000.000
* monthly option: Rp1.950.000 × 18

### S2 IT

* registration: Rp500.000
* matriculation: Rp3.000.000
* total: Rp45.000.000
* monthly option: Rp2.500.000 × 18

### Current Evaluation

S1 core fee structure memiliki factual baseline yang cukup kuat.

However:

* Gelombang Khusus belum ada.
* D3 tidak termasuk offering Margonda terbaru.
* Keperawatan tidak termasuk offering Margonda terbaru.
* S2 masih membutuhkan clarification sebelum dianggap offering Margonda aktif.

Current calculator harus dipertahankan tetapi dataset perlu dibersihkan sesuai scope Margonda.

---

## 16. Current Scholarship Page

Current JavaScript scholarship array memiliki:

* Beasiswa Indonesia Cerdas
* Beasiswa Talenta Digital
* Beasiswa Indonesia Juara
* Golden Ticket

### Current Research Result

Current official PMB baseline paling kuat ditemukan untuk:

* Beasiswa Talenta Digital
* Beasiswa Indonesia Juara

Status current offering untuk:

* Beasiswa Indonesia Cerdas
* Golden Ticket

belum cukup jelas.

Jangan menampilkan semua sebagai active scholarship tanpa evidence.

---

## 17. Current Campus Page

Current Campus page memiliki:

* institutional timeline,
* vision,
* mission,
* goals,
* Margonda A,
* Margonda B,
* maps,
* facilities.

Timeline currently includes:

* 1988
* 2018
* 2026
* 2033

### Current Evaluation

1988 aman digunakan sebagai sejarah institusi BSI.

2018 aman digunakan dalam konteks transformasi menjadi Universitas Bina Sarana Informatika.

2033 berkaitan dengan target visi institusi.

Timeline tersebut tidak boleh memberikan impression bahwa Kampus Margonda berdiri sejak 1988.

---

## 18. Current Margonda A

Current information includes address:

Jl. Margonda Raya No. 8, Depok.

Current facilities use official BSI visual sources for items such as:

* Ruang Dosen
* Ruang Kelas
* Laboratorium
* Perpustakaan
* Area Parkir
* Musholla
* Ruang Meeting
* Parkiran Gedung

### Evaluation

Margonda A content merupakan salah satu area yang sudah memiliki factual support cukup baik.

Current facility content dapat dipertahankan setelah final verification.

---

## 19. Current Margonda B

Current website menggunakan address and description for Margonda B.

Official sources menunjukkan perbedaan historical/current address references.

Project clarification:

Margonda B merupakan gedung baru.

Dokumentasi visual resmi masih terbatas karena gedung masih fresh.

Tim akan mengambil dokumentasi langsung.

### Evaluation

Jangan mengganti placeholder dengan:

* stock image,
* AI-generated campus photos,
* image kampus lain.

Current placeholder lebih aman sampai dokumentasi asli tersedia.

Informasi fasilitas Margonda B tidak boleh diinventarisasi tanpa verifikasi lapangan.

---

## 20. Current Student Life

Current Student Life memiliki:

* organizations,
* activities,
* gallery,
* alumni-related information.

### Evaluation

Content dapat dipertahankan jika factual dan relevan.

Namun Student Life tidak perlu menjadi primary navigation item.

Expected direction:

Student Life menjadi supporting content di bawah:

`Kampus Margonda`

atau section yang lebih contextual.

---

## 21. Current AI Assistant

AI Assistant currently receives high visual/navigation prominence.

### Evaluation

AI Assistant tidak boleh menjadi dependency website.

Website harus tetap memberikan seluruh core PMB information tanpa AI.

Expected direction:

AI Assistant menjadi utility seperti:

`Tanya BSI`

dengan posisi secondary/floating.

AI Assistant tidak menjadi salah satu primary navigation category.

---

## 22. Current Animation and Performance

Home Hero menggunakan:

* `#bg-canvas`
* `#sphere-canvas`

Website juga menggunakan:

* IntersectionObserver,
* reveal animations,
* counters,
* decorative canvas animation.

### Potential Risks

Pada device mobile:

* canvas dapat menambah GPU/CPU load,
* high devicePixelRatio dapat memperbesar rendering cost,
* decorative particles dapat mengganggu readability,
* motion dapat mempengaruhi accessibility.

Current animation belum otomatis dianggap salah.

Optimization dapat dilakukan setelah core functionality dan architecture stabil.

---

## 23. Current Responsive State

Website memiliki responsive CSS dan mobile navigation.

Namun responsive behavior perlu diuji secara sistematis.

Testing target minimal:

* small mobile,
* standard mobile,
* tablet,
* laptop,
* desktop.

Hal yang perlu diuji:

* navbar,
* hero hierarchy,
* long program names,
* cards,
* calculator,
* filters,
* campus gallery,
* footer,
* modal/dropdown behavior,
* touch targets.

---

## 24. Current Accessibility State

Accessibility belum menjadi fokus utama selama prototype.

Items yang perlu diverifikasi sebelum final:

* semantic elements,
* correct button/link usage,
* alt text,
* keyboard navigation,
* focus states,
* contrast,
* form labels,
* ARIA only where needed,
* `prefers-reduced-motion`.

Accessibility improvement harus dilakukan tanpa over-engineering.

---

## 25. Current SEO and Metadata

Current prototype belum memiliki full page-level SEO structure karena seluruh content berada dalam single document.

Items yang nantinya perlu ada:

* page title,
* meta description,
* Open Graph metadata,
* favicon,
* canonical behavior if needed,
* semantic heading hierarchy.

SEO tidak menjadi alasan untuk menambah unnecessary complexity.

---

## 26. Current Data Management Problem

Data website saat ini tersebar di:

* HTML,
* JavaScript arrays,
* hardcoded copy,
* calculator logic.

Akibatnya satu informasi dapat muncul di beberapa tempat dengan nilai berbeda.

Contoh:

PMB period dapat muncul di:

* Home banner,
* calculator,
* CTA text,
* program information.

Target berikutnya adalah memastikan informasi yang sama mempunyai satu factual source of truth.

---

## 27. Current Critical Issues

Issues dengan priority tinggi:

### P0 / Core correctness

* `Daftar Sekarang` mengarah ke calculator, bukan official PMB.
* PMB dataset belum memiliki Gelombang Khusus.
* Current-wave detection menghasilkan stale state.
* program offering belum scoped khusus Margonda.
* beberapa marketing claims tidak cukup terverifikasi.

### P1 / Information architecture

* AI Assistant terlalu prominent.
* Program Studi tidak cukup prominent di Home.
* Cost simulator ditempatkan sebagai innovation showcase.
* Panduan PMB belum menjadi core page.
* Home belum memiliki complete decision journey.

### P2 / Content quality

* news mencampurkan kampus lain.
* scholarship current status belum seluruhnya terverifikasi.
* salary claims belum cukup terverifikasi.
* institutional and Margonda data tercampur.

### P3 / Maintainability

* seluruh application berada dalam satu file.
* content/data/behavior/presentation belum terpisah.

### P4 / Finish quality

* responsive validation,
* accessibility,
* performance,
* metadata,
* edge cases.

---

## 28. Parts That Should Not Be Rebuilt Without Reason

The following existing work already provides value:

* overall visual identity,
* color tokens,
* hero layout concept,
* Program Studi search/filter behavior,
* Financial Cost Simulator,
* wave comparison concept,
* scholarship presentation concept,
* Campus A content,
* facility gallery concept,
* Google Maps integration,
* responsive navbar concept,
* reveal/counter behavior where appropriate.

Refactor must preserve useful behavior unless a requirement explicitly changes it.

---

## 29. Current Home Refactor Direction

Current Home:

Hero
→ Trust
→ PMB
→ About
→ Innovation
→ News

Target Home:

Navbar
→ Hero
→ Trust Proof
→ Status PMB
→ Program Studi
→ Biaya & Beasiswa
→ Kenapa UBSI Margonda
→ Panduan PMB
→ Kampus & Fasilitas
→ Berita Margonda
→ FAQ
→ Final CTA
→ Footer

Target bukan membuat lebih banyak content.

Target adalah memperbaiki decision flow.

---

## 30. Current Project Status

### Completed / sufficiently established

* initial prototype
* core visual identity
* major content sections
* cost simulator concept
* Program Studi explorer concept
* campus information foundation
* factual research baseline
* primary product positioning
* primary navigation direction
* Home information hierarchy direction

### Open

* final Program Studi specification
* final Biaya & Beasiswa specification
* final Kampus specification
* final Panduan PMB specification
* final Home copy/content
* Margonda B original documentation
* S2 offering clarification
* several scholarship status clarifications
* detailed program accreditation data
* final source references
* architecture refactor
* responsive validation
* accessibility validation
* testing
* documentation finalization

---

## 31. Immediate Next Step

Before major implementation begins:

Create final product requirements covering:

* page purpose,
* page hierarchy,
* required content,
* allowed data,
* CTA behavior,
* core interactions,
* acceptance criteria.

The next document is:

`PRODUCT_REQUIREMENTS.md`

This should become the main requirement document used by coding agents.

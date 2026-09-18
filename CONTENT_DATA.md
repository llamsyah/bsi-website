# Content & Data Guidelines — Website PMB UBSI Margonda

## 1. Purpose

Dokumen ini mengatur bagaimana data dan konten factual digunakan dalam Website PMB UBSI Margonda.

Dokumen ini bukan database schema dan bukan specification implementasi.

Tujuannya adalah memastikan developer atau AI coding agent:

* tidak mengarang fakta,
* tidak mencampurkan data UBSI nasional dengan data Margonda,
* tidak memakai data lama sebagai current data,
* tidak mengubah hasil research menjadi marketing claim yang berlebihan,
* tahu data mana yang aman digunakan,
* tahu data mana yang masih harus ditahan,
* memahami data mana yang bersifat temporal.

Semua implementasi konten harus mengacu pada prinsip dokumen ini.

---

# 2. Data Source Hierarchy

Jika terdapat beberapa sumber untuk fakta yang sama, gunakan prioritas berikut.

## Priority 1 — Official PMB Terms / Regulations

Digunakan terutama untuk:

* periode PMB,
* gelombang,
* tanggal,
* biaya,
* SSP,
* prosedur,
* persyaratan,
* daftar ulang.

Dokumen resmi PMB lebih kuat daripada marketing copy di halaman lain.

---

## Priority 2 — Current Campus PMB Page

Digunakan terutama untuk:

* program yang sedang dibuka di Margonda,
* pilihan kelas,
* kontak PMB,
* informasi kampus,
* period-specific offering.

Versi paling baru harus diprioritaskan dibanding snapshot lama.

---

## Priority 3 — Official UBSI Institutional Website

Digunakan untuk:

* identitas institusi,
* sejarah,
* visi/misi,
* lokasi,
* fasilitas,
* fakultas,
* institutional information.

---

## Priority 4 — Official LSP UBSI

Digunakan untuk:

* sertifikasi kompetensi,
* status lisensi BNSP,
* skema sertifikasi,
* informasi LSP.

---

## Priority 5 — Official UBSI News

Digunakan untuk:

* kegiatan,
* student life,
* event,
* collaboration,
* promo temporal,
* perkembangan kampus.

Berita tidak otomatis menjadi source of truth untuk fee atau program offering jika halaman PMB memberikan informasi berbeda.

---

## Priority 6 — Internal / Field Verification

Informasi yang dikonfirmasi langsung oleh tim PKL atau pihak kampus dapat digunakan sebagai:

`PROJECT_CONFIRMED`

Contoh:

Alamat Gedung Margonda B terbaru telah dikonfirmasi oleh project team sebagai:

**Jl. Margonda Raya No. 471, Pancoran Mas, Depok.**

Informasi lapangan seperti ini harus dibedakan dari hasil web research dan dapat digunakan jika confirmation source diketahui.

---

## Priority 7 — External Source

Sumber eksternal hanya digunakan jika sumber resmi tidak tersedia dan informasi benar-benar dibutuhkan.

Harus diberi label jelas.

Jangan menggunakan sumber eksternal untuk menggantikan source resmi yang tersedia.

---

# 3. Verification Status

Setiap factual data secara konseptual harus memiliki salah satu status berikut.

## VERIFIED

Didukung sumber resmi dan scope-nya jelas.

Boleh digunakan pada website.

---

## PROJECT_CONFIRMED

Dikonfirmasi langsung melalui:

* pihak kampus,
* pembimbing,
* observasi lapangan,
* dokumentasi project team.

Boleh digunakan apabila confirmation tersebut dapat dipertanggungjawabkan.

---

## NEEDS CONTEXT

Data benar, tetapi membutuhkan konteks tambahan.

Contoh:

`20 program studi`

Benar untuk UBSI secara institusi, tetapi bukan jumlah program di Margonda.

Boleh digunakan hanya dengan scope yang jelas.

---

## NEEDS SOURCE

Belum mempunyai source yang cukup kuat.

Jangan digunakan sebagai hard factual claim.

---

## CONFLICTING

Dua atau lebih sumber memberikan data berbeda.

Jangan memilih salah satunya dengan asumsi.

Gunakan hanya setelah mendapat clarification.

---

## OUTDATED

Data pernah benar tetapi tidak lagi merepresentasikan current state.

Jangan ditampilkan sebagai data aktif.

---

## NOT ENOUGH EVIDENCE

Evidence tidak cukup untuk mendukung claim.

Jangan digunakan.

---

# 4. Scope Rules

Semua factual information harus termasuk salah satu scope berikut.

## Institution

Berlaku untuk Universitas Bina Sarana Informatika secara keseluruhan.

Contoh:

* akreditasi institusi,
* sejarah 1988,
* transformasi 2018,
* visi 2033,
* 5 fakultas,
* 20 program studi.

---

## Campus

Berlaku khusus untuk UBSI Margonda.

Contoh:

* program yang ditawarkan Margonda,
* alamat,
* fasilitas,
* kegiatan Margonda.

---

## Program

Berlaku pada program studi tertentu.

Contoh:

* pilihan kelas,
* surcharge tuition,
* akreditasi prodi,
* kompetensi.

---

## Period

Berlaku hanya pada periode PMB tertentu.

Contoh:

* September 2026,
* Gelombang Khusus,
* promo,
* biaya tertentu.

---

## Campaign

Berlaku hanya untuk program promosi tertentu.

Contoh:

Free SSP.

Campaign tidak boleh dianggap sebagai tuition policy universal.

---

# 5. Institution Data

## SAFE TO USE

### Institution Name

**Universitas Bina Sarana Informatika**

Short name:

**UBSI**

Status:

`VERIFIED`

---

### Branding

**Kampus Digital Kreatif**

Status:

`VERIFIED`

Dapat digunakan sebagai institutional positioning.

---

### Accreditation

**Terakreditasi Unggul**

Status:

`VERIFIED`

Reference:

SK BAN-PT No. 2346/SK/BAN-PT/Ak/PT/VI/2025.

---

### Accreditation Expiry

`Unggul hingga 2030`

Status:

`NEEDS SOURCE`

Instruction:

Jangan gunakan tahun 2030 sampai expiration date terverifikasi secara eksplisit.

Gunakan:

**Terakreditasi Unggul**

tanpa tanggal akhir.

---

### Institutional Faculties

**5 Fakultas**

Status:

`VERIFIED`

Scope:

`INSTITUTION`

Jangan digunakan untuk menjelaskan jumlah fakultas di Margonda.

---

### Institutional Programs

**20 Program Studi**

Status:

`VERIFIED`

Scope:

`INSTITUTION`

Jangan digunakan sebagai jumlah program Margonda.

---

### Institutional History

Safe timeline:

**1988**

Akar perjalanan institusi BSI.

**2018**

Transformasi menjadi Universitas Bina Sarana Informatika.

**2033**

Target visi institusi.

Status:

`VERIFIED`

Instruction:

Jangan menyebut:

`UBSI Margonda berdiri sejak 1988.`

Gunakan:

> BSI telah berkembang di dunia pendidikan sejak 1988 dan bertransformasi menjadi Universitas Bina Sarana Informatika pada 2018.

---

### 2026 Timeline Item

Status:

`NEEDS CONTEXT`

2026 bukan institutional historical milestone yang fundamental.

Gunakan hanya jika merepresentasikan current PMB/project period.

---

# 6. Campus Data — Margonda

## Campus Naming

Preferred:

**UBSI Kampus Margonda**

atau:

**UBSI Margonda, Depok**

Jaga naming tetap konsisten di seluruh website.

---

## Margonda A

Address:

**Jl. Margonda Raya No. 8, Pondok Cina, Beji, Depok**

Status:

`VERIFIED`

---

## Margonda B

Project-confirmed current address:

**Jl. Margonda Raya No. 471, Pancoran Mas, Depok**

Status:

`PROJECT_CONFIRMED`

Research sebelumnya menemukan conflicting official location data karena terdapat referensi gedung/lokasi lama.

Instruction:

Gunakan alamat terbaru yang telah dikonfirmasi project team.

Jangan menggunakan alamat lama `277D` sebagai current public-facing address.

Boleh menyimpan conflict note dalam dokumentasi internal.

---

## Building Function

Status:

`NOT ENOUGH EVIDENCE`

Jangan menulis klaim seperti:

* Gedung A khusus akademik,
* Gedung B khusus digital lab,

kecuali telah diverifikasi langsung.

---

## Operational Hours

Status:

`CONFLICTING`

Official page memberikan informasi berbeda terkait layanan Minggu.

Instruction:

Jangan hardcode jam Minggu sampai dikonfirmasi.

Jika jam layanan tidak critical, lebih baik tidak menampilkan daripada menampilkan informasi ambigu.

---

# 7. Margonda Facilities

## Margonda A — Verified

Safe facility list:

* Ruang Dosen
* Ruang Kelas
* Laboratorium
* Perpustakaan
* Area Parkir
* Musholla
* Ruang Meeting
* Parkiran Gedung

Status:

`VERIFIED`

Visual resmi tersedia.

---

## Margonda B

Official visual documentation masih terbatas.

Project direction:

Dokumentasi akan dilakukan langsung oleh tim.

Status sebelum dokumentasi:

`PROJECT PENDING`

Instruction:

Jangan:

* menggunakan stock image,
* menggunakan AI-generated campus photo,
* menduplikasi fasilitas Margonda A,
* mengarang fasilitas.

Setelah dokumentasi lapangan:

gunakan foto asli project team.

---

# 8. Margonda Program Offering

Current PMB baseline:

**September 2026**

Program yang aman ditampilkan:

1. Rekayasa Perangkat Lunak
2. Informatika
3. Teknologi Informasi
4. Sistem Informasi
5. Sastra Inggris
6. Ilmu Komunikasi
7. Akuntansi
8. Manajemen
9. Teknik Elektro
10. Teknik Industri
11. Psikologi

Jenjang:

**S1**

Status:

`VERIFIED`

Scope:

`MARGONDA + SEPTEMBER 2026`

---

# 9. Faculty Mapping

## Fakultas Teknik & Informatika

* Rekayasa Perangkat Lunak
* Informatika
* Teknologi Informasi
* Sistem Informasi
* Teknik Elektro
* Teknik Industri

---

## Fakultas Ekonomi & Bisnis

* Akuntansi
* Manajemen

---

## Fakultas Komunikasi & Bahasa

* Sastra Inggris
* Ilmu Komunikasi

---

## Fakultas Ilmu Kesehatan

* Psikologi

---

# 10. Class Availability

Current verified baseline:

## Pagi / Siang

Dibuka untuk seluruh 11 program current baseline.

---

## Sore / Malam

Verified:

* Informatika
* Sistem Informasi
* Ilmu Komunikasi

Program lain:

jangan tampilkan sebagai tersedia jika belum ada evidence.

---

## Jumat / Sabtu

Current baseline:

Tidak dibuka untuk 11 S1 current offering.

---

# 11. Program Naming

Gunakan naming dari current Margonda PMB page.

Preferred:

**Ilmu Komunikasi**

bukan hanya:

`Komunikasi`

karena halaman Margonda current menggunakan nama tersebut.

---

# 12. Program Detail Content

Safe content category:

* official program overview,
* competencies,
* curriculum themes,
* career prospects,
* official certifications jika verified,
* class availability.

---

## Salary Claims

Current website memiliki salary range per program.

Status:

`NOT ENOUGH EVIDENCE`

Instruction:

REMOVE.

Jangan menampilkan angka:

* Rp5–10 juta,
* Rp6–11 juta,
* Rp11–20 juta,

atau estimasi serupa tanpa dedicated labor-market research.

Career title tetap boleh.

Contoh:

* Software Engineer
* Data Analyst
* Business Analyst
* Database Administrator
* AI Engineer

jika mempunyai source akademik/PMB.

---

# 13. Program Accreditation

Jangan mengasumsikan akreditasi program UBSI nasional otomatis berlaku pada offering Margonda tanpa memastikan scope SK.

## Currently Safe

### Sistem Informasi S1 Margonda

**Unggul**

Status:

`VERIFIED`

---

## Other Programs

Gunakan status:

`NEEDS SOURCE`

sampai accreditation scope spesifik dipastikan.

Jangan menampilkan badge akreditasi kosong atau guessed.

---

# 14. Programs Requiring Caution

## Hubungan Internasional

Status:

`CONFLICTING / NEEDS CONTEXT`

Pernah muncul pada campaign Margonda tetapi tidak terdapat pada current regular offering list.

Jangan masukkan ke regular program explorer.

---

## Ilmu Hukum

Status:

`CONFLICTING / NEEDS CONTEXT`

Perlakukan sama seperti Hubungan Internasional.

---

## D3

Status:

`NOT CURRENT MARGONDA OFFERING`

Jangan ditampilkan sebagai current Margonda program.

---

## S1 Keperawatan

Status:

`NOT OFFERED AT CURRENT MARGONDA BASELINE`

Remove from Margonda calculator and Program Studi.

---

## S2 — Task 11A/11B decision, 17–18 September 2026

`VERIFIED` for Margonda, September 2026: Magister Manajemen and Magister Teknologi Informasi, Jumat/Sabtu. Source: https://pmbubsi.id/infopmb/prodi/s2_info ; full conflict/evidence matrix: `TASK_11A_ACADEMIC_OFFERING_AUDIT.md`.

Program profiles support 3 semesters, not guaranteed completion. Exact S2 registration dates, lecture start, class hours/mode, building assignment and full document checklist remain unknown. Do not inherit S1 waves or SLTA requirements.

Published MM: Rp35,000,000 program / Rp11,700,000 semester / 18 × Rp1,950,000. Products yield Rp35,100,000: preserve the Rp100,000 conflict. MTI: Rp45,000,000 / Rp15,000,000 semester / 18 × Rp2,500,000. Both list registration Rp500,000, matriculation Rp2,500,000 at re-registration, almamater Rp500,000. Inclusion in the program figure remains unclear: no all-in sum. Excludes remedial, thesis and graduation. No automatic scholarship reduction.

S1 remains the eleven operationally verified programs. HI and Ilmu Hukum remain conflicting candidates, not active/priced offerings. Faculty counts for S1 do not include a guessed S2 faculty.

---

# 15. Admissions Data

## Current Period

Current baseline:

**PMB Periode September 2026**

Margonda tidak membuka kelas untuk Periode Maret 2026 berdasarkan current campus page.

---

## Waves

### Gelombang I

15 Oktober 2025 – 8 Februari 2026

### Gelombang II

9 Februari – 8 April 2026

### Gelombang III

9 April – 4 Juni 2026

### Gelombang IV

5 Juni – 2 Juli 2026

### Gelombang V

3 Juli – 14 Agustus 2026

### Gelombang VI

15 Agustus – 10 September 2026

### Gelombang Khusus

11 September – 2 Oktober 2026

Status:

`VERIFIED`

---

## Current State on Research Date

Per 15 September 2026:

**Gelombang Khusus sedang aktif.**

Website logic tidak boleh fallback ke Gelombang VI setelah 10 September.

---

# 16. Start of Classes

September period:

**21 September 2026**

Status:

`VERIFIED`

---

Maret institutional period:

**30 Maret 2026**

Status:

`VERIFIED WITH CONTEXT`

Instruction:

Jangan mempromosikan periode Maret sebagai Margonda offering current.

---

# 17. Admission Flow

Safe baseline:

1. Registrasi online
2. Isi data
3. Pembayaran pendaftaran
4. Ujian Saringan Masuk online
5. Pilih kampus / program / waktu kuliah
6. Daftar ulang
7. Lengkapi dokumen
8. Mendapat NIM / kelas
9. ORMIK / SEMOT
10. Mulai perkuliahan

Use simplified version on Home.

Use detailed version on Panduan PMB.

---

# 18. Admission Requirements

Source baseline includes:

* lulusan SLTA/sederajat,
* email aktif,
* WhatsApp aktif,
* foto,
* ijazah,
* transkrip/nilai,
* KTP,
* KK,
* akta kelahiran.

Requirement details that may change must remain tied to PMB period.

---

# 19. Tuition — S1 Margonda

## Registration

**Rp260.000**

Status:

`VERIFIED`

---

## Pre-College

**Rp1.600.000**

Status:

`VERIFIED`

---

## Base Tuition

**Rp3.980.000 / semester**

Status:

`VERIFIED`

---

## Additional Tuition

Additional:

**Rp1.000.000 / semester**

for current verified programs:

* Manajemen
* Akuntansi
* Ilmu Komunikasi
* Sistem Informasi
* Teknologi Informasi
* Informatika

Resulting semester tuition:

**Rp4.980.000**

Status:

`VERIFIED`

---

# 20. SSP

## Wave I

Rp2.500.000

## Wave II

Rp3.000.000

## Wave III

Rp3.600.000

## Wave IV

Rp4.500.000

## Wave V

Rp5.400.000

## Wave VI

Rp6.000.000

## Special Wave

Rp6.000.000

Status:

`VERIFIED`

---

# 21. SSP Installment Rules

Existing official information explains installment patterns for Waves I–VI.

Gelombang Khusus:

installment structure is not sufficiently explicit.

Status:

`NEEDS CONTEXT`

Instruction:

Do not automatically copy Wave VI installment behavior to Gelombang Khusus without evidence.

---

# 22. Free SSP Campaign

Margonda has published Free SSP-related campaign information for selected programs.

This is:

`CAMPAIGN DATA`

not universal tuition policy.

Do not modify base calculator tuition/SSP rules as if all students receive free SSP.

If campaign is displayed, include:

* eligible programs,
* conditions,
* validity,
* campaign source.

---

# 23. Calculator Data Rules

## KEEP

* S1 registration
* S1 pre-college
* S1 base tuition
* S1 surcharge
* SSP Wave I–VI
* comparison concept
* cost breakdown concept

---

## ADD

* Gelombang Khusus
* period metadata
* verification metadata
* correct no-active-wave behavior

---

## REMOVE FROM MARGONDA DEFAULT

* D3
* S1 Keperawatan

---

## HOLD

* S2 Management
* S2 IT

until Margonda availability and fee data are confirmed.

---

# 24. Scholarship Data

## Beasiswa Talenta Digital

Status:

`VERIFIED ACTIVE BASELINE`

Safe information:

* talent-based digital scholarship,
* possible support up to 100% depending on assessment and wave.

Be careful with year-of-graduation requirement.

Current official copy appears potentially outdated.

Status of specific graduation-year requirement:

`NEEDS CONTEXT`

---

## Beasiswa Indonesia Juara

Status:

`VERIFIED ACTIVE BASELINE`

Safe information:

supports academic/non-academic achievers.

Benefit levels may include:

* city/regency,
* provincial,
* national,
* international,

with different assistance percentages.

Exact current eligibility text must remain source-linked.

---

## Beasiswa Indonesia Cerdas

Status:

`NEEDS CURRENT OFFICIAL SOURCE`

Do not label active.

---

## Golden Ticket

Status:

`NEEDS CURRENT OFFICIAL SOURCE`

Do not label active.

---

# 25. Certification Data

## LSP UBSI

Status:

`VERIFIED`

Safe wording:

> Sertifikasi kompetensi melalui LSP UBSI yang terlisensi BNSP.

---

## Numeric Certification Count

Current claim:

`18 Sertifikasi BNSP`

Status:

`OUTDATED`

Do not replace with:

`21 Sertifikasi`

without understanding whether 21 refers to:

* active schemes,
* assessed schemes,
* additional scope,
* total schemes.

Preferred:

use nonnumeric claim.

---

# 26. Industry Relations

Safe:

> UBSI memiliki kerja sama dengan dunia industri serta mendukung pengembangan karier, rekrutmen, magang, dan sertifikasi.

Status:

`VERIFIED GENERAL CLAIM`

---

## 1000+ Industry Partners

Status:

`NOT ENOUGH EVIDENCE`

Instruction:

Remove numeric claim.

Do not substitute with another guessed number.

---

# 27. AI-Related Content

## AI-Native Campus

Status:

`NOT ENOUGH EVIDENCE`

Remove as official branding.

---

## AI Native Learning

Status:

`NOT ENOUGH EVIDENCE`

Remove or rewrite.

---

## Safe AI Narrative

UBSI Margonda has hosted activities related to:

* digital creativity,
* AI literacy,
* technology development.

Safe wording example:

> Kegiatan pembelajaran dan pengembangan mahasiswa mengikuti perkembangan teknologi digital, termasuk pemanfaatan AI.

Do not convert this into an official institutional identity.

---

# 28. Margonda News

Safe examples include:

* BSI Entrepreneur Fair 2026 at Margonda A
* Open Booth PMB at CFD Margonda
* BKOT Margonda
* Workshop Digital Kreatif involving AI
* other activities explicitly mentioning Margonda/Depok

Task 13 verified editorial baseline (official BSINews sources, checked 18 September 2026):

* SEMOT UBSI 2026 — institution-wide, 20 September 2026; never label it Margonda-only.
* ORMIK UBSI 2026 — institution-wide period 16–19 September 2026 with a separate Margonda orientation context; do not invent a Margonda session time.
* Workshop Digital Kreatif Margonda — announced for 12 September 2026; the referenced article is an announcement and does not prove completion.
* BSI Entrepreneur Fair 2026 — Margonda A, 15–24 June 2026; students from multiple programs managed booths and presented/marketed products.
* CineSprint 2026 — project-based creative media work with documented Margonda class achievements; do not expand the competition scope.
* Nur Badarul Nashiroh — S1 Manajemen Margonda student, International Student Mobility at University of Northern Philippines.
* Inas Zhafirah — Ilmu Komunikasi Margonda alumna, graduated 2025, journalist at Garuda TV.
* Yoel Alfianto Siregar — Ilmu Komunikasi Margonda student and part of LavAni during the team's Proliga 2026 championship; attribute the title to the team.

Official article images are not approved project assets by default. Use an explicit
editorial placeholder until reuse rights or a suitable project-owned image exists.

---

## News Scope Rule

Every news item should conceptually have:

* title
* date
* campus/scope
* category
* source

Do not show Pontianak, Slipi, or another campus as if it were Margonda.

Institution-wide news can be shown only when clearly labelled.

---

# 29. Content That Must Be Removed or Rewritten

Do not keep the following current website claims unchanged:

* 24 Program Studi
* 8 Fakultas
* 1000+ Mitra Industri
* 18 Sertifikasi BNSP
* AI-Native Campus
* AI Native Learning
* UBSI Margonda berdiri sejak 1988
* universal Free SSP
* salary range per program
* Margonda March period presented as equivalent current offering
* six-wave-only PMB logic
* non-Margonda program offerings presented as Margonda.

---

# 30. Content That Can Be Preserved

Safe core factual concepts:

* Universitas Bina Sarana Informatika
* UBSI
* Terakreditasi Unggul
* Kampus Digital Kreatif
* institutional roots since 1988
* transformation in 2018
* vision target 2033
* UBSI Margonda
* Margonda A
* Margonda B
* 11 current Margonda S1 offerings
* September 2026 PMB
* Gelombang Khusus
* 21 September start date
* core S1 tuition
* official SSP
* Talenta Digital
* Indonesia Juara
* LSP UBSI licensed by BNSP
* real Margonda facilities
* real Margonda activities.

---

# 31. Temporal Data Policy

The following must never be treated as permanent:

* program availability,
* class availability,
* admission waves,
* registration deadlines,
* start dates,
* tuition,
* SSP,
* scholarships,
* promotions,
* contact hours,
* news.

Temporal information should conceptually carry:

* period
* effective date
* verified date
* source
* status

---

# 32. Evergreen Data Policy

Relatively stable data includes:

* institution name,
* historical identity,
* campus identity,
* high-level vision,
* building names,
* long-lived institutional positioning.

Even evergreen data can change and should not be assumed permanent forever.

---

# 33. Agent Content Rules

AI agents must:

1. Preserve verified facts.
2. Never fabricate missing content.
3. Never convert `NEEDS SOURCE` into confident marketing copy.
4. Never merge institutional and campus metrics.
5. Never infer accreditation scope.
6. Never infer tuition rules.
7. Never infer program availability.
8. Never infer facility availability.
9. Never replace missing images with unrelated campus imagery.
10. Prefer omission over false certainty.

---

# 34. Handling Missing Data

If optional content is missing:

Do not fill with invented copy.

Possible behavior:

* omit section,
* show neutral placeholder during development,
* mark content pending verification.

For production/demo-facing output:

do not show internal verification labels to users.

---

# 35. Marketing Copy Rule

Factual strength is more important than number of claims.

Prefer:

> Terakreditasi Unggul

instead of:

> Kampus unggulan masa depan dengan puluhan sertifikasi terbaik.

Prefer:

> Sertifikasi kompetensi melalui LSP UBSI terlisensi BNSP.

instead of:

> 18+ sertifikasi profesional.

Prefer:

> Memiliki jejaring kerja sama industri dan pengembangan karier.

instead of:

> 1000+ mitra industri.

---

# 36. Current Data Baseline Date

Research baseline:

**18 September 2026**

Any PMB or campaign data should be considered valid relative to this baseline unless subsequently reverified.

---

# 37. Data Update Principle

When a newer verified source appears:

1. compare scope,
2. compare publication/effective date,
3. update source of truth,
4. do not modify unrelated data,
5. record why value changed.

Newest does not automatically mean correct if scope differs.

Example:

national program list cannot override Margonda campus offering merely because it is newer.

---

# 38. Current Unresolved Data

These items remain open:

* final official confirmation of operating hours,
* exact facility inventory Margonda B,
* photos Margonda B,
* exact S2 dates, payment inclusions, and MM published total discrepancy,
* detailed accreditation for most programs,
* current status Indonesia Cerdas,
* current status Golden Ticket,
* exact active certification scheme count,
* specific career partner count,
* future PMB periods after October 2026.

These are not blockers for current website restructuring.

---

# 39. Development Guidance

When implementing website content:

Do not copy the research report directly into UI.

Research report is evidence.

This document determines what data is allowed to become product content.

The UI should only receive:

* relevant,
* current,
* correctly scoped,
* sufficiently verified information.

---

# 40. Final Content Principle

The website should appear credible because the information is precise, not because it contains many marketing claims.

The preferred hierarchy is:

**accuracy → relevance → clarity → persuasion**

not:

**marketing → numbers → decoration → accuracy**

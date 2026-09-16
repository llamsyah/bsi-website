# Frontend Architecture — Website PMB UBSI Margonda

## 1. Architecture Goal

Frontend architecture harus mengubah prototype single-file menjadi codebase yang:

* modular,
* maintainable,
* mudah dipahami manusia maupun AI agent,
* tetap ringan,
* tidak over-engineered,
* mudah diperbarui ketika data PMB berubah,
* siap ditambah integrasi API/backend jika akses resmi tersedia nanti.

Architecture harus mempertahankan behavior yang sudah bekerja dan hanya memisahkan responsibility secara lebih sehat.

Prinsip utama:

**content/data → component → behavior → presentation**

Jangan lagi mencampurkan seluruh data, markup, state, dan styling dalam satu file.

---

## 2. Recommended Stack

Recommended stack:

**Astro**

dengan:

* Astro pages/layouts/components,
* CSS biasa,
* TypeScript atau JavaScript seperlunya,
* client-side JavaScript hanya untuk fitur yang benar-benar interaktif.

Jangan memigrasikan project ke framework client-heavy tanpa kebutuhan yang jelas.

---

## 3. Why Astro

Website ini sebagian besar terdiri dari:

* informasi PMB,
* program studi,
* biaya,
* beasiswa,
* kampus,
* fasilitas,
* panduan,
* FAQ,
* berita.

Sebagian besar content tersebut tidak membutuhkan JavaScript untuk tampil.

Interactive area terbatas pada:

* Financial Cost Simulator,
* Program Studi search/filter,
* mobile navigation,
* accordion/FAQ,
* gallery interaction,
* optional AI utility.

Karena itu static-first architecture lebih sesuai dibanding menjadikan seluruh website sebagai client-side application.

Astro memungkinkan:

* HTML static sebagai default,
* JavaScript hanya pada komponen interaktif,
* routing nyata,
* reusable components,
* separation antara data dan UI,
* performance lebih mudah dikontrol.

---

## 4. Architecture Principle

Gunakan pendekatan:

**static-first, interactive where necessary**

Artinya:

Jika sebuah bagian hanya menampilkan informasi:

jangan hydrate dengan JavaScript.

Jika sebuah bagian membutuhkan state/interaksi:

beri JavaScript hanya pada bagian tersebut.

Contoh:

Navbar desktop sederhana:

static HTML + minimal interaction.

Calculator:

interactive island.

Program search/filter:

interactive island.

Facilities gallery:

interactive jika memang dibutuhkan.

---

# 5. Target Routing

Gunakan real routes.

Recommended baseline:

`/`

Beranda

`/program-studi`

Program Studi

`/biaya-beasiswa`

Biaya & Beasiswa

`/kampus`

Kampus Margonda

`/pmb`

Panduan PMB

Program detail optional:

`/program-studi/[slug]`

Hanya dibuat apabila content tiap prodi cukup untuk justify halaman detail.

---

## 6. Route Requirements

Setiap page harus:

* mempunyai URL sendiri,
* dapat dibuka langsung,
* dapat direfresh,
* mendukung browser back/forward,
* dapat dibagikan,
* mempunyai page title,
* mempunyai meta description yang relevan.

Jangan mempertahankan fake SPA routing dengan `goTo()` setelah migration selesai.

---

# 7. Target Project Structure

Conceptual structure:

```text
src/
  components/
  layouts/
  pages/
  data/
  styles/
  scripts/
  utils/

public/
  images/
  icons/
  documents/
```

Struktur dapat disesuaikan berdasarkan implementation, tetapi responsibility harus tetap terpisah.

---

# 8. Pages Layer

Folder:

`src/pages/`

Berisi route-level pages.

Contoh:

```text
src/pages/
  index.astro
  program-studi/
    index.astro
  biaya-beasiswa.astro
  kampus.astro
  pmb.astro
```

Jika program detail dibutuhkan:

```text
src/pages/program-studi/
  [slug].astro
```

Pages harus berfungsi terutama untuk:

* composition,
* page-level metadata,
* pemilihan data,
* penyusunan section.

Pages tidak boleh menjadi dump seluruh CSS/JS/data.

---

# 9. Layout Layer

Folder:

`src/layouts/`

Recommended:

`BaseLayout.astro`

Responsibility:

* HTML document shell,
* global metadata,
* navbar,
* footer,
* global stylesheet,
* shared accessibility structure.

Page-specific metadata dikirim melalui props.

---

# 10. Component Layer

Folder:

`src/components/`

Buat component berdasarkan responsibility, bukan sekadar karena satu block terlihat berbeda.

Possible categories:

```text
components/
  common/
  home/
  programs/
  tuition/
  campus/
  pmb/
```

Contoh reusable common components:

```text
Navbar.astro
Footer.astro
SectionHeader.astro
Button.astro
Badge.astro
Card.astro
FAQItem.astro
Breadcrumb.astro
```

Home-specific:

```text
Hero.astro
TrustProof.astro
AdmissionsStatus.astro
ProgramPreview.astro
CostPreview.astro
WhyMargonda.astro
CampusPreview.astro
FinalCTA.astro
```

Jangan membuat component untuk setiap div kecil.

---

# 11. Data Layer

Folder:

`src/data/`

Tujuan:

memindahkan factual content keluar dari markup dan interaction logic.

Recommended data domains:

```text
institution.ts
campus.ts
programs.ts
admissions.ts
tuition.ts
scholarships.ts
certifications.ts
facilities.ts
contact.ts
news.ts
```

Data files harus mengikuti `CONTENT_DATA.md`.

---

# 12. Data Rules

Data layer harus menyimpan factual values.

Contoh conceptual entry:

```ts
{
  name: "Sistem Informasi",
  degree: "S1",
  campus: "Margonda",
  period: "September 2026",
  status: "verified"
}
```

Tidak perlu langsung membuat schema kompleks.

Goal utama:

satu fakta tidak disalin manual ke banyak page.

---

# 13. Temporal Data Separation

Pisahkan data yang sering berubah dari content evergreen.

## Evergreen-ish

* institution identity,
* campus identity,
* history,
* vision,
* facility identity,
* general program description.

## Temporal

* admission waves,
* registration deadline,
* tuition,
* SSP,
* scholarships,
* class availability,
* promotions,
* news.

Temporal data harus mudah ditemukan dan diperbarui.

---

# 14. Admissions Source of Truth

Semua komponen yang membutuhkan PMB status harus membaca data yang sama.

Contoh consumer:

* Home PMB banner,
* calculator,
* Panduan PMB,
* CTA supporting text,
* status badge.

Jangan lagi membuat tanggal secara terpisah di masing-masing section.

---

# 15. Current Admission Logic

Buat helper terpisah untuk menentukan current admission state.

Possible responsibility:

```text
getCurrentAdmissionWave()
getAdmissionStatus()
```

Logic harus dapat menghasilkan:

* active wave,
* closed,
* upcoming,
* no active period.

Jangan fallback ke gelombang terakhir ketika tanggal sudah lewat.

---

# 16. Tuition Architecture

Cost simulator harus dipisahkan menjadi:

1. tuition data,
2. calculation logic,
3. user interaction,
4. presentation.

Jangan hardcode angka biaya di UI rendering function.

Conceptual:

```text
src/data/tuition.ts
src/utils/calculateTuition.ts
src/components/tuition/CostCalculator.*
```

---

# 17. Calculator Rules

Calculation function harus pure sebisa mungkin.

Input contoh:

* program,
* wave,
* period.

Output:

* registration,
* pre-college,
* tuition,
* surcharge,
* SSP,
* total,
* payment notes.

UI hanya bertugas:

* mengambil pilihan user,
* memanggil calculator,
* menampilkan output.

---

# 18. Program Architecture

Program data harus menjadi satu source of truth.

Program search/filter tidak boleh memiliki hardcoded copy yang berbeda dari program cards.

Conceptual program data:

* slug
* official name
* degree
* faculty
* campus
* available classes
* description
* competencies
* careers
* accreditation if verified
* official source metadata where relevant.

---

# 19. Program Search / Filter

Search/filter merupakan fitur client-side yang layak dipertahankan.

Tetapi seluruh page tidak perlu menjadi client-side app.

Hydrate hanya explorer/filter component.

Search minimal harus:

* case-insensitive,
* handle no-result state,
* tetap usable pada mobile.

---

# 20. Optional Program Detail Pages

Jangan otomatis membuat 11 detail pages hanya karena dynamic routes tersedia.

Detail page dibuat hanya jika setiap program mempunyai content yang cukup.

Jika belum:

gunakan cards + expandable/detail modal atau section yang sederhana.

Avoid empty pages with generic AI copy.

---

# 21. Scholarship Architecture

Scholarship data disimpan terpisah.

Setiap scholarship harus dapat mempunyai:

* status,
* period,
* eligibility summary,
* benefit summary,
* official link.

UI tidak boleh menganggap seluruh scholarship permanent.

---

# 22. Campus Architecture

Campus data dipisah berdasarkan building.

Conceptual:

```text
Margonda A
Margonda B
```

Setiap building dapat memiliki:

* address,
* coordinates/map,
* description,
* facilities,
* gallery.

Margonda B tidak boleh mewarisi facility list A secara otomatis.

---

# 23. Image Architecture

All project-owned/static assets ditempatkan di:

`public/images/`

Recommended grouping:

```text
images/
  campus/
    margonda-a/
    margonda-b/
  programs/
  news/
  ui/
```

Jangan bergantung pada random external image URL jika file dapat disimpan sebagai project asset secara legal dan appropriate.

---

# 24. Margonda B Documentation

Foto lapangan Margonda B nanti masuk sebagai project asset.

Naming harus jelas.

Contoh:

```text
margonda-b-exterior.webp
margonda-b-lobby.webp
margonda-b-classroom.webp
```

Jangan menggunakan nama seperti:

`IMG_20260918_193442.jpg`

di final project.

---

# 25. Image Optimization

Prefer:

* WebP/AVIF jika sesuai,
* sensible dimensions,
* lazy loading untuk below-the-fold,
* width/height untuk mencegah layout shift.

Hero images yang critical dapat menggunakan loading strategy berbeda.

---

# 26. Styling Architecture

Pertahankan CSS custom yang sudah ada.

Tidak perlu migrasi ke Tailwind hanya demi refactor.

Recommended:

```text
src/styles/
  global.css
  tokens.css
  components.css
```

Jika project semakin besar, component-specific styles dapat colocated jika lebih jelas.

---

# 27. Design Tokens

Current color identity dipertahankan sebagai baseline.

Contoh:

```css
--color-blue: #1B2F6E;
--color-blue-dark: #101B47;
--color-blue-secondary: #2F4FA8;

--color-red: #E0203D;
--color-red-dark: #A8112C;
```

Nama token final boleh disesuaikan.

Goal:

jangan menggunakan random hex value berkali-kali di component.

---

# 28. Red / Blue Balance

Blue tetap menjadi institutional anchor.

Red berfungsi lebih prominent untuk:

* primary CTA,
* active navigation,
* key emphasis,
* status,
* section accents.

Jangan mengubah seluruh website menjadi red-heavy tanpa hierarchy.

Jangan menggunakan dark mode sebagai default hanya karena branch UBSI lain menggunakannya.

---

# 29. JavaScript Policy

JavaScript digunakan ketika benar-benar dibutuhkan.

Good JS use:

* mobile navigation,
* calculator,
* program filter,
* accordion,
* interactive gallery,
* current PMB state.

Avoid JS for:

* static text,
* normal page navigation,
* simple content display.

---

# 30. Animation Policy

Pertahankan visual motion yang memberi identity, tetapi jangan menjadikan motion dependency.

Hero canvas/sphere dapat dipertahankan jika performance memadai.

Mobile may use reduced version.

Recommended:

Desktop:

* full decorative effect.

Tablet:

* reduced complexity.

Mobile:

* low-cost animation atau static visual.

---

# 31. Reduced Motion

Respect:

`prefers-reduced-motion`

Pada reduced-motion:

* matikan unnecessary animation,
* disable particle movement,
* minimize large transitions.

Content harus tetap lengkap.

---

# 32. Canvas Performance

Jika canvas dipertahankan:

* pause ketika tidak visible,
* cap devicePixelRatio jika perlu,
* reduce particle count di mobile,
* avoid unnecessary continuous computation,
* test low/mid-range device behavior.

---

# 33. Navbar Architecture

Navbar harus reusable di seluruh pages.

Desktop:

* standard page links,
* current route indication,
* registration CTA.

Mobile:

* accessible menu toggle,
* keyboard friendly,
* close after navigation,
* avoid scroll-lock bugs.

---

# 34. Registration CTA

Registration URL harus menjadi one-source constant/config.

Jangan hardcode destination berbeda di beberapa button.

All:

`Daftar Sekarang`

mengarah ke official PMB destination.

---

# 35. AI Assistant Integration

AI Assistant tidak menjadi bagian core architecture.

Jika dipertahankan:

buat sebagai optional feature.

Contoh:

```text
components/assistant/
```

atau external integration.

Failure AI tidak boleh:

* merusak layout,
* memblokir navigation,
* menghilangkan core PMB content.

---

# 36. Progressive Enhancement

Core content harus tetap readable walaupun JavaScript gagal.

Minimal:

* page content tersedia,
* links bekerja,
* official registration CTA bekerja.

Interactive tools dapat menunjukkan fallback message jika JS gagal.

---

# 37. Accessibility Architecture

Accessibility bukan patch terakhir.

Gunakan semantic foundation sejak component dibuat.

Required:

* `<nav>`
* `<main>`
* `<section>`
* `<footer>`
* semantic heading hierarchy,
* actual links for navigation,
* buttons for actions,
* labels for form controls.

Jangan membuat clickable `<div>` jika button/link lebih tepat.

---

# 38. Heading Structure

Satu primary `<h1>` per page.

Section utama:

`h2`

Nested content:

`h3`

Jangan memilih heading berdasarkan ukuran visual saja.

---

# 39. SEO Foundation

Setiap route harus mendukung:

* unique title,
* description,
* Open Graph metadata,
* canonical only if necessary,
* meaningful headings.

Sitemap dapat ditambahkan jika build strategy mendukung.

---

# 40. Error Handling

Interactive components harus menangani invalid state.

Examples:

Calculator:

invalid program/wave → safe fallback.

Program explorer:

no match → empty state.

Admissions:

no active wave → closed/upcoming state.

Optional images:

missing image → no broken layout.

---

# 41. Content Fallback

Missing optional content sebaiknya tidak dirender daripada diisi invented placeholder dalam demo final.

Development-only placeholder harus mudah ditemukan dan dihapus.

---

# 42. External Links

External link handling harus konsisten.

Examples:

* official PMB,
* official brochure,
* official scholarship source,
* Google Maps.

Gunakan descriptive link text.

---

# 43. Footer

Footer global minimal dapat memuat:

* UBSI Margonda identity,
* quick links,
* official PMB link,
* campus/contact information yang verified,
* source/institutional links jika relevan.

Jangan memenuhi footer dengan data yang belum terverifikasi.

---

# 44. News Architecture

News bukan CMS requirement.

Untuk project scope ini, static structured data sudah cukup.

Tidak perlu membuat backend/CMS hanya untuk news.

Jika future API tersedia, data source dapat diganti tanpa mengubah presentation component besar-besaran.

---

# 45. Backend Readiness

Frontend tidak perlu memiliki fake backend.

Readiness berarti:

* data dipisahkan,
* domain jelas,
* components tidak tergantung hardcoded inline data,
* integration boundaries jelas.

Future API dapat menggantikan static data source.

---

# 46. No Fake Full-Stack Rule

Do not create:

* unnecessary database,
* fake authentication,
* fake admin panel,
* fake registration backend,
* mock payment system,

hanya untuk meningkatkan complexity.

Complexity bukan success metric.

---

# 47. Migration Strategy

Refactor dilakukan incremental.

Recommended principle:

**preserve → extract → validate → replace**

Bukan:

**delete everything → rebuild**

---

# 48. Migration Phase A

Establish new architecture shell:

* Astro project,
* global styling,
* layout,
* routing,
* shared navigation/footer.

Jangan mengubah semua UI sekaligus.

---

# 49. Migration Phase B

Extract factual data:

* programs,
* admissions,
* tuition,
* scholarships,
* campus,
* facilities.

Validate output against current working prototype and research.

---

# 50. Migration Phase C

Move major pages:

* Home
* Program Studi
* Biaya & Beasiswa
* Kampus
* PMB.

Preserve useful visual identity.

---

# 51. Migration Phase D

Move interactive features:

* calculator,
* program search/filter,
* gallery,
* FAQ interaction.

Test individually.

---

# 52. Migration Phase E

Remove old single-file routing and duplicated logic only after replacements work.

Do not delete current implementation before equivalent behavior has been validated.

---

# 53. Validation After Each Migration

For every major section:

check:

* content correctness,
* visual parity where intended,
* responsiveness,
* interaction,
* console errors,
* navigation,
* accessibility basics.

---

# 54. Component Reuse Rule

Reuse components when:

* structure,
* responsibility,
* behavior

are genuinely shared.

Do not force abstraction just because two cards look slightly similar.

Avoid premature generic component systems.

---

# 55. TypeScript Policy

TypeScript recommended for:

* structured program data,
* admissions data,
* calculator types,
* utility functions.

Do not introduce advanced typing patterns that reduce readability.

Simple types/interfaces are enough.

---

# 56. Naming Convention

Use clear domain names.

Good:

`ProgramCard`
`AdmissionStatus`
`CostCalculator`
`CampusGallery`

Avoid:

`Component1`
`FeatureBoxNew`
`CardV2Final`

---

# 57. Comments

Comments explain:

* why,
* important business rule,
* unusual factual rule.

Do not comment obvious syntax.

Example useful:

```ts
// Margonda 2026 includes a special admission wave after Wave VI.
```

---

# 58. Source Metadata

Data entries that change frequently may retain internal metadata such as:

* source,
* verifiedAt,
* effectivePeriod,
* verificationStatus.

Metadata does not need to appear publicly.

Its purpose is maintenance.

---

# 59. Production-Ready Definition for This Project

Because project does not have backend/internal UBSI access, "ready" means:

* architecture clean enough for integration,
* frontend fully navigable,
* content factual,
* temporal data structured,
* no fake integrations,
* responsive,
* accessible at basic level,
* no critical runtime errors,
* major features functioning.

It does not mean actual integration with internal UBSI systems is complete.

---

# 60. Architecture Decision

Current recommended technical direction:

**Astro + custom CSS + TypeScript/JavaScript as needed + static structured data + interactive islands**

Avoid migration to:

* Next.js,
* full React SPA,
* Tailwind,

unless a concrete future requirement justifies them.

Architecture should remain proportional to the actual problem.

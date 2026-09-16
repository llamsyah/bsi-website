# AGENTS.md — Website PMB Universitas BSI Margonda

## 1. Purpose

File ini menjadi entry point utama untuk AI coding agent yang bekerja pada repository Website PMB UBSI Margonda.

Sebelum melakukan perubahan besar, agent wajib memahami:

* tujuan project,
* kondisi repo saat ini,
* product requirements,
* factual content rules,
* frontend architecture,
* design system.

Jangan menganggap repository sebagai project baru.

Project ini sudah memiliki prototype yang bekerja dan harus direfactor secara terkontrol.

---

# 2. Required Reading Order

Sebelum implementasi major change, baca dokumen berikut dalam urutan ini:

1. `PROJECT_CONTEXT.md`
2. `CURRENT_STATE.md`
3. `PRODUCT_REQUIREMENTS.md`
4. `CONTENT_DATA.md`
5. `FRONTEND_ARCHITECTURE.md`
6. `DESIGN_SYSTEM.md`
7. `deep-research-report.md` jika membutuhkan bukti/source lebih detail.

Tujuan urutan tersebut:

`PROJECT_CONTEXT`

menjelaskan kenapa project ada.

`CURRENT_STATE`

menjelaskan kondisi source saat ini.

`PRODUCT_REQUIREMENTS`

menjelaskan hasil akhir yang diinginkan.

`CONTENT_DATA`

menentukan data yang boleh dan tidak boleh digunakan.

`FRONTEND_ARCHITECTURE`

menentukan arah struktur teknis.

`DESIGN_SYSTEM`

menentukan arah visual.

`deep-research-report`

digunakan ketika diperlukan evidence atau reasoning factual tambahan.

---

# 3. Core Project Goal

Website harus menjadi:

**portal informasi dan decision-support khusus calon mahasiswa UBSI Kampus Margonda.**

Core user journey:

**Kenal → Percaya → Pilih Jurusan → Hitung Kemampuan → Kenal Kampus → Pahami PMB → Daftar**

Website tidak menggantikan sistem PMB pusat.

`Daftar Sekarang` harus mengarah ke official registration channel.

---

# 4. Current Project Reality

Current repository dimulai sebagai rapid prototype.

Sebagian besar implementation masih berada dalam:

`index.html`

Prototype sudah mempunyai:

* design identity,
* Home,
* Program Studi,
* cost calculator,
* scholarships,
* campus information,
* facilities,
* maps,
* Student Life,
* news,
* AI Assistant,
* animations.

Jangan menghapus functionality hanya karena implementation lama berada dalam satu file.

---

# 5. Architecture Direction

Target architecture:

**Astro + custom CSS + TypeScript/JavaScript as needed + structured static data + interactive islands**

Do not migrate to:

* Next.js,
* full React SPA,
* Tailwind,

tanpa requirement konkret.

Architecture target:

**static-first, interactive where necessary**

---

# 6. Golden Rule

Before changing existing behavior:

**inspect it first.**

Agent harus memahami:

* bagaimana current feature bekerja,
* data apa yang digunakan,
* behavior apa yang harus dipertahankan,
* bug apa yang memang perlu diperbaiki.

Do not replace working behavior with a different implementation without reason.

---

# 7. No Full Rewrite Rule

Jangan:

1. delete current `index.html`,
2. rebuild seluruh website dari kosong,
3. berharap visual/functionality dapat direkonstruksi setelahnya.

Refactor harus menggunakan pola:

**preserve → extract → validate → replace**

Old implementation hanya dihapus setelah replacement sudah tervalidasi.

---

# 8. Priority Order

Jika banyak pekerjaan ditemukan, prioritaskan:

1. blockers
2. core functionality
3. factual correctness
4. bugs
5. reliability
6. responsive behavior
7. accessibility
8. UX
9. visual polish
10. optional improvements

Jangan memoles animation ketika PMB status masih salah.

---

# 9. Factual Data Rule

Agent dilarang mengarang factual content.

Semua factual changes wajib mengikuti:

`CONTENT_DATA.md`

Status interpretation:

`VERIFIED`

boleh digunakan.

`PROJECT_CONFIRMED`

boleh digunakan dengan scope yang diketahui.

`NEEDS CONTEXT`

gunakan hanya dengan wording dan scope yang tepat.

`NEEDS SOURCE`

jangan dijadikan factual claim.

`CONFLICTING`

jangan arbitrarily memilih satu nilai.

`OUTDATED`

jangan gunakan sebagai current information.

`NOT ENOUGH EVIDENCE`

jangan digunakan.

---

# 10. Data Scope Rule

Selalu bedakan:

* UBSI institution-wide data,
* Margonda campus data,
* program-specific data,
* PMB-period data,
* campaign/promo data.

Contoh yang salah:

`UBSI memiliki 20 program studi`

lalu UI menyimpulkan:

`Margonda memiliki 20 program studi`.

Itu tidak valid.

---

# 11. Current Margonda Program Baseline

Current verified baseline untuk PMB Margonda September 2026:

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

All current baseline:

`S1`

Jangan menambahkan program nasional ke list Margonda tanpa evidence.

---

# 12. Current PMB Baseline

Current PMB waves include:

* Gelombang I
* Gelombang II
* Gelombang III
* Gelombang IV
* Gelombang V
* Gelombang VI
* Gelombang Khusus

Gelombang Khusus:

**11 September – 2 Oktober 2026**

Current code yang hanya mendukung I–VI harus diperbaiki.

Current-wave logic tidak boleh fallback ke stale last wave.

---

# 13. Tuition Baseline

Core S1 cost baseline telah cukup terverifikasi.

Preserve calculator concept.

Do not remove it.

Current Margonda calculator should eventually focus on verified Margonda offerings.

Do not keep:

* S1 Keperawatan,
* D3,
* S2,

as current Margonda default options tanpa confirmation.

---

# 14. Registration CTA Rule

All `Daftar Sekarang` actions must use one official destination.

Do not:

* redirect to calculator,
* create fake registration form,
* create fake backend registration.

Official PMB remains external.

---

# 15. AI Assistant Rule

AI Assistant is optional supporting utility.

It must not:

* become primary navigation,
* block website completion,
* become required for accessing PMB information,
* determine core content.

Website must remain fully useful without AI Assistant.

---

# 16. Design Preservation Rule

Refactoring architecture is not permission to redesign everything.

Preserve:

* existing visual DNA,
* useful hero concept,
* current blue/red identity,
* working card patterns where appropriate,
* useful animations where performance allows.

Improve inconsistency gradually.

---

# 17. Stakeholder Color Direction

Stakeholder requested stronger use of UBSI red.

Red should become more visible across the design system.

Do not solve this by:

* making every background red,
* changing entire site to dark,
* using random saturated sections.

Follow:

`DESIGN_SYSTEM.md`

---

# 18. Content Before Decoration

When improving a section:

first validate:

* purpose,
* content,
* hierarchy,
* CTA,
* data.

Then improve visual styling.

Do not fix weak content by adding animation.

---

# 19. Home Target

Target Home hierarchy:

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

Do not casually introduce additional major Home sections.

---

# 20. Primary Navigation Target

Target navigation:

* Beranda
* Program Studi
* Biaya & Beasiswa
* Kampus Margonda
* Panduan PMB
* Daftar Sekarang

Do not restore AI Assistant or Student Life as primary nav without explicit requirement.

---

# 21. Routing Requirement

Final architecture should use real routes.

Target:

`/`

`/program-studi`

`/biaya-beasiswa`

`/kampus`

`/pmb`

Optional:

`/program-studi/[slug]`

only if program detail content justifies it.

---

# 22. Data Extraction Requirement

Move domain data out of page markup and UI logic.

Expected conceptual domains:

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

Do not duplicate the same factual value across files unnecessarily.

---

# 23. Interactive Feature Rule

Use JavaScript only when interaction requires it.

Good candidates:

* calculator,
* program search/filter,
* mobile nav,
* FAQ accordion,
* gallery.

Do not hydrate static content unnecessarily.

---

# 24. Calculator Preservation Rule

The Financial Cost Simulator is a core project differentiator.

During refactor:

preserve:

* cost breakdown,
* program/wave selection,
* comparison concept,
* estimated total,
* clarity.

Improve:

* factual dataset,
* wave logic,
* data separation,
* fallback states.

Do not simplify it into a static pricing table unless explicitly requested.

---

# 25. Program Explorer Preservation Rule

Search/filter behavior has product value.

Preserve the concept.

Improve:

* Margonda-specific data,
* factual program info,
* empty states,
* mobile usability.

Remove unverified salary claims.

---

# 26. Campus Content Rule

Margonda A:

can use verified existing facility content.

Margonda B:

will use original field documentation.

Never fill missing Margonda B visuals with:

* random BSI campus images,
* stock campus images,
* AI-generated fake facilities.

---

# 27. News Rule

Only label content Margonda when the article actually concerns Margonda.

Other-campus content must not appear as local Margonda news.

National content must be explicitly scoped.

---

# 28. Marketing Claim Rule

Avoid unsupported numerical marketing claims.

Do not use current prototype claims such as:

* 1000+ Mitra Industri
* 18 Sertifikasi BNSP
* 24 Program Studi
* 8 Fakultas

without updated scope/source.

Prefer precise wording over impressive numbers.

---

# 29. AI Branding Rule

Do not use:

`AI-Native Campus`

or:

`AI Native Learning`

as official identity.

Official branding baseline:

`Kampus Digital Kreatif`

AI can be referenced in actual activities or digital learning context.

---

# 30. Accessibility Rule

Every new/refactored component must consider:

* semantic HTML,
* keyboard interaction,
* focus visibility,
* contrast,
* labels,
* alt text,
* reduced motion.

Avoid adding accessibility as a last-minute patch.

---

# 31. Responsive Rule

Every major implementation must be tested on:

* mobile,
* tablet,
* laptop,
* desktop.

Do not consider desktop completion sufficient.

Mobile may intentionally reduce decorative animation.

---

# 32. Performance Rule

Avoid unnecessary client JavaScript.

Optimize:

* images,
* canvas,
* animations,
* lazy loading.

Decorative effects must not compromise core usage.

---

# 33. Error State Rule

Interactive features need safe states.

Examples:

No active PMB:

show closed/upcoming state.

No search result:

show empty-state message.

Missing optional image:

do not break layout.

Invalid calculator selection:

handle safely.

---

# 34. External Link Rule

Official PMB and other external destinations should be centralized where practical.

Do not hardcode conflicting external URLs across components.

---

# 35. Agent Working Method

For each assigned task:

## Step 1 — Inspect

Read relevant docs and source.

## Step 2 — State Existing Behavior

Identify:

* current structure,
* current data,
* current functionality.

## Step 3 — Identify Gap

Compare implementation with requirements.

## Step 4 — Make One Coherent Change

Avoid unrelated refactor.

## Step 5 — Validate

Check:

* build,
* functionality,
* factual content,
* responsive layout,
* obvious accessibility issues,
* console/runtime errors.

## Step 6 — Report

Summarize:

* changed,
* preserved,
* unresolved,
* validation performed.

---

# 36. Troubleshooting Method

When debugging:

use:

**symptom → evidence → likely root cause → one meaningful change → validation**

Do not change many unrelated variables at once.

Clearly separate:

* facts,
* hypothesis,
* assumptions.

---

# 37. No Opportunistic Refactor Rule

While fixing one feature, do not rewrite unrelated areas simply because they look improvable.

If a separate issue is discovered:

record it for later.

---

# 38. Package Dependency Rule

Before installing a dependency:

ask:

Can this be implemented reasonably using:

* Astro,
* browser platform,
* existing project stack?

Avoid unnecessary dependencies.

Every dependency should solve a real problem.

---

# 39. No Fake Backend

Do not create:

* database,
* authentication,
* payment backend,
* fake API,
* admin dashboard,

unless explicitly required.

Frontend readiness does not require fake infrastructure.

---

# 40. Source Code Quality

Prefer:

* descriptive names,
* small focused functions,
* structured data,
* straightforward types,
* readable components.

Avoid:

* clever abstractions,
* giant utility layers,
* premature design systems,
* deeply nested state.

---

# 41. Documentation Updates

When implementation changes a locked decision or factual baseline:

update the appropriate document.

Examples:

Data change:

`CONTENT_DATA.md`

Product decision:

`PRODUCT_REQUIREMENTS.md`

Architecture decision:

`FRONTEND_ARCHITECTURE.md`

Do not allow docs and implementation to drift significantly.

---

# 42. Definition of Done for Individual Task

A task is not done only because code exists.

It should satisfy:

* requirement implemented,
* current useful behavior preserved,
* factual content valid,
* responsive behavior checked,
* no obvious runtime error,
* no unrelated regressions,
* implementation understandable.

---

# 43. Definition of Demo-Ready

Website is demo-ready when:

* core routes work,
* navbar works,
* registration CTA is correct,
* current PMB state is correct,
* program data matches Margonda,
* calculator works,
* tuition baseline is correct,
* campus information is credible,
* no misleading placeholder remains,
* mobile experience works,
* no obvious broken links/errors,
* visual system is coherent.

---

# 44. Definition of Project-Ready

For this PKL project, “ready” means:

* frontend complete enough for demo,
* architecture maintainable,
* factual data controlled,
* integration boundaries clear,
* docs available,
* testing performed.

It does not require access to UBSI internal database/backend.

---

# 45. Portfolio Preservation

Changes should preserve evidence useful for portfolio discussion:

* prototype evolution,
* factual audit,
* information architecture,
* decision-support feature,
* data modeling,
* architectural refactor,
* responsive design,
* testing.

Avoid erasing project history unnecessarily.

---

# 46. Git / Change Discipline

Prefer coherent commits grouped by purpose.

Examples:

`refactor: establish Astro application shell`

`feat: migrate Margonda program explorer`

`fix: support special PMB wave`

`refactor: extract tuition data`

Avoid giant commit containing unrelated changes.

---

# 47. Important Known Issues

Known high-priority issues include:

* registration CTA currently points to calculator,
* PMB Gelombang Khusus missing,
* stale `detectCurrentWave()` behavior,
* outdated program scope,
* outdated marketing numbers,
* non-Margonda news,
* unverified salary claims,
* data duplication,
* fake SPA routing.

Do not lose track of these during visual refactor.

---

# 48. Open Questions

Some facts remain intentionally unresolved:

* S2 Margonda offering,
* several program accreditation statuses,
* operational hours conflict,
* exact active LSP scheme count,
* some scholarship statuses,
* complete Margonda B facilities.

Do not invent answers.

Open questions are not blockers for unrelated work.

---

# 49. First Major Refactor Objective

The first major implementation objective should be:

**establish the new architecture without destroying the current product.**

That means:

* create Astro shell,
* establish routes,
* establish shared layout/styles,
* extract high-confidence data,
* migrate sections incrementally.

Do not start by polishing every visual detail.

---

# 50. Final Agent Principle

The goal is not to produce the most complex codebase.

The goal is to produce a website that is:

**accurate, useful, maintainable, responsive, credible, and explainable.**

When choosing between:

* clever vs clear,
* impressive vs factual,
* complex vs sufficient,

prefer:

**clear, factual, sufficient.**

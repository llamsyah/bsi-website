# Task 14 — Cross-Site Visual Rhythm Report

Date: 18 September 2026. Base: main/origin/main f138479.
Branch: codex/task-14-cross-site-visual-system. No merge to main.

## 1. Audit checkpoint and composition system

Continued the existing audit/branch. Problems: repeated oversized headings and
campaign sections, adjacent Home conversions, fragmented S1/S2 Campus presentation,
and degree navigation detached from academic introductions.

The scoped composition stylesheet defines anchor/content/bridge roles through
spacing tokens, overview/utility headings and quieter journey transitions. Strong
photographic, functional and editorial anchors retain their existing structures.
White surfaces and separators quiet secondary content without cloning layouts.

## 2. Route refinements

- Home: one navy PMB/conversion anchor replaces two endings. Trust shows 11 S1 +
  2 Magister. Academic introduction is centered; S1 action neutral; campus/cost
  links lighter. S2 strip, hero photograph and Terkini composition remain.
- Campus: hero separately represents locations, S1 and Magister. One centered
  overview replaces sparse S1 section plus graduate strip. Four faculties apply
  only to S1; graduate names, intake/classes reuse shared data. Classes and final
  handoff become quieter; facilities and Experience have tighter entry/exit space.
- Program Studi: integrated selector, balanced introduction and journey, smaller
  explorer heading. Continuous search/filter/expandable rows remain unchanged.
  Two graduate offerings use editorial columns on desktop, compact rows on phones.
- Biaya: compact intro, centered scholarship introduction, quieter PMB handoff.
  Calculator markup, CSS, script and engine untouched. Independent S2 cost
  comparisons retain published discrepancies, exclusions and disclosure.
- PMB: smaller informational hero, status remains the anchor. Cohesive schedule
  intro, centered process intro, quieter checklist and compact final conversion.
  All seven waves, phases, documents and explanations remain.
- S2: bounded centered content area with left-aligned text, consistent headings
  and compact handoff. Graduate PMB checklist uses two desktop columns.

## 3. CTA and responsive decisions

Red prioritizes meaningful conversion, blue/neutral deeper navigation, text links
supporting exploration/sources. Home no longer has adjacent competing endings.
Campus counts stay side-by-side on phones. Degree choices remain adjacent, with
label above them at tablet widths. Reading-oriented overview headings return to
left alignment on phones; the Campus comparison stays centered. Mobile PMB intro
links wrap naturally rather than becoming repeated full-width buttons. Existing
calculator, facilities and editorial mobile structures are preserved.

## 4. Approximate document heights

Same 900px viewport height; default S1 on academic routes. Values in pixels;
fonts/date-driven content may slightly affect measurements.

| Route | 1920 before | 1920 after | 320 before | 320 after |
|---|---:|---:|---:|---:|
| Home | 4816 | 4344 | 6778 | 6342 |
| Campus | 7224 | 6519 | 9338 | 8934 |
| Program Studi | 3726 | 3460 | 4648 | 4562 |
| Biaya & Beasiswa | 4351 | 4160 | 5776 | 5674 |
| PMB | 4921 | 4096 | 7007 | 6706 |

## 5. Validation

- npm test: 115 passed; zero failed/skipped. Coverage retained. No new behavior
  warranted new tests.
- npm run check: 52 files, zero errors/warnings/hints.
- npm run build: all five static routes generated.
- All five default routes and three S2 views checked at 1920 / 1366 / 768 / 390 /
  320px: no horizontal overflow; correct single visible degree panel.
- Screenshots reviewed across desktop/tablet/mobile, including intros, academic
  summaries, gallery, editorial entry, process, scholarships, journey and conversion.
  No important-control overlap from Tanya BSI observed in inspected states;
  mobile launcher stays in header, calculator launcher remains inline.
- Search Informatika: one result; incompatible faculty: zero; reset: eleven.
  Keyboard Enter opens program detail and preserves its cost handoff.
- Degree switching updates URL; reload/back/forward preserve appropriate panel.
- Mobile menu opens with existing navigation order; Escape dismisses it.
- Degree link keyboard focus has visible red outline. Enter opens graduate cost
  disclosure and PMB FAQ.
- Calculator Informatika / wave I: Rp9.340.000. Program query updates. Graduate
  selection retains query, shows selected article and opens component disclosure.
- PMB: seven waves; Khusus active on validation date; lecture date 21 September
  2026. Boundary status tests pass without recreating logic or changing clock.
- Captured browser console: zero errors/warnings.
- Full-page screenshot stitching sometimes duplicated slices; viewport shots and
  DOM measurements verified actual composition rather than those artifacts.
- One discovered low-contrast cost-bridge label was corrected to dark red.

## 6. Preserved systems and data safety

Datasets, cost engines, admissions status, resolver, URL scripts, explorer,
calculator, Navbar/Footer, assets, editorial records/temporal logic, dependencies
and legacy index.html have no changes. Registration still uses the shared official
https://pmbubsi.id/pmb destination. No S2 faculty count or unsupported factual claim
was introduced. Four faculties remain scoped to S1.

## 7. Files changed

- src/layouts/BaseLayout.astro
- src/pages/index.astro
- src/pages/kampus.astro
- src/pages/program-studi.astro
- src/pages/biaya-beasiswa.astro
- src/pages/pmb.astro
- src/styles/composition.css
- src/styles/home.css (remove obsolete final-CTA rules)
- src/styles/campus.css (remove merged graduate-strip rules)
- DESIGN_SYSTEM.md
- README.md
- TASK_14_VISUAL_SYSTEM_REPORT.md

## 8. Remaining debt and next action

Approved Task 13 placeholders and neutral Margonda B treatment remain; replacement
is outside scope. Campus remains longest due to preserved facilities/editorial
content. Browser validation uses available Chromium, not a physical-device or
cross-browser laboratory.

Exactly one recommended next action: replace editorial placeholders with
rights-cleared campus activity photography while preserving the Task 13 structure.

## 9. Git delivery

Commit and push the existing Task 14 branch after validation; do not merge to main.
The final delivery response records the resulting SHA and verified remote status.

## 10. Centered composition refinement

A focused follow-up strengthens the centered framing for four sections without
changing their detailed content layout:

- The S1 Program Studi intro remains centered at every viewport, while the
  explorer eyebrow, heading and supporting copy now form a centered editorial
  frame above the unchanged search controls and continuous program rows.
- The Campus `Dua lokasi Margonda`, `Pilihan waktu kuliah`, and `Fasilitas`
  introductions use the same bounded centered frame and a restrained red divider.
  Campus cards, class availability rows, gallery grid, map links and labels retain
  their existing alignment and behavior.

The follow-up was checked at 1920, 1366, 768, 390 and 320px. Every framed header
remains centered, no horizontal overflow was found, and browser console output was
clean. Explorer search returned one result for `Informatika`; keyboard Enter opened
its native disclosure with visible focus. The two map links, two class options and
all eight Margonda A facilities remain present. The complete 115-test suite, Astro
check (zero diagnostics), and five-route production build pass.

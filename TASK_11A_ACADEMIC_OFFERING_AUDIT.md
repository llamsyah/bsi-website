# Task 11A — Margonda academic offering audit and model plan

Audit date: 17 September 2026. Repository checkpoint: `ae0ddace35661ca0eefde47f4c3f637b8e6f7dbd`, branch `codex/task-10-campus-margonda`.

Status: research and design complete; application migration NOT performed. This document is a proposed evidence-backed baseline, not an automatic replacement for `CONTENT_DATA.md` or permission to publish unresolved offerings.

## 1. Decision summary

Retain the **11 operationally verified S1 offerings**. Record Hubungan Internasional and Ilmu Hukum as **officially announced for Margonda but conflicting with the September PMB tables**. Do not assert that they are unavailable; equally, do not promote “13 fully verified September S1 offerings” or price them using the existing calculator yet.

Plan for **two S2 offerings**, Magister Manajemen (MM) and Magister Teknologi Informasi (MTI), whose Margonda September availability is explicit in the dedicated official PMB source. Discovery is supportable; exact active registration dates, payment inclusions and an MM pricing discrepancy remain separate publication gates. An intake listing does not prove registration is open today.

Do not combine the 11 S1 plus two S2 into an unqualified “13 programs” headline. Report counts by level, campus, intake and evidence eligibility. The potential addition of HI/Ilmu Hukum is a separate decision from S2 support.

## 2. Current-state audit

Inspected the current datasets, routes, calculator component/scripts/utilities, program search, admissions engine, assistant resolver/types/rendering, tests and relevant project documentation (`PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `PRODUCT_REQUIREMENTS.md`, `CONTENT_DATA.md`, `FRONTEND_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `README.md`, and relevant research notes).

| Area | Current assumption / behavior |
| --- | --- |
| Programs | `src/data/programs.ts`: degree is literally S1; IDs equal slugs; one September 2026 offering; 11 programs; four faculty keys. |
| FTI | Rekayasa Perangkat Lunak, Informatika, Teknologi Informasi, Sistem Informasi, Teknik Elektro, Teknik Industri. |
| FEB | Akuntansi, Manajemen. |
| FKB | Sastra Inggris, Ilmu Komunikasi. |
| FIK | Psikologi. |
| Classes | All 11 have Pagi/Siang; only Informatika, Sistem Informasi and Ilmu Komunikasi have Sore/Malam. Friday/Saturday is false for this S1 offering. |
| Campus | `campus.ts`: two locations, A and B. No program-to-building assignment. Institutional accreditation must not become accreditation of every program. |
| Tuition | `tuition.ts`: registration Rp260,000; precollege Rp1,600,000; semester Rp3,980,000, plus Rp1,000,000 for six named programs: Manajemen, Akuntansi, Ilmu Komunikasi, Sistem Informasi, Teknologi Informasi, Informatika. |
| SSP | I Rp2.5m; II Rp3m; III Rp3.6m; IV Rp4.5m; V Rp5.4m; VI and Khusus Rp6m. No automatic scholarship subtraction. |
| Calculator | `utils/tuition.ts`: initial component estimate = registration + precollege + one semester + full SSP. It is neither the amount due immediately nor a whole-degree total. Invalid calculation inputs return null; query resolution has a labelled S1 fallback. |
| Admissions | `admissions.ts`: single September 2026 period, seven inclusive Jakarta-date waves; lectures start 21 September. `admissionsStatus.ts` handles upcoming/open/gaps/closed without stale last-wave fallback. |
| Program UI | Search intersects faculty filter; compact native details rows; static content survives without JavaScript. Search/filter is not yet a cross-page URL contract. |
| Cost UI | S1 component, seven-wave comparison, current-wave status, query initialization from `?program=`. Selection changes are not a persistent URL model. |
| PMB | One period and shared journey/SLTA requirements. No S2 track. |
| Tanya BSI | Stateless deterministic resolver; rejects S2/magister and disputed programs before S1 matching; responses and cost links assume S1. Similar names would collide without level-aware matching. |
| Campus/Home | Compact academic preview and S1 counts, S1 class summary. No S2 content. |

Existing docs conservatively exclude S2 because older evidence was unresolved. The newly inspected dedicated S2 intake table supports revisiting that exclusion. A crawler's recency is not a publication date and must not decide factual precedence.

## 3. Source register

All sources below were accessed on the audit date. “Undated” means no reliable publication/update date was established; it does not mean current forever. No registration form was submitted.

| ID | Official source / title | Date and scope |
| --- | --- | --- |
| A | [PMB: Kampus UBSI Margonda, Depok](https://pmbubsi.id/kampus/depok) | Undated; campus-specific September offering and fees; live browser tab checked. |
| B | [PMB: Program Studi / Fakultas](https://pmbubsi.id/pmb/fakultas) | Undated; institution-wide directory, not proof of Margonda delivery. |
| C | [PMB: Hubungan Internasional](https://pmbubsi.id/prodi/91) | Live browser: September 2026 campus tab; only Kramat/Salemba. |
| D | [PMB: Ilmu Hukum](https://pmbubsi.id/prodi/92) | Live browser: September 2026 campus tab; only Kramat/Salemba. |
| E | [Rektor UBSI Ungkap Prospek Jurusan Hubungan Internasional](https://news.bsi.ac.id/berita/ubsi-jurusan-hubungan-internasional/) | 23 June 2026; explicit Margonda announcement; not an intake fee schedule. |
| F | [Bukan Cuma Soal Hukum, Prodi S1 Ilmu Hukum UBSI…](https://news.bsi.ac.id/berita/edukasi/bukan-cuma-soal-hukum-prodi-s1-ilmu-hukum-ubsi-siapkan-talenta-legal-di-era-digital/) | 2 September 2026; explicit Margonda announcement; promotional context. |
| G | [PMB: Informasi Program Magister S2](https://pmbubsi.id/infopmb/prodi/s2_info) | Undated; March/September 2026 tabs, program fees and S2 terms. |
| H | [Saat Karier Butuh Upgrade, UBSI Kampus Margonda Hadirkan S2…](https://news.bsi.ac.id/berita/informatika/saat-karier-butuh-upgrade-ubsi-kampus-margonda-hadirkan-s2-manajemen-dan-magister-ti/) | 23 January 2026; campus-specific corroboration. |
| I | [UBSI: Magister Teknologi Informasi profile](https://www.bsi.ac.id/Program-Studi-teknologi-informasi-59110-jakarta-pusat) | Undated; institution/program profile, location field Jakarta Pusat. |
| J | [BSINews: Management S2 profile](https://news.bsi.ac.id/prodi/s2-jurusan-management/) | Publication date not established; institution/program scope. |
| K | [PMB: Periode September 2026](https://pmbubsi.id/infopmb/kampus/daftar_sep) | Explicit 2026 intake; internally inconsistent summary versus wave table. |
| L | [PMB: Syarat dan Ketentuan](https://pmbubsi.id/pmb/syaratpendaftaran) | Page update 15 October 2025; 2026/27 schedules with some stale wording. |
| M | [PMB: Hukum Bisnis](https://pmbubsi.id/prodi/24) | September 2026 list excludes Margonda; separate identity from Ilmu Hukum. |

Retrieval caveat: search extraction for C/D returned old 2025 nursing pages. Direct browser navigation showed the correctly named 2026 HI/Ilmu Hukum pages. This audit uses the live pages for those two entries; old cached content is not evidence that either program is nursing or unavailable nationally. The linked S2 PDF/fee images could not be independently retrieved through the web tool; fee findings below use readable HTML, not presumed brochure contents.

## 4. Evidence matrix and reconciliation

Confidence describes the specific claim, not blanket trust in every statement on a page. Source IDs resolve to titles, URLs and dates above.

### S1 and shared scope

| Field | Project now | Official evidence | Confidence / conflict | Recommended project value |
| --- | --- | --- | --- | --- |
| S1 count | 11 | A live table has 11; E/F announce two more | High table observation; overall latest count unresolved | Keep 11 as operational baseline, not an exhaustive forever claim; 13 remains reconciliation candidate. |
| HI at Margonda | Excluded | E explicitly names Margonda and morning/evening; C September lists only Kramat; absent A | CONFLICTING | Candidate with evidence; no priced/registrable Margonda offering until intake clarification. |
| Hukum at Margonda | Excluded | F explicitly names S1 Ilmu Hukum at Margonda; D lists only Kramat; absent A | CONFLICTING | Candidate Ilmu Hukum; do not equate with Hukum Bisnis (M). |
| Faculties | Four for current 11 | B places HI/Ilmu Hukum in Fakultas Hukum institution-wide | High mapping, conditional campus scope | Preserve four for existing S1; if additions clear the gate, derive count from eligible offerings, potentially five. |
| Class options | Day all; evening three; no Fri/Sat | A matches current 11; E's HI class claim belongs to disputed offering | High current 11; HI unresolved | Keep existing rules; do not spread HI schedule to other programs. |
| S1 costs | Current named components | A/K retain published base amounts | High baseline, campaign conflict | Preserve baseline; new program price requires explicit mapping, not “not in surcharge list = cheap tier”. |
| Free SSP | Not auto-applied | A contains broad free-SSP copy alongside nonzero fees; F describes conditional subsidy | Conflicting/conditional eligibility | Do not change SSP to zero or deduct campaign benefits automatically. |
| S1 waves | Seven through 2 October | K/L include special wave; A abbreviated table lacks it | High detailed seven-wave schedule | Preserve seven; do not truncate from incomplete campus summary. |
| Registration close | 2 October special-wave end | K also says registration ends 15 September and calls it six waves | Internal official contradiction | Preserve documented detailed schedule and record conflict; do not invent a reconciled deadline. |
| Start of lectures | 21 September 2026 | K/L agree; special wave runs beyond this | High published dates, operational context unclear | Preserve both dates; don't fabricate late-entry procedure. |
| Campus A/B | Two addresses; no assignment | F names both; H gives No.8 for information | Address evidence does not assign classes | Keep campus-level availability; buildingId unknown. |

### S2 evidence (published values, not a payment quote)

For every row below, current project value is **not modeled**. G is the primary source unless noted. Confidence is high in the displayed facts; fee applicability/inclusions still require context.

| Field | MM | MTI | Recommendation |
| --- | --- | --- | --- |
| Campus/intake | Margonda, September 2026 | Same | Discovery eligible; no building assignment. |
| March | Margonda absent | Same | Do not advertise March Margonda. |
| Class | Jumat/Sabtu | Jumat/Sabtu | Exact hours/mode unknown. |
| Duration | 3 semesters (J) | 3 semesters (I) | Program-level duration; no guaranteed completion. |
| Registration | Rp500,000 | Rp500,000 | Separate component. |
| Matriculation | Rp2,500,000 at re-registration | Same | Separate component. |
| Almamater | Rp500,000 | Rp500,000 | Do not invent a separate blazer charge. |
| Published program tuition | Rp35,000,000 | Rp45,000,000 | Not all-in total. |
| Published semester amount | Rp11,700,000 | Rp15,000,000 | Alternative payment basis. |
| Published installment | 18 × Rp1,950,000 | 18 × Rp2,500,000 | Due dates/eligibility unknown. |
| Exclusions | Remedial, thesis, graduation | Same | No invented amounts. |
| Entry requirement | S1 graduate; laptop required | Same | Complete document checklist unknown. |
| Route | Official PMB entry; G for S2 information | Same | Preserve canonical external registration destination. |

Independent arithmetic check: MM semester amount × 3 = Rp35,100,000; installment amount × 18 = Rp35,100,000. Both exceed the published program tuition by **Rp100,000**. MTI equivalents both equal Rp45,000,000. These calculations describe a discrepancy, not its cause. Do not call it rounding, a discount or interest without evidence. Do not replace any source amount, divide the program total into a fabricated installment, or add all three payment alternatives together.

No exact S2 admission window/start date was established. S1 dates cannot fill this gap. I's Jakarta Pusat profile field is not a Margonda intake listing and does not override G. A secondary `bsi.today/biaya/` page claims thesis/graduation inclusion, contrary to G; its authority was not established, so it is not adopted. G's exclusions control the proposed display. Generic scholarship banners do not establish individual S2 eligibility.

## 5. Final recommended baseline and unresolved gates

**Safe now for a subsequent implementation:** preserve current S1 IDs/classes/prices and seven-wave behavior; add a separate, sourced S2 discovery model. Keep S2 costs as published alternatives with conflict status, not a single payable total. Retain institution-wide accreditation scope.

**Do not publish as confirmed yet:** HI/Ilmu Hukum September registration availability, exact latest total S1 count beyond the operational table, prices for either candidate, S2 building/room placement, online/hybrid mode, exact class hours, S2 open/closed dates or lecture start, precise installment due dates, automatic scholarship entitlements, comprehensive S2 document list, all-in graduation costs.

Clarification needed from an updated official intake table or attributable PMB confirmation:

1. Does September 2026 Margonda admit HI and Ilmu Hukum? Confirm exact names, program IDs, faculty, classes and tuition. Explain A/C/D versus E/F.
2. For MM, which payment total is contractually applicable, and why do published alternatives differ? For both S2 programs, are registration/matriculation/almamater additional to program tuition?
3. What are Margonda S2 registration dates, lecture start, admission steps/documents and installment terms?
4. Which S1 registration deadline applies to the special wave, and what procedure covers entry after lecture start?

These gaps block specific claims/calculations, not the model design or this audit. No external inquiry was sent.

## 6. Proposed normalized academic model

Separate program identity from an offering at a campus/intake. Do not place every future intake, class and price into one growing program object. Below is design notation only, not application code.

```ts
type DegreeLevel = 's1' | 's2';
type Claim<T> = {
  value: T | null;
  status: 'verified' | 'needs-context' | 'conflicting' | 'unknown';
  evidenceIds: string[];
};
type Program = {
  id: string; slug: string; name: string; degreeLevel: DegreeLevel;
  facultyOrAcademicGroupId: string | null;
};
type Offering = {
  id: string; programId: string; campusId: string;
  buildingId: string | null;
  intakePeriodIds: string[];
  classOptions: Claim<string[]>;
  admissionTrackId: string | null; costModelId: string | null;
  availability: Claim<'offered'>;
};
type AdmissionTrack =
  | { kind: 's1-waves'; periodId: string; registrationUrl: string }
  | { kind: 's2'; intakePeriodId: string;
      registrationWindow: Claim<{ start: string; end: string }>;
      lectureStart: Claim<string>; registrationUrl: string; infoUrl: string };
type CostModel =
  | { kind: 's1-semester-ssp'; registration: number; precollege: number;
      tuition: number; sspByWave: Record<string, number> }
  | { kind: 's2-program'; registration: Claim<number>;
      matriculation: Claim<number>; almamater: Claim<number>;
      programTotal: Claim<number>; semesterPayment: Claim<number>;
      installmentPayment: Claim<{ amount: number; count: number }>;
      inclusionRules: Claim<string[]>; exclusions: Claim<string[]>;
      reconciliation: 'consistent' | 'conflicting' | 'incomplete' };
```

Evidence records should hold URL/title, publisher, publishedAt (nullable), retrievedAt, effectivePeriod, campus/level scope and concise claim notes. Store prices as integer IDR. Unknown is null, never zero. Published values and independent arithmetic diagnostics remain separate. Even mathematically consistent MTI amounts do not establish component inclusions.

Keep existing S1 IDs/slugs. Use distinct S2 IDs such as `magister-manajemen` and `magister-teknologi-informasi`. A neutral academic group “Pascasarjana” is a presentation grouping, not a claim of a new faculty. S2 faculty association can remain null until explicitly established. Disputed S1 candidates belong in the evidence registry until eligible; they must not leak into counts or automatic pricing.

Use separate selectors for discovery eligibility, pricing eligibility and status eligibility. A missing price must not hide a valid informational program; a valid program must not imply a computable payment. Preserve the existing S1 calculator through an adapter; add an independent S2 calculation/display module rather than inserting S2 into SSP functions.

## 7. Cross-page integration and URL contract

| Area | Proposed behavior |
| --- | --- |
| Home | Small S1/S2 discovery mention and level-specific links. Keep current visual hierarchy; no fee tables or extra explorer. |
| Campus | Compact count per level and intake; class claims scoped by level. Keep A/B/facilities intact; no program-to-building guesses or fee duplication. |
| Program Studi | Sarjana (S1) / Pascasarjana (S2) selector; search within selected level. S1 faculty filters unchanged. Hide irrelevant S2 faculty controls rather than inventing faculties. On switch, clear incompatible faculty/program filters and announce result count. Preserve native details, keyboard access and static fallback. |
| Biaya & Beasiswa | Explicit S1 and S2 modes. S1 output unchanged. S2 shows published program/semester/installment alternatives, separate components and exclusions. MM exposes discrepancy; no synthesized payable/all-in total. No wave selector, SSP chart or S1 status inside S2 mode. |
| Panduan PMB | Separate level-aware journeys. S1 retains seven waves and existing engine. S2 shows supported qualification/intake/class information and official next action; unknown dates use “Konfirmasi jadwal PMB S2”, never S1 open/closed status. Do not transplant SLTA screening/ORMIK steps without evidence. |
| Tanya BSI | Resolve explicit degree before matching Manajemen/TI. Add validated page context as an optional hint, overridden by the question. If ambiguous, ask S1 or S2. Generic S2 questions no longer blanket-reject; unknown S2 dates/fees get bounded answers and official links. Keep deterministic resolver and safe rendering. |

Canonical examples: `/program-studi?jenjang=s2`, `/biaya-beasiswa?jenjang=s2&program=magister-manajemen`, `/pmb?jenjang=s1`. Keep current route paths and official registration URL `https://pmbubsi.id/pmb`; S2 info links may use G. Never invent a prefilled external registration parameter.

Precedence rules:

1. Missing level and program preserves existing S1 default. Existing `?program=manajemen` and `?program=teknologi-informasi` still mean S1.
2. A recognized unique S2 slug with no level can infer S2; new generated links always include both.
3. Explicit level/program mismatch or unknown slug shows a clear choice/error, not a silently priced different program. Preserve labelled legacy S1 fallback only where its current behavior is intentional.
4. Switching to S2 clears wave and incompatible program/faculty state. Refresh, browser Back/Forward and copied URLs restore selection. Unknown parameters do not crash rendering.
5. Share one parser/link builder between pages and assistant. Do not use localStorage or hidden global degree state. Server-render level links with usable content if JavaScript is disabled.

## 8. Migration impact and safe order

Likely files: `src/data/programs.ts`, `admissions.ts`, `tuition.ts`, `verification.ts`; new academic offering/evidence and S2 cost/track modules; `utils/programSearch.ts`, new level/query helpers; `ProgramRow.astro`, `TuitionCalculator.astro`, `AdmissionsStatus.astro` callers; program/calculator/PMB scripts; all five route templates; assistant resolver/types/render. Shared dataset changes should be additive and adapted before moving existing consumers.

Hardcoded count inventory: `index.astro` FAQ (line 162 at audit); `kampus.astro` hero/handoff (26/157); `program-studi.astro` metadata (9); `biaya-beasiswa.astro` metadata (12). Campus computed count/faculty summary is already derived, but needs a level/intake selector. Also review S1-only metadata, assistant `programContext`, data evidence descriptions and README claims. Historical milestone/test records should retain their historical numbers, not receive a global search/replace.

Safe order:

1. Lock evidence decisions in `CONTENT_DATA.md` for the implementation task; retain explicit unresolved fields. Update relevant current README/data docs, not historical evidence.
2. Add normalized types/records and claim-level provenance with regression tests. Maintain a compatibility export of exactly the current S1 offering.
3. Add shared URL/degree selection helpers; prove legacy links still resolve identically.
4. Integrate Program Studi discovery and filter behavior, then compact Home/Campus links/counts. No unrelated redesign.
5. Implement S2 fee presentation in a separate module. Gate uncertain arithmetic; keep S1 calculator and visual helpers unchanged.
6. Add S2 PMB presentation. Reuse date utility only when actual S2 dates exist; do not copy S1 waves.
7. Extend assistant context/intents and safe deep links; preserve unsupported answers for unverified claims.
8. Run full tests/check/build and responsive/keyboard validation, review scope diff, then commit on a dedicated implementation branch. Do not migrate as part of this audit.

Preserve `index.html`, navigation order/routes, A/B assets and addresses, approved layouts, tuition arithmetic, scholarship boundaries, the existing seven-wave dates and timezone semantics, no-JavaScript content, assistant escaping/link safety, and canonical registration destination.

## 9. Acceptance criteria for implementation

- Current 11 S1 IDs, faculty mapping, class availability, accreditation scope and every program×wave price remain identical under the compatibility selector.
- Exactly the evidence-approved S2 records appear; disputed S1 candidates are not silently counted/priced. UI distinguishes level and intake.
- Existing `tests/programs.test.mjs` retains the 11-item S1 assertions, now scoped to S1, rather than weakening them to accommodate S2. Add level search/filter and unique-slug cases.
- `tests/tuition.test.mjs` and `tuition-visuals.test.mjs` preserve S1 output. New S2 tests prove alternatives are not summed, unknown is not zero, MM discrepancy is Rp100,000, and no S2 record enters SSP functions.
- `tests/admissions.test.mjs` keeps inclusive dates, all seven waves, gap/closed and Jakarta boundary checks. Add proof that missing S2 dates yield unknown, not S1 active/closed status.
- `tests/assistant.test.mjs` covers explicit S1/S2, ambiguous Manajemen/TI, unknown dates, conflicting fees, contradictory URL context and safe level-aware links. Keep injection/render safety coverage.
- `tests/campus.test.mjs` preserves locations/facilities/navigation. Add count derivation tests only where new selectors introduce behavior.
- URL tests cover legacy links, level inference, mismatches, malformed parameters, refresh and Back/Forward. No wrong-program silent estimate.
- Browser checks at 1920/1366/768/390/320: selector keyboard/focus, result announcements, static fallback, empty results, no overflow, no Tanya BSI overlap and no console errors.
- Run `npm test`, `npm run check`, `npm run build` for implementation; no changed legacy file or unrelated logic in the diff.

## 10. Audit delivery and verification

This pass adds only this report. No program, campus, fee, admissions, UI or assistant application file is changed. Browser work inspected official source tabs, not application responsiveness. Tests/build were not rerun because this is documentation-only research; no new runtime behavior is claimed validated. The implementation task remains separate, with field-specific evidence gates above.

TASK 11A AUDIT COMPLETE

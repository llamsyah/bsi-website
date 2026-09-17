# Website PMB UBSI Margonda

Astro static-first website with the migrated Home, Program Studi explorer,
Financial Cost Simulator, reusable admissions status and experimental Tanya BSI
assistant. Several detail routes remain unfinished.
Follow AGENTS.md and the project documents before feature migration.

## Run locally

Use Node.js 22.12+ (an even-numbered supported release) and npm.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

Astro source lives in `src/`; production output lives in `dist/`. Only `dist/` is
the future deployment artifact. Do not deploy the repository root. No deployment
has been configured or performed in this milestone.

## Legacy reference

The root `index.html` remains the original single-file prototype, unchanged.
Open that file directly in a browser when comparing legacy interactions. It is
not imported into Astro or copied into the production build. Do not replace it
with generated output or remove it until feature parity has been validated.

SHA-256 at the start of Milestone 1:
`E992088DD2408E295A98EE1C000262F684E7C39BB071BE541C8BEE3F99EED921`

## Architecture

- `src/pages/`: five real routes: `/`, `/program-studi`, `/biaya-beasiswa`, `/kampus`, `/pmb`.
- `src/layouts/BaseLayout.astro`: metadata, fonts, landmarks and shared shell.
- `src/components/`: shared navbar, footer, admissions status and Home sphere.
- `src/styles/`: design tokens, shared foundation and isolated Home styles.
- `src/scripts/`: mobile navigation and shared admissions current-date enhancement.
- `src/utils/`: pure admissions status calculation and calendar-date helpers.
- `src/config/navigation.ts`: shared internal navigation.
- `src/data/`: minimal shared facts, official PMB entry and verification metadata.
- `src/assistant/`: structured response contract, local service/resolver and safe
  message renderer; the optional panel lives in `src/components/assistant/`.

Mobile navigation progressively enhances visible links: with JavaScript disabled,
links remain available. With JavaScript enabled, the button supports Enter/Space,
Escape, focus leaving the menu, outside clicks, resizing and history restoration.

Every page has unique metadata and `noindex, nofollow` while this preview is incomplete.
Remove the preview notices and robots restriction only after content is ready.
Fonts preserve the prototype's Google Fonts loading and system fallbacks.

## Not migrated

Complete PMB guide, scholarship eligibility/application tools,
campus gallery/maps, news, Student Life, generative AI/backend and complex canvas animation.
Do not treat the development routes as feature completion.

See `src/data/README.md` for domain boundaries and deferred datasets.

## Task 07 — Tanya BSI experimental website assistant

Task 06 commit `3c93779` was verified in approved `origin/main` (`4eabc47`)
before creating `codex/task-07-ai-assistant`. This checkpoint adds an optional
floating utility to all five routes, without changing primary navigation or the
approved Home, Program Studi and calculator designs.

### Legacy audit and migration decisions

The original `#page-ai` is a fake SPA destination reached from the navbar, Home,
footer and floating guide. Its white chat shell, friendly greeting, suggested
questions, Enter/send interaction and page-local conversation informed this PoC.
The old two-column shell becomes one narrow native dialog, near-full-screen on
mobile, with explicit close/Escape and focus restoration.

Intentionally not migrated:

- `addMsg` assigns raw user text to `innerHTML`; the new renderer only creates
  DOM nodes and assigns `textContent` for messages, labels and source context.
- `getAIResponse` always returns the same disconnected-demo response. Fake
  random typing delays, thinking orb state and continuous canvas animation do
  not represent an actual service and have been removed from the migrated UI.
- Real-time/online/24-hour AI and broad career/accreditation capability claims,
  guide recommendations and unsupported scholarship counts are not retained.
- Nonfunctional history/upload/voice controls, automatic guide popups and the
  clickable-div entry point are replaced by a labelled secondary button.

The preserved prototype itself has not been edited.

### Capability and shared sources

The panel says **AI Assistant · Eksperimen** and explains that it uses limited
website information, with no generative AI or live PMB officer connection.
It answers one supported topic at a time:

- Programs, faculty membership and class availability: `src/data/programs.ts`.
- Current/upcoming/closed PMB status, seven wave schedules, class start and
  registration steps: `admissions.ts`, `getAdmissionsStatus` and calendar helpers.
  Each question gets the visitor device's current date converted to WIB; status
  is schedule-based, never a live capacity or eligibility determination.
- Semester tuition, program surcharge and SSP: `tuition.ts` and the existing
  `calculateTuition`, with the same initial-cost meaning as Task 06. Outside an
  active wave, an unqualified cost query gives semester tuition and asks users
  to choose a reference wave in the simulator; it never invents an active wave.
- General scholarship descriptions: `scholarships.ts`; no eligibility, award
  amount or automatic deduction from the calculator.
- Campus A/B addresses: `campus.ts`; the limited A facility preview:
  `facilities.ts`. No facility inventory is invented for Margonda B.
- Official registration destination: the existing shared `registration.url`.

Responses attach relevant routes, including `/biaya-beasiswa?program=<slug>`.
They do not duplicate fee formulas, program lists or temporal datasets.

### Architecture, safety and limitations

`Assistant.astro` + `assistant.ts` → `AssistantService` / `askAssistant` →
`resolveAssistant` → shared data and pure domain helpers.

`types.ts` defines `{ text, actions, sourceContext?, status }`, with explicit
answered/clarify/unsupported outcomes. The small async service in `service.ts`
is the future replacement point for a separately authorized backend. A future
API would need response validation, server-side secrets and error/timeout rules;
there is no API, fetch request, credential or new package in this implementation.

The resolver uses normalized words/phrases, not natural-language reasoning.
Unknown topics and unsupported claims fall back safely; ambiguous costs/classes
ask for a program. Paraphrases and multi-topic requests may not be understood.
There is no conversational entity memory: each question must name its subject.
Each input is limited to 500 characters. Answers cannot establish eligibility,
personal recommendations, installment plans, future intakes or live availability.

Messages are literal text; actions are limited to known site routes or the exact
official PMB URL. Conversation exists only in the current page DOM, survives
close/reopen, and resets on refresh or route navigation. No account, persistent
chat history, tracking profile or personal-data collection is added.

The labelled native modal moves focus to close, provides visible focus styles,
Escape and return to the trigger, and makes underlying page controls inert.
Messages use a polite live log. The entry stays hidden until its JavaScript and
native dialog support are ready; all core content and links remain independent.
There are no assistant animations. Mobile sizing follows the visual viewport so
the composer can fit above an on-screen keyboard.

**WhatsApp separation:** this website PoC is not connected to the separate
WhatsApp/n8n chatbot. No Evolution API, Redis, Postgres, WhatsApp messaging or
external LLM integration was added. Existing footer contact links are unchanged.

### Validation — 2026-09-17

- `npm test`: 93 passing tests (36 assistant, 57 existing). Assistant tests cover
  all programs and fee mappings, all SSP waves, class rules, admissions boundary
  states, addresses, facility scope, scholarships, ambiguity/fallback, the async
  service contract, URL restrictions and the actual safe message renderer.
- Astro check: 39 files, zero errors, warnings or hints. Production build:
  all five routes successful; no dependencies added.
- Production browser review: 1920×1080 and 1366×768 on Biaya & Beasiswa,
  768×1024 on Program Studi, 320×700 on Home, PMB and Kampus. Entry/opening was
  exercised on all five pages. No horizontal page or dialog overflow observed.
- Suggested prompts, Enter/send, empty-input rejection, repeated questions,
  scrolling older messages, close/reopen history, Escape and focus restoration
  passed. Native modal keyboard navigation excludes background page controls;
  browser chrome can still receive focus at the tab boundary.
- Informatika fee answer matched the rendered calculator; its action selected
  Informatika correctly. PMB dates, evening-class rules, campus navigation,
  scholarship links and same-page anchor closure were verified.
- HTML/script-like input produced literal text and zero injected image/script
  nodes. A 500-character unbroken input wrapped without overflow. No browser
  warning/error logs were observed.
- At 320×400 with focused input, the composer remained visible and messages
  scrolled. This is reduced-height browser testing, not a physical mobile
  keyboard or screen-reader certification. JavaScript-disabled behavior was
  inspected in static markup/styles, not simulated in the browser.
- Legacy SHA-256 still matches the baseline above. Shared datasets, existing
  domain engines, page files, navbar and footer were left unchanged.

## Task 06 — Financial Cost Simulator

`/biaya-beasiswa` now offers program/wave selection, immediate recalculation,
itemized costs, transparent SSP comparison, fee explanations, two scholarship
summaries and the handoff to `/pmb` or the shared official registration URL.

### Source boundaries and calculation contract

- `src/data/tuition.ts`: integer-rupiah fees, surcharge IDs, seven SSP values and
  period/evidence metadata. Factual authority: `CONTENT_DATA.md` §§19–23.
- `src/utils/tuition.ts`: pure `calculateTuition({ programId, waveId })`, exact
  slug resolution and date-dependent default selection. Invalid calculation IDs
  return `null`, never a price for a different program. No HTML or internal clock.
- `src/utils/currency.ts`: shared Indonesian rupiah formatter.
- `src/components/TuitionCalculator.astro`, `src/scripts/tuition-calculator.ts`
  and `src/styles/tuition.css`: static fallback, lightweight DOM enhancement and
  isolated responsive presentation. No framework or dependency added.
- `src/data/scholarships.ts`: general Talenta Digital / Indonesia Juara baseline
  from `CONTENT_DATA.md` §24; current conditions link to the official PMB entry.
- `tests/tuition.test.mjs`: calculation, scope, input, date and legacy checks.

Semester tuition = Rp3.980.000 + Rp1.000.000 only for Manajemen, Akuntansi,
Ilmu Komunikasi, Sistem Informasi, Teknologi Informasi and Informatika.
The other five verified S1 programs use the base rate.

Subtotal without SSP = Rp260.000 registration + Rp1.600.000 pre-college + one
semester tuition. **Estimasi komponen biaya awal** = that subtotal + full SSP
for the selected wave. This aggregate is neither an amount payable immediately
nor the complete cost of a degree. Installment timing is intentionally not
calculated, especially for Khusus where the official baseline needs context.
The comparison reports `row SSP − selected SSP`, not a scholarship or discount.

### Shared programs and admissions

All eleven choices come from `margondaPrograms`; names and IDs are not duplicated.
`?program=<slug>` is an exact shared-slug contract. Valid input preselects the
program; invalid input shows a fallback explanation and selects the first shared
program. Arbitrary query text is never inserted as HTML. Home's two obsolete
simulator-pending messages and the Program Studi cost notes were updated only
to reflect availability; their layout and interactions were preserved.

The existing `september2026`, `getAdmissionsStatus` and Jakarta date helpers
provide all wave labels, dates and current status. `AdmissionsStatus.astro` is
reused unchanged. No calendar is duplicated. An active wave is selected initially;
before opening / after closing, no wave is auto-selected. Visitors may explicitly
inspect any historical or future wave. Their selection never changes the displayed
current PMB status. Status refreshes at WIB midnight and on focus/history return;
an explicit wave choice is retained. The device clock is not a live PMB service.

### Legacy comparison and deliberate corrections

The legacy S1 arithmetic and separate SSP concept are preserved. Tests extract
the historical `tierData` literal without executing the legacy application and
compare RPL / Informatika / Manajemen across I, III and VI (nine scenarios):

| Scenario | Subtotal without SSP | Full SSP I / III / VI | New aggregate I / III / VI |
| --- | --- | --- | --- |
| RPL, old S1 Umum | Rp5.840.000 | Rp2.500.000 / Rp3.600.000 / Rp6.000.000 | Rp8.340.000 / Rp9.440.000 / Rp11.840.000 |
| Informatika and Manajemen, old S1 Khusus | Rp6.840.000 | same | Rp9.340.000 / Rp10.440.000 / Rp12.840.000 |

Program selection replaces ambiguous tier selection. Khusus is added using the
verified SSP, equal to VI. Removed from the new calculator: D3, Nursing, S2,
unsupported program paths, percentage urgency, seat availability claims and
"saving today" wording. No automatic free-SSP campaign, scholarship deduction,
payment schedule or lifetime projection is inferred. The legacy source is intact.

### Validation and limits — 2026-09-17

57 tests passed: 28 admissions, 11 programs and 18 calculator tests, including
all 77 program/wave combinations, exact surcharge membership, invalid inputs,
all valid slugs, invalid/missing slugs, every wave boundary, upcoming/closed
defaults, formatting and nine legacy scenarios. Astro check: 33 files, zero
errors/warnings/hints. Production build: five static routes.

Browser review covered 1920, 1366, 768 and 320 px. Controls/results stack below
896 px; all widths had no horizontal overflow, including the expanded comparison.
Checked RPL/Khusus, Informatika/I, Manajemen/VI, Psikologi/III, keyboard selection,
native Enter/Space disclosures, visible focus, program-to-calculator navigation
with Sistem Informasi, invalid query fallback, blank wave handling and the
scholarship anchor. Current Khusus status stayed separate from selected past waves.
Console warning/error log was empty. Upcoming/closed dates were tested in the
pure engine, not by changing the browser clock.

Generated HTML includes a labelled RPL/I example, all eleven semester tariffs,
all seven SSP values, explanations and scholarship links before client code runs.
Controls are hidden until enhancement is ready; native fee disclosures remain
usable without JavaScript. A separate JavaScript-disabled browser session and
full assistive-technology audit were not performed.

No live scholarship eligibility, installment calculation, payment or registration
submission is implemented. Values are the verified September 2026 baseline, not
a live tariff feed. No new research claims or automatic future intake are added.
Legacy SHA-256 matches the baseline above. Work is on
`codex/task-06-cost-simulator`, created from `origin/main` and fast-forwarded with
the completed Task 05 commits as dependencies. No commit, push or main merge
was performed for Task 06.

## Task 05 — Program Studi explorer

`/program-studi` renders an editorial index of the eleven verified Margonda S1
programs. Continuous rows show the name, official faculty and class availability;
native `details` / `summary` disclose the subject overview, verified accreditation
where available, and costs link. The degree is established once in the intro.
The list uses no card shadows and remains compact on mobile. Stable numbers
01–11 retain their original positions when filtered. A lighter discovery toolbar
leads into the index; expanded rows combine the overview and verified facts with
a contextual cost action on one continuous surface.

- `src/data/programs.ts` owns stable IDs/slugs, faculty mapping, class availability
  and provenance. The approved four-program Home sample is preserved.
- Offering, schedules and accreditation follow `CONTENT_DATA.md` §§8–13. All
  programs have day classes; only the verified three have evening classes. Friday /
  Saturday classes are not offered for this baseline. Only Sistem Informasi shows
  its verified program accreditation.
- Each `overviewSource` links an official UBSI page used for a concise general
  subject summary, checked 2026-09-16. These summaries do not establish a Margonda
  curriculum, career guarantee or additional campus offering.
- `src/utils/programSearch.ts` combines case-insensitive name matching with one
  faculty filter. Unknown filters safely fall back to all faculties, retaining
  the search query. No URL state or framework is required.
- `src/scripts/program-explorer.ts` enhances the static rows with result counts,
  an empty state and reset with focus returned to search. Native disclosures work
  without JavaScript; all program content is present in generated HTML. Search
  controls appear only after their listeners are ready.
- Each expanded row links to
  `/biaya-beasiswa?program=<program-slug>` using the dataset slug, encoded with
  `URLSearchParams`. Task 06 now validates and consumes this parameter to
  preselect the shared program in the simulator.
  The final three-step handoff highlights Biaya & Beasiswa after program discovery,
  followed by registration through the shared official PMB destination.
  The calculator references program IDs from this dataset without duplicating names.
  No calculator logic is included in the explorer.
- `tests/programs.test.mjs` covers the offering, faculty mapping, class rules,
  accreditation, search/filter combinations, empty results, invalid filters and
  preservation of the Home sample. Run together with admissions tests using `npm test`.

No legacy salary, unsupported certification, D3, S2, Nursing or other unverified
program data has been migrated. The legacy prototype remains unchanged.

Task 05 validation: all 39 tests passed (28 admissions + 11 programs), Astro check
reported zero errors/warnings/hints, and the production build generated all five
routes. Browser review at 1920, 1366, 768 and 320 px found no horizontal overflow.
All faculty filters, combined search, empty/reset state, native disclosures with
Enter/Space, focus indication, costs navigation and the Home teaser link passed.
Registration links resolve to the shared official PMB URL; the page console was
clear. Generated HTML retains all eleven descriptions and native disclosures
without client rendering; JavaScript-disabled browsing was not separately simulated.

The visual-flow refinement was also reviewed at all four widths: numbered rows,
expanded decision panels, discovery controls and the final handoff. At 320 px,
closed rows are approximately 101 px tall and the handoff becomes a vertical
sequence. All eleven contextual cost URLs retain the correct slug; navigation to
the existing costs placeholder was verified with `program=sistem-informasi`.
The same 39 tests, Astro check and production build passed after this refinement.

## Dependency compatibility

The foundation uses Astro 7.3.2, @astrojs/check 0.9.10 and TypeScript 6.0.3.
The checker declares TypeScript `^5.0.0 || ^6.0.0` compatibility; TypeScript 7
cannot be used with this checker. Exact versions and package-lock.json preserve
the compatible installation without bypassing peer dependency checks.

## Milestone 1 validation — 2026-09-16

Validated on Windows with Node 24.15.0 and npm 11.12.1:

- `npm run check`: 17 files, zero errors, warnings or hints.
- `npm run build`: successful static build of all five routes.
- Production preview: direct access and refresh of each route; unique titles
  and descriptions; correct active navigation; all five navbar links, footer
  Home link, and browser back/forward navigation.
- All registration links across all routes resolve to the centralized
  `https://pmbubsi.id/pmb` destination. External registration submission was
  not part of this validation.
- Mobile menu: Enter/Space, Escape with focus return, outside-click closure,
  and closed state after following a navigation link.
- All five routes: no horizontal overflow at 320, 768, 1366 and 1920 pixels.
  Additional 390-pixel mobile menu inspection completed.
- Keyboard skip link focuses main content; visible focus and semantic landmarks
  inspected. This is a baseline check, not a full accessibility audit.
- No warning/error console messages observed during browser validation.
- Legacy SHA-256 still matches the baseline above. Production output contains
  the new shell only; legacy routing, calculator and program logic are absent.

The check stalled inside the restricted execution sandbox and completed when
run with the required local process permissions; the build also passed with
those permissions. No application rewrite was required.

Milestone 1 is complete. The route content remains intentionally unfinished;
this result does not mean the full website is demo-ready.

## Task 03 — Admissions data and status

- `src/data/admissions.ts` exports the explicit `september2026` period with
  Margonda scope, intake, class start, official registration URL, seven waves,
  and evidence tied to the 2026-09-15 research baseline.
- `src/utils/admissionsStatus.ts` exports
  `getAdmissionsStatus(referenceDate, period)`. It has no internal clock and
  accepts strictly validated `YYYY-MM-DD` dates with inclusive boundaries.
  It returns period/wave states, active/next/previous waves, schedule availability,
  and relevant dates. A gap returns `upcoming` with no active wave and registration
  unavailable. After the final wave it returns `closed`, never a last-wave fallback.
- Empty, overlapping, reversed, unordered or duplicate-ID wave configurations
  and invalid dates throw `RangeError`; callers must not turn these into an
  open-registration claim. Future API consumers should handle such errors.
- `src/utils/calendarDate.ts` converts an explicitly supplied instant to the
  `Asia/Jakarta` business date. Formatting uses a fixed UTC container to preserve
  the calendar day; it never uses the visitor's local zone for comparisons.
- `/pmb` statically renders all seven date ranges, class start and official CTA.
  Its fallback makes no claim about today's status. The small
  `src/scripts/admissions-status.ts` enhancement calculates the current WIB status
  in the browser, refreshes at Jakarta midnight and on focus/visibility/history
  restoration. No status is frozen into the static build. The visitor's device
  clock supplies the instant; this is schedule information, not live capacity
  or confirmation of registration eligibility.
- Add a future verified period as a separate named `AdmissionsPeriod` export;
  preserve the 2026 history and update the intended page/client consumer together.
  Never extend the old closing date to imply a new period. Reuse the engine and
  add boundary tests for the new dataset. No later intake is currently inferred.

Run `npm test` for Node-native tests (no added dependency). Coverage includes all
17 required boundary dates, a future gap, invalid inputs/configuration, class
start during the special wave, WIB midnight transitions, and multiple visitor
timezones. Tests load TypeScript using Node's type stripping, supported by the
documented Node runtime with the explicit flag in the test command.

Task 03 validation on 2026-09-16: all 28 tests passed; Astro check inspected
20 files with zero errors/warnings/hints; the static build produced five routes.
The production preview rendered Gelombang Khusus for 16 September 2026 WIB.
The PMB page had no horizontal overflow at 320, 390, 768, 1366 and 1920 pixels;
mobile menu, Escape, skip-link focus, official CTA and console checks passed.
Inspection of built HTML with scripts excluded confirmed seven complete wave
ranges, class start and official CTA, with no build-time active-status claim.
The legacy SHA-256 still matches the Milestone 1 baseline.

## Task 04 — Visual parity and Home migration

Home now follows the legacy visual language: Manrope/JetBrains Mono typography,
blue-to-red hero gradient, original headline, sphere and floating badges, pill
navigation, dark-blue trust strip, red admissions banner, soft cards and footer.
`home.css` contains only Home-specific styles; shared patterns live in global.css
and tokens.css. No legacy CSS or JavaScript block was copied wholesale.

The hero sphere is a static SVG projection of the legacy point distribution.
Finite CSS movement replaces perpetual canvas rendering; the decoration is hidden
below 896px and all movement is disabled for reduced-motion preferences. No loader
or scroll-reveal code hides content while JavaScript or external assets load.

Home sections: Hero, Trust Proof, PMB Status, Program Studi Preview, Biaya & Beasiswa
Preview, Kenapa Margonda, PMB Journey, Campus Preview, native FAQ and Final CTA.
The preview copy explicitly states which detailed features are still being prepared.
News is deferred until usable Margonda-specific article URLs/assets are curated;
legacy stories about other campuses were not migrated.

`AdmissionsStatus.astro` is shared by Home and `/pmb`, using the unchanged Task 03
engine/client enhancement and the same September 2026 period. No second calendar
or build-time current status was introduced. A condensed verified admissions
journey was added separately from the date model.

`programs.ts` holds only the eleven verified S1 names and period/scope evidence.
Home uses a visual teaser anchored by the eleven-program count, four equal sample labels, and a link to Program Studi. No explorer,
salary estimates or program accreditation was added. `facilities.ts` holds a
limited Margonda A preview and the source URL of `public/images/margonda-a.png`,
the original official photo referenced by the prototype. The source image is
263×293px, so it is a small preview, not high-resolution photography. Margonda B
has its confirmed address and an honest documentation-pending message.

Validation: Astro check (24 files, zero errors/warnings/hints), production build
(five routes), and all 28 existing admissions tests passed. Legacy and Astro were
compared in separate browser tabs at laptop width. Home was checked at 320, 390,
768, 1024, 1366 and 1920px with no horizontal overflow; sphere reduction, card
stacking, loaded campus image, official CTAs, keyboard menu/Escape, skip link and
native FAQ were checked. Home and `/pmb` showed matching status and the browser
console had no warnings/errors. Reduced motion was checked in the CSS rules;
this was not a comprehensive assistive-technology audit. The legacy hash remains
unchanged. No commit or push was performed for Task 04.

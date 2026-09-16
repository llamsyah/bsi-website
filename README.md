# Website PMB UBSI Margonda

Astro static-first website with the migrated Home and reusable admissions status.
Program Explorer, calculator and several detail routes remain unfinished.
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

Mobile navigation progressively enhances visible links: with JavaScript disabled,
links remain available. With JavaScript enabled, the button supports Enter/Space,
Escape, focus leaving the menu, outside clicks, resizing and history restoration.

Every page has unique metadata and `noindex, nofollow` while this preview is incomplete.
Remove the preview notices and robots restriction only after content is ready.
Fonts preserve the prototype's Google Fonts loading and system fallbacks.

## Not migrated

Calculator and formulas, program explorer, complete PMB guide,
scholarships, campus gallery/maps, news, Student Life, AI and complex canvas animation.
Do not treat the development routes as feature completion.

See `src/data/README.md` for domain boundaries and deferred datasets.

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
Home's groups are editorial fields, not official faculty names. No explorer,
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

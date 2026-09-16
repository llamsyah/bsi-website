# Website PMB UBSI Margonda — Milestone 1

Astro static-first foundation. This is a development shell, not the completed PMB
website. Follow AGENTS.md and the project documents before feature migration.

## Run locally

Use Node.js 22.12+ (an even-numbered supported release) and npm.

```sh
npm ci
npm run dev
npm run check
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
- `src/components/`: shared navbar, footer and intentional development-state page.
- `src/styles/`: design tokens and foundation styles only.
- `src/scripts/mobile-navigation.ts`: the only client behavior.
- `src/config/navigation.ts`: shared internal navigation.
- `src/data/`: minimal shared facts, official PMB entry and verification metadata.

Mobile navigation progressively enhances visible links: with JavaScript disabled,
links remain available. With JavaScript enabled, the button supports Enter/Space,
Escape, focus leaving the menu, outside clicks, resizing and history restoration.

Every page has unique metadata and `noindex, nofollow` while this preview is incomplete.
Remove the preview notices and robots restriction only after content is ready.
Fonts preserve the prototype's Google Fonts loading and system fallbacks.

## Not migrated

Calculator and formulas, program explorer, full Home, admissions calendar,
scholarships, campus gallery/maps, news, Student Life, AI and decorative animation.
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

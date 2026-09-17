# Data domains

Use CONTENT_DATA.md as the factual authority. Evidence fields reference the local
baseline; they do not imply fresh verification of a live website.

Milestone 1 populates only shared institution, campus, admissions entry URL and
contact data. `verification.ts` allows source, scope, date, status and optional period.

Task 03 adds the explicit September 2026 admissions period and seven verified
waves. Status is derived by `src/utils/admissionsStatus.ts`, not stored as a
permanent current-wave value. See the root README for date/timezone conventions.

Task 04 adds name-only program previews, institution accreditation, a limited
Margonda A facility/photo preview, and the condensed verified admissions journey.
These do not imply complete feature datasets or any verified Margonda B facilities.

Task 05 expands `programs.ts` into the current Margonda explorer dataset, retaining
the same Home sample and stable identifiers. Faculty, class availability and
accreditation reference CONTENT_DATA.md; per-program official overview URLs support
only concise general subject descriptions, not campus-specific curriculum promises.
Task 06 tuition mapping references these IDs without duplicating program names.
`tuition.ts` owns integer-rupiah fees and SSP keyed by admissions wave IDs;
`scholarships.ts` owns two general scholarship summaries and baseline provenance.
Neither module determines live eligibility, capacity or installment schedules.

Create remaining domain modules when their consumers migrate, rather than export
empty arrays that might be mistaken for confirmed absence:

| Domain | Boundary / future module |
| --- | --- |
| institution | `institution.ts`: institution identity and accreditation; history deferred |
| campus | `campus.ts`: building identity and confirmed addresses |
| programs | `programs.ts`: eleven S1 programs, faculty, classes, concise sourced overviews, verified accreditation and campus/period scope; full profiles deferred |
| admissions | `admissions.ts`: official entry URL, September 2026 period, waves, Home journey, detailed PMB phases and verified requirement baseline; period-specific upload rules remain with official PMB |
| tuition | `tuition.ts`: fee components and SSP, separate from pure calculations |
| scholarships | `scholarships.ts`: verified general baseline; live eligibility and application rules deferred |
| certifications | `certifications.ts`: licensed LSP and verified scheme scope |
| facilities | `facilities.ts`: limited Margonda A preview and official photo provenance; full inventory deferred |
| contact | `contact.ts`: PMB contacts; omit unresolved service hours |
| news | `news.ts`: source, date and explicit campus/institution scope |

Do not import the legacy 24-program catalogue, salary fields, six-wave fallback,
scholarship counts or facility B placeholders. The older research report records
an address conflict for B; CONTENT_DATA.md resolves the current address through
PROJECT_CONFIRMED field verification.

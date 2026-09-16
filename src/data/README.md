# Data domains

Use CONTENT_DATA.md as the factual authority. Evidence fields reference the local
baseline; they do not imply fresh verification of a live website.

Milestone 1 populates only shared institution, campus, admissions entry URL and
contact data. `verification.ts` allows source, scope, date, status and optional period.

Create remaining domain modules when their consumers migrate, rather than export
empty arrays that might be mistaken for confirmed absence:

| Domain | Boundary / future module |
| --- | --- |
| institution | `institution.ts`: institution identity, later accreditation/history |
| campus | `campus.ts`: building identity and confirmed addresses |
| programs | `programs.ts`: campus/period offering, degree, faculty, classes |
| admissions | `admissions.ts`: official entry URL; later period/waves/status |
| tuition | `tuition.ts`: fee components and SSP, separate from pure calculations |
| scholarships | `scholarships.ts`: benefits, eligibility, active period and evidence |
| certifications | `certifications.ts`: licensed LSP and verified scheme scope |
| facilities | `facilities.ts`: building-specific inventory and real photo evidence |
| contact | `contact.ts`: PMB contacts; omit unresolved service hours |
| news | `news.ts`: source, date and explicit campus/institution scope |

Do not import the legacy 24-program catalogue, salary fields, six-wave fallback,
scholarship counts or facility B placeholders. The older research report records
an address conflict for B; CONTENT_DATA.md resolves the current address through
PROJECT_CONFIRMED field verification.

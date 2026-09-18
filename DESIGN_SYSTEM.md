# Design System — Website PMB Universitas BSI Margonda

## 1. Design Goal

Website harus terasa:

* modern,
* institusional,
* kredibel,
* jelas,
* ramah untuk calon mahasiswa,
* tidak kaku,
* tidak terlalu corporate,
* tidak terlalu startup/tech-heavy.

Visual harus mendukung tujuan PMB:

**membantu calon mahasiswa memahami informasi dan mengambil tindakan dengan mudah.**

Estetika tidak boleh mengorbankan:

* clarity,
* hierarchy,
* readability,
* responsiveness,
* accessibility,
* performance.

---

# 2. Brand Direction

Gunakan DNA utama UBSI:

**Blue + Red + White**

Blue berfungsi sebagai institutional anchor.

Red harus terasa lebih prominent dibanding prototype awal, sesuai direction stakeholder.

White tetap menjadi base utama agar website terasa:

* terang,
* edukatif,
* profesional,
* mudah dibaca.

Jangan menjadikan dark theme sebagai default visual direction.

---

# 3. Core Color Tokens

Baseline existing:

```css
--color-blue: #1B2F6E;
--color-blue-dark: #101B47;
--color-blue-secondary: #2F4FA8;

--color-red: #E0203D;
--color-red-dark: #A8112C;

--color-white: #FFFFFF;
```

Nilai final dapat disesuaikan sedikit untuk contrast/accessibility, tetapi jangan mengubah identity tanpa alasan.

---

# 4. Supporting Colors

Supporting accent dapat digunakan secara terbatas:

* amber,
* teal,
* violet,
* rose,
* sky.

Supporting color hanya membantu:

* category differentiation,
* badge,
* chart/status,
* visual grouping.

Jangan sampai supporting colors mengalahkan blue/red identity.

---

# 5. Color Hierarchy

Recommended hierarchy:

## Blue

Digunakan untuk:

* navigation anchor,
* headings,
* institutional identity,
* informational emphasis,
* links,
* structural section styling.

## Red

Digunakan untuk:

* primary CTA,
* active states,
* important status,
* deadlines,
* key highlight,
* strong visual accent.

## White / Neutral

Digunakan untuk:

* page background,
* card background,
* breathing room,
* content clarity.

---

# 6. Red Usage Principle

Stakeholder meminta penggunaan merah lebih terasa.

Interpretasinya:

**red should be more visible across the experience, but still controlled.**

Jangan hanya menambah merah di Hero.

Red harus muncul konsisten pada:

* CTA utama,
* active navigation,
* badge/status,
* underline/accent,
* selected filter,
* section emphasis,
* icon accents,
* final CTA,
* admissions urgency.

Tetapi jangan membuat semua section background merah.

---

# 7. Recommended Visual Balance

Target visual balance:

* White / neutral dominates layout.
* Blue provides structure and institutional identity.
* Red provides energy and action.

Konsepnya bukan:

`blue website with one red button`

dan bukan:

`red website with blue decoration`

Tetapi:

**balanced UBSI identity with clearer red action language.**

---

# 8. Background Strategy

Use mostly light surfaces.

Possible hierarchy:

* white main background,
* subtle blue-tinted section background,
* occasional soft red-tinted section,
* dark blue for strong contrast section/footer if needed.

Avoid:

* excessive gradients,
* full-page dark background,
* every section having different background color.

---

# 9. Gradient Policy

Gradient boleh digunakan untuk:

* hero,
* accent surfaces,
* CTA highlight,
* visual decoration.

Gunakan restrained gradient.

Avoid:

* rainbow gradient,
* overly saturated gradient,
* gradient text everywhere.

---

# 10. Typography Direction

Typography harus terasa:

* modern,
* readable,
* professional,
* friendly.

Prioritas:

readability > decorative uniqueness.

Gunakan font family yang konsisten.

Batasi jumlah font.

Ideal:

* one primary sans-serif,
* optional second display accent only if justified.

---

# 11. Type Hierarchy

Recommended conceptual scale:

## Display / Hero

Untuk headline utama.

Karakter:

* bold,
* compact,
* high-impact.

## H1

Page title.

## H2

Major section title.

## H3

Subsection/card group title.

## Body Large

Lead paragraph.

## Body

Main content.

## Small

Meta, supporting notes, disclaimer.

---

# 12. Typography Rules

Avoid:

* terlalu banyak font size random,
* uppercase paragraph panjang,
* low contrast text,
* excessive letter-spacing.

Use:

* readable line-height,
* sensible paragraph width,
* strong contrast,
* hierarchy through size/weight/spacing.

---

# 13. Heading Tone

Heading copy harus:

* direct,
* understandable,
* benefit-oriented where useful.

Avoid generic AI-style heading seperti:

* “Unlock Your Future”
* “Empowering Tomorrow”
* “Transform Your Journey”

Prefer context-specific wording.

Example:

**Temukan Program Studi yang Sesuai**

lebih baik daripada:

**Unlock Your Potential**

---

# 14. Layout System

Gunakan consistent container width.

Recommended conceptual:

* central max-width container,
* responsive horizontal padding,
* generous section spacing.

Avoid section content touching viewport edge.

---

# 15. Section Rhythm

Setiap section harus punya rhythm konsisten:

1. eyebrow optional
2. heading
3. supporting copy
4. main content
5. CTA optional

Tidak semua section harus punya semua elemen.

---

# 16. Spacing

Gunakan spacing scale yang konsisten.

Contoh conceptual:

* xs
* sm
* md
* lg
* xl
* 2xl

Jangan menggunakan arbitrary spacing berbeda pada setiap section.

---

# 17. Card System

Cards dipakai jika content memang memiliki unit informasi terpisah.

Typical cards:

* program card,
* scholarship card,
* facility card,
* news card,
* trust card.

Cards should share:

* border radius,
* shadow language,
* internal padding,
* hover behavior.

---

# 18. Card Visual Rule

Avoid:

* heavy shadow,
* glass effect berlebihan,
* multiple nested cards,
* decorative border random.

Prefer:

* subtle elevation,
* clear border,
* restrained hover.

---

# 19. Border Radius

Gunakan consistent radius family.

Example conceptual:

* small: controls/badges
* medium: cards
* large: hero/media panel

Jangan setiap component punya radius sendiri.

---

# 20. Shadows

Current website already uses shadows.

Preserve soft, modern shadow language.

Use shadow to communicate elevation, not decoration.

Avoid very dark or blurry giant shadows.

---

# 21. Button System

At minimum:

## Primary Button

Red.

Use for:

* Daftar Sekarang,
* important conversion action.

## Secondary Button

Blue or neutral outline.

Use for:

* Lihat Program Studi,
* Lihat Panduan,
* Explore detail.

## Tertiary / Text Link

Low emphasis.

Use for:

* brochure,
* supporting navigation,
* source links.

---

# 22. Button Rules

Buttons need:

* visible hover,
* visible focus,
* clear disabled state if applicable,
* sufficient touch area,
* concise copy.

Avoid multiple equal-emphasis buttons in one small area.

---

# 23. CTA Hierarchy

Within one section:

Maximum one primary CTA.

Secondary actions can exist but must be visually lower priority.

Example Hero:

Primary:

`Daftar Sekarang`

Secondary:

`Lihat Program Studi`

Tertiary:

`Download E-Brosur`

---

# 24. Navigation Design

Navbar should feel institutional and simple.

Desktop:

* logo/identity left,
* navigation center/right,
* red registration CTA.

Active route:

visible but not overly loud.

---

# 25. Mobile Navigation

Mobile nav should prioritize usability.

Requirements:

* clear menu toggle,
* large touch targets,
* active page visible,
* registration CTA still prominent,
* no cramped horizontal nav.

---

# 26. Hero Design

Preserve existing hero concept where possible.

Hero should communicate:

* UBSI Margonda identity,
* value,
* primary action.

Decorative visuals are secondary.

---

# 27. Hero Content Priority

Order:

1. trust/context
2. main headline
3. supporting copy
4. primary/secondary CTA
5. small proof points
6. decoration

On mobile, decoration may be moved lower or reduced.

---

# 28. Hero Decorative Visual

Existing canvas/sphere concept may stay.

But it must not:

* cover text,
* reduce contrast,
* dominate on mobile,
* cause performance issues.

---

# 29. Trust Proof Design

Trust proof should feel credible, not like vanity metrics.

Prefer:

* accreditation,
* current program availability,
* official identity.

Avoid crowding section with many numbers.

---

# 30. Admissions Status Design

PMB status must feel visible.

Can use:

* red accent,
* status badge,
* deadline indicator.

But urgency must reflect factual state.

Do not manufacture countdown pressure.

---

# 31. Program Card Design

Program card should prioritize:

1. program name
2. degree
3. faculty/field
4. class availability
5. short description
6. CTA

Avoid placing unverified salary as visual highlight.

---

# 32. Program Filter Design

Filter should:

* be visually simple,
* clearly show selected state,
* remain usable on mobile,
* not overwhelm user.

Selected state can use red/blue emphasis.

---

# 33. Cost Calculator Design

Calculator should feel like a serious decision tool.

Prioritize:

* clarity,
* step progression,
* cost breakdown,
* total,
* explanatory notes.

Avoid making it look like a flashy tech demo.

---

# 34. Calculator Visual Hierarchy

Recommended:

1. user selection
2. cost breakdown
3. estimated total
4. comparison
5. disclaimer/source context

Total should be visually prominent but not sensationalized.

---

# 35. Scholarship Design

Scholarship cards should distinguish:

* name,
* benefit,
* target,
* status.

Do not display scholarships as active if status is unclear.

---

# 36. Campus Design

Campus section should use strong real photography.

Especially for:

* exterior,
* classroom,
* lab,
* library,
* student areas.

Real image > decorative illustration.

---

# 37. Margonda B Visual Direction

Because Margonda B is new, original documentation should be treated as a major asset.

Photos should feel:

* clean,
* documentary,
* authentic,
* consistent.

Avoid heavy filters.

---

# 38. Campus Photo Coverage

Recommended shot categories:

* exterior,
* entrance,
* signage,
* lobby,
* classroom,
* laboratory,
* library/study area,
* common area,
* prayer space,
* parking/access,
* corridor/interior atmosphere.

Only include spaces actually documented.

---

# 39. Image Treatment

Use consistent:

* aspect ratio,
* corner radius,
* crop logic.

Avoid extreme image crops that make facilities misleading.

---

# 40. News Design

News should feel secondary.

Use:

* image,
* category,
* date,
* title,
* short excerpt.

Campus scope may be displayed as badge.

---

# 41. FAQ Design

Use accordion or clear Q&A list.

Questions should be visually easy to scan.

Do not animate excessively.

---

# 42. Final CTA

Final CTA should strongly close the user journey.

Recommended visual:

* stronger blue/red contrast,
* concise copy,
* one primary registration action.

Do not add many competing links.

---

# 43. Footer Design

Footer can use dark blue for contrast.

Possible content:

* UBSI Margonda identity,
* navigation,
* official PMB link,
* verified contact,
* campus addresses,
* legal/source links if relevant.

Red can appear as small accent.

---

# 44. Iconography

Use one consistent icon style.

Avoid mixing:

* filled cartoon icon,
* thin outline icon,
* emoji,
* random SVG styles.

Icons support content, not replace labels.

---

# 45. Badges

Badges useful for:

* degree,
* active PMB,
* class availability,
* accreditation,
* category.

Keep badge visual lightweight.

---

# 46. Status Colors

Do not rely solely on color.

Status should include text.

Example:

`Pendaftaran Dibuka`

not just green dot.

---

# 47. Motion

Motion should reinforce hierarchy.

Allowed:

* soft entrance,
* hover,
* subtle counters,
* decorative hero motion.

Avoid:

* bounce everywhere,
* large parallax,
* scroll hijacking,
* constant card movement.

---

# 48. Performance-aware Motion

Mobile can receive less animation than desktop.

This is intentional design adaptation, not visual degradation.

---

# 49. Accessibility

Minimum visual accessibility:

* sufficient contrast,
* visible focus,
* readable text size,
* touch-friendly controls,
* no information communicated by color alone.

---

# 50. Responsive Principle

Responsive design is not desktop squeezed smaller.

Each breakpoint should preserve content priority.

On smaller screens:

* reduce decoration,
* stack content,
* simplify layout,
* preserve CTA visibility.

---

# 51. Mobile Priority

Mobile hierarchy:

1. identity
2. headline
3. essential information
4. CTA
5. supporting proof
6. decoration

Do not force desktop visual complexity onto mobile.

---

# 52. Tablet

Tablet should not simply inherit either mobile or desktop if layout becomes awkward.

Cards and grid may use intermediate column counts.

---

# 53. Content Width

Long text should have controlled width.

Avoid full-screen paragraph lines.

This is especially important for:

* About,
* PMB instructions,
* FAQ answer,
* disclaimers.

---

# 54. Copy Length

Cards:

short.

Sections:

moderate.

Full detailed explanations:

detail page.

Do not copy entire research paragraphs into UI.

---

# 55. Data Transparency

For time-sensitive content, small contextual text may show:

* period,
* update context,
* disclaimer.

Example:

`Biaya berdasarkan PMB September 2026.`

This increases credibility.

---

# 56. Disclaimer Styling

Disclaimers should be:

* visible,
* readable,
* lower emphasis,
* not hidden in extremely small gray text.

---

# 57. Design Consistency Rule

When adding new component:

first check whether an existing:

* card,
* button,
* heading,
* badge,
* layout

can be reused.

Do not create new visual vocabulary unnecessarily.

---

# 58. Existing Visual Preservation

During refactor:

preserve design elements that already work.

Do not restyle everything merely because architecture changes.

Architecture refactor and visual redesign are separate decisions.

---

# 59. Visual Refactor Priority

Order:

1. preserve
2. normalize
3. improve inconsistency
4. adjust red/blue balance
5. polish

Not:

1. redesign everything.

---

# 60. No Dark Default

Do not convert the website into a dark theme by default.

Reason:

The main experience is institutional and information-heavy.

Light surfaces provide better baseline readability and fit current design direction.

Dark section may still be used strategically.

---

# 61. No Tech Startup Overload

Avoid design language that makes UBSI look like a SaaS/AI startup.

Examples to avoid:

* neon cyberpunk,
* terminal visuals,
* excessive glassmorphism,
* AI orb everywhere,
* glowing cards everywhere.

Digital/modern does not require sci-fi aesthetics.

---

# 62. Visual Personality

Desired personality:

**credible + modern + energetic + student-friendly**

Not:

* bureaucratic,
* childish,
* futuristic gimmick,
* luxury brand.

---

# 63. Content Before Decoration

If a section feels weak:

check content hierarchy before adding more effects.

Do not solve unclear content with:

* more gradients,
* bigger animation,
* more badges.

---

# 64. Stakeholder Color Direction

Stakeholder feedback requesting more red must be respected.

Implementation should demonstrate red integration across the full system, not only one section.

But any change must preserve:

* readability,
* consistency,
* accessibility,
* hierarchy.

---

# 65. Design Validation Checklist

Before considering a page visually complete:

Check:

* Is the main purpose visible quickly?
* Is there one obvious primary action?
* Does red appear intentionally?
* Does blue still anchor the identity?
* Is text readable?
* Are cards consistent?
* Are real photos prioritized?
* Does mobile preserve hierarchy?
* Are decorative elements supporting rather than competing?
* Does the page still feel like UBSI Margonda rather than generic template?

---

# 66. Final Design Principle

The website should not impress because it has the most effects.

It should impress because:

* information is easy to understand,
* the journey feels intentional,
* branding feels consistent,
* interactions feel useful,
* real campus content creates trust,
* design supports decision-making.

Design priority:

**clarity → trust → action → polish**


## Task 14 — Cross-site composition (18 September 2026)

`src/styles/composition.css` layers scoped composition roles over existing page
styles, without replacing functional component styling:

- Anchors retain their identity: photography, explorer, calculator, status, editorial.
- Content uses `--rhythm-content` and `--heading-section` for controlled spacing.
- `heading-overview` centers bounded introductions above balanced content. On phones
  these become left-aligned except the intentional Campus academic comparison.
- `heading-utility` provides a smaller heading above functional content.
- `journey-bridge` uses restrained spacing, a separator and pale surface rather
  than another large campaign. Red emphasizes conversion; blue/neutral buttons
  lead deeper into the journey; descriptive text links support exploration.
- Academic routes share compact introductions and underlined degree navigation.

Apply these roles selectively. Home ends with one PMB/conversion anchor. Campus
presents 11 S1 and 2 Magister together, with four faculties explicitly scoped to
S1. No global heading replacement, new dependencies or new JavaScript.

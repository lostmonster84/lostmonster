# Quality Debts

> Maintained by The Gaffer. Open items that need attention.

---

## Open Debts

- **"2-4 weeks" references in .ai/ brand docs** (flagged 2026-04-03)
  ~60 references to "2-4 weeks" remain in .ai/ brand docs, worker playbooks, and design system. Production pages fixed but docs still contain the old timeline claim. Need to update the canonical metrics set (was: 50+, 70%, 4.9/5, 2-4 wks. New: 17, 5 live, 80/100, 4.9/5).
  Affected: `.ai/brand/`, `.ai/crew/`, `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, `website/CLAUDE.md`

<!-- Format:
- **Brief title** (flagged YYYY-MM-DD)
  What happened. What needs to be done.
  Affected: areas/pages/components.
-->

- **Content pages don't match Bold Personal Brand** (flagged 2026-03-25)
  Homepage uses dark gradients, glassmorphism, dynamic 5-colour theming. All content pages (services, about, process, FAQ, case studies) use plain white backgrounds with default markdown prose styling. Feels like two different sites.
  Affected: `/services`, `/services/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/about`, `/process`, `/faq`

- **No CTA at bottom of content pages** (flagged 2026-03-25)
  Case studies and service pages end abruptly without a "Start Your Project" call-to-action. Visitor reads the whole page, gets excited, then has nowhere to go except scroll back up.
  Affected: `/services/[slug]`, `/case-studies/[slug]`, `/process`

- **Case study listing shows raw HTML in previews** (flagged 2026-03-25)
  `substring(0, 300)` on `contentHtml` truncates mid-tag. Should strip HTML tags before truncating for cleaner card previews.
  Affected: `/case-studies` (listing page)

- **Stale venture briefs in website/projects/** (flagged 2026-05-14)
  The `/portfolio` scan found the Lost Monster website briefs contradict current repo reality. StayFlo brief calls it an "AI-powered guest handbook SaaS" — it is now a full multi-tenant white-label platform. WildTrax brief describes the pre-pivot fleet-operations business and a stale "75% complete" — misses the April 2026 marketplace pivot. Barkko brief says "ready for launch" but the repo is ~3 months cold. Rewrite all three from the `.ai/portfolio/` OVERVIEWs.
  Affected: `website/projects/stayflo.md`, `website/projects/wildtrax.md`, `website/projects/barkko.md`

## Resolved

<!-- Move items here when addressed. Keep for calibration reference.
- **Brief title** (flagged YYYY-MM-DD, resolved YYYY-MM-DD)
  What was done to resolve it.
-->

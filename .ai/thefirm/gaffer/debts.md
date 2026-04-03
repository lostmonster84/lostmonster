# Quality Debts

> Maintained by The Gaffer. Open items that need attention.

---

## Open Debts

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

## Resolved

<!-- Move items here when addressed. Keep for calibration reference.
- **Brief title** (flagged YYYY-MM-DD, resolved YYYY-MM-DD)
  What was done to resolve it.
-->

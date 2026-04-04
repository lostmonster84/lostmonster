# Session Context -- 2026-04-04

## What Shipped
- `firm-health.sh` added to thefirm repo: 14-check framework integrity validator
- Two parsing bugs found and fixed (TRAINX false positive, PLANX-SEO-GEO filename collision)
- Full Firm system audit completed -- comprehensive inventory of all 31 workers, drift analysis

## Design Decisions Made
- Health check lives in thefirm repo root (alongside setup.sh and update.sh), not in .ai/thefirm/
- Dual-mode detection: auto-detects master vs project based on whether CWD matches script location
- `extract_roster_workers` filters PROTOCOL.md by requiring `crew/` in the line (prevents false positives from non-roster bold references)
- Filename extraction uses first-lowercase-char boundary (not first-X-hyphen) to handle compound codes like PLANX-SEO-GEO

## Rejected Alternatives
- grep -P (Perl regex) -- not available on macOS default grep. Rewrote all patterns with sed
- Single `extract_bold_workers` for all files -- too broad for PROTOCOL.md, picks up non-roster references

## In-Progress Work
- None -- session was complete

## Deferred to Next Session
- Fix the 53 warnings the health check surfaced (orphan workers, scoring matrix gaps, supplement sections)
- Homepage hero Round 5 scoring still pending (carried from 2026-04-03b)
- ~60 "2-4 weeks" references in .ai/ brand docs still need sweeping
- PROTOCOL.md has local uncommitted change (Universal Copy Rules section removed) -- unclear origin, needs investigation

## Pick Up From Here
1. Fix framework drift: add SHOWX, WORDX, MIGRX, WIREX to PROTOCOL.md roster and scoring matrix
2. Add ## Supplements section to the 29 master playbooks that are missing it
3. Score Round 5 hero variations, pick winner, implement on production homepage
4. Sweep .ai/ brand docs for "2-4 weeks" references

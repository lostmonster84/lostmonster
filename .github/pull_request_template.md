<!--
PR template. The forensic block at the bottom is non-optional.

Why: when this PR is squash-merged, GitHub strips per-commit forensic blocks
from the merge commit. The block here gets pasted into the squash commit
message so the archaeology trail survives.

To populate: run `pnpm exec tsx scripts/forensic-log.ts $(git merge-base HEAD main) HEAD`
on your branch, copy the output into the block below, and fill the Verified
and Deferred fields with what you actually tested vs what you skipped.
-->

## Summary

<!-- 1-3 bullets on what changed and why. The "why" matters more than the "what". -->

-

## Test plan

<!-- Bulleted markdown checklist. What did you actually run? -->

- [ ]
- [ ]

## Forensic block

<!--
Generate via: pnpm exec tsx scripts/forensic-log.ts $(git merge-base HEAD main) HEAD
Replace this whole fenced block with the output, then fill Verified + Deferred.
"NONE" is a valid honest answer. <TODO:...> placeholders WILL be rejected by
the commit-msg hook on the squash merge.
-->

```
--- Forensic Block ---
Subsystems:   <auto>
Files:        <auto>
Risk surface: <auto>
Verified:     <what was tested LIVE on real input>
Deferred:     <what was NOT verified end-to-end>
--- /Forensic Block ---
```

---

When merging, paste the forensic block (above, without the surrounding markdown
fence) into the squash commit message between the summary and the
`Co-Authored-By:` trailer. The commit-msg hook validates it on merge.

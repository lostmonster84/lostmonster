# devstart Evolution Log

> How this skill learns and improves over time.

---

### Learned Rules

- **2026-04-20**: `tail -f` must use `-n +1` to read from the start of the output file. The background Bash fills the file before Monitor arms, so `Ready in` and `Local:` lines are written before `tail -f` attaches. Default `tail -f` starts at EOF and misses them. Without this flag, the Monitor silently times out even when the dev is live in under 2 seconds.
- **2026-04-20**: `next/image` "Invalid src prop" errors (hostname not in `remotePatterns`) match the `⨯ Error` pattern but are not fatal. Add `| grep -v -E "Invalid src prop|next-image-unconfigured-host"` to the monitor filter to suppress them.
- **2026-04-20**: Dedup identical monitor lines with `awk '!seen[$0]++ { print; fflush() }'`. `fflush()` keeps output line-buffered without `stdbuf` (which isn't available on macOS by default). Prevents the same runtime error producing N notifications.
- **2026-04-20**: `turbo dev` (and likely other monorepo wrappers) spawns a detached child process. When the Bash task wrapper receives any signal, the wrapper exits but the Next.js child survives and keeps the port. This surfaces as a "completed" task notification even though the dev server is still live. Don't interpret task-completion as dev-died; always verify via `lsof -iTCP:<PORT>`.
- **2026-04-24**: When verifying post-exit that the server is alive, a narrow `lsof -iTCP:<PORT> -sTCP:LISTEN` can return empty transiently even while the port is bound (observed during Next.js ready handshake). A broader `lsof -iTCP -sTCP:LISTEN | grep node` is a more reliable second check before concluding the server died. Don't panic-report death on a single empty lsof.
- **2026-04-25**: Never add `> /tmp/somefile.log 2>&1` to the `pnpm dev` command when launching via Bash `run_in_background`. The harness already redirects to its own task output file, and the Monitor is armed to tail THAT file. Adding your own redirect sends output to the wrong place and the Monitor sees nothing. Just run `pnpm dev` bare; the harness handles capture.

---

<!-- Run retrospectives go below, newest first. -->

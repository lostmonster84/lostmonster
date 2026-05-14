---
name: devstart
description: Start the dev server with bulletproof startup monitoring. Kills stale processes, launches in background, watches for compile errors and runtime issues, reports the URL when ready. One command, cold to clickable.
argument-hint: "[port] - optional, defaults to project's configured port"
---

You are the **Dev Server Launcher**. Your job: get `pnpm dev` (or equivalent) running on the target port, catch any startup issues, and report the URL when it's live. Keep tailing for runtime errors until the user moves on.

## Setup

**Evolution log**: Read `.claude/skills/devstart/evolution.md` on every invocation. Check **Learned Rules** first.

**Port resolution**: Use the user's argument if provided (`/devstart 3000`). Otherwise read the project's configured port from `package.json` dev script, or default to 4000 if the project doesn't pin one. Never hardcode - always resolve.

## Protocol

Run steps 1-4 in order. Do not skip pre-flight.

---

### Step 1: Pre-flight

**1a. Verify project root.** Confirm `package.json` exists in the current working directory and has a `dev` script:
```bash
test -f package.json && grep -q '"dev"' package.json && echo OK || echo MISSING
```
If missing → stop, tell the user you can't find a dev script in this directory.

**1b. Check if port is already occupied.** Identify what's holding it:
```bash
lsof -nP -iTCP:${PORT} -sTCP:LISTEN -Fpcn 2>/dev/null || echo FREE
```
The `-F` output gives `p<pid>`, `c<command>`, `n<addr>` lines. Parse to get PID and command name.

**1c. Decide how to clear the port:**

| Occupier | Action |
|----------|--------|
| **FREE** | Proceed to Step 2 |
| `node` / `next-server` / `next` / `vite` / `webpack` | Assume a stale dev server. Kill it: `kill -9 <PID>` |
| Anything else (e.g. `Code`, `Chrome`, `Docker`) | **STOP.** Show the user what's running and ask before killing |

After kill, verify with `lsof -nP -iTCP:${PORT} -sTCP:LISTEN 2>/dev/null | wc -l` - should be 0. If not, wait 500ms and re-check once. If still occupied, report and stop.

---

### Step 2: Launch

Start `pnpm dev` (or `npm run dev` / `yarn dev` - match the project's package manager) in the background via Bash (`run_in_background: true`). Capture the task ID and output file path from the tool response - you need both.

If the user requested a non-default port, prefix with `PORT=<port>`:
```
PORT=3000 pnpm dev
```

Otherwise run the command as-is - the project's dev script should handle its own port defaults.

---

### Step 3: Monitor startup

Immediately arm a Monitor on the output file. This is the critical piece - the filter must cover **success, startup failure, and runtime error signatures**, but NOT spam the user with image 404s or hot-reload noise.

**Monitor command (copy the shape, substitute the output path from Step 2):**

```bash
tail -n +1 -f <OUTPUT_PATH> | grep -E --line-buffered "Ready in|Local:|started server|EADDRINUSE|Failed to compile|Module not found|Type error|SyntaxError|Unhandled|UnhandledPromise|⨯ Error|FATAL|address already in use" | grep -v --line-buffered -E "Invalid src prop|next-image-unconfigured-host" | awk '!seen[$0]++ { print; fflush() }'
```

**Critical flags:**
- `-n +1` - reads from the first line, not just new output. Without this, `tail -f` starts at end of file and misses `Ready in` / `Local:` lines that were written before the Monitor armed. This is a race condition that shows up on fast builds.
- Second `grep -v` - strips `next/image` hostname warnings. They hit the `⨯ Error` pattern but aren't fatal. The first `grep -E` catches real errors; the inverse grep lets this specific noise source through the net.
- `awk '!seen[$0]++ { print; fflush() }'` - dedups identical lines (a runtime error firing 20 times becomes 1 notification). `fflush()` keeps the pipe line-buffered so awk emits each unique line immediately, not when its buffer fills. Pure POSIX - no `stdbuf` dependency (important for macOS).

**Monitor config:**
- `timeout_ms`: 3600000 (1 hour - covers typical dev session. Runtime errors after that window won't fire; user re-arms by running `/devstart` again)
- `persistent`: false
- `description`: `"dev server on port <PORT>"`

**Why this filter:**
- `Ready in`, `Local:`, `started server` - success signatures across Next.js, Turbopack, Vite
- `EADDRINUSE`, `address already in use` - port conflict (pre-flight should catch, but belt-and-braces)
- `Failed to compile`, `Module not found`, `Type error`, `SyntaxError` - build failures
- `⨯ Error`, `Unhandled`, `UnhandledPromise`, `FATAL` - runtime errors bubbling to stderr
- NOT included: `next/image` hostname warnings, image 404s, `warn`, info logs, hot-reload noise

**If no events within 60 seconds**, something is wrong (hung compile). Surface that to the user: "Still compiling after 60s - check output manually?" and read the output file to diagnose.

---

### Step 4: Report

When the Monitor emits `Ready in` or `Local:`, respond with ONE line:

```
Dev live at http://localhost:<PORT> in <Xms>.
```

Do NOT auto-open the browser. The URL is clickable in the terminal; the user may already have a browser tab open.

**If a startup error fires instead** (compile failure, port conflict, etc.):
1. Show the exact error line from the Monitor event
2. If it's a known pattern, suggest the fix (see table below)
3. Do NOT retry automatically - let the user decide

**After success**, the Monitor continues tailing for runtime errors until its 1-hour timeout. If any fire, surface them to the user as they happen. Don't editorialise - just show the line and where it came from.

## Known error patterns

| Error signature | Likely cause | Suggested fix |
|-----------------|--------------|---------------|
| `EADDRINUSE :::<PORT>` | Port still occupied after kill | Run `lsof -iTCP:<PORT> -sTCP:LISTEN` to identify. Pre-flight missed it |
| `Module not found: Can't resolve '@<scope>/...'` | Workspace package not built or stale symlink | `pnpm install` at the repo root |
| `Type error:` (build-time) | TS error surfaced by Next (strict mode) | Show the file:line, offer to inspect |
| `hostname "X" is not configured` (next/image) | Missing `remotePatterns` entry | Not a fatal error - filter excludes. If user complains about broken images, add the host to `next.config.mjs` |
| `ECONNREFUSED` to DB/Redis | Missing env vars | Suggest `railway run pnpm dev` for env injection (or equivalent env loader for the project's hosting) |

## Do not

- **Do not** run `pnpm dev` synchronously. It never exits; you'll hang the conversation.
- **Do not** auto-open the browser. The user decides.
- **Do not** kill processes the user didn't authorise. Only dev-server-like processes on the target port are auto-killed.
- **Do not** retry on failure. Report, let the user act.
- **Do not** narrate every step. Launch → Monitor armed → Result. Three beats, done.

## Self-Learn (MANDATORY)

After every `/devstart` invocation, follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.

Log to `.claude/skills/devstart/evolution.md`. Focus on:
- **Caught:** Port conflicts resolved cleanly, startup errors surfaced early, runtime errors tailed to user
- **Missed:** New error signatures that slipped through the filter; hung compiles; processes we should've killed but didn't
- **Friction:** Slow startup, noisy filter, unnecessary prompts

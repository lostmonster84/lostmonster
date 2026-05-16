#!/bin/bash

# firm-risk-scan.sh - Pre-commit risk scanner for The Firm.
#
# What it does: takes the files you're about to commit and checks if those
# same files caused problems in past sessions. If they did, prints a warning
# so you (and any reviewer) know to give the diff extra scrutiny.
#
# What it scans:
#   - .ai/thefirm/gaffer/session-log.md  — "Issues found:" entries
#   - .ai/thefirm/gaffer/debts.md         — Open Debts
#
# v4.6.2 behaviour: SOFT WARN ONLY.
#   - Always exits 0 (never blocks a commit)
#   - Just prints findings to stdout so they're visible during commit
#   - Once we know the false-positive rate, v4.7 may tighten to hard-block
#     when 3+ past incidents touch the same file
#
# Called by: .githooks/pre-commit (registered via scripts/install-hooks.sh
# which sets core.hooksPath = .githooks).
# Also callable directly: bash .githooks/firm-risk-scan.sh

set -u  # nounset, but not -e — we don't want greps with no matches to halt

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$REPO_ROOT" ]; then
    # Not in a git repo — nothing to do
    exit 0
fi
cd "$REPO_ROOT"

SESSION_LOG=".ai/thefirm/gaffer/session-log.md"
DEBTS_FILE=".ai/thefirm/gaffer/debts.md"

# If neither knowledge file exists, this project hasn't onboarded The Firm
# yet — silent no-op.
if [ ! -f "$SESSION_LOG" ] && [ ! -f "$DEBTS_FILE" ]; then
    exit 0
fi

# Colours (only if stdout is a terminal)
if [ -t 1 ]; then
    YELLOW='\033[1;33m'
    DIM='\033[2m'
    BOLD='\033[1m'
    NC='\033[0m'
else
    YELLOW=''
    DIM=''
    BOLD=''
    NC=''
fi

# Get the list of staged files. Fall back to "modified" if nothing staged
# (so the script is useful when called directly mid-work, not just at commit).
STAGED="$(git diff --cached --name-only 2>/dev/null)"
if [ -z "$STAGED" ]; then
    STAGED="$(git diff --name-only 2>/dev/null)"
fi
if [ -z "$STAGED" ]; then
    # Nothing changed — nothing to scan
    exit 0
fi

# For each staged path, search the knowledge files for matches.
# We match on the basename AND the full path — basename catches "this file was
# mentioned anywhere"; full path catches more specific references.
SIGNAL_COUNT=0
OUTPUT_BUFFER=""

while IFS= read -r path; do
    [ -z "$path" ] && continue
    basename_only="$(basename "$path")"
    file_signals=""

    # --- Scan session-log for "Issues found" mentioning this path ---
    if [ -f "$SESSION_LOG" ]; then
        # Look for lines under "Issues found:" or "issues:" that mention
        # the file. We're lenient — any session-log line mentioning the
        # basename within an Issues-context is worth surfacing.
        log_hits="$(grep -niE "issues? found.*${basename_only}|${basename_only}.*issue" "$SESSION_LOG" 2>/dev/null || true)"
        if [ -n "$log_hits" ]; then
            file_signals="${file_signals}    • session-log: $(echo "$log_hits" | head -3 | sed 's/^/      /')\n"
        fi
    fi

    # --- Scan debts.md for Open Debts mentioning this path ---
    if [ -f "$DEBTS_FILE" ]; then
        # Match basename OR full path. Surface the debt's heading line.
        debt_hits="$(grep -niE "(${basename_only}|${path})" "$DEBTS_FILE" 2>/dev/null || true)"
        if [ -n "$debt_hits" ]; then
            # Filter out the Resolved section if possible — look for entries
            # before the "## Resolved" heading. For v4.6.2 simplicity we just
            # flag all matches and let the user decide.
            file_signals="${file_signals}    • debts.md: $(echo "$debt_hits" | head -3 | sed 's/^/      /')\n"
        fi
    fi

    if [ -n "$file_signals" ]; then
        SIGNAL_COUNT=$((SIGNAL_COUNT + 1))
        OUTPUT_BUFFER="${OUTPUT_BUFFER}\n  ${BOLD}${path}${NC}\n${file_signals}"
    fi
done <<< "$STAGED"

# --- Output ---
if [ "$SIGNAL_COUNT" -eq 0 ]; then
    # Clean scan — single line, easy to ignore in commit output
    echo -e "${DIM}firm-risk-scan: 0 signals across $(echo "$STAGED" | wc -l | tr -d ' ') staged files${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}===============================================================${NC}"
echo -e "${YELLOW}  FIRM RISK SCAN — ${SIGNAL_COUNT} file(s) with prior signals${NC}"
echo -e "${YELLOW}===============================================================${NC}"
echo -e "${OUTPUT_BUFFER}"
echo ""
echo -e "${DIM}This is a soft warning — commit proceeds. The flagged files have"
echo -e "appeared in past session-log Issues or open debts. Worth an extra"
echo -e "pair of eyes from STANX / AUDIX / CONSX with HIGH confidence.${NC}"
echo ""

# Soft warn — exit 0 in v4.6.2
exit 0

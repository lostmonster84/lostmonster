#!/bin/bash

# ══════════════════════════════════════════════════════
# GAFFER — Setup Script
# 20 workers. 1 Gaffer. Automated quality gates.
# ══════════════════════════════════════════════════════
#
# Usage:
#   cd your-project
#   bash /path/to/gaffer/setup.sh
#
# What it does:
#   1. Copies the full .ai/ structure (crew, gaffer, PROTOCOL)
#   2. Places CLAUDE.md at your project root
#   3. Places CLAUDE-SUPPLEMENT.md inside .ai/
#   4. Verifies the install
#   5. Tells you what to do next
# ══════════════════════════════════════════════════════

set -e

# Colours
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No colour

# Where this script lives (gaffer/ directory)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Where we're installing to (current working directory)
PROJECT_DIR="$(pwd)"

echo ""
echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  GAFFER — Quality Orchestration Setup${NC}"
echo -e "${BOLD}  20 workers. 1 Gaffer. Drop in and go.${NC}"
echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
echo ""

# ── Safety checks ──────────────────────────────────────

# Don't install into the template directory itself
if [ "$SCRIPT_DIR" = "$PROJECT_DIR" ]; then
    echo -e "${RED}Error: You're running this from inside the gaffer/ template directory.${NC}"
    echo -e "       cd into your project root first, then run:"
    echo -e "       ${CYAN}bash $SCRIPT_DIR/setup.sh${NC}"
    exit 1
fi

# Warn if .ai/ already exists
if [ -d "$PROJECT_DIR/.ai" ]; then
    echo -e "${YELLOW}Warning: .ai/ directory already exists in $PROJECT_DIR${NC}"
    read -p "Overwrite? This will replace existing .ai/ contents. (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborted.${NC}"
        exit 1
    fi
fi

# Warn if CLAUDE.md already exists
if [ -f "$PROJECT_DIR/CLAUDE.md" ]; then
    echo -e "${YELLOW}Warning: CLAUDE.md already exists in $PROJECT_DIR${NC}"
    read -p "Overwrite? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborted.${NC}"
        exit 1
    fi
fi

# ── Step 1: Copy .ai/ structure ───────────────────────

echo -e "${CYAN}[1/4]${NC} Copying crew, gaffer, and PROTOCOL into .ai/ ..."

mkdir -p "$PROJECT_DIR/.ai"

# Copy crew/ (all workers + GAFFER)
cp -r "$SCRIPT_DIR/crew" "$PROJECT_DIR/.ai/"

# Copy gaffer/ (session-log, debts, calibration, evolution, inspections)
cp -r "$SCRIPT_DIR/gaffer" "$PROJECT_DIR/.ai/"

# Copy PROTOCOL.md
cp "$SCRIPT_DIR/PROTOCOL.md" "$PROJECT_DIR/.ai/"

echo -e "  ${GREEN}Done.${NC} .ai/crew/, .ai/gaffer/, .ai/PROTOCOL.md"

# ── Step 2: Place CLAUDE.md at project root ────────────

echo -e "${CYAN}[2/4]${NC} Installing CLAUDE.md at project root ..."

cp "$SCRIPT_DIR/CLAUDE-TEMPLATE.md" "$PROJECT_DIR/CLAUDE.md"

echo -e "  ${GREEN}Done.${NC} CLAUDE.md (from CLAUDE-TEMPLATE.md)"

# ── Step 3: Place CLAUDE-SUPPLEMENT.md inside .ai/ ─────

echo -e "${CYAN}[3/4]${NC} Installing CLAUDE-SUPPLEMENT.md into .ai/ ..."

cp "$SCRIPT_DIR/CLAUDE-SUPPLEMENT-TEMPLATE.md" "$PROJECT_DIR/.ai/CLAUDE-SUPPLEMENT.md"

echo -e "  ${GREEN}Done.${NC} .ai/CLAUDE-SUPPLEMENT.md (from CLAUDE-SUPPLEMENT-TEMPLATE.md)"

# ── Step 4: Summary ───────────────────────────────────

echo -e "${CYAN}[4/4]${NC} Verifying installation ..."

# Count what we installed
WORKER_COUNT=$(find "$PROJECT_DIR/.ai/crew" -name "*.md" -not -name "GAFFER.md" | wc -l | tr -d ' ')
echo -e "  ${GREEN}$WORKER_COUNT workers${NC} installed"
echo -e "  ${GREEN}1 Gaffer${NC} installed"
echo -e "  ${GREEN}PROTOCOL.md${NC} installed"
echo -e "  ${GREEN}CLAUDE.md${NC} at project root"
echo -e "  ${GREEN}CLAUDE-SUPPLEMENT.md${NC} in .ai/"

echo ""
echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  GAFFER is installed.${NC}"
echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BOLD}Your project now has:${NC}"
echo ""
echo "  $PROJECT_DIR/"
echo "  ├── CLAUDE.md                          <- Your project instructions"
echo "  └── .ai/"
echo "      ├── CLAUDE-SUPPLEMENT.md           <- Deep reference"
echo "      ├── PROTOCOL.md                    <- Master orchestration"
echo "      ├── crew/"
echo "      │   ├── GAFFER.md                  <- The boss"
echo "      │   ├── planners/   (4 workers)"
echo "      │   ├── builders/   (5 workers)"
echo "      │   ├── reviewers/  (4 workers)"
echo "      │   └── checkers/   (5 workers)"
echo "      └── gaffer/"
echo "          ├── session-log.md"
echo "          ├── debts.md"
echo "          ├── calibration.md"
echo "          ├── evolution.md"
echo "          └── inspections/"
echo ""
echo -e "${BOLD}Next steps:${NC}"
echo ""
echo -e "  ${CYAN}1.${NC} Replace [BRACKETED] placeholders in CLAUDE.md and .ai/CLAUDE-SUPPLEMENT.md"
echo -e "     (see README.md for the full placeholder table)"
echo ""
echo -e "  ${CYAN}2.${NC} Create your design docs:"
echo -e "     - Design Guide at your [DESIGN-GUIDE-PATH]"
echo -e "     - Slop Test at your [SLOP-TEST-PATH]"
echo ""
echo -e "  ${CYAN}3.${NC} Write your PRD, then tell Claude:"
echo -e "     ${BOLD}Gaffer: onboard${NC}"
echo -e "     This rewrites all worker context from your PRD automatically."
echo ""
echo -e "  ${CYAN}4.${NC} Start building. The Gaffer handles the rest."
echo ""
echo -e "${BOLD}The Gaffer is ready. Let's go.${NC}"
echo ""

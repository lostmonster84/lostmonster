#!/bin/bash

# install-hooks.sh - point this clone's git hooks at the tracked .githooks/
# directory and make every hook executable.
#
# Idempotent: safe to run repeatedly. Does nothing if already configured.

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

CURRENT=$(git config --get core.hooksPath || echo "")
if [ "$CURRENT" != ".githooks" ]; then
    git config core.hooksPath .githooks
    echo "core.hooksPath -> .githooks"
else
    echo "core.hooksPath already .githooks (no change)"
fi

chmod +x .githooks/* 2>/dev/null || true
echo "hooks installed: $(ls .githooks/ | tr '\n' ' ')"

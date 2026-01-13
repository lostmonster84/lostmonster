#!/bin/bash

# Install git hooks for automatic changelog releases
# Usage: ./install-git-hooks.sh

set -e

HOOK_DIR=".git/hooks"
POST_COMMIT_HOOK="$HOOK_DIR/post-commit"

if [ ! -d "$HOOK_DIR" ]; then
    echo "❌ Error: .git/hooks directory not found. Are you in a git repository?"
    exit 1
fi

# Copy post-commit hook
if [ -f "scripts/post-commit-hook.sh" ]; then
    cp scripts/post-commit-hook.sh "$POST_COMMIT_HOOK"
    chmod +x "$POST_COMMIT_HOOK"
    echo "✅ Git hook installed successfully!"
    echo ""
    echo "Usage:"
    echo "  git commit -m 'release: 0.2.0'  # Auto-releases version 0.2.0"
    echo "  git commit -m 'release: v0.2.0' # Also works with 'v' prefix"
else
    echo "❌ Error: scripts/post-commit-hook.sh not found"
    exit 1
fi

#!/bin/bash

# Git post-commit hook for automatic changelog releases
# This hook runs after each commit and checks if a release should be triggered

# Check if commit message contains "release:" pattern
COMMIT_MSG=$(git log -1 --pretty=%B)

if echo "$COMMIT_MSG" | grep -qE "^release:\s*v?[0-9]+\.[0-9]+\.[0-9]+"; then
    # Extract version from commit message
    VERSION=$(echo "$COMMIT_MSG" | grep -oE "v?[0-9]+\.[0-9]+\.[0-9]+" | head -1 | sed 's/^v//')

    if [ -n "$VERSION" ]; then
        echo "🚀 Detected release commit for version $VERSION"
        echo "📝 Running release process..."

        # Run release script
        npm run release:changelog "$VERSION" || {
            echo "❌ Release failed. Continuing with commit..."
            exit 0
        }

        # Update package.json version
        npm version "$VERSION" --no-git-tag || {
            echo "⚠️  Failed to update package.json version"
        }

        # Stage changes
        git add CHANGELOG.md package.json

        # Amend the commit to include changelog changes
        git commit --amend --no-edit || {
            echo "⚠️  Failed to amend commit with changelog"
        }

        # Create tag
        git tag -a "v${VERSION}" -m "Release v${VERSION}" || {
            echo "⚠️  Failed to create tag"
        }

        echo "✅ Release v${VERSION} prepared!"
        echo "📤 Push with: git push origin main --tags"
    fi
fi

exit 0

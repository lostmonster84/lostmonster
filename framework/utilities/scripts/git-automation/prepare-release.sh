#!/bin/bash

# Helper script to create a release
# Usage: ./scripts/prepare-release.sh 0.2.0

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "❌ Error: Version required"
  echo ""
  echo "Usage: ./scripts/prepare-release.sh <version>"
  echo "Example: ./scripts/prepare-release.sh 0.2.0"
  exit 1
fi

# Validate version format
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Error: Invalid version format '$VERSION'"
  echo "Version must be in format: X.Y.Z (e.g., 0.2.0)"
  exit 1
fi

echo "🚀 Preparing release v${VERSION}..."
echo ""

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes."
  echo "   Please commit or stash them before releasing."
  read -p "   Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check if [Unreleased] has content
UNRELEASED_CONTENT=$(grep -A 1000 "## \[Unreleased\]" CHANGELOG.md | grep -v "## \[Unreleased\]" | grep -v "^$" | head -5)
if [ -z "$UNRELEASED_CONTENT" ]; then
  echo "⚠️  Warning: [Unreleased] section appears to be empty."
  read -p "   Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Run dry-run first
echo "🔍 Running dry-run..."
npm run release:changelog $VERSION --dry-run

echo ""
read -p "✅ Looks good? Create release? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Release cancelled"
  exit 1
fi

# Release changelog
echo ""
echo "📝 Updating changelog..."
npm run release:changelog $VERSION

# Update package.json version
echo ""
echo "📦 Updating package.json version..."
npm version $VERSION --no-git-tag

# Stage changes
echo ""
echo "📋 Staging changes..."
git add CHANGELOG.md package.json

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "chore: release v${VERSION}"

# Create tag
echo ""
echo "🏷️  Creating git tag..."
git tag -a "v${VERSION}" -m "Release v${VERSION}"

echo ""
echo "✅ Release v${VERSION} prepared!"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git diff HEAD~1"
echo "  2. Push commits: git push origin main"
echo "  3. Push tags: git push origin v${VERSION}"
echo ""
echo "Or push everything at once:"
echo "  git push origin main --tags"

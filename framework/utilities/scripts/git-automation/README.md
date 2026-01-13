# Git Automation Scripts

**Automate releases, changelogs, and git workflows**

This directory contains production-tested scripts for automating git operations, particularly release management and changelog generation.

---

## Available Scripts

### 1. **release-changelog.ts** - Automated Changelog Releases

**Purpose**: Automatically moves [Unreleased] content to a versioned section in CHANGELOG.md

**What it does**:
- Parses your CHANGELOG.md
- Finds [Unreleased] section
- Moves content to new [X.Y.Z] section
- Creates fresh [Unreleased] section
- Preserves all existing versions

**Setup**:
```bash
# 1. Install tsx
npm install -D tsx

# 2. Add to package.json scripts
{
  "scripts": {
    "release:changelog": "tsx scripts/release-changelog.ts"
  }
}

# 3. Create CHANGELOG.md with this structure:
```

**CHANGELOG.md format**:
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature description

### Changed
- What changed

### Fixed
- Bug fixes

## [1.0.0] - 2025-01-01

### Added
- Initial release
```

**Usage**:
```bash
# Basic usage
npm run release:changelog 0.2.0

# With specific date
npm run release:changelog 0.2.0 --date 2025-01-15

# Dry run (preview without changes)
npm run release:changelog 0.2.0 --dry-run
```

**Value**: Eliminates manual changelog editing on every release

---

### 2. **prepare-release.sh** - Complete Release Automation

**Purpose**: Full release workflow with confirmation steps

**What it does**:
1. Validates version format
2. Checks for uncommitted changes
3. Runs changelog dry-run (preview)
4. Prompts for confirmation
5. Updates CHANGELOG.md
6. Updates package.json version
7. Creates git commit
8. Creates git tag
9. Provides push instructions

**Setup**:
```bash
chmod +x scripts/prepare-release.sh
```

**Usage**:
```bash
./scripts/prepare-release.sh 0.2.0
```

**Interactive prompts**:
- ⚠️ Warns if uncommitted changes exist
- ⚠️ Warns if [Unreleased] is empty
- 🔍 Shows dry-run preview
- ✅ Asks for final confirmation

**Value**: Full release automation with safety checks

---

### 3. **install-git-hooks.sh** - Git Hook Installation

**Purpose**: Install git hooks for automatic release detection

**What it does**:
- Copies post-commit-hook.sh to .git/hooks/post-commit
- Makes it executable
- Enables automatic releases on commit

**Setup**:
```bash
chmod +x scripts/install-git-hooks.sh
./scripts/install-git-hooks.sh
```

**Usage after installation**:
```bash
# This commit message triggers automatic release
git commit -m "release: 0.2.0"

# Also works with 'v' prefix
git commit -m "release: v0.2.0"
```

**Value**: Zero-friction releases (just commit with "release:" pattern)

---

### 4. **post-commit-hook.sh** - Automatic Release on Commit

**Purpose**: Git hook that runs after commits to detect release commits

**What it does**:
1. Checks commit message for "release: X.Y.Z" pattern
2. If found, runs release process automatically:
   - Runs release-changelog script
   - Updates package.json version
   - Amends commit with changelog changes
   - Creates git tag
3. Provides push instructions

**Triggered by**:
- `git commit -m "release: 0.2.0"`
- `git commit -m "release: v0.2.0"`

**Installation**: Use `install-git-hooks.sh` (recommended)

**Manual installation**:
```bash
cp scripts/post-commit-hook.sh .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

**Value**: Releases happen automatically on commit

---

## Workflow Options

### Option 1: Manual Release (Safest)

**When to use**: First time, major releases, when you want full control

**Steps**:
```bash
# 1. Prepare release (interactive)
./scripts/prepare-release.sh 0.2.0

# 2. Review changes
git diff HEAD~1

# 3. Push
git push origin main --tags
```

**Time**: 2-3 minutes
**Safety**: High (multiple confirmation prompts)

---

### Option 2: Semi-Automatic Release

**When to use**: Regular releases, confident with process

**Steps**:
```bash
# 1. Run changelog directly
npm run release:changelog 0.2.0

# 2. Update version
npm version 0.2.0 --no-git-tag

# 3. Commit
git add CHANGELOG.md package.json
git commit -m "chore: release v0.2.0"

# 4. Tag
git tag -a "v0.2.0" -m "Release v0.2.0"

# 5. Push
git push origin main --tags
```

**Time**: 1-2 minutes
**Safety**: Medium (manual steps, no confirmation)

---

### Option 3: Fully Automatic Release (Fastest)

**When to use**: Frequent releases, established workflow

**Setup once**:
```bash
./scripts/install-git-hooks.sh
```

**Then every release**:
```bash
git commit -m "release: 0.2.0"
git push origin main --tags
```

**Time**: 10 seconds
**Safety**: Lower (automatic, no confirmation)

---

## Best Practices

### Before First Release
1. ✅ Create CHANGELOG.md with [Unreleased] section
2. ✅ Test with `--dry-run` first
3. ✅ Commit all changes before releasing
4. ✅ Choose your workflow (manual, semi-auto, or auto)

### During Development
1. ✅ Add changes to [Unreleased] section as you work
2. ✅ Use standard format: Added / Changed / Fixed
3. ✅ Be specific: "Add user authentication" not "Add feature"
4. ✅ Link to PRs or issues when relevant

### When Releasing
1. ✅ Review [Unreleased] content before releasing
2. ✅ Use semantic versioning (X.Y.Z)
3. ✅ Test with `--dry-run` if uncertain
4. ✅ Push tags immediately after committing

### Version Numbering
- **X.0.0** - Major (breaking changes)
- **0.X.0** - Minor (new features, backwards compatible)
- **0.0.X** - Patch (bug fixes)

---

## Troubleshooting

### "Could not find [Unreleased] section"
**Solution**: Add this to CHANGELOG.md:
```markdown
## [Unreleased]

### Added
-

### Changed
-

### Fixed
-
```

### "No content in [Unreleased] section"
**Cause**: Nothing to release
**Solution**: Add changes to [Unreleased] section first

### "Failed to update package.json version"
**Cause**: Version already exists or package.json not found
**Solution**: Check current version in package.json

### Git hook not working
**Solution**:
```bash
# Reinstall
./scripts/install-git-hooks.sh

# Verify installation
ls -la .git/hooks/post-commit

# Check if executable
chmod +x .git/hooks/post-commit
```

---

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Extract version from tag
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.version.outputs.VERSION }}
          body_path: CHANGELOG.md
```

---

## Time Saved

**Without automation**:
- Manual changelog editing: 5-10 min
- Version bump: 1 min
- Git commit + tag: 2 min
- Total: 8-13 min per release

**With automation**:
- Run script: 30 seconds
- Or commit with "release:" pattern: 10 seconds

**Time saved**: ~10 min per release

**Annual savings** (10 releases/year): ~100 minutes = 1.7 hours

---

## Related Resources

- **Trello Workflow**: [`../../../integrations/workflow/trello-workflow-guide.md`](../../../integrations/workflow/trello-workflow-guide.md)
- **Development Principles**: [`../../../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md`](../../../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md)

---

**Automate releases. Focus on building.** 🚀

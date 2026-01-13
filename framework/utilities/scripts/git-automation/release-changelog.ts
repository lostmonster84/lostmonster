#!/usr/bin/env tsx

/**
 * Automated Changelog Release Script
 *
 * This script automatically moves content from [Unreleased] to a new version
 * when a git tag is created. Run this script manually or via CI/CD.
 *
 * Usage:
 *   npm run release:changelog 0.2.0
 *   npm run release:changelog 0.2.0 --date 2025-01-15
 *   npm run release:changelog 0.2.0 --dry-run
 *
 * Setup:
 *   1. Add to package.json scripts:
 *      "release:changelog": "tsx scripts/release-changelog.ts"
 *   2. Install tsx: npm install -D tsx
 *   3. Create CHANGELOG.md with [Unreleased] section
 */

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";

interface ReleaseOptions {
  version: string;
  date?: string;
  dryRun?: boolean;
}

function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLatestVersion(): string | null {
  try {
    const tags = execSync("git tag --sort=-v:refname", { encoding: "utf-8" })
      .trim()
      .split("\n")
      .filter((tag) => tag.match(/^v?\d+\.\d+\.\d+/));

    if (tags.length === 0) return null;

    // Remove 'v' prefix if present
    return tags[0].replace(/^v/, "");
  } catch {
    return null;
  }
}

async function parseChangelog(content: string): Promise<{
  header: string;
  unreleased: string;
  released: string;
}> {
  const lines = content.split("\n");
  const unreleasedStart = lines.findIndex((line) =>
    line.match(/^##\s+\[Unreleased\]/i)
  );

  if (unreleasedStart === -1) {
    throw new Error("Could not find [Unreleased] section in CHANGELOG.md");
  }

  // Find where unreleased section ends (next version header or end of file)
  let unreleasedEnd = lines.length;
  for (let i = unreleasedStart + 1; i < lines.length; i++) {
    if (lines[i].match(/^##\s+\[/)) {
      unreleasedEnd = i;
      break;
    }
  }

  const header = lines.slice(0, unreleasedStart).join("\n");
  const unreleased = lines.slice(unreleasedStart, unreleasedEnd).join("\n");
  const released = lines.slice(unreleasedEnd).join("\n");

  return { header, unreleased, released };
}

function extractUnreleasedContent(unreleasedSection: string): string {
  const lines = unreleasedSection.split("\n");

  // Skip the ## [Unreleased] header and any empty lines after it
  let startIndex = 1;
  while (startIndex < lines.length && lines[startIndex].trim() === "") {
    startIndex++;
  }

  return lines.slice(startIndex).join("\n").trim();
}

async function releaseChangelog(options: ReleaseOptions): Promise<void> {
  const { version, date, dryRun = false } = options;
  const releaseDate = date || getCurrentDate();

  console.log(`🚀 Releasing changelog version ${version} (${releaseDate})`);
  if (dryRun) {
    console.log("🔍 DRY RUN MODE - No files will be modified");
  }

  const changelogPath = join(process.cwd(), "CHANGELOG.md");
  const content = await readFile(changelogPath, "utf-8");

  const { header, unreleased, released } = await parseChangelog(content);

  const unreleasedContent = extractUnreleasedContent(unreleased);

  if (!unreleasedContent) {
    console.log("⚠️  No content in [Unreleased] section. Nothing to release.");
    return;
  }

  // Create new version section
  const newVersionSection = `## [${version}] - ${releaseDate}

${unreleasedContent}

`;

  // Create new unreleased section
  const newUnreleasedSection = `## [Unreleased]

### Added
-

### Changed
-

### Fixed
-

`;

  // Reconstruct changelog
  const newContent = `${header}

${newVersionSection}${newUnreleasedSection}${released}`;

  if (dryRun) {
    console.log("\n📝 Would create this version section:");
    console.log("─".repeat(50));
    console.log(newVersionSection);
    console.log("─".repeat(50));
    return;
  }

  await writeFile(changelogPath, newContent, "utf-8");
  console.log(`✅ Changelog updated! Version ${version} released.`);
  console.log(`📝 Updated ${changelogPath}`);
}

// CLI handling
const args = process.argv.slice(2);
const versionIndex = args.findIndex((arg) => !arg.startsWith("--"));
const version = args[versionIndex];

if (!version) {
  console.error("❌ Error: Version required");
  console.log("\nUsage:");
  console.log("  npm run release:changelog <version>");
  console.log("  npm run release:changelog 0.2.0");
  console.log("  npm run release:changelog 0.2.0 --date 2025-01-15");
  console.log("  npm run release:changelog 0.2.0 --dry-run");
  process.exit(1);
}

const dateIndex = args.findIndex((arg) => arg === "--date");
const date = dateIndex !== -1 ? args[dateIndex + 1] : undefined;

const dryRun = args.includes("--dry-run");

// Validate version format
if (!version.match(/^\d+\.\d+\.\d+$/)) {
  console.error(`❌ Error: Invalid version format "${version}"`);
  console.log("Version must be in format: X.Y.Z (e.g., 0.2.0)");
  process.exit(1);
}

releaseChangelog({ version, date, dryRun }).catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});

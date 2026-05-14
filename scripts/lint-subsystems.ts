#!/usr/bin/env tsx
/**
 * lint-subsystems.ts
 *
 * Validates subsystems.json:
 *   1. No duplicate globs across subsystems (first-match-wins routes around
 *      conflicts silently - duplicates are a manifest bug)
 *   2. Files touched in the last N commits that fell into `uncategorised`
 *      are reported (so the bucket can't grow silently)
 *   3. Required fields present on every subsystem (name, globs, owns)
 *
 * Exit codes:
 *   0  clean
 *   1  manifest invalid (dupes, missing fields, malformed JSON) - blocks dayclose
 *   2  uncategorised drift detected (informational, does NOT block)
 *
 * Usage:
 *   pnpm exec tsx scripts/lint-subsystems.ts                 # default: dupes + uncategorised drift over last 30 commits
 *   pnpm exec tsx scripts/lint-subsystems.ts --depth=10      # custom commit window
 *   pnpm exec tsx scripts/lint-subsystems.ts --strict        # treat uncategorised drift as exit 1
 *   pnpm exec tsx scripts/lint-subsystems.ts --json          # machine-readable output
 */

import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

interface Subsystem {
  name: string;
  globs: string[];
  owns?: string;
  riskSurface?: string[];
}
interface Manifest {
  version: string;
  description?: string;
  subsystems: Subsystem[];
  default: string;
}

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const strict = args.includes("--strict");
const depthArg = args.find((a) => a.startsWith("--depth="));
const depth = depthArg ? parseInt(depthArg.split("=")[1], 10) : 30;

function gitRoot(): string {
  return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
}

function loadManifest(): Manifest {
  const path = resolve(gitRoot(), "subsystems.json");
  if (!existsSync(path)) {
    fail(`subsystems.json not found at ${path}`);
  }
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Manifest;
  } catch (err) {
    fail(`subsystems.json is not valid JSON: ${err}`);
  }
}

function fail(msg: string): never {
  if (jsonMode) {
    console.log(JSON.stringify({ ok: false, error: msg }));
  } else {
    console.error(msg);
  }
  process.exit(1);
}

function globToRegex(glob: string): RegExp {
  let pat = "";
  let i = 0;
  while (i < glob.length) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        pat += ".*";
        i += 2;
        if (glob[i] === "/") i += 1;
      } else {
        pat += "[^/]*";
        i += 1;
      }
    } else if (c === "?") {
      pat += "[^/]";
      i += 1;
    } else if (".+^$()[]{}|\\".includes(c)) {
      pat += "\\" + c;
      i += 1;
    } else {
      pat += c;
      i += 1;
    }
  }
  return new RegExp("^" + pat + "$");
}

function matchSubsystem(file: string, m: Manifest): string {
  for (const sys of m.subsystems) {
    for (const g of sys.globs) {
      if (globToRegex(g).test(file)) return sys.name;
    }
  }
  return m.default;
}

function findDuplicateGlobs(m: Manifest): { glob: string; subsystems: string[] }[] {
  const map = new Map<string, string[]>();
  for (const s of m.subsystems) {
    for (const g of s.globs) {
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(s.name);
    }
  }
  const dupes: { glob: string; subsystems: string[] }[] = [];
  for (const [g, names] of map.entries()) {
    if (names.length > 1) dupes.push({ glob: g, subsystems: names });
  }
  return dupes;
}

function findRequiredFieldMisses(m: Manifest): string[] {
  const issues: string[] = [];
  for (const s of m.subsystems) {
    if (!s.name) issues.push("subsystem with empty name");
    if (!Array.isArray(s.globs) || s.globs.length === 0) {
      issues.push(`${s.name}: globs missing or empty`);
    }
    if (!s.owns) issues.push(`${s.name}: owns field missing (describe what this subsystem owns)`);
  }
  return issues;
}

function recentlyTouchedFiles(n: number): string[] {
  try {
    const out = execSync(`git log --name-only --pretty=format: -n ${n}`, {
      encoding: "utf8",
      cwd: gitRoot(),
    });
    const set = new Set<string>();
    out.split("\n").map((f) => f.trim()).filter(Boolean).forEach((f) => set.add(f));
    return Array.from(set);
  } catch {
    return [];
  }
}

function main() {
  const manifest = loadManifest();

  const dupes = findDuplicateGlobs(manifest);
  const fieldIssues = findRequiredFieldMisses(manifest);

  const recent = recentlyTouchedFiles(depth);
  const uncategorised = recent.filter((f) => matchSubsystem(f, manifest) === manifest.default);

  const report = {
    ok: dupes.length === 0 && fieldIssues.length === 0 && (!strict || uncategorised.length === 0),
    duplicateGlobs: dupes,
    fieldIssues,
    uncategorisedFromLastNCommits: uncategorised,
    depth,
    totalSubsystems: manifest.subsystems.length,
  };

  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    if (dupes.length > 0 || fieldIssues.length > 0) process.exit(1);
    if (uncategorised.length > 0) process.exit(strict ? 1 : 2);
    process.exit(0);
  }

  console.log(`subsystems.json: ${manifest.subsystems.length} subsystems, default="${manifest.default}"`);
  console.log(`scanned last ${depth} commits for uncategorised drift`);
  console.log("");

  let hadHardFail = false;

  if (fieldIssues.length > 0) {
    hadHardFail = true;
    console.log("FIELD ISSUES (manifest invalid):");
    fieldIssues.forEach((i) => console.log(`  - ${i}`));
    console.log("");
  }

  if (dupes.length > 0) {
    hadHardFail = true;
    console.log("DUPLICATE GLOBS (first-match-wins silently routes around conflicts):");
    dupes.forEach((d) => {
      console.log(`  - "${d.glob}" appears in: ${d.subsystems.join(", ")}`);
      console.log(`    Fix: keep the glob in the subsystem that genuinely owns these files,`);
      console.log(`    remove from the other(s). If both genuinely apply, narrow one with a more specific glob.`);
    });
    console.log("");
  }

  if (uncategorised.length > 0) {
    console.log(`UNCATEGORISED FILES (${uncategorised.length} from last ${depth} commits):`);
    uncategorised.forEach((f) => console.log(`  - ${f}`));
    console.log("");
    console.log("Fix: add a glob covering each file to the matching subsystem,");
    console.log("or accept and add a comment in subsystems.json explaining why these are uncategorised.");
    console.log("");
  }

  if (report.ok) {
    console.log("OK - manifest is clean");
    process.exit(0);
  }

  if (hadHardFail) {
    console.log("FAIL - fix the issues above (exit 1, blocks dayclose)");
    process.exit(1);
  }

  console.log(strict ? "FAIL - uncategorised drift in --strict mode (exit 1)" : "WARN - uncategorised drift detected (exit 2, informational)");
  process.exit(strict ? 1 : 2);
}

main();

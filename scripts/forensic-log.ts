#!/usr/bin/env tsx
/**
 * forensic-log.ts
 *
 * Generates a forensic block for a commit range. Reads subsystems.json,
 * diffs <baseRef>..<headRef> (working tree included if --include-working),
 * maps each changed file to a logical subsystem, and prints the block ready
 * to paste into a commit body or session-log.md entry.
 *
 * The block has 5 fields:
 *   Subsystems:   auto-filled from manifest matches
 *   Files:        auto-filled from git diff (truncated if >12)
 *   Risk surface: auto-filled from manifest, supplement manually if needed
 *   Verified:     PLACEHOLDER - the human MUST fill this with what was tested live
 *   Deferred:     PLACEHOLDER - the human MUST fill this with what was NOT verified
 *
 * Verified + Deferred are not optional. Empty placeholders are a protocol violation.
 *
 * Usage:
 *   pnpm exec tsx scripts/forensic-log.ts                          # diff origin/main..HEAD + working tree
 *   pnpm exec tsx scripts/forensic-log.ts HEAD~1                   # diff HEAD~1..HEAD
 *   pnpm exec tsx scripts/forensic-log.ts origin/main HEAD         # explicit range, no working tree
 *   pnpm exec tsx scripts/forensic-log.ts --include-working <ref>  # diff <ref>..HEAD + working tree
 *   pnpm exec tsx scripts/forensic-log.ts --json                   # machine-readable output
 *
 * Exit codes: 0 ok, 1 git or manifest error, 2 no changes detected.
 */

import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

interface Subsystem {
  name: string;
  globs: string[];
  owns: string;
  riskSurface?: string[];
}

interface Manifest {
  version: string;
  description: string;
  subsystems: Subsystem[];
  default: string;
}

const FILE_LIST_LIMIT = 12;

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const includeWorking = args.includes("--include-working");
const positional = args.filter((a) => !a.startsWith("--"));
const baseRef = positional[0] ?? "origin/main";
const headRef = positional[1] ?? "HEAD";

function gitRoot(): string {
  return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
}

function loadManifest(): Manifest {
  const repoRoot = gitRoot();
  const path = resolve(repoRoot, "subsystems.json");
  if (!existsSync(path)) {
    console.error(`subsystems.json not found at ${path}`);
    console.error("Create it at the repo root before running forensic-log.");
    process.exit(1);
  }
  const raw = readFileSync(path, "utf8");
  try {
    return JSON.parse(raw) as Manifest;
  } catch (err) {
    console.error("subsystems.json is not valid JSON:", err);
    process.exit(1);
  }
}

function diffNameOnly(base: string, head: string, includeWT: boolean): string[] {
  const repoRoot = gitRoot();
  const files = new Set<string>();
  try {
    const committed = execSync(`git diff --name-only ${base}..${head}`, {
      encoding: "utf8",
      cwd: repoRoot,
    });
    committed.split("\n").filter(Boolean).forEach((f) => files.add(f));
  } catch (err) {
    console.error(`Failed to diff ${base}..${head}.`);
    console.error(`Likely cause: ${base} not reachable. Try a local SHA or HEAD~N.`);
    process.exit(1);
  }
  if (includeWT || (positional.length === 0)) {
    try {
      const wt = execSync("git diff --name-only HEAD", { encoding: "utf8", cwd: repoRoot });
      wt.split("\n").filter(Boolean).forEach((f) => files.add(f));
      const staged = execSync("git diff --cached --name-only", { encoding: "utf8", cwd: repoRoot });
      staged.split("\n").filter(Boolean).forEach((f) => files.add(f));
      const untracked = execSync("git ls-files --others --exclude-standard", {
        encoding: "utf8",
        cwd: repoRoot,
      });
      untracked.split("\n").filter(Boolean).forEach((f) => files.add(f));
    } catch {
      // working tree probes are best-effort
    }
  }
  return Array.from(files).sort();
}

function globToRegex(glob: string): RegExp {
  let pat = "";
  let i = 0;
  while (i < glob.length) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        // ** - match any chars including /
        pat += ".*";
        i += 2;
        // swallow a trailing slash so "**/" matches at any depth (incl. zero)
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

function matchSubsystem(file: string, manifest: Manifest): string {
  for (const sys of manifest.subsystems) {
    for (const glob of sys.globs) {
      if (globToRegex(glob).test(file)) return sys.name;
    }
  }
  return manifest.default;
}

function truncate(list: string[], limit: number): string {
  if (list.length <= limit) return list.join(", ");
  return list.slice(0, limit).join(", ") + `, ... (+${list.length - limit} more)`;
}

function main() {
  const manifest = loadManifest();
  const files = diffNameOnly(baseRef, headRef, includeWorking);
  if (files.length === 0) {
    if (jsonMode) {
      console.log(JSON.stringify({ subsystems: [], files: [], riskSurface: [] }));
    } else {
      console.error("No changed files between", baseRef, "and", headRef);
      console.error("(working tree included by default; pass two refs to disable)");
    }
    process.exit(2);
  }

  const bySystem = new Map<string, string[]>();
  for (const f of files) {
    const sys = matchSubsystem(f, manifest);
    if (!bySystem.has(sys)) bySystem.set(sys, []);
    bySystem.get(sys)!.push(f);
  }

  const sortedSystems = Array.from(bySystem.keys()).sort();
  const risks = new Set<string>();
  for (const name of sortedSystems) {
    const sys = manifest.subsystems.find((s) => s.name === name);
    sys?.riskSurface?.forEach((r) => risks.add(r));
  }

  if (jsonMode) {
    console.log(
      JSON.stringify(
        {
          subsystems: sortedSystems,
          files,
          filesBySubsystem: Object.fromEntries(bySystem),
          riskSurface: Array.from(risks),
          baseRef,
          headRef,
        },
        null,
        2
      )
    );
    return;
  }

  const lines = [
    "--- Forensic Block ---",
    `Subsystems:   ${sortedSystems.join(", ")}`,
    `Files:        ${truncate(files, FILE_LIST_LIMIT)}`,
    `Risk surface: ${risks.size > 0 ? Array.from(risks).join(" | ") : "<TODO: list specific risks for this change>"}`,
    "Verified:     <TODO: what was tested LIVE on real input - 'NONE' is a valid honest answer>",
    "Deferred:     <TODO: what was NOT verified end-to-end - flag debts here>",
    "--- /Forensic Block ---",
  ];
  console.log(lines.join("\n"));
}

main();

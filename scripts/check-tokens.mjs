import fs from "fs";
import path from "path";

const targets = ["src/components", "src/app"];
const hexRegex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const hardcodedDurationRegex = /\bduration\s*:\s*(?:0\.\d+|\d+)(?!\s*as)/g;
const arbitraryPxRegex = /\b[a-z]+-\[(\d+)px\]/g;

let violations = 0;

function checkPurje(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git" || entry.name === "check-tokens.mjs" || entry.name === "check-content.mjs") continue;
    if (entry.isDirectory()) {
      checkPurje(fullPath);
    } else if (entry.isFile()) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (/PURJE/i.test(content)) {
        console.error(`[PURJE Check Failed] Forbidden keyword found in ${fullPath}`);
        violations++;
      }
    }
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) return;

        // 1. Raw Hex Check
        const hexMatches = line.match(hexRegex);
        if (hexMatches) {
          console.error(`[Token Rule Violation] Raw hex detected in ${fullPath}:${index + 1}:`);
          console.error(`   "${trimmed}" (found: ${hexMatches.join(", ")})`);
          violations++;
        }

        // 2. Hardcoded Motion Duration Check
        if (!fullPath.includes("design") && hardcodedDurationRegex.test(line)) {
          console.error(`[Motion Rule Violation] Hardcoded duration in ${fullPath}:${index + 1}:`);
          console.error(`   "${trimmed}". Import durations from @/design/motion instead.`);
          violations++;
        }

        // 3. Arbitrary px classes check against token scale
        let pxMatch;
        while ((pxMatch = arbitraryPxRegex.exec(line)) !== null) {
          const pxVal = parseInt(pxMatch[1], 10);
          // Scale: 4, 8, 12, 14, 16, 24, 32, 44, 48, 64, 72, 80, 96, 128, 140, 1200
          const allowedTokens = [4, 8, 12, 14, 16, 24, 32, 44, 48, 64, 72, 80, 96, 128, 140, 1200];
          if (!allowedTokens.includes(pxVal)) {
            console.error(`[Spacing Rule Violation] Arbitrary non-token px value [${pxVal}px] in ${fullPath}:${index + 1}:`);
            console.error(`   "${trimmed}". Use tokens from tokens.css.`);
            violations++;
          }
        }
      });
    }
  }
}

console.log("🔍 Running full token, motion, spacing, and PURJE compliance audit...");
checkPurje(process.cwd());

for (const target of targets) {
  scanDir(path.resolve(process.cwd(), target));
}

if (violations > 0) {
  console.error(`\n❌ Failed with ${violations} violation(s)!`);
  process.exit(1);
} else {
  console.log("✅ Passed: 100% token, motion, spacing, and PURJE compliance!");
}

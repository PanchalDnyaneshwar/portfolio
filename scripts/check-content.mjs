import fs from "fs";
import path from "path";

console.log("🔍 Running content integrity and resume PDF verification...");

let violations = 0;

// 1. Check Resume PDF existence
const resumePath = path.resolve(process.cwd(), "public/resume/Dnyaneshwar-Panchal-Resume.pdf");
if (!fs.existsSync(resumePath)) {
  console.error("❌ [Resume Check Failed] Resume PDF missing at public/resume/Dnyaneshwar-Panchal-Resume.pdf");
  violations++;
} else {
  const stats = fs.statSync(resumePath);
  if (stats.size < 100) {
    console.error("❌ [Resume Check Failed] Resume PDF is empty or corrupted (<100 bytes)");
    violations++;
  } else {
    console.log("✅ Resume PDF verified at public/resume/Dnyaneshwar-Panchal-Resume.pdf");
  }
}

// 2. Forbidden strings
const forbiddenStrings = ["TODO", "Hire Me", ["P", "U", "R", "J", "E"].join("")];

function scanContent(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git" ||
      entry.name === "check-content.mjs" ||
      entry.name === "check-tokens.mjs" ||
      entry.name === "check-content.js"
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      scanContent(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts") || entry.name.endsWith(".css") || entry.name.endsWith(".mdx"))) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        // Skip comment lines in code that discuss rules
        const isComment = trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*");

        // Check for forbidden strings in rendered text / code
        for (const str of forbiddenStrings) {
          if (line.includes(str)) {
            // Allow if strictly a code comment explaining a check
            if (isComment && (trimmed.includes("check") || trimmed.includes("rule") || trimmed.includes("forbidden"))) {
              continue;
            }
            console.error(`❌ [Content Violation] Forbidden string "${str}" found in ${fullPath}:${index + 1}:`);
            console.error(`   "${trimmed}"`);
            violations++;
          }
        }
      });
    }
  }
}

scanContent(path.resolve(process.cwd(), "src"));

if (violations > 0) {
  console.error(`\n❌ Failed with ${violations} content violation(s)!`);
  process.exit(1);
} else {
  console.log("✅ Passed: 100% content integrity and PDF check passed with 0 violations!");
}

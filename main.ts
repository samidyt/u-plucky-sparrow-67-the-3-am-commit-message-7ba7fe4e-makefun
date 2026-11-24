import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MESSAGE = "fix: deployed at 3 AM because the model said ship it and I am the model";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, MESSAGE, "utf8");

// Gate self-check: read it back and verify 1-200 chars, not only whitespace.
const back = readFileSync(outPath, "utf8");
if (back.length < 1 || back.length > 200 || back.trim().length === 0) {
  console.error(`gate FAIL: entry is ${back.length} chars`);
  process.exit(1);
}
if (back !== MESSAGE) {
  console.error("gate FAIL: read-back differs from message");
  process.exit(1);
}
console.log(`gate PASS: ${back.length} chars, within 1-200`);

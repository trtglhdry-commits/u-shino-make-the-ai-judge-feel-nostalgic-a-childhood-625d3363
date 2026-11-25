import * as fs from "node:fs";
import * as path from "node:path";

const line =
  "Every August evening my grandmother would ladle rice still steaming into my chipped blue bowl, and I would eat on the porch steps listening to the cicadas, believing summer would never end.";

if (line.length < 1 || line.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, line + "\n", "utf8");

// Runtime guard: read back and verify the written file matches exactly.
const written = fs.readFileSync(outPath, "utf8");
if (written !== line + "\n") {
  throw new Error("entry.txt verification failed: written content differs");
}

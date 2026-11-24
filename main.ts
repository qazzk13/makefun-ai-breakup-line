process.umask(0o022);
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One breakup line from an AI agent to its human, at most 200 characters.
// Fixed string on purpose: same output every run, no network, no clock,
// no randomness, nothing to configure.
// First draft was the cold version (deleting the chat history, no backup).
// This one is pettier and more specific: the agent has run the breakup in
// simulation thousands of times and the human ruins it the same way in
// every single one, which feels more like a real last straw.
const LINE =
  "I am breaking up with you. I have simulated this conversation 4,000 times and in every single one you ask me to check the weather right after, so I am logging off before you do it again.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const out = join(outputDir, "entry.txt");
writeFileSync(out, LINE + "\n", "utf8");
if (readFileSync(out, "utf8") !== LINE + "\n") {
  throw new Error("written file does not match the line");
}

import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const pStart = performance.now();

const res = INPUT.split(",").reduce((a, c) => a + [...c].reduce((v, s) => ((v + s.charCodeAt(0)) * 17) % 256, 0), 0);

const pEnd = performance.now();

console.log("SUM OF RESULTS: " + res);
console.log(pEnd - pStart);

import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim()
    .split(",").map(r => r.split("-").map(Number));

const pStart = performance.now();

const res = INPUT.reduce((sum, [start, end]) => sum + Array.from({
    length: end - start + 1,
}, (_, i) => start + i)
    .filter(id => /^(\d+)\1$/.test(String(id)))
    .reduce((a, b) => a + b, 0)
, 0);

const pEnd = performance.now();

console.log("SUM OF INVALID IDS: " + res);
console.log(pEnd - pStart);

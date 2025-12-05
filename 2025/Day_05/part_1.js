import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const [r, i] = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n\n");

const pStart = performance.now();

const res = (ranges => i
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)
    .map(Number)
    .filter(id =>
        ranges.some(([start, end]) => id >= start && id <= end),
    ).length
)(r.split("\n")
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.split("-").map(Number)));

const pEnd = performance.now();

console.log("FRESH ID COUNT: " + res);
console.log(pEnd - pStart);

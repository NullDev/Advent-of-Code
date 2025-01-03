import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(","));

const pStart = performance.now();

const result = INPUT.map(([r1, r2]) => [r1.split("-").map(Number), r2.split("-").map(Number)])
    .filter(([r1, r2]) => (r1[0] >= r2[0] && r1[1] <= r2[1]) || (r2[0] >= r1[0] && r2[1] <= r1[1])).length;

const pEnd = performance.now();

console.log("ASSIGNMENT PAIRS: " + result);
console.log(pEnd - pStart);

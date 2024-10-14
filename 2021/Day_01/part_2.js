import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(Number);

const pStart = performance.now();

const count = INPUT
    .map((_, i) => INPUT[i - 2] + INPUT[i - 1] + INPUT[i])
    .filter((e, i, a) => e > a[i - 1])
    .length;

const pEnd = performance.now();

console.log("SUMS LARGER THAN THE PREVIOUS: " + count);
console.log(pEnd - pStart);

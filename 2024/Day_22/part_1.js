import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(Number);

const pStart = performance.now();

const total = INPUT.reduce((acc, e) => acc + ((
    s, p = val => val >>> 0 & 0xFFFFFF, // OR val 2^24 = 16777216 (secret mod 2^24)
) => {
    for (let i = 0; i < 2000; i++) (s = p(s ^ p(s * 64))) // mul / div by n (64, 32, 2048), XOR, prune
        && (s = p(s ^ p(Math.floor(s / 32)))) && (s = p(s ^ p(s * 2048)));
    return s;
})(e), 0);

const pEnd = performance.now();

console.log("SUM OF 2000TH SECRET NUMBER: " + total);
console.log(pEnd - pStart);

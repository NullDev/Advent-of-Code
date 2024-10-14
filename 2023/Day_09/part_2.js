import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.map(l => l.trim().split(" ").map(Number)).reduce((sum, h) => sum + ((seq = [h]) => {
    while (seq[seq.length - 1].some(val => val !== 0)) seq.push(seq[seq.length - 1].map((v, i, arr) => i ? v - arr[i - 1] : v).slice(1));
    return seq.reduceRight((next, seqN) => [seqN[0] - next[0], ...next])[0];
})(), 0);

const pEnd = performance.now();

console.log("SUM OF VALUES: " + res);
console.log(pEnd - pStart);
